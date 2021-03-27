import React, { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SelectableCategory } from "../services/interfaces";
import { getEvents, getSelectableCategories } from "../services/api";
import { Event } from "../services/interfaces";

export interface Location {
  lat: number;
  long: number;
  timestamp: number;
}

interface EventsContextData {
  location: Location;
  categories: SelectableCategory[];
  events: Event[];
  updateLocation: Function;
  updateCategories: Function;
  updateSearchArgs: Function;
}

interface EventsProviderProps {
  children: ReactNode;
  location: Location;
}

export const EventsContext = createContext({} as EventsContextData);

export function EventsProvider({ children, ...rest }: EventsProviderProps) {
  const [location, setLocation] = useState<Location>(rest.location);
  const [searchArgs, setSearchArgs] = useState<string[]>([""]);
  const [categories, setCategories] = useState<SelectableCategory[]>(
    getSelectableCategories()
  );
  const [events, setEvents] = useState<Event[]>(
    getEvents(searchArgs, getSelectedCategories(), {
      lat: location.lat,
      long: location.long,
    })
  );

  function getSelectedCategories() {
    return categories
      .map((category) => {
        if (category.selected) {
          return category.name;
        }
      })
      .filter((e) => e != null);
  }

  function updateLocation(currentLocation: Location) {
    setLocation(currentLocation);
  }

  function updateCategories(selectedCategories: SelectableCategory[]) {
    setCategories(selectedCategories);
  }

  function updateSearchArgs(e: any) {
    setSearchArgs(e);
  }

  useEffect(() => {
    Cookies.set("location", JSON.stringify(location));
    Cookies.set("categories", JSON.stringify(getSelectedCategories()));

    setEvents(
      getEvents(searchArgs, getSelectedCategories(), {
        lat: location.lat,
        long: location.long,
      })
    );
  }, [location, categories]);

  return (
    <EventsContext.Provider
      value={{
        location,
        categories,
        events,
        updateLocation,
        updateCategories,
        updateSearchArgs,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
