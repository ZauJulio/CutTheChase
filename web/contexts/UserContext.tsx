// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import Cookies from "js-cookie";
// import { Favorite, Preferences, Role } from "../services/interfaces";
// import { login } from "../services/api";
// import { EventsContext } from "./EventsContext";
// import { useSession } from "next-auth/client";
// import { User } from "next-auth";

// export type WithAdditionalParams<T extends Record<string, any>> = T & Record<string, unknown>;

// export interface Profile {
//   preferences: Preferences;
//   role: string;
//   favorites: string[];
// }

// export interface UserFully extends User {
//   profile: Profile;
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// export interface UserContextData extends UserFully {}

// export const UserContext = createContext({} as UserContextData);

// export function UserProvider({ children }: UserProviderProps) {
//   const { categories, updateCategories } = useContext(EventsContext);

//   const [session, loading] = useSession();
//   const [user, setUser] = useState<WithAdditionalParams<User>>(session.user);
//   const [profile, updateProfile] = useState<WithAdditionalParams<Profile>>(
//     session.user.profile
//   );

//   console.log(session);
//   session.user;

//   useEffect(() => {
//     let selectedCategories = [];

//     for (var i in categories) {
//       if (categories[i].name === profile.preferences.favcategories[i].name) {
//         selectedCategories.push(categories[i]);
//       }
//     }
//   }, [user]);

//   return (
//     <UserContext.Provider
//       value={{
//         name: user.name,
//         role: user.role,
//         preferences: user.preferences,
//         favorites: user.favorites,
//         login: loginUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }
