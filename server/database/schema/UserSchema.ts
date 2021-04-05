import { Preferences } from "./../../models/User";
import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  preferences: Yup.object().shape({
    favcategories: Yup.array().of(Yup.string()),
  }),
  role: Yup.string(),
  favorites: Yup.array().of(Yup.string()),
});

export async function UserDataValidate(data: object) {
  await UserSchema.validate(data, {
    abortEarly: false,
  });
}