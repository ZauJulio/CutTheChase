import React, { useState } from "react";
import { Marker} from "react-leaflet";

import iconMarker from "../../utils/MapMarkerIcon";
import { Event } from "../../services/interfaces";

import ModalEvent from "./ModalEvent";

interface EventMarkerProps {
  event: Event;
}

function EventMarker(props: EventMarkerProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Marker
        key={props.event.name}
        icon={iconMarker}
        position={[props.event.adress.lat, props.event.adress.lng]}
        eventHandlers={{
          click: (e) => {
            setShowModal(!showModal);
          },
        }}
      ></Marker>
      {showModal && <ModalEvent event={props.event} />}
    </>
  );
}

export default EventMarker;
