import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CheckBox } from "./CheckBox";
import styles from "../styles/components/Accordion.module.scss";

interface SelectableValue {
  name: string;
  selected: boolean;
}

interface SelectValues {
  (arr: Array<string>): void;
}

interface AccordionProps {
  className?: string;
  buttonStyle?: string;
  title: string;
  values: Array<string>;
  callback: SelectValues;
}

export function getSelectableValues(values: string[]) {
  return values.map((value) => {
    return {
      name: value,
      selected: false,
    };
  });
}

export function AccordionCheckbox(props: AccordionProps) {
  const [values, setValues] = useState<Array<SelectableValue>>(
    getSelectableValues(props.values)
  );

  function handleChange(index: number) {
    var valuesCopy = JSON.parse(JSON.stringify(values));
    valuesCopy[index].selected = !valuesCopy[index].selected;

    const selectedValues = valuesCopy
      .map((value: SelectableValue) => {
        return value.selected ? value.name : false;
      })
      .filter((value: string | boolean) => value);

    props.callback && props.callback(selectedValues);
    setValues(valuesCopy);
  }

  return (
    <div className={`${styles.container} ${props.className}`}>
      <button
        className={`${styles.expandOptions} ${props.buttonStyle}`}
        type="button"
      >
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
