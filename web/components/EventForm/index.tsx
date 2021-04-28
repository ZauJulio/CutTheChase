import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";

import ImageView from "./ImageView";
import { AccordionCheckbox } from "../AccordionCheckbox";
import { AccordionRadio } from "../AccordionRadio";

import api, { getCategories } from "../../services/api";
import { useSession } from "next-auth/client";
import { upload } from "../../services/storage";

import styles from "../../styles/components/EventForm.module.scss";

interface EventFormProps {
  className?: string;
  data?: Event;
  geoLocation?: {
    lat: number;
    lng: number;
  };
}

export default function EventForm(props: EventFormProps) {
  const [session, _] = useSession();
  const role: string = "promoter";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locality, setLocality] = useState("");
  const [datetime, setDatetime] = useState<string>(Date());
  const [duration, setDuration] = useState(0);
  const [site, setSite] = useState("");
  const [repeat, setRepeat] = useState("");
  const [promotor, setPromotor] = useState("");
  const [categories, setCategories] = useState<string[]>();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { lat, lng } = props.geoLocation;
    const formData = new FormData();

    if (session) {
      let token = String(session.accessToken);

      console.log(datetime);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("promotor", promotor);
      formData.append("locality", locality);
      formData.append("datetime", String(new Date(datetime).getTime()));
      formData.append("duration", String(duration));
      formData.append("site", site);
      formData.append("repeat", repeat);
      formData.append("categories", JSON.stringify(categories));

      formData.append(
        "address",
        JSON.stringify({
          lat,
          lng,
          locality,
        })
      );

      const fileNames = await upload(images);

      fileNames.forEach((image) => {
        formData.append("images", image);
      });

      const response = await api.events.create(formData, token);
      // Substituir por modal redirecionando para o mapa de eventos
      if (response === 200) {
        alert("Evento criado com sucesso ❤");
      } else if (response === 415) {
        alert("Hmm... Parece que um problema com os dados! Tente revisa-los");
      } else if (response === 500) {
        alert("Tivemos um problema... Tente novamente mais tarde ;-;");
      }
    } else {
      // Substituir por modal abrindo nova aba para login
      alert("Usuário não autorizado... Faça login novamente ; )");
    }
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

        <div className={styles.lastContainer}>
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
            className={styles.accordions}
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
            className={styles.accordions}
            title="Categoria"
            values={getCategories()}
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
