import { UserProfile } from "./../models/User";
import firestore from "../database/firestore";
import { UserDataValidate } from "../database/schema/UserSchema";
import { DocumentSnapshot, DocumentData } from "@google-cloud/firestore";

export default {
  async index(): Promise<Array<[string, UserProfile]>> {
    const usersRef = await firestore.collection("users").get();
    let users = [];

    usersRef.forEach((doc) => {
      users.push([doc.id, doc.data().toObject()]);
    });

    return users;
  },

  async get(_id: string): Promise<UserProfile | undefined> {
    const userDoc = (await firestore.collection("users").doc(String(_id)).get()).data();

    if (userDoc) return await userDoc.toObject()
    else return undefined;
  },

  async delete(_id: string): Promise<void> {
    await firestore.collection("users").doc(_id).delete();
  },

  async create(_id: string, userProfile: UserProfile): Promise<void> {
    await UserDataValidate(userProfile);
    await firestore.collection("users").doc(_id).set(userProfile);
  },

  async update(_id: string, userProfile: UserProfile): Promise<UserProfile> {
    await UserDataValidate(userProfile);
    const userRef = firestore.collection("users").doc(_id);
    await userRef.update(userProfile);

    return (await userRef.get()).data().toObject();
  },
};
