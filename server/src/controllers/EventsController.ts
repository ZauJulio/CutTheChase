import { Request, Response } from "express";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    return response.json("events");
  },

  async show(request: Request, response: Response) {
    return response.json("images");
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

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required().max(280),
      datetime: Yup.number().required(),
      duration: Yup.number().required(),
      site: Yup.string().required(),
      rating: Yup.number().required(),
      repeat: Yup.string().required(),
      promotor: Yup.string().required(),
      adress: Yup.array(
        Yup.object().shape({
          lat: Yup.number().required(),
          lng: Yup.number().required(),
          locality: Yup.string().required(),
        })
      ),
      assessments: Yup.array(
        Yup.object().shape({
          user: Yup.string().required(),
          evaluation: Yup.string().required(),
          rate: Yup.number().required(),
          showName: Yup.boolean().required(),
        })
      ),
      categorys: Yup.array().of(Yup.string()).required(),
      images: Yup.array().of(Yup.string()).required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    return response.status(201).json("event created");
  },
};
