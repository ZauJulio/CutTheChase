import React from "react";

import { useRouter } from "next/router";
import { RiArrowGoBackLine } from "react-icons/ri";

import styles from "../styles/components/ReturnButton.module.scss";

interface ReturnButtonProps {
  className?: string;
}

export default function ReturnButton(props: ReturnButtonProps) {
  const router = useRouter();

  return (
    <button
      className={`${styles.returnPageButton} ${props.className}`}
      type="button"
      onClick={() => router.back()}
    >
      <RiArrowGoBackLine />
    </button>
  );
}
