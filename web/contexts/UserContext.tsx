import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { Favorite, Preferences, Role } from "../services/interfaces";
import { login } from "../services/api";
import { User } from "../services/interfaces";
import { EventsContext } from "./EventsContext";

interface UserContextData {
  name: string;
  role: Role;
  preferences: Preferences;
  favorites: Favorite[];
  login: Function;
}

interface UserProviderProps {
  children: ReactNode;
  user: User;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children, ...rest }: UserProviderProps) {
  const [user, setUser] = useState<User>(rest.user);
  const { categories, updateCategories } = useContext(EventsContext);

  function loginUser(email: string, password?: string) {
    const { status, user } = login(email, password);

    if (status === 200) {
      setUser(user);
      localStorage.setItem(
        "CutTheChase",
        JSON.stringify({
          user: user,
          timestamp: Date.now(),
        })
      );
    }
  }

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem("CutTheChase"));

    if (credentials !== null) {
      loginUser(credentials.user.email, credentials.user.password);
    } else {
      console.log("User not detected")
    }
  }, []);

  useEffect(() => {
    let selectedCategories = [];

    for (var i in categories) {
      if (categories[i].name === user.preferences.favcategories[i].name) {
        selectedCategories.push(categories[i]);
      }
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        name: user.name,
        role: user.role,
        preferences: user.preferences,
        favorites: user.favorites,
        login: loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
