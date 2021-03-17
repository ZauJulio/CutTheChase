import React, { useState } from "react";
import { Marker } from "react-leaflet";

import iconMarker from "../../utils/MapMarkerIcon";
import { Event } from "../../services/interfaces";

import EventContainer from "./EventContainer";

interface EventMarkerProps {
  event: Event;
  setUseScroll?: Function;
}

function EventMarker({ event, setUseScroll }: EventMarkerProps) {
  const [showModal, setShowModal] = useState(false);

  function freeScroll() {
    setUseScroll(true);
    setShowModal(!showModal);
  }

  return (
    <>
      <Marker
        key={event.name}
        icon={iconMarker}
        position={[event.adress.lat, event.adress.lng]}
        eventHandlers={{
          click: (e) => {
            setShowModal(!showModal);
            {
              setUseScroll !== undefined && setUseScroll(false);
            }
          },
        }}
      ></Marker>
      {showModal && (
        <EventContainer
          event={event}
          callback={setUseScroll !== undefined ? freeScroll : null}
        />
      )}
    </>
  );
}

export default EventMarker;
