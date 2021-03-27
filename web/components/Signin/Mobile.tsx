import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { RiArrowGoBackLine } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";

import AuthProviders from "../AuthProviders";
import styles from "../../styles/pages/Login/Mobile.module.scss";

export default function SigninMobile({ providers, csrfToken }) {
  const router = useRouter();
  const randomIndex = Math.floor(Math.random() * (10 + 1));
  const pathImage = `../login_images/${randomIndex}.svg`;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.appBar}>
        Cut The Chase
        <Link href="/Landing">
          <>
            <FcCalendar />
          </>
        </Link>
      </div>
      <div className={styles.pageControl}>
        <button type="button" onClick={() => router.back()}>
          <RiArrowGoBackLine />
        </button>
      </div>
      <div className={styles.authContainer}>
        <AuthProviders
          className={styles.authProviders}
          providers={Object.values(providers)}
          csrfToken={csrfToken}
        />
      </div>
      <img className={styles.randomLoginImage} src={pathImage}></img>
    </div>
  );
}
