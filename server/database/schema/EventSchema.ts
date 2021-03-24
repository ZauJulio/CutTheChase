import * as Yup from "yup";

export const EventSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required().max(280),
  datetime: Yup.number().required(),
  duration: Yup.number().required(),
  site: Yup.string().required(),
  repeat: Yup.string().required().max(1),
  promotor: Yup.string().required(),
  adress: Yup.array(
    Yup.object().shape({
      lat: Yup.number().required(),
      lng: Yup.number().required(),
      locality: Yup.string().required(),
    })
    ),
  geohash: Yup.string().required(),
  assessments: Yup.array(
    Yup.object().shape({
      user: Yup.string().required(),
      evaluation: Yup.string().required(),
      rate: Yup.number().required(),
      showName: Yup.boolean().required(),
    })
  ),
  categorys: Yup.array().of(Yup.string()).required(),
  images: Yup.array().of(Yup.string()).required(),
});

export async function EventDataValidate(data: object) {
  await EventSchema.validate(data, {
    abortEarly: false,
  });
}
