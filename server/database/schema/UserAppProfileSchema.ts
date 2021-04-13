import * as Yup from "yup";

export const UserAppProfileSchema = Yup.object().shape({
  preferences: Yup.object().shape({
    favcategories: Yup.array().of(Yup.string()),
  }),
  role: Yup.string(),
  favorites: Yup.array().of(Yup.string()),
});

export async function UserAppProfileDataValidate(data: object) {
  await UserAppProfileSchema.validate(data, {
    abortEarly: false,
  });
}