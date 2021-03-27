import { useState } from "react";
import { Image } from "../services/interfaces";
import styles from "../styles/components/ImagesSlider.module.scss";

interface ImagesSliderProps {
  images: Image[];
  className?: string;
}

export function ImagesSlider(props: ImagesSliderProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(props.images.length / 2)
  );

  return (
    <div className={`${styles.imagesContainer} ${props.className}`}>
      <img
        className={styles.primaryImage}
        src={props.images[activeIndex].url}
        alt={"event"}
      />

      <div className={styles.imagesList}>
        {props.images.map((image, index) => {
          return (
            <button
              key={image.id}
              className={activeIndex === index ? styles.active : ""}
              type="button"
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <img src={image.url} alt={String(index)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ImagesSlider;
