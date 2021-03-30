import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Provider } from "next-auth/providers";
import { getCsrfToken, getProviders, getSession } from "next-auth/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import useWindowSize from "../../utils/useWindowSize";

import AuthProviders from "../../components/Auth/AuthProviders";
import ReturnPageButton from "../../components/ReturnButton";
import HomeButton from "../../components/HomeButton";

import stylesDesktop from "../../styles/pages/Auth/Signin/Desktop.module.scss";
import stylesMobile from "../../styles/pages/Auth/Signin/Mobile.module.scss";

interface SigninProps {
  providers: Provider[];
  csrfToken: string;
}

interface PageProps {
  providers: Provider[];
  csrfToken: string;
  pathImg: string;
}

const Mobile = (props: PageProps) => {
  return (
    <div className={stylesMobile.loginContainer}>
      <div className={stylesMobile.appBar}>
        Cut The Chase
        <HomeButton />
      </div>
      <ReturnPageButton className={stylesMobile.pageControl} />
      <AuthProviders
        className={stylesMobile.authProviders}
        providers={Object.values(props.providers)}
        csrfToken={props.csrfToken}
      />
      <div className={stylesMobile.randomImageContainer}>
        <Image
          className={stylesMobile.randomLoginImage}
          src={props.pathImg}
          alt=""
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

const Desktop = (props: PageProps) => {
  return (
    <div className={stylesDesktop.loginContainer}>
      <ReturnPageButton className={stylesDesktop.pageControl} />
      <AuthProviders
        className={stylesDesktop.authProviders}
        providers={Object.values(props.providers)}
        csrfToken={props.csrfToken}
      />
      <div className={stylesDesktop.appBar}>
        Cut The Chase
        <HomeButton />
      </div>
      <div className={stylesDesktop.randomImageContainer}>
        <Image
          className={stylesDesktop.randomLoginImage}
          src={props.pathImg}
          alt="Picture of the author"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default function Signin(props: SigninProps) {
  const windowSize = useWindowSize();
  const randomIndex = Math.floor(Math.random() * 11);
  const pathImage = `/login_images/${randomIndex}.svg`;

  return (
    <>
      <Head>
        <title>Cut The Chase - Login</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="description" content="Login e Cadastro." />
      </Head>
      {windowSize.width > 1280 ? (
        <Desktop
          providers={Object.values(props.providers)}
          csrfToken={props.csrfToken}
          pathImg={pathImage}
        />
      ) : (
        <Mobile
          providers={Object.values(props.providers)}
          csrfToken={props.csrfToken}
          pathImg={pathImage}
        />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return {
    props: {
      session: await getSession(ctx),
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    },
  };
};
