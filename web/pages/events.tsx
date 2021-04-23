import React, { useState } from "react";
import dynamic from "next/dynamic";

import { useGeoLocation } from "react-sais";

import Aside from "../components/Aside";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import EventForm from "../components/EventForm";
import { EventsList } from "../components/EventsList";

import { EventsProvider } from "../contexts/EventsContext";

import styles from "../styles/pages/Events.module.scss";
import { Position } from "../interfaces";

export default function events() {
  const Map = dynamic(() => import("../components/Map"), { ssr: false });

  const location = useGeoLocation();
  const [clickLocation, setClickLocation] = useState(location);

  const handlerEventGeoLocation = (position: Position) => {
    setClickLocation(position)
  }

  return (
    <>
      <Aside />
      <EventsProvider location={location}>
        <div className={styles.eventsPageContainer}>
          <div className={styles.tittlePage}>
            <h1>Eventos</h1>
          </div>
          <div className={styles.topBarContainer}>
            <CategoryFilter className={styles.categoryFilter} />
            <SearchBar className={styles.searchBar} />
          </div>

          <div className={styles.eventsContainer}>
            <EventForm
              className={styles.eventForm}
              geoLocation={clickLocation}
            />
            <div className={styles.eventsListContainer}>
              <Map
                className={styles.mapContainer}
                lat={location.lat}
                lng={location.lng}
                onClickGetLatLng={handlerEventGeoLocation}
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
