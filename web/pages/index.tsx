import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Aside from "../components/Aside";

import { SelectableCategory } from "../services/interfaces";
import { EventsProvider, Location } from "../contexts/EventsContext";
import styles from "../styles/pages/Home.module.scss";
import { useGeoLocation } from "react-sais";
import { getEvents, getSelectableCategories } from "../services/api";
import { Event } from "../services/interfaces";

interface HomeProps {
  location: Location;
  selectedCategories: SelectableCategory[];
}

export default function Index(props: HomeProps) {
  const Map = dynamic(() => import("../components/Map"), { ssr: false });
  const location = useGeoLocation({ timeout: 60000 });

  function getSelectedCategories() {
    return getSelectableCategories()
      .map((category) => {
        if (category.selected) {
          return category.name;
        }
      })
      .filter((e) => e != null);
  }

  const [events, setEvents] = useState<Event[]>(
    getEvents([""], getSelectedCategories(), {
      lat: location.lat,
      lng: location.lng,
    })
  );

  return (
    <div className={styles.eventsContainer}>
      <Head>
        <title>Cut The Chase | Eventos</title>
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="description"
          content="Seu mapa de eventos direto ao ponto. Busque e promova diversos tipos de eventos mais próximos de você."
        />
      </Head>
      <Aside />
      <EventsProvider location={location}>
        <div className={styles.topBarsContainer}>
          <SearchBar />
          <CategoryFilter />
        </div>
        <Map
          className={styles.mapContainer}
          lat={location.lat}
          lng={location.lng}
          events={events}
        />
      </EventsProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { categories } = ctx.req.cookies;

  return {
    props: {
      categories: (categories !== undefined && JSON.parse(categories)) || null,
    },
  };
};
