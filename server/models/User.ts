export interface Preferences {
  favcategories: string[];
}

export interface UserProfile {
  preferences: Preferences;
  role: string;
  favorites: string[];
}

export interface UserCredentials {
  _id?: string;
  email: string;
  password: string;
}

export interface User {
  cred: UserCredentials;
  profile: UserProfile;
}

export function createEmptyUserProfile(): UserProfile {
  return {
    role: "user",
    favorites: [""],
    preferences: {
      favcategories: [""],
    },
  };
}
