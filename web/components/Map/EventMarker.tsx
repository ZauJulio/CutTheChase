import React, { useState } from "react";
import { Marker} from "react-leaflet";

import iconMarker from "../../utils/MapMarkerIcon";
import { Event } from "../../services/interfaces";

import ModalEvent from "./ModalEvent";

interface EventMarkerProps {
  event: Event;
  setUseScroll: Function;
}

function EventMarker({event, setUseScroll}: EventMarkerProps) {
  const [showModal, setShowModal] = useState(false);

  function freeScroll() {
    setUseScroll(true)
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
            setUseScroll(false)
          },
        }}
      ></Marker>
      {showModal && <ModalEvent event={event} callback={freeScroll}/>}
    </>
  );
}

export default EventMarker;
