import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  preferences: Yup.object().shape({
    favcategories: Yup.array().of(Yup.string()).required(),
  }),
  role: Yup.string().required(),
  favorites: Yup.array().of(Yup.string().required()).required(),
});

export async function UserDataValidate(data: object) {
  await UserSchema.validate(data, {
    abortEarly: false,
  });
}