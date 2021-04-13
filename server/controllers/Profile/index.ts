import firestore from "../../database/firestore";
import { UserAppProfileDataValidate } from "../../database/schema/UserAppProfileSchema";
import { UserProfile, createEmptyUserProfile } from "../../models/User";

export default {
  async index(): Promise<Array<[string, UserProfile]>> {
    const usersRef = await firestore.collection("users").get();
    let users = [];

    usersRef.forEach((doc) => {
      users.push([doc.id, doc.data().toObject()]);
    });

    return users;
  },

  async get(_id: string): Promise<object | undefined> {
    const userDoc = (await firestore.collection("users").doc(_id).get()).data();

    if (userDoc) return userDoc;
    else return undefined;
  },

  async delete(_id: string): Promise<void> {
    await firestore.collection("users").doc(_id).delete();
  },

  async create(_id: string): Promise<UserProfile> {
    const emptyUserAppProfile: UserProfile = createEmptyUserProfile();

    await UserAppProfileDataValidate(emptyUserAppProfile);
    await firestore.collection("users").doc(String(_id)).set(emptyUserAppProfile);

    return emptyUserAppProfile;
  },

  async update(_id: string, userProfile: UserProfile): Promise<UserProfile> {
    await UserAppProfileDataValidate(userProfile);
    const userRef = firestore.collection("users").doc(_id);
    await userRef.update(userProfile);

    return (await userRef.get()).data().toObject();
  },
};
