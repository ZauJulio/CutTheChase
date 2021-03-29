import React from "react";
import { Provider } from "next-auth/providers";

import AuthProviders from "../../../components/Auth/AuthProviders";
import ReturnPageButton from "../../../components/ReturnButton";
import HomeButton from "../../../components/HomeButton";
import styles from "../../../styles/pages/Auth/Signin/Mobile.module.scss";

interface MobileProps {
  providers: Provider[];
  csrfToken: string;
}

export default function Mobile(props: MobileProps) {
  const randomIndex = Math.floor(Math.random() * 11);
  const pathImage = `../login_images/${randomIndex}.svg`;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.appBar}>
        Cut The Chase
        <HomeButton />
      </div>
      <ReturnPageButton className={styles.pageControl} />
      <AuthProviders
        className={styles.authProviders}
        providers={Object.values(props.providers)}
        csrfToken={props.csrfToken}
      />
      <img className={styles.randomLoginImage} src={pathImage} />
    </div>
  );
}
