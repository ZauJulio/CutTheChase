import React, { useState } from "react";
import { LeafletMouseEvent } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { Event } from "../../services/interfaces";
import iconMarker from "../../utils/NewMapMarkerIcon";
import MapMarker from "./EventMarker";

import { Position } from "../../interfaces";

import "leaflet/dist/leaflet.css";
import styles from "../../styles/components/Map.module.scss";

interface ChangeViewProps {
  useScrollWheelZoom: boolean;
}

function ChangeView(props: ChangeViewProps) {
  const map = useMap();

  map.setView(map.getCenter(), map.getZoom());

  if (props.useScrollWheelZoom) map.scrollWheelZoom.enable();
  else map.scrollWheelZoom.disable();

  return null;
}

interface MapEventsProps {
  onClick: (event: LeafletMouseEvent) => void;
}

function MapEvents(props: MapEventsProps) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e: LeafletMouseEvent) {
      setPosition(e.latlng);
      props.onClick(e);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={iconMarker} />
  );
}

interface MapProps {
  className?: string;
  lat: number;
  lng: number;
  events?: Event[];
  onClickGetLatLng?: (position: Position) => void;
}

function Map(props: MapProps) {
  const [useScroll, setUseScroll] = useState(true);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    props.onClickGetLatLng && props.onClickGetLatLng({ lat, lng });
  }

  return (
    <div className={styles.map}>
      <MapContainer
        className={`${styles.mapContainer} ${props.className}`}
        center={[props.lat, props.lng]}
        zoom={14}
        zoomControl={false}
      >
        <ChangeView useScrollWheelZoom={useScroll} />
        {props.onClickGetLatLng && <MapEvents onClick={handleMapClick} />}
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.MAPBOX_SECRET}`}
        />

        {props.events &&
          props.events.map((event: Event, index) => (
            <MapMarker event={event} key={index} setUseScroll={setUseScroll} />
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
