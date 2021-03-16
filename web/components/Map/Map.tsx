import React, { useContext } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import { Event } from "../../services/interfaces";
import MapMarker from "./EventMarker";
import { EventsContext } from "../../contexts/EventsContext";
import styles from "../../styles/components/Map.module.scss";
import "leaflet/dist/leaflet.css";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map() {
  const { location, updateLocation, events } = useContext(EventsContext);

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
      <MapContainer className={styles.mapContainer}>
        <ChangeView center={[location.lat, location.long]} zoom={14} />
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=R5r8yv38JwRrZl7m6DHJ"
        />

        {events.map((event: Event) => (
          <MapMarker event={event} />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
