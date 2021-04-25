import AccounstController from "./_AccountsController";
import SessionsController from "./_SessionsController";
import UsersController from "./_UsersController";

import { createToken, getToken, isValidAccessToken } from "../utils/jwt";

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

export async function unauthorize(userAuthProfile: UserAuthProfile) {
  const userAccount = await AccounstController.get(userAuthProfile._id);

  if (await isValidAccessToken(userAccount.accessToken)) {
    await SessionsController.delete(userAccount.accessToken);
  }
}
