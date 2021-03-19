import { Request, Response } from "express";
import { firestore } from "../database/firebase";
import { EventDataValidate } from "../database/schema/EventSchema";


export default {
  async index(request: Request, response: Response) {
    const eventsRef = await firestore.collection("events").get();
    let events: any = [];

    eventsRef.forEach((doc) => {
      events.push([doc.id, doc.data()]);
    });

    return response.json(events);
  },

  async get(request: Request, response: Response) {
    const { id } = request.query;
    const eventRef = firestore.collection("events").doc(String(id))

    if (eventRef !== undefined) {
      return response.status(404).json("Event not found");
    }

    return response.status(200).json(eventRef);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.query;
    const res = await firestore.collection("events").doc(String(id)).delete();
    
    return response.status(200).json(res);
  },

  async create(request: Request, response: Response) {
    const {
      name,
      description,
      datetime,
      duration,
      site,
      rating,
      repeat,
      promotor,
      adress,
      assessments,
      categorys,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      description,
      datetime,
      duration,
      site,
      rating,
      repeat,
      promotor,
      adress,
      assessments,
      categorys,
      images,
    };

    await EventDataValidate(data);
    
    const addEvent = firestore.collection("events").doc();
    await addEvent.set(data);

    return response.status(201).json("event created");
  },

  async update(request: Request, response: Response) {
    const {
      id,
      name,
      description,
      datetime,
      duration,
      site,
      rating,
      repeat,
      promotor,
      adress,
      assessments,
      categorys,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      description,
      datetime,
      duration,
      site,
      rating,
      repeat,
      promotor,
      adress,
      assessments,
      categorys,
      images,
    };

    await EventDataValidate(data);

    const updateEvent = firestore.collection("events").doc(id);
    await updateEvent.update(data);

    return response.status(200).json("event updated");
  },
};
