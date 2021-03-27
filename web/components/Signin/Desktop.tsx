import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { RiArrowGoBackLine } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";

import AuthProviders from "../AuthProviders";
import styles from "../../styles/pages/Login/Desktop.module.scss";

export default function SigninDesktop({ providers, csrfToken }) {
  const router = useRouter();
  const randomIndex = Math.floor(Math.random() * (10 + 1));
  const pathImage = `../login_images/${randomIndex}.svg`;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.authContainer}>
        <div className={styles.pageControl}>
          <button type="button" onClick={() => router.back()}>
            <RiArrowGoBackLine />
          </button>
        </div>
        <AuthProviders
          className={styles.authProviders}
          providers={Object.values(providers)}
          csrfToken={csrfToken}
        />
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.appBar}>
          Cut The Chase
          <Link href="/Landing">
            <>
              <FcCalendar />
            </>
          </Link>
        </div>
        <img src={pathImage}></img>
      </div>
    </div>
  );
}
