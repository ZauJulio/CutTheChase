import { ObjectId } from "mongoose";
import { SessionModel } from "../../database/schema/AuthUserSchema";

export interface Session {
  _id?: ObjectId;
  userId: ObjectId;
  accessToken: string;
  createdAt?: Date;
  expires?: Date;
}

export default {
  async create(account: Session): Promise<Session> {
    return await SessionModel.create(account);
  },
  async get(accessToken: string): Promise<Session> {
    return await SessionModel.findOne({ accessToken });
  },
  async delete(accessToken: string): Promise<void> {
    await SessionModel.deleteOne({ accessToken });
  },
};
