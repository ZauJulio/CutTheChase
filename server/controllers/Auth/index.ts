import type { NextApiRequest, NextApiResponse } from "next";

import { externalAuthorization, newUser } from "./utils";
import UsersController from "./_UsersController";
import { UserCredentials, UserProfile } from "../../models/User";

import { authorize, unauthorize } from "./utils";
import http from "../utils/httpHandler";

export default {
  async login(req: NextApiRequest, res: NextApiResponse) {
    if (http.MethodNotAllowed(req, res, "GET")) return;
    const [email, password] = [
      String(req.query.email),
      String(req.query.password),
    ];

    try {
      // Check that the auth profile exists and get it
      const userAuthProfile = await UsersController.getByCredentials(
        email,
        password
      );
      if (!userAuthProfile) return http.Unauthorized(res);

      const session = await authorize(userAuthProfile);

      return http.Ok(session, res);
    } catch (error) {
      http.ServerError(error, res);
    }
  },
  async signIn(req: NextApiRequest, res: NextApiResponse) {
    if (http.MethodNotAllowed(req, res, "POST")) return;
    const { name, email, password } = req.body;

    try {
      // Check that the account already exists
      if (await UsersController.getByCredentials(email, password))
        return http.Forbidden(res);

      http.Ok(await newUser(name, email, password), res);
    } catch (error) {
      http.ServerError(error, res);
    }
  },
  async externalLogin(req: NextApiRequest, res: NextApiResponse) {
    if (http.MethodNotAllowed(req, res, "GET")) return;
    const [providerAccountId] = [String(req.query.providerAccountId)];

    try {
      const session = await externalAuthorization(providerAccountId);

      if (session) return http.Ok(session, res);
      else return http.Unauthorized(res);
    } catch (error) {
      http.ServerError(error, res);
    }
  },
  async signOut(req: NextApiRequest, res: NextApiResponse) {
    if (http.MethodNotAllowed(req, res, "GET")) return;
    const [id, accessToken] = [
      String(req.query.userId),
      String(req.query.accessToken),
    ];

    try {
      const unauthorized = await unauthorize(id, accessToken);

      if (unauthorized) return http.Ok({}, res);
      else return http.Unauthorized(res);
    } catch (error) {
      http.ServerError(error, res);
    }
  },
  async update(req: NextApiRequest, res: NextApiResponse) {
    if (http.MethodNotAllowed(req, res, "POST")) return;
    const { _id, changes } = req.body;
    const changesCred: UserCredentials = changes.cred;
    const changesProfile: UserProfile = changes.profile;

    try {
      http.Ok({}, res);
    } catch (error) {
      http.ServerError(error, res);
    }
  },
  async delete(req: NextApiRequest, res: NextApiResponse) {
    if (http.MethodNotAllowed(req, res, "DELETE")) return;
    const { _id } = req.body;

    try {
      http.Ok({}, res);
    } catch (error) {
      http.ServerError(error, res);
    }
  },
};
