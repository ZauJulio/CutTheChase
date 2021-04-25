import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CheckBox } from "./CheckBox";
import styles from "../styles/components/Accordion.module.scss";

interface SelectableValue {
  id: number;
  name: string;
  selected: boolean;
}

interface SelectValues {
  (arr: Array<SelectableValue>): void;
}

interface AccordionProps {
  className?: string;
  title: string;
  values: Array<SelectableValue>;
  callback: SelectValues;
}

export function AccordionCheckbox(props: AccordionProps) {
  const [values, setValues] = useState<Array<SelectableValue>>(props.values);

  function handleChange(index: number) {
    var valuesCopy = JSON.parse(JSON.stringify(values));
    valuesCopy[index].selected = !valuesCopy[index].selected;

    props.callback && props.callback(valuesCopy);
    setValues(valuesCopy);
  }

  return (
    <div className={styles.container}>
      <button className={styles.expandOptions} type="button">
        {props.title}
        <IoIosArrowDown className={styles.expandIcon} />
        <IoIosArrowUp className={styles.compressIcon} />
      </button>

      <div className={styles.optionsContainer}>
        {values.map((item, index) => {
          return (
            <div
              className={styles.option}
              key={index}
              onClick={() => handleChange(index)}
            >
              <CheckBox checked={item.selected} />
              <label htmlFor={String(index)}>{item.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
