import UsersController from "../Auth/_UsersController";
import AccounstController from "../Auth/_AccountsController";
import SessionsController from "../Auth/_SessionsController";

import UsersAppProfileController from "../Profile";

import { createToken, getToken } from "./jwt";

export async function newUser(
  name: string,
  email: string,
  password: string
) {
  // Create authentication profile
  const userAuthProfileId = await UsersController.create({
    name,
    image: "",
    email,
    password,
  });

  // Create User application profile
  const userAppProfile = await UsersAppProfileController.create(
    String(userAuthProfileId)
  );

  // Create account tokens
  const { accessToken, refreshToken, accessTokenExpires } = createToken(
    name,
    email
  );

  // Create auth account
  const userAccountId = await AccounstController.create({
    userId: userAuthProfileId,
    providerType: "CutTheChase",
    providerId: "credentials",
    providerAccountId: process.env.CREDENTIALS_PROVIDER_ID,
    refreshToken: refreshToken,
    accessToken: accessToken,
    accessTokenExpires: accessTokenExpires,
  });

  // Create session
  const userSession = await SessionsController.create({
    user: {
      name: name,
      email: email,
      image: "",
    },
    accessToken: accessToken,
  });

  return {
    session: userSession,
    profile: userAppProfile,
    token: {
      provider: "credentials",
      type: "CutTheChase",
      id: String(userAccountId),
      acessToken: accessToken,
      accessTokenExpires: accessTokenExpires,
      refreshToken: refreshToken,
    },
  };
}
