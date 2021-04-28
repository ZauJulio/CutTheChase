import React, { useState } from "react";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import { Interaction, MapOnDrag, MapOnClick, MapOnZoom } from "./hooks";

import { Event } from "../../interfaces";
import { EventMarker } from "./EventMarker";

import { Position } from "../../interfaces";

import styles from "../../styles/components/Map.module.scss";
import "leaflet/dist/leaflet.css";

interface MapProps {
  className?: string;
  events?: Event[];
  position?: Position;
  showModal?: boolean;
  initialZoomInKm?: number;
  onZoom?: (radius: number) => void;

  initialPosition?: Position;
  onDrag?: (position: Position) => void;

  onClick?: (position: Position) => void;

  onClickMarker?: (event: Event) => void;
}

function Map(props: MapProps) {
  const [interaction, setInteraction] = useState(true);
  const [position, setPosition] = useState<Position>(
    props.initialPosition ?? props.position
  );

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    props.onClick({ lat, lng });
  }

  function handleMapDrag(_position: LatLng) {
    const { lat, lng } = _position;
    setPosition({ lat, lng });
    props.onDrag({ lat, lng });
  }

  return (
    <div className={styles.map}>
      <MapContainer
        center={[position.lat, position.lng]}
        className={`${styles.mapContainer} ${props.className}`}
        zoomControl={false}
        zoom={props.initialZoomInKm * 1.45 ?? 14}
      >
        <Interaction useScrollWheelZoom={interaction} useDrag={interaction} />

        {props.onClick && <MapOnClick onClick={handleMapClick} />}
        {props.onDrag && <MapOnDrag onDrag={handleMapDrag} />}
        {props.onZoom && <MapOnZoom onZoom={props.onZoom} />}

        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.MAPBOX_SECRET}`}
        />

        {props.events &&
          props.events.map((event: Event, index) => (
            <EventMarker
              event={event}
              key={index}
              lock={(props.showModal ?? true) && setInteraction}
              onClick={props.onClickMarker}
              showModal={props.showModal ?? true}
            />
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
