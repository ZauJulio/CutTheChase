import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";

import ImageView from "./ImageView";
import { AccordionCheckbox } from "../AccordionCheckbox";
import { AccordionRadio } from "../AccordionRadio";
import api, { getSelectableCategories } from "../../services/api";

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
  const [locality, setLocality] = useState("");
  const [datetime, setDatetime] = useState("");
  const [duration, setDuration] = useState(0);
  const [site, setSite] = useState("");
  const [repeat, setRepeat] = useState("");
  const [promotor, setPromotor] = useState("");
  const [categories, setCategories] = useState(getSelectableCategories());
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { lat, lng } = props.geoLocation;
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("promotor", promotor);
    data.append("locality", locality);
    data.append("datetime", datetime);
    data.append("duration", String(duration));
    data.append("site", site);
    data.append("repeat", repeat);
    data.append("categories", JSON.stringify(categories));

    data.append(
      "adress",
      JSON.stringify({
        lat,
        lng,
        locality,
      })
    );

    // images.forEach(async (image) => {
    //   data.append("images", image);
    // });

    await api.local.post("api/events/create", data).then((response) => {
      console.log(response);
    });

    alert("Cadastro realizado com sucesso!");

    // history.push('/app');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    event.target.value = "";

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    selectedImagesPreview.length = 5;

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
      name="eventForm"
      className={`${styles.eventForm} ${props.className}`}
      onSubmit={handleSubmit}
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
            id="image[]"
          />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            value={name}
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
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="locality">Local - Referência</label>
          <input
            id="locality"
            value={locality}
            onChange={(event) => setLocality(event.target.value)}
          />
        </div>

        <div className={styles.promotorContainer}>
          <div className={styles.input_block}>
            <label htmlFor="promotor">Promotor</label>
            <input
              id="promotor"
              value={promotor}
              onChange={(event) => setPromotor(event.target.value)}
            />
          </div>

          <div className={styles.input_block}>
            <label htmlFor="site">Site</label>
            <input
              id="site"
              value={site}
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
              onChange={(event) => setDatetime(event.target.value)}
            />
          </div>

          <div className={styles.input_block}>
            <label htmlFor="duration">Duração em Horas</label>
            <input
              id="duration"
              value={duration}
              type="number"
              placeholder="min"
              onChange={(event) => setDuration(Number(event.target.value))}
            />
          </div>

          <AccordionRadio
            title={
              repeat === ""
                ? "Se repete..."
                : repeat.endsWith("a")
                ? `Toda ${repeat}`
                : `Todo ${repeat}`
            }
            values={["Dia", "Semana", "Mês", "Ano"]}
            callback={(value) => setRepeat(value)}
          />

          <AccordionCheckbox
            title="Categoria"
            values={categories}
            callback={(arr) => setCategories(arr)}
          />
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
