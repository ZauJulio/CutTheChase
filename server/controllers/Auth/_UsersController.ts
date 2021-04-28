import { UserModel } from "../../database/schema/AuthUserSchema";
import { ObjectId } from "mongoose";

export interface UserAuthProfile {
  _id?: ObjectId;
  name: string;
  image: string;
  email: string;
  password: string;
  emailVerified?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export default {
  async getById(_id: ObjectId | string): Promise<UserAuthProfile> {
    return await UserModel.findOne({ _id });
  },
  async getByCredentials(
    email: string,
    password: string
  ): Promise<UserAuthProfile> {
    return await UserModel.findOne({ email: email, password: password });
  },
  async delete(_id: string): Promise<void> {
    await UserModel.deleteOne({ _id });
  },
  async create(user: UserAuthProfile): Promise<ObjectId> {
    return (await UserModel.create(user))._id;
  },
  async update(_id: string, user: UserAuthProfile): Promise<UserAuthProfile> {
    return (
      await UserModel.collection.findOneAndUpdate(
        { _id },
        { $set: user },
        { returnOriginal: false, upsert: true }
      )
    ).value;
  },
};
