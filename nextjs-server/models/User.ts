import { Category } from "./Event";

export type Favorite = {
  id: number;
  event: number;
}

export type Role = {
  id: number;
  name: string;
}

export type Preferences = {
  id: number;
  favcategories: Category[];
}

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  preferences: Preferences;
  role: Role;
  favorites: Favorite[];
}
