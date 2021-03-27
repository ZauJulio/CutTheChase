import React from "react";
import Head from "next/head";

import { getCsrfToken, getProviders, getSession } from "next-auth/client";

import SigninDesktop from "../../components/Signin/Desktop";
import SigninMobile from "../../components/Signin/Mobile";
import useWindowSize from "../../utils/useWindowSize";

export default function SignIn({ providers, csrfToken }) {
  const windowSize = useWindowSize();
  
  return (
    <>
      <Head>
        <title>Cut The Chase - Login</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="description" content="Login e Cadastro." />
      </Head>
      {windowSize.width > 1280 ? (
        <SigninDesktop providers={providers} csrfToken={csrfToken} />
      ) : (
        <SigninMobile providers={providers} csrfToken={csrfToken} />
      )}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    },
  };
};
