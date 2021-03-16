import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Head from "next/head";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

import styles from "../styles/pages/Home.module.scss";
import { GetServerSideProps } from "next";
import { SelectableCategory } from "../services/interfaces";
import { EventsProvider, Location } from "../contexts/EventsContext";

interface HomeProps {
  location: Location;
  selectedCategories: SelectableCategory[];
}

export default function Index(props: HomeProps) {
  const Map = dynamic(() => import("../components/Map/Map"), { ssr: false });

  return (
    <div className={styles.eventsContainer}>
      <Head>
        <title>Cut The Chase | Eventos</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <EventsProvider location={props.location}>
        <div className={styles.topBarsContainer}>
          <SearchBar />
          <CategoryFilter />
        </div>
        <Map />
      </EventsProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { location, categories } = ctx.req.cookies;

  return {
    props: {
      location: (location !== undefined && JSON.parse(location)) || {
        lat: 0,
        long: 0,
        timestamp: 0,
      },
      categories:
        (categories !== undefined && JSON.parse(categories)) ||
        null,
    },
  };
};
