import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CheckBox } from "./CheckBox";
import styles from "../styles/components/Accordion.module.scss";

interface AccordionProps {
  className?: string;
  buttonStyle?: string;
  title: string;
  values: Array<string>;
  callback: (value: string) => void;
}

export function AccordionRadio(props: AccordionProps) {
  const [selected, setSelected] = useState<Array<boolean>>(
    props.values.map((value) => false)
  );
  
  function handleChange(index: number) {
    var arrCopy = props.values.map((value) => false);
    arrCopy[index] = !arrCopy[index];

    props.callback && props.callback(props.values[index]);
    setSelected(arrCopy);
  }

  return (
    <div className={`${styles.container} ${props.className}`}>
      <button className={`${styles.expandOptions} ${props.buttonStyle}`} type="button">
        {props.title}
        <IoIosArrowDown className={styles.expandIcon}/>
        <IoIosArrowUp className={styles.compressIcon}/>
      </button>

      <div className={styles.optionsContainer}>
        {selected.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.option}
              onClick={() => handleChange(index)}
            >
              <CheckBox checked={selected[index]} rounded={true} />
              <label htmlFor={String(index)}>{props.values[index]}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
