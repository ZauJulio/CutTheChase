import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { Event } from "../../services/interfaces";
import MapMarker from "./EventMarker";
import { EventsContext } from "../../contexts/EventsContext";
import styles from "../../styles/components/Map.module.scss";
import "leaflet/dist/leaflet.css";

interface ChangeViewProps {
  useScrollWheelZoom: boolean;
}

function ChangeView({ useScrollWheelZoom }: ChangeViewProps) {
  const map = useMap();

  map.setView(map.getCenter(), map.getZoom());

  if (useScrollWheelZoom) {
    map.scrollWheelZoom.enable();
  } else {
    map.scrollWheelZoom.disable();
  }

  return null;
}

function Map() {
  const { location, updateLocation, events } = useContext(EventsContext);
  const [useScroll, setUseScroll] = useState(true);

  if ((Date.now() - location.timestamp) / 1000 > 120) {
    navigator.geolocation.getCurrentPosition((position) => {
      updateLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        timestamp: position.timestamp,
      });
    });
  }

  return (
    <div className={styles.map}>
      <MapContainer
        className={styles.mapContainer}
        center={[location.lat, location.long]}
        zoom={14}
        zoomControl={false}
      >
        <ChangeView useScrollWheelZoom={useScroll} />
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.MAPBOX_SECRET}`}
        />

        {events.map((event: Event, index) => (
          <MapMarker event={event} key={index} setUseScroll={setUseScroll} />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
