export interface Position {
  lat: number;
  lng: number;
}

export interface Address {
  id: number;
  lat: number;
  lng: number;
  locality: string;
}

export interface Assessment {
  id: number;
  user: string;
  evaluation: string;
  rate: number;
  showName: boolean;
}

export interface Favorite {
  id: number;
  event: number;
}

export interface Role {
  id: number;
  name: string;
}

export interface Preferences {
  id: number;
  favcategories: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  preferences: Preferences;
  role: Role;
  favorites: Favorite[];
}

export interface Repeat {
  id: number;
  frequency: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  datetime: Date;
  duration: number;
  site: string;
  rating: number;
  repeat: Repeat;
  promotor: User;
  address: Address;
  assessments: Assessment[];
  images: string[];
  category: string[];
}

export interface SelectableCategory {
  id: number;
  name: string;
  selected: boolean;
}
