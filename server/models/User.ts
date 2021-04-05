export interface Preferences {
  favcategories: string[];
}

export interface UserProfile {
  name: string;
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

export function createUserProfile(name: string): UserProfile {
  const profile: UserProfile = {
    name,
    role: "user",
    favorites: [""],
    preferences: {
      favcategories: [""],
    },
  };

  return profile;
}
