import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import ImageView from "./ImageView";

import accordionStyles from "../../styles/components/Events/EventForm/FrequencyRepetition.module.scss";
import styles from "../../styles/components/EventForm.module.scss";

interface EventFormProps {
  className?: string;
  geoLocation?: {
    lat: number;
    lng: number;
  };
}

export default function EventForm(props: EventFormProps) {
  const role: string = "promoter";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [promotor, setPromotor] = useState("");
  const [locality, setLocality] = useState("");
  const [datetime, setDatetime] = useState("");
  const [site, setSite] = useState("");
  const [repetition, setRepetition] = useState("");
  const [repetitionValues, setRepetitionValues] = useState(false);
  const [duration, setDuration] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // function handleMapClick(event: LeafletMouseEvent) {
  //   const { lat, lng } = event.latlng;

  //   setPosition({
  //     latitude: lat,
  //     longitude: lng
  //   });
  // }

  // console.log(props.geoLocation)
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { lat, lng } = props.geoLocation;
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("lat", String(lat));
    data.append("lng", String(lng));

    images.forEach((image) => {
      data.append("images", image);
    });

    // await api.post("orphanages", data);

    alert("Cadastro realizado com sucesso!");

    // history.push('/app');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);

    event.target.value = "";

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleRemoveImage(image: string) {
    setPreviewImages(
      previewImages.map((image) => image).filter((img) => img !== image)
    );
    setImages(images.map((image) => image).filter((img) => img.name !== image));
  }

  return (
    <form
      className={`${styles.eventForm} ${props.className}`}
      onSubmit={() => {}}
    >
      <fieldset>
        <legend>Dados</legend>

        <div className={`${styles.input_block} ${styles.images}`}>
          <label htmlFor="images">Fotos</label>

          <div className={styles.imagesContainer}>
            {previewImages.map((image, index) => {
              return (
                <ImageView
                  image={image}
                  key={index}
                  callback={handleRemoveImage}
                />
              );
            })}

            {previewImages.length <= 4 && (
              <label htmlFor="image[]" className={styles.new_image}>
                <FiPlus size={24} color="#044f6d" />
              </label>
            )}
          </div>

          <input
            multiple
            onChange={handleSelectImages}
            type="file"
            required
            id="image[]"
          />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="description">
            Sobre <span>Máximo de 280 caracteres</span>
          </label>
          <textarea
            id="description"
            maxLength={280}
            value={description}
            required
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="locality">Local - Referência</label>
          <input
            id="locality"
            value={locality}
            required
            onChange={(event) => setLocality(event.target.value)}
          />
        </div>

        <div className={styles.promotorContainer}>
          <div className={styles.input_block}>
            <label htmlFor="promotor">Promotor</label>
            <input
              id="promotor"
              value={promotor}
              required
              onChange={(event) => setPromotor(event.target.value)}
            />
          </div>

          <div className={styles.input_block}>
            <label htmlFor="site">Site</label>
            <input
              id="site"
              value={site}
              required
              onChange={(event) => setSite(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.timeContainer}>
          <div className={styles.input_block}>
            <label htmlFor="datetime">Data e Hora</label>
            <input
              id="datetime"
              value={datetime}
              type="datetime-local"
              required
              onChange={(event) => setDatetime(event.target.value)}
            />
          </div>

          <div className={styles.input_block}>
            <label htmlFor="duration">Duração</label>
            <input
              id="duration"
              value={duration}
              type="number"
              placeholder="min"
              required
              onChange={(event) => setDuration(Number(event.target.value))}
            />
          </div>

          <div className={accordionStyles.repetitionAccordion}>
            <button
              className={accordionStyles.expandRepetitionValues}
              type="button"
              onClick={() => setRepetitionValues(!repetitionValues)}
            >
              {repetition === ""
                ? "Se repete..."
                : repetition.endsWith("a")
                ? `Toda ${repetition}`
                : `Todo ${repetition}`}
            </button>

            <div className={accordionStyles.repetitionValues}>
              <button
                type="button"
                onClick={() => {
                  setRepetition("Dia");
                  setRepetitionValues(!repetitionValues);
                }}
              >
                Dia
              </button>
              <button
                type="button"
                onClick={() => {
                  setRepetition("Semana");
                  setRepetitionValues(!repetitionValues);
                }}
              >
                Semana
              </button>
              <button
                type="button"
                onClick={() => {
                  setRepetition("Mês");
                  setRepetitionValues(!repetitionValues);
                }}
              >
                Mês
              </button>
              <button
                type="button"
                onClick={() => {
                  setRepetition("Ano");
                  setRepetitionValues(!repetitionValues);
                }}
              >
                Ano
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      {role === "promoter" && (
        <button className={styles.confirm_button} type="submit">
          Confirmar
        </button>
      )}
    </form>
  );
}
