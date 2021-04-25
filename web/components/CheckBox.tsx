import React, { useState } from "react";
import {
  BiCheckbox,
  BiCheckboxChecked,
  BiRadioCircle,
  BiRadioCircleMarked,
} from "react-icons/bi";

import styles from "../styles/components/CheckBox.module.scss";

interface CheckBoxProps {
  className?: string;
  checked?: boolean;
  rounded?: boolean;
  onChange?: (value: boolean) => void;
}

export function CheckBox(props: CheckBoxProps) {
  const checked = props.checked ?? false

  const handlerChange = () => {
    props.onChange && props.onChange(!checked);
  };

  return (
    <>
      {!props.rounded && !checked && (
        <BiCheckbox onClick={handlerChange} className={styles.checkbox} />
      )}
      {!props.rounded && checked && (
        <BiCheckboxChecked onClick={handlerChange} className={styles.checkbox}/>
      )}
      {props.rounded && !checked && (
        <BiRadioCircle onClick={handlerChange} className={styles.checkbox} />
      )}
      {props.rounded && checked && (
        <BiRadioCircleMarked onClick={handlerChange} className={styles.checkbox}/>
      )}
    </>
  );
}
