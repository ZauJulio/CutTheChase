import AccounstController from "./_AccountsController";
import SessionsController from "./_SessionsController";
import UsersController from "./_UsersController";

import {
  createToken,
  getSessionToken,
  getToken,
  isValidAccessToken,
} from "../utils/jwt";

import UsersAppProfileController from "../Profile";

import { UserAuthProfile } from "../Auth/_UsersController";

export async function newUser(name: string, email: string, password: string) {
  // Create authentication profile
  const userId = await UsersController.create({
    name,
    image: "",
    email,
    password,
  });

  // Create session
  const { accessToken, refreshToken, accessTokenExpires } = createToken(
    name,
    email
  );
  await SessionsController.create({ userId, accessToken: accessToken });

  // Create auth account
  await AccounstController.create({
    userId,
    providerType: "CutTheChase",
    providerId: "credentials",
    providerAccountId: process.env.CREDENTIALS_PROVIDER_ID,
    refreshToken,
    accessToken,
    accessTokenExpires,
  });

  // Create User application profile
  await UsersAppProfileController.create(String(userId));

  return {
    id: String(userId),
    name,
    email,
    image: "",
    accessToken,
    refreshToken,
    accessTokenExpires,
  };
}

export async function authorize(userAuthProfile: UserAuthProfile) {
  const userId = userAuthProfile._id;
  const userAccount = await AccounstController.get(userId);

  // Check and get token validate
  let {
    accessToken,
    refreshToken,
    accessTokenExpires,
    newSession,
  } = await getToken(userAccount, userAuthProfile);

  if (newSession) await SessionsController.create({ userId, accessToken });

  return {
    id: String(userId),
    name: userAuthProfile.name,
    email: userAuthProfile.email,
    image: userAuthProfile.image,
    accessToken,
    refreshToken,
    accessTokenExpires,
  };
}

export async function externalAuthorization(providerAccountId: string) {
  const userAccount = await AccounstController.getByProviderAccountId(
    providerAccountId
  );

  if (!userAccount) return null;

  const userAccountId = userAccount.userId.toString();
  const userAuthProfile = await UsersController.getById(userAccountId);

  if (!userAuthProfile) return null;

  let {
    accessToken,
    refreshToken,
    accessTokenExpires,
    newSession,
  } = await getSessionToken(userAccount, userAuthProfile);

  if (newSession)
    await SessionsController.create({
      userId: userAccount.userId,
      accessToken,
    });

  return {
    accessToken,
    refreshToken,
    accessTokenExpires,
  };
}

export async function unauthorize(id: string, accessToken: string) {
  const session = await SessionsController.get(accessToken);
  const userAuthProfile = await UsersController.getById(session.userId);
  const sessionUserId = session.userId.toString();

  if (!userAuthProfile || id !== sessionUserId) return false;

  if (await isValidAccessToken(session.accessToken)) {
    await SessionsController.delete(session.accessToken);
  }

  return true;
}
