import { Request, Response } from "express";

import firestore from "../database/firestore";
import geofire from "geofire-common";

import ImagesController from "./ImagesStorageController";
import { EventDataValidate } from "../database/schema/EventSchema";

export default {
  async index(request: Request, response: Response) {
    const eventsRef = await firestore.collection("events").get();
    let events: any = [];

    eventsRef.forEach(async (doc) => {
      const event = doc.data()
      event.images = await ImagesController.upload(event.images);
      
      events.push([doc.id, event]);
    });

    return response.json(events);
  },

  async get(request: Request, response: Response) {
    const { id } = request.query;
    const event: any = await firestore.collection("events").doc(String(id)).get();
    
    if (event !== undefined) {
      return response.status(404).json("Event not found");
    }

    event.images = await ImagesController.download(event.id, event.images);
    
    return response.status(200).json(event);
  },

  async getInRadius(request: Request, response: Response) {
    const radiusInM: number = Number(request.query.radiusInM);
    const center: [number, number] = [
      Number(request.query.lat),
      Number(request.query.lng),
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
              const event: any = doc
              event.images = await ImagesController.download(event.id, event.images);
      
              matchingDocs.push(event);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        return response.status(200).json(matchingDocs);
      });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.query;
    const event = await firestore.collection("events").doc(String(id)).delete();
    
    await ImagesController.delete(String(id));

    return response.status(200);
  },

  async create(request: Request, response: Response) {
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
    } = request.body;

    const images = await ImagesController.upload(request.files);

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

    return response.status(201).json("event created");
  },

  // async update(request: Request, response: Response) {
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
  //   } = request.body;

  //   const requestImages = request.files as Express.Multer.File[];

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

  //   return response.status(200).json("event updated");
  // },
};
