import type { NextApiRequest, NextApiResponse } from "next";

import firestore from "../database/firestore";
import geofire from "geofire-common";

import formidable from "formidable";

import ImagesController from "./ImagesStorageController";
import { EventDataValidate } from "../database/schema/EventSchema";

export default {
  async index(req: NextApiRequest, res: NextApiResponse) {
    const eventsRef = await firestore.collection("events").get();
    let events: any = [];

    eventsRef.forEach(async (doc) => {
      const event = doc.data();
      event.images = await ImagesController.upload(event.images);

      events.push([doc.id, event]);
    });

    return res.json(events);
  },

  async get(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const event: any = await firestore
      .collection("events")
      .doc(String(id))
      .get();

    if (event !== undefined) {
      return res.status(404).json("Event not found");
    }

    event.images = await ImagesController.download(event.id, event.images);

    return res.status(200).json(event);
  },

  async getInRadius(req: NextApiRequest, res: NextApiResponse) {
    const radiusInM: number = Number(req.query.radiusInM);
    const center: [number, number] = [
      Number(req.query.lat),
      Number(req.query.lng),
    ];

    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];

    for (const b of bounds) {
      const q = firestore
        .collection("events")
        .orderBy("geoHash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q.get());
    }

    Promise.all(promises)
      .then(async (snapshots) => {
        const matchingDocs = [];

        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const adress = doc.get("adress");
            const distanceInKm = geofire.distanceBetween(
              [adress.lat, adress.lng],
              center
            );

            const distanceInM = distanceInKm * 1000;

            if (distanceInM <= radiusInM) {
              const event: any = doc;
              event.images = await ImagesController.download(
                event.id,
                event.images
              );

              matchingDocs.push(event);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        return res.status(200).json(matchingDocs);
      });
  },

  async delete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    await firestore.collection("events").doc(String(id)).delete();
    await ImagesController.delete(String(id));

    return res.status(200);
  },

  async create(req: NextApiRequest, res: NextApiResponse) {
    const dataForm: any = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });


    const {
      name,
      description,
      datetime,
      duration,
      site,
      repeat,
      adress,
      promotor,
      assessments,
      categorys,
    } = dataForm;

    console.log(
      name,
      description,
      datetime,
      duration,
      site,
      repeat,
      adress,
      promotor,
      categorys
    );
    const images = await ImagesController.upload(dataForm.previewData);

    const geoHash = {
      geoHash: geofire.geohashForLocation([adress.lat, adress.lng]),
    };

    const data = {
      name,
      description,
      datetime,
      duration,
      site,
      repeat,
      promotor,
      adress,
      geoHash,
      assessments,
      categorys,
      images,
    };

    await EventDataValidate(data);

    const addEvent = firestore.collection("events").doc();
    await addEvent.set(data);

    return res.status(201).json("event created");
  },

  // async update(req: NextApiRequest, res: NextApiResponse) {
  //   const {
  //     id,
  //     name,
  //     description,
  //     datetime,
  //     duration,
  //     site,
  //     repeat,
  //     promotor,
  //     adress,
  //     assessments,
  //     categorys,
  //   } = req.body;

  //   const requestImages = req.files as Express.Multer.File[];

  //   const images = requestImages.map((image) => {
  //     return { path: image.filename };
  //   });

  //   const data = {
  //     name,
  //     description,
  //     datetime,
  //     duration,
  //     site,
  //     repeat,
  //     promotor,
  //     adress,
  //     assessments,
  //     categorys,
  //     images,
  //   };

  //   await EventDataValidate(data);

  //   const updateEvent = firestore.collection("events").doc(id);
  //   await updateEvent.update(data);

  //   return res.status(200).json("event updated");
  // },
};
