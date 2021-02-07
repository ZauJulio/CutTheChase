import React from "react";
// import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import { BsFillHeartFill } from "react-icons/bs";

import mapIcon from "../utils/MapMarker";
import { Event } from "../services/api";
import { Evaluation } from "./Appraiser";
import { getFormatedData } from "../utils/DateTools";
import { getMiddleImage } from "../utils/ImageTools";
import "../styles/components/MapMarker.scss";
import { FaCar } from "react-icons/fa";

type PropTypeMapMarker = {
  isLoggedIn: boolean;
  event: Event;
};

function MapMarker(props: PropTypeMapMarker) {
  function getPopUp() {
    if (props.isLoggedIn) {
      return (
        <div className={`popup-container ${props.event.id}`}>
          <div className="top-container">
            <div className="top-icons">
              <BsFillHeartFill color="red" />
              <Evaluation rate={props.event.rating} />
            </div>
            <div className="visual-elements">
              <img
                src={getMiddleImage(props.event.photos)}
                alt="Images..."
              ></img>
              <text>2.8 KM - 15 Min</text>
              <a
                href={`https://www.google.com/maps/dir/Caic%C3%B3,+RN,+59300-000/${props.event.lat},${props.event.lng}/`}
                target="_blank"
                rel="noreferrer"
              >
                <FaCar color="red"></FaCar>
              </a>
            </div>
          </div>
          <div className="text-description">
            <p id="name">{props.event.name}</p>
            <p id="date">
              {getFormatedData(props.event.datetime, props.event.duration)}
            </p>
            <p id="location">{props.event.name}</p>
            <p id="description">{props.event.description}</p>
            <p id="site">{props.event.site}</p>
          </div>
          <div className="button-container">
            <button className="rating" type="button">
              Avaliar
            </button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  return (
    <Marker
      key={props.event.name}
      icon={mapIcon}
      position={[props.event.lat, props.event.lng]}
    >
      <Popup
        closeButton={false}
        minWidth={650}
        maxWidth={650}
        className="map-popup"
      >
        {getPopUp()}
      </Popup>
    </Marker>
  );
}

export default MapMarker;
