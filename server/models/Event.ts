import { User } from "./User";

export type Adress = {
  id: number;
  lat: number;
  lng: number;
  locality: string;
}

export type Image = {
  id: string;
  url: string;
}

export type Assessment = {
  id: number;
  user: string;
  evaluation: string;
  rate: number;
  showName: boolean;
}

export type Repeat = {
  id: number;
  frequency: string;
}

export type Event = {
  id: number;
  name: string;
  description: string;
  datetime: Date;
  duration: number;
  site: string;
  rating: number;
  repeat: Repeat;
  promotor: User;
  adress: Adress;
  assessments: Assessment[];
  images: Image[];
  categorys: string[];
}
