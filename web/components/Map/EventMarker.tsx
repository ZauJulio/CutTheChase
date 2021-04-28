import React, { useState } from "react";
import { Marker } from "react-leaflet";

import iconMarker from "../../utils/MapMarkerIcon";
import { Event } from "../../interfaces";

import EventContainer from "./EventContainer";

interface EventMarkerProps {
  event: Event;
  showModal?: boolean;
  lock?: (use: boolean) => void;
  onClick?: (event: Event) => void;
}

export function EventMarker(props: EventMarkerProps) {
  const [showModal, setShowModal] = useState(false);

  function freeInteraction() {
    props.lock && props.lock(true);
    setShowModal(!showModal);
  }

  function lockIteration() {
    if ((props.showModal ?? true) && props.lock) {
      setShowModal(!showModal);
      props.lock(false);
    } else if (props.onClick) {
      props.onClick(props.event);
    }
  }

  return (
    <>
      <Marker
        key={props.event.name}
        icon={iconMarker}
        position={[props.event.address.lat, props.event.address.lng]}
        eventHandlers={{ click: (e) => lockIteration() }}
      ></Marker>
      {showModal && (
        <EventContainer event={props.event} callback={freeInteraction} />
      )}
    </>
  );
}
