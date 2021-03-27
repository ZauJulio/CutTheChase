import React from "react";

import {
  getCsrfToken,
  getProviders,
  getSession,
  providers,
} from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import { RiArrowGoBackLine } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";

import AuthProviders from "../../components/AuthProviders";
import styles from "../../styles/pages/Login.module.scss";
import { GetServerSideProps } from "next";

export default function SignIn({ providers, csrfToken }) {
  const router = useRouter();
  const randomIndex = Math.floor(Math.random() * (10 + 1));
  const pathImage = `../login_images/${randomIndex}.svg`;

  return (
    <div>
      <Head>
        <title>Cut The Chase - Login</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="description" content="Login e Cadastro." />
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.pageControl}>
            <button type="button" onClick={() => router.back()}>
              <RiArrowGoBackLine />
            </button>
          </div>
          <AuthProviders
            providers={Object.values(providers)}
            csrfToken={csrfToken}
          />
        </div>
        <div className={styles.rightContainer}>
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
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }

  return {}
  // return {
  //   props: {
  //     session: session,
  //     providers: await getProviders(),
  //     csrfToken: await getCsrfToken(),
  //   },
  // };
};

// SignIn.getInitialProps = async () => {
//   return {
//     providers: await providers(),
//   };
// };
