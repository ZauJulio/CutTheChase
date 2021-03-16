import React, { useContext, useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { FaCar } from "react-icons/fa";

import { UserContext } from "../../contexts/UserContext";
import { getFormatedData } from "../../utils/DateTools";
import { getMiddleImage } from "../../utils/ImageTools";

import { Evaluation } from "../Appraiser";

import { Event } from "../../services/interfaces";

import styles from "../../styles/components/ModalEvent.module.scss";

interface ModalEventProps {
  event: Event;
}

export function ModalEvent(props: ModalEventProps) {
  const { role } = useContext(UserContext);
  const [favorite, setFavorite] = useState<boolean>(true);

  function openPhotosGallery(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    console.log("openPhotosGallery");
    console.log(e);
  }

  function openAssessments(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log("openAssessments");
    console.log(e);
  }

  function selectFavorite(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log("selectFavorite");
    console.log(e);
    setFavorite(!favorite);
  }

  return (
    <div className={styles.popupContainer}>
      <div className={styles.topContainer}>
        <div className={styles.topIcons}>
          {role !== null && (
            <button
              className={styles.setFavorite}
              type="button"
              onClick={selectFavorite}
            >
              {favorite ? (
                <BsFillHeartFill color="red" />
              ) : (
                <BsHeart color="red"></BsHeart>
              )}
            </button>
          )}
          <button
            className={styles.openAssessments}
            type="button"
            onClick={openAssessments}
          >
            <Evaluation className="rating-stars" rate={props.event.rating} />
          </button>
        </div>
        <div className={styles.visualElements}>
          <button
            className={styles.photos}
            type="button"
            onClick={openPhotosGallery}
          >
            <img src={getMiddleImage(props.event.photos)} alt="Images..."></img>
          </button>
          <div className={styles.distanceContainer}>
            <a
              className={styles.routeLink}
              href={`https://www.google.com/maps/dir/Caic%C3%B3,+RN,+59300-000/${props.event.adress.lat},${props.event.adress.lng}/`}
              target="_blank"
              rel="noreferrer"
            >
              <p className={styles.distance}>2.8 KM - 15 Min</p>
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
        {role !== null && (
          <button
            className={styles.rating}
            type="button"
            onClick={openAssessments}
          >
            Avaliar
          </button>
        )}
      </div>
    </div>
  );
}

export default ModalEvent;
