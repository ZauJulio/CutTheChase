import jwt from "jsonwebtoken";

import { UserAuthProfile } from "../Auth/_UsersController";
import SessionsController from "../Auth/_SessionsController";
import AccounstController, { UserAccount } from "../Auth/_AccountsController";

import { expiresTime } from "../../database/schema/AuthUserSchema";

interface getTokenResponse {
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: Date;
}

export function createToken(name: string, email: string): getTokenResponse {
  const accessToken = jwt.sign(
    { email, name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: Number(process.env.EXPIRATION_TIME_SEC) }
  );

  const accessTokenExpires = expiresTime();
  const refreshToken = jwt.sign(email, process.env.REFRESH_TOKEN_SECRET);

  return { accessToken, accessTokenExpires, refreshToken };
}

export async function refreshToken(userAuthProfile: UserAuthProfile) {
  const token = createToken(userAuthProfile.email, userAuthProfile.name);

  const userAuthNewToken = {
    refreshToken: token.refreshToken,
    accessToken: token.accessToken,
    accessTokenExpires: token.accessTokenExpires,
    updatedAt: new Date(),
  };

  await AccounstController.refreshToken(userAuthProfile._id, userAuthNewToken);

  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    accessTokenExpires: token.accessTokenExpires,
  };
}

export async function getToken(
  userAccount: UserAccount,
  userAuthProfile: UserAuthProfile
) {
  let newSession = false;

  // Check and get token validate
  let {
    accessToken: _accessToken,
    refreshToken: _refreshToken,
    accessTokenExpires: _accessTokenExpires,
  } = userAccount;

  const isValid = await isValidAccessToken(_accessToken);

  if (!isValid) {
    const token = await refreshToken(userAuthProfile);

    _accessToken = token.accessToken;
    _refreshToken = token.refreshToken;
    _accessTokenExpires = token.accessTokenExpires;

    newSession = true;
  }

  return {
    accessToken: _accessToken,
    refreshToken: _refreshToken,
    accessTokenExpires: _accessTokenExpires,
    newSession,
  };
}

export async function isValidAccessToken(accessToken: string) {
  const existingToken = await SessionsController.get(accessToken);

  if (Boolean(existingToken)) return true;
  return false;
}
