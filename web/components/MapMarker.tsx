import React, { useContext, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

import iconMarker from "../utils/MapMarkerIcon";
import { Event } from "../services/interfaces";
import { Evaluation } from "./Appraiser";
import { getFormatedData } from "../utils/DateTools";
import { getMiddleImage } from "../utils/ImageTools";
import { FaCar } from "react-icons/fa";

import { UserContext } from "../contexts/UserContext";
import styles from "../styles/components/MapMarker.module.scss";

interface PropTypeMapMarker {
  event: Event;
};

function MapMarker(props: PropTypeMapMarker) {
  const { role } = useContext(UserContext)
  const [favorite, setFavorite] = useState<boolean>(true);

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
    if (role !== null) {
      return (
        <div className={styles.popupContainer}>
          <div className={styles.topContainer}>
            <div className={styles.topIcons}>
              <button className={styles.setFavorite} type="button" onClick={selectFavorite}>
                {favorite ? (
                  <BsFillHeartFill color="red" />
                ) : (
                  <BsHeart color="red"></BsHeart>
                )}
              </button>
              <button className={styles.openAssessments} type="button" onClick={openAssessments}>
                <Evaluation className="rating-stars" rate={props.event.rating} />
              </button>
            </div>
            <div className={styles.visualElements}>
              <button
                className={styles.photos}
                type="button"
                onClick={openPhotosGallery}
              >
                <img
                  src={getMiddleImage(props.event.photos)}
                  alt="Images..."
                ></img>
              </button>
              <div className={styles.distanceContainer}>
                <a
                  className={styles.routeLink}
                  href={`https://www.google.com/maps/dir/Caic%C3%B3,+RN,+59300-000/${props.event.adress.lat},${props.event.adress.lng}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <text className={styles.distance}>2.8 KM - 15 Min</text>
                  <FaCar color="red"></FaCar>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.textDescription}>
            <p className={styles.name}>{props.event.name}</p>
            <p className={styles.date}>
              {getFormatedData(props.event.datetime, props.event.duration)}
            </p>
            <p className={styles.locality}>{props.event.adress.locality}</p>
            <p className={styles.description}>{props.event.description}</p>
            <a
              className={styles.site}
              href={props.event.site}
              rel="noreferrer"
              target="_blank"
            >
              {props.event.site}
            </a>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.rating} type="button" onClick={openAssessments}>
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
      icon={iconMarker}
      position={[props.event.adress.lat, props.event.adress.lng]}
    >
      <Popup
        closeButton={false}
        minWidth={555}
        maxWidth={555}
        className={styles.mapPopup}
      >
        {getPopUp()}
      </Popup>
    </Marker>
  );
}

export default MapMarker;
