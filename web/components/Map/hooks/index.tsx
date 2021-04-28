import { LatLng, LeafletEventHandlerFn, LeafletMouseEvent } from "leaflet";
import React, { useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import iconMarker from "../../../utils/NewMapMarkerIcon";

interface InteractionProps {
  useScrollWheelZoom?: boolean;
  useDrag?: boolean;
}

export function Interaction(props: InteractionProps) {
  const map = useMap();

  map.setView(map.getCenter(), map.getZoom());

  if (props.useScrollWheelZoom) map.scrollWheelZoom.enable();
  else map.scrollWheelZoom.disable();

  if (props.useScrollWheelZoom) map.dragging.enable();
  else map.dragging.disable();

  return null;
}

interface MapOnClickProps {
  onClick: (event: LeafletMouseEvent) => void;
}

export function MapOnClick(props: MapOnClickProps) {
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

interface MapOnDragProps {
  onDrag: (position: LatLng) => void;
}

export function MapOnDrag(props: MapOnDragProps) {
  const map = useMap();

  useMapEvents({
    dragend() {
      props.onDrag(map.getCenter());
    },
  });

  return null;
}

interface MapOnZoomProps {
  onZoom: (radius: number) => void;
}

export function MapOnZoom(props: MapOnZoomProps) {
  const map = useMap();

  useMapEvents({
    zoomend() {
      const mapBoundNorthEast = map.getBounds().getNorthEast();
      const mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
      props.onZoom(mapDistance / 1000);
    },
  });

  return null;
}
