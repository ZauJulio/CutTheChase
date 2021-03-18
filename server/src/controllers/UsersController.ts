import { Request, Response } from "express";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    return response.json("user");
  },

  async get(request: Request, response: Response) {
    const { email, password } = request.params;
    return response.json({email, password});
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      preferences,
      role,
      favorites,
    } = request.body;

    const data = {
      name,
      email,
      password,
      preferences,
      role,
      favorites,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      preferences: Yup.object().shape({
        favcategories: Yup.array().of(Yup.string()).required(),
      }),
      role: Yup.string().required(),
      favorites: Yup.array().of(Yup.string().required()).required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    return response.status(201).json("user created");
  },
};
