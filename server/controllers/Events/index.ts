import type { NextApiRequest, NextApiResponse } from "next";

import { EventDataValidate } from "../../database/schema/EventSchema";
import firestore from "../../database/firestore";
import {
  geohashForLocation,
  distanceBetween,
  geohashQueryBounds,
} from "geofire-common";

import SessionsController from "../Auth/_SessionsController";
import http from "../utils/httpHandler";

async function validateSession(accessToken: string) {
  const session = await SessionsController.get(accessToken);

  if (session) {
    return true;
  }
  return false;
}

export default {
  async index(req: NextApiRequest, res: NextApiResponse) {
    const eventsRef = await firestore.collection("events").get();
    let events: any = [];

    eventsRef.forEach(async (doc) => {
      const event = doc.data();
      event.id = doc.id;

      events.push(event);
    });

    return res.status(200).json(events);
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

    return res.status(200).json(event);
  },

  async getInRadius(req: NextApiRequest | any, res: NextApiResponse) {
    const radiusInM: number = Number(req.query.radiusInM);
    const location = JSON.parse(req.query.location);
    const center: [number, number] = [location.lat, location.lng];

    const bounds = geohashQueryBounds(center, radiusInM);
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
            const address = doc.get("address");
            const distanceInKm = distanceBetween(
              [address.lat, address.lng],
              center
            );

            if (distanceInKm * 1000 <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        let events: any = [];

        matchingDocs.forEach(async (doc) => {
          const event = doc.data();
          event.id = doc.id;

          events.push(event);
        });

        // console.log(events)
        res.status(200).json(events);
        res.end();
      });
  },

  async delete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    await firestore.collection("events").doc(String(id)).delete();

    return res.status(200);
  },

  async create(req, res) {
    if (!(await validateSession(req.headers.authorization)))
      return http.Unauthorized(res);

    const {
      name,
      description,
      datetime,
      duration,
      site,
      repeat,
      promotor,
      images,
    } = req.body;

    const address = JSON.parse(req.body.address);
    const categories = JSON.parse(req.body.categories);
    const geoHash = geohashForLocation([address.lat, address.lng]);

    const data = {
      name,
      description,
      datetime,
      duration,
      site,
      repeat,
      promotor,
      address,
      geoHash,
      categories,
      images,
    };

    try {
      await EventDataValidate(data);
    } catch (err) {
      console.log(err);
      return res.status(415).end();
    }

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
  //     address,
  //     assessments,
  //     categories,
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
  //     address,
  //     assessments,
  //     categories,
  //     images,
  //   };

  //   await EventDataValidate(data);

  //   const updateEvent = firestore.collection("events").doc(id);
  //   await updateEvent.update(data);

  //   return res.status(200).json("event updated");
  // },
};
