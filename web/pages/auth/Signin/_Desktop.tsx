import React from "react";
import { Provider } from "next-auth/providers";

import AuthProviders from "../../../components/Auth/AuthProviders";
import styles from "../../../styles/pages/Auth/Signin/Desktop.module.scss";
import ReturnPageButton from "../../../components/ReturnButton";
import HomeButton from "../../../components/HomeButton";

interface DesktopProps {
  providers: Provider[];
  csrfToken: string;
}

export default function SigninDesktop(props: DesktopProps) {
  const randomIndex = Math.floor(Math.random() * 11);
  const pathImage = `../login_images/${randomIndex}.svg`;

  return (
    <div className={styles.loginContainer}>
      <ReturnPageButton className={styles.pageControl} />
      <AuthProviders
        className={styles.authProviders}
        providers={Object.values(props.providers)}
        csrfToken={props.csrfToken}
      />
      <div className={styles.appBar}>
        Cut The Chase
        <HomeButton />
      </div>
      <img className={styles.randomLoginImage} src={pathImage} />
    </div>
  );
}
