import React, { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SelectedCategory } from "../services/interfaces";

export interface Location {
  lat: number;
  long: number;
  timestamp: number;
}

interface EventsContextData {
  location: Location;
  selectedCategories: SelectedCategory[];
  updateLocation;
}

interface EventsProviderProps {
  children: ReactNode;
  location: Location;
}

export const EventsContext = createContext({} as EventsContextData);

export function EventsProvider({ children, ...rest }: EventsProviderProps) {
  const [location, setLocation] = useState<Location>(rest.location);
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([
    { id: 1, name: "Música", selected: false },
    { id: 2, name: "Artes Visuais", selected: false },
    { id: 3, name: "Festival", selected: false },
    { id: 4, name: "Dança", selected: false },
    { id: 5, name: "Sebo", selected: false },
    { id: 6, name: "Infantil", selected: false },
  ]);

  function updateLocation(currentLocation: Location) {
    setLocation(currentLocation);
  }

  useEffect(() => {
    Cookies.set("location", JSON.stringify(location));
    Cookies.set("selectedCategories", JSON.stringify(selectedCategories));
  }, [location, selectedCategories]);

  return (
    <EventsContext.Provider
      value={{
        location,
        selectedCategories,
        updateLocation,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
