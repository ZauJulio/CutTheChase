import mongoose from "../mongoose";

export function expiresTime() {
  const accessTokenExpires = new Date();
  accessTokenExpires.setSeconds(Number(process.env.EXPIRATION_TIME_SEC));

  return accessTokenExpires;
}

const UserSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    email: String,
    password: String,
    emailVerified: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const AccountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    providerType: String,
    providerId: String,
    providerAccountId: String,
    refreshToken: String,
    accessToken: String,
    accessTokenExpires: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const SessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accessToken: String,
    createdAt: { type: Date, default: Date.now },
    expires: {
      type: Date,
      expires: Number(process.env.EXPIRATION_TIME_SEC),
      default: expiresTime(),
    },
  },
  { versionKey: false }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
export const AccountModel =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
export const SessionModel =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
