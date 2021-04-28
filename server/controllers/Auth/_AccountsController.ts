import { ObjectId } from "mongoose";
import { AccountModel } from "../../database/schema/AuthUserSchema";

export interface UserAccount {
  _id?: ObjectId;
  userId: ObjectId;
  providerType: string;
  providerId: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RefreshToken {
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: Date;
  updatedAt: Date;
}

export default {
  async create(account: UserAccount): Promise<ObjectId> {
    return (await AccountModel.create(account))._id;
  },
  async get(_id: ObjectId): Promise<UserAccount> {
    return await AccountModel.findOne({ userId: _id });
  },
  async getByAccessToken(accessToken: string): Promise<UserAccount> {
    return await AccountModel.findOne({ accessToken });
  },
  async getByProviderAccountId(providerAccountId: string): Promise<UserAccount> {
    return await AccountModel.findOne({ providerAccountId });
  },
  async update(_id: ObjectId, account: UserAccount): Promise<UserAccount> {
    return (
      await AccountModel.collection.findOneAndUpdate(
        { _id },
        { $set: account },
        { returnOriginal: false, upsert: true }
      )
    ).value;
  },
  async refreshToken(_id: ObjectId, account: RefreshToken): Promise<UserAccount> {
    return (
      await AccountModel.collection.findOneAndUpdate(
        { userId: _id },
        { $set: account },
        { returnOriginal: false, upsert: true }
      )
    ).value;
  },
  async delete(_id: ObjectId): Promise<void> {
    await AccountModel.deleteOne({ _id });
  },
};
