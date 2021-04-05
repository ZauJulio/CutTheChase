import { UserCredentials, UserProfile } from "./../models/User";
import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "../models/User";
import { createNewUser } from "./utils/user";
import UsersProfileController from "./UsersProfileController";
import UserCredController from "../database/schema/AuthUserSchema";
import {
  httpMethodNotAllowed,
  httpNotFound,
  httpOk,
  httpServerError,
} from "./utils/httpHandler";

export default {
  async createProfile(req: NextApiRequest, res: NextApiResponse) {
    if (httpMethodNotAllowed(req, res)) return;

    try {
      const { _id } = req.body._id;
      const userCred = (await UserCredController.findOne({ _id })).toObject();

      if (!userCred) return httpNotFound(res);

      const userProfile = await UsersProfileController.get(_id);

      delete userCred.password;

      httpOk({ cred: userCred, profile: userProfile }, res);
    } catch (error) {
      httpServerError(error, res);
    }
  },
  async login(req: NextApiRequest, res: NextApiResponse) {
    if (httpMethodNotAllowed(req, res)) return;

    try {
      var user = {};
      const { name, email, password } = req.body;
      var userCred = await UserCredController.findOne({
        email,
        password,
      });

      if (!userCred)
        user = await createNewUser({
          name,
          email,
          password,
        });
      else {
        user["cred"] = userCred;
        user["profile"] = await UsersProfileController.get(userCred._id);
      }

      httpOk(user, res);
    } catch (error) {
      httpServerError(error, res);
    }
  },
  async update(req: NextApiRequest, res: NextApiResponse) {
    if (httpMethodNotAllowed(req, res)) return;

    try {
      const { _id, changes } = req.body;
      const changesCred: UserCredentials = changes.cred;
      const changesProfile: UserProfile = changes.profile;

      const userCred = (
        await UserCredController.collection.findOneAndUpdate(
          { _id },
          { $set: changesCred },
          { returnOriginal: false, upsert: true }
        )
      ).value;

      if (!userCred) return httpNotFound(res);

      const userProfile = await UsersProfileController.update(
        _id,
        changesProfile
      );

      delete userCred.password;

      httpOk({ cred: userCred, profile: userProfile }, res);
    } catch (error) {
      httpServerError(error, res);
    }
  },
  async delete(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") return res.status(405).end();
    try {
      const { _id } = req.body;
      await UserCredController.deleteOne({ _id });
      await UsersProfileController.delete(_id);

      httpOk({}, res);
    } catch (error) {
      httpServerError(error, res);
    }
  },
};
