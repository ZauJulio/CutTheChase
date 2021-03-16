import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { BsArrowReturnLeft } from "react-icons/bs";

import useWindowSize from "../../utils/useWindowSize";
import iconMarker from "../../utils/MapMarkerIcon";
import { Event } from "../../services/interfaces";

import ModalEvent from "./ModalEvent";

import styles from "../../styles/components/Modal.module.scss";

interface EventMarkerProps {
  event: Event;
}

function EventMarker(props: EventMarkerProps) {
  const size = useWindowSize();
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
      >
        {size.width > 720 && (
          <Popup closeButton={false} minWidth={555}>
            <ModalEvent event={props.event} />
          </Popup>
        )}
      </Marker>
      {size.width < 720 && showModal && (
        <div className={styles.modal}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <BsArrowReturnLeft />
          </button>
          <ModalEvent event={props.event} />
        </div>
      )}
    </>
  );
}

export default EventMarker;
