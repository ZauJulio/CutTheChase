import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

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
  const [favorite, setFavorite] = useState<boolean>(props.event.favorite);

  function openPhotosGallery(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    console.log("openPhotosGallery");
    console.log(e);
  }

  function openAssessments(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    console.log("openAssessments");
    console.log(e);
  }

  function selectFavorite(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log("selectFavorite");
    console.log(e);
    setFavorite(!favorite);
  }

  function getPopUp() {
    if (props.isLoggedIn) {
      return (
        <div className={`popup-container ${props.event.id}`}>
          <div className="top-container">
            <div className="top-icons">
              <button className="set-favorite" type="button" onClick={selectFavorite}>
                {favorite ? (
                  <BsFillHeartFill color="red" />
                ) : (
                  <BsHeart color="red"></BsHeart>
                )}
              </button>
              <button className="open-assessments" type="button" onClick={openAssessments}>
                <Evaluation className="rating-stars" rate={props.event.rating} />
              </button>
            </div>
            <div className="visual-elements">
              <button
                className="photos"
                type="button"
                onClick={openPhotosGallery}
              >
                <img
                  src={getMiddleImage(props.event.photos)}
                  alt="Images..."
                ></img>
              </button>
              <div className="distance-container">
                <a
                  id="route-link"
                  href={`https://www.google.com/maps/dir/Caic%C3%B3,+RN,+59300-000/${props.event.lat},${props.event.lng}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <text id="distance">2.8 KM - 15 Min</text>
                  <FaCar color="red"></FaCar>
                </a>
              </div>
            </div>
          </div>
          <div className="text-description">
            <p id="name">{props.event.name}</p>
            <p id="date">
              {getFormatedData(props.event.datetime, props.event.duration)}
            </p>
            <p id="locality">{props.event.locality}</p>
            <p id="description">{props.event.description}</p>
            <a
              id="site"
              href={props.event.site}
              rel="noreferrer"
              target="_blank"
            >
              {props.event.site}
            </a>
          </div>
          <div className="button-container">
            <button className="rating" type="button" onClick={openAssessments}>
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
        minWidth={555}
        maxWidth={555}
        className="map-popup"
      >
        {getPopUp()}
      </Popup>
    </Marker>
  );
}

export default MapMarker;
