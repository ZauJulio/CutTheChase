import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getCategories } from "../services/api";

export interface Location {
  lat: number;
  lng: number;
}

interface EventsContextData {
  location: Location;
}

interface EventsProviderProps {
  children: ReactNode;
  location: Location;
}

export const EventsContext = createContext({} as EventsContextData);

export function EventsProvider({ children, ...rest }: EventsProviderProps) {
  const [location, setLocation] = useState<Location>(rest.location);
  const [searchArgs, setSearchArgs] = useState<string[]>([""]);
  const [categories, setCategories] = useState<string[]>(
    getCategories()
  );


  return (
    <EventsContext.Provider
      value={{
        location,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
