import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useGeoLocation } from "react-sais";

import Aside from "../components/Aside";
import SearchBar from "../components/SearchBar";
import EventForm from "../components/EventForm";
import { EventsList } from "../components/EventsList";

import { EventsProvider } from "../contexts/EventsContext";

import styles from "../styles/pages/Events.module.scss";
import { Position, Event } from "../interfaces";
import { AccordionCheckbox } from "../components/AccordionCheckbox";
import { api, getCategories } from "../services/api";
import useSWR from "swr";
import { download } from "../services/storage";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function events() {
  const watchLocation = useGeoLocation({ timeout: 60000 });
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
  const [clickLocation, setClickLocation] = useState({ lat: 0, lng: 0 });
  const [radius, setRadius] = useState(9.6);

  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [categories, setCategories] = useState(getCategories());
  const [searchArgs, setSearchArgs] = useState<string[]>();

  const { data } = useSWR(
    [categories, searchArgs, mapPosition, radius],
    async (u) => {
      const res = await api.get("/api/events/get", {
        params: {
          searchArgs,
          categories,
          radiusInM: radius * 1000,
          location: mapPosition,
        },
      });

      const events: Event[] = res.data;

      if (events.length > 0) {
        for (var i in events) {
          events[i].images = await download(events[i].images);
        }
      }

      return events;
    }
  );

  useEffect(() => {
    if (
      mapPosition.lat !== watchLocation.lat ||
      mapPosition.lng !== watchLocation.lng
    ) {
      setMapPosition(watchLocation);
    }
  }, [watchLocation]);


  const handlerSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    console.log(event);
  }

  const handlerEventGeoLocation = (position: Position) => {
    setClickLocation(position);
  };

  return (
    <>
      <Aside />
      <EventsProvider location={{ lat: 0, lng: 0 }}>
        <div className={styles.eventsPageContainer}>
          <div className={styles.tittlePage}>
            <h1>Eventos</h1>
          </div>
          <div className={styles.topBarContainer}>
            <AccordionCheckbox
              buttonStyle={styles.expandOptions}
              title="Categoria"
              values={categories}
              callback={(arr) => setCategories(arr)}
            />
            <SearchBar
              className={styles.searchBar}
              onChange={(args: string[]) => setSearchArgs(args)}
            />
          </div>

          <div className={styles.eventsContainer}>
            <EventForm
              className={styles.eventForm}
              geoLocation={clickLocation}
            />
            <div className={styles.eventsListContainer}>
              <Map
                className={styles.mapContainer}
                initialPosition={mapPosition}
                initialZoomInKm={radius}
                events={data}
                showModal={false}
                onClick={handlerEventGeoLocation}
                onDrag={(position: Position) => setMapPosition(position)}
                onZoom={(radiusInKm: number) => setRadius(radiusInKm)}
                onClickMarker={handlerSelectEvent}
              />
              <h1>Lista de Eventos</h1>
              <EventsList className={styles.eventsList} />
            </div>
          </div>
        </div>
      </EventsProvider>
    </>
  );
}
