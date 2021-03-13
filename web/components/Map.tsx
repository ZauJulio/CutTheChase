import React, { useContext, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import MapMarker from "./MapMarker";
import iconMarker from "../utils/MapMarkerIcon";
import { EventsContext } from "../contexts/EventsContext";
import styles from "../styles/components/Map.module.scss";
import "leaflet/dist/leaflet.css";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map() {
  const { location, updateLocation, selectedCategories } = useContext(
    EventsContext
  );

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
          url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=R5r8yv38JwRrZl7m6DHJ"
        />
          {/* {getEvents(searchArgs, getCategorysSelected()).map((event) => {
            return <MapMarker event={event} />;
          })} */}
        <Marker icon={iconMarker} position={[-6.4625567, -37.0962424]}>
          <Popup>Example map marker</Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}

export default Map;
