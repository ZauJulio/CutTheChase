import React from "react";
import { signIn } from "next-auth/client";

import styles from "../../../styles/components/Auth/ProviderButton.module.scss";

interface ExternalProviderProps {
  className?: string;
  name: string;
  id: string;
  children?: JSX.Element[] | JSX.Element;
}

export default function ExternalProvider(props: ExternalProviderProps) {
  return (
    <button
      className={`${styles.providerButton} ${props.className}`}
      onClick={() => signIn(props.id)}
    >
      Entrar com {props.name}
      {props.children}
    </button>
  );
}
