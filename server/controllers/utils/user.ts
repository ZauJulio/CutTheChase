import {
  User,
  UserProfile,
  UserCredentials,
  createUserProfile,
} from "../../models/User";

import UserCredController from "../../database/schema/AuthUserSchema";
import UsersProfileController from "../UsersProfileController";

interface createNewUserProps {
  name: string;
  email: string;
  password: string;
}

export async function createNewUser(props: createNewUserProps): Promise<User> {
  const userProfile: UserProfile = createUserProfile(props.name);
  const userCred: UserCredentials = {
    email: props.email,
    password: props.password,
  };

  userCred["_id"] = String((await UserCredController.create(userCred))._id);
  delete userCred.password;

  await UsersProfileController.create(userCred._id, userProfile);

  const user: User = {
    cred: userCred,
    profile: userProfile,
  };
  
  return user;
}
