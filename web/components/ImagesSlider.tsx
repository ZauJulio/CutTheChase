import { useState } from "react";
import styles from "../styles/components/ImagesSlider.module.scss";

interface ImagesSliderProps {
  images: string[];
  className?: string;
}

export function ImagesSlider(props: ImagesSliderProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(props.images.length / 2)
  );

  console.log(props.images)
  return (
    <div className={`${styles.imagesContainer} ${props.className}`}>
      <img
        className={styles.primaryImage}
        src={props.images[activeIndex]}
        alt={"event"}
      />

      <div className={styles.imagesList}>
        {props.images.map((image, index) => {
          return (
            <button
              key={index}
              className={activeIndex === index ? styles.active : ""}
              type="button"
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <img src={image} alt={String(index)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ImagesSlider;
