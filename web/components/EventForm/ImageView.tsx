import React from "react";
import { FiX } from "react-icons/fi";

import styles from "../../styles/components/Events/EventForm/ImageView.module.scss";

interface ImageViewProps {
  image: string;
  key: number;
  callback?: (image: string) => void;
}

export default function ImageView(props: ImageViewProps) {
  const add = props.callback ? true : false;

  const callback = () => {
    if (add) {
      props.callback(props.image)
    }
  }

  return (
    <div className={styles.imageViewContainer} key={props.key}>
      <span
        className={styles.remove_image}
        onClick={callback}
      >
        {add && <FiX size={18} color="#ff669d" />}
      </span>
      <img
        src={props.image}
        className={styles.image_view}
      />
    </div>
  );
}
