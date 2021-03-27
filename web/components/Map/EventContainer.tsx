import React, { useContext, useState } from "react";
import { BsArrowReturnLeft, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

import { EventsContext } from "../../contexts/EventsContext";
import { UserContext } from "../../contexts/UserContext";
import { getFormatedData as formatDate } from "../../utils/DateTools";
import { Event } from "../../services/interfaces";

import { Evaluation } from "../Appraiser";
import ImagesSlider from "../ImagesSlider";

import styles from "../../styles/components/EventContainer.module.scss";

interface EventContainerProps {
  event: Event;
  callback?: Function;
}

export function EventContainer({ event, callback }: EventContainerProps) {
  const { location } = useContext(EventsContext);
  const { role } = useContext(UserContext);

  const [showModal, setShowModal] = useState(true);
  const [favorite, setFavorite] = useState<boolean>(true);

  function selectFavorite(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setFavorite(!favorite);
  }

  return (
    <>
      {showModal ? (
        <div className={styles.modal}>
          <div className={styles.eventDetails}>
            {callback !== undefined && (
              <div className={styles.returnButton}>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(!showModal);
                    callback();
                  }}
                >
                  <BsArrowReturnLeft />
                </button>
              </div>
            )}
            <div className={styles.eventContainer}>
              <ImagesSlider
                className={styles.imagesSlider}
                images={event.images}
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
                <Evaluation className={styles.rating} rate={event.rating} />
              </div>
              <div className={styles.main}>
                <div className={styles.content}>
                  <p className={styles.name}>{event.name}</p>
                  <p className={styles.date}>
                    {formatDate(event.datetime, event.duration)}
                  </p>
                  <p className={styles.locality}>{event.adress.locality}</p>
                  <p className={styles.description}>{event.description}</p>
                  <a
                    className={styles.site}
                    href={event.site}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {event.site}
                  </a>
                </div>
                <div className={styles.linksContainer}>
                  <div className={styles.routeLink}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.google.com/maps/dir/${location.lat},${location.long}/${event.adress.lat},${event.adress.lng}/`}
                    >
                      <FiMapPin />
                    </a>
                  </div>

                  {role !== null && (
                    <button className={styles.rating} type="button">
                      Avaliar
                    </button>
                  )}
                </div>
                <div className={styles.assessmentsContainer}>
                  <h2>Avaliações</h2>
                  <div className={styles.assessmentsTitleSeperator} />
                  <div className={styles.assessments}>
                    {event.assessments.map((rate, index) => {
                      return (
                        <div
                          key={index}
                          className={`${styles.assessment} ${index}`}
                        >
                          <div className={styles.assessmentAuthor}>
                            <h3>{rate.showName ? rate.user : "Anônimo"}</h3>
                            <Evaluation
                              className={styles.rating}
                              rate={rate.rate}
                            />
                          </div>
                          <p>{rate.evaluation}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default EventContainer;
