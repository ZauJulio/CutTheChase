import React, { useContext, useState } from "react";
import { BsArrowReturnLeft, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

import { UserContext } from "../../contexts/UserContext";
import { getFormatedData } from "../../utils/DateTools";

import { Evaluation } from "../Appraiser";

import { Event } from "../../services/interfaces";

import styles from "../../styles/components/ModalEvent.module.scss";
import { EventsContext } from "../../contexts/EventsContext";
import ImagesSlider from "../ImagesSlider";

interface ModalEventProps {
  event: Event;
  callback: Function;
}

export function ModalEvent(props: ModalEventProps) {
  const { location } = useContext(EventsContext);
  const [showModal, setShowModal] = useState(true);

  const { role } = useContext(UserContext);
  const [favorite, setFavorite] = useState<boolean>(true);

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
    <>
      {showModal ? (
        <div className={styles.modalEventContainer}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => {
              setShowModal(!showModal);
              props.callback()
            }}
          >
            <BsArrowReturnLeft />
          </button>
          <ImagesSlider
            className={styles.imagesSlider}
            images={props.event.images}
          />
          <div className={styles.topContainer}>
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
          <div className={styles.bottomContainer}>
            <div className={styles.routeLink}>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/dir/${location.lat},${location.long}/${props.event.adress.lat},${props.event.adress.lng}/`}
              >
                <FiMapPin />
              </a>
            </div>

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
      ) : (
        <></>
      )}
    </>
  );
}

export default ModalEvent;
