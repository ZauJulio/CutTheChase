import React, { FormEvent } from "react";
import ImageView from "./ImageView";

import accordionStyles from "../../styles/components/Events/EventForm/FrequencyRepetition.module.scss";
import styles from "../../styles/components/EventForm.module.scss";

interface Adress {
  lat: number;
  lng: number;
  location: string;
}

interface Event {
  name: string;
  description: string;
  datetime: number;
  duration: number;
  site: string;
  repeat: string;
  adress: Adress;
  promotor: string;
  categorys: string[];
  images: string[];
}

interface EventViewerProps {
  className?: string;
  previewImages: string[];
  event: Event;
  handleSubmit: (event: FormEvent<Element>) => Promise<void>;
}

export default function Viewer(props: EventViewerProps) {
  return (
    <form
      className={`${styles.eventForm} ${props.className}`}
      onSubmit={props.handleSubmit}
    >
      <fieldset>
        <legend>Dados</legend>

        <div className={`${styles.input_block} ${styles.images}`}>
          <label htmlFor="images">Fotos</label>

          <div className={styles.imagesContainer}>
            {props.event.images.map((image, index) => {
              return <ImageView image={image} key={index} />;
            })}
          </div>
        </div>

        <div className={styles.input_block}>
          <label htmlFor="name">Nome</label>
          <input id="name" value={props.event.name} />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="about">
            Sobre <span>Máximo de 280 caracteres</span>
          </label>
          <textarea
            id="about"
            maxLength={280}
            value={props.event.description}
          />
        </div>

        <div className={styles.promotorContainer}>
          <div className={styles.input_block}>
            <label htmlFor="promotor">Promotor</label>
            <input id="promotor" value={props.event.promotor} />
          </div>

          <div className={styles.input_block}>
            <label htmlFor="site">Site</label>
            <input id="site" value={props.event.site} />
          </div>
        </div>

        <div className={styles.timeContainer}>
          <div className={styles.input_block}>
            <label htmlFor="date">Data e Hora</label>
            <input
              id="date"
              value={props.event.datetime}
              type="datetime-local"
            />
          </div>
        </div>

        <div className={styles.input_block}>
          <label htmlFor="duration">Duração</label>
          <input
            id="duration"
            value={props.event.duration}
            type="number"
            placeholder="min"
          />
        </div>

        <div className={accordionStyles.repetitionAccordion}>
          <button
            className={accordionStyles.expandRepetitionValues}
            type="button"
          >
            {props.event.repeat.endsWith("a")
              ? `Toda ${props.event.repeat}`
              : `Todo ${props.event.repeat}`}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
