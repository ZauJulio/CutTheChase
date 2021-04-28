import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { useGeoLocation } from "react-sais";

import { AccordionCheckbox } from "../components/AccordionCheckbox";
import SearchBar from "../components/SearchBar";
import Aside from "../components/Aside";

import { SelectableCategory, Event, Position } from "../interfaces";
import { EventsProvider, Location } from "../contexts/EventsContext";
import { api, getCategories } from "../services/api";

import styles from "../styles/pages/Home.module.scss";
import { useSession } from "next-auth/client";
import { download } from "../services/storage";

interface HomeProps {
  location: Location;
  selectedCategories: SelectableCategory[];
}

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Index(props: HomeProps) {
  const [session, _] = useSession();

  const watchLocation = useGeoLocation({ timeout: 60000 });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [radius, setRadius] = useState<number>(9.6);

  const [categories, setCategories] = useState<string[]>();
  const [searchArgs, setSearchArgs] = useState<string[]>();

  useEffect(() => {
    if (
      location.lat !== watchLocation.lat ||
      location.lng !== watchLocation.lng
    ) {
      setLocation(watchLocation);
    }
  }, [watchLocation]);

  const { data } = useSWR(
    [categories, searchArgs, location, radius],
    async (u) => {
      const res = await api.get("/api/events/get", {
        params: {
          searchArgs,
          categories,
          radiusInM: radius * 1000,
          location,
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

  return (
    <div className={styles.eventsContainer}>
      <Head>
        <title>Cut The Chase | Dash</title>
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="description"
          content="Seu mapa de eventos direto ao ponto. Busque e promova diversos tipos de eventos mais próximos de você."
        />
      </Head>
      <Aside />
      <EventsProvider location={location}>
        <div className={styles.topBarsContainer}>
          <SearchBar onChange={(args: string[]) => setSearchArgs(args)} />
          <AccordionCheckbox
            buttonStyle={styles.expandOptions}
            title="Categoria"
            values={getCategories()}
            callback={(arr) => setCategories(arr)}
          />
        </div>
        <Map
          className={styles.mapContainer}
          initialPosition={location}
          initialZoomInKm={radius}
          events={data}
          onDrag={(position: Position) => setLocation(position)}
          onZoom={(radiusInKm: number) => setRadius(radiusInKm)}
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
