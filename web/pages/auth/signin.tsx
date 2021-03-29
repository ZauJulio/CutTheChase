import React from "react";
import Head from "next/head";
import { Provider } from "next-auth/providers";
import { getCsrfToken, getProviders, getSession } from "next-auth/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import useWindowSize from "../../utils/useWindowSize";

import Mobile from "./Signin/_Mobile";
import Desktop from "./Signin/_Desktop";

interface SigninProps {
  providers: Provider[];
  csrfToken: string;
}

export default function SigninProps(props: SigninProps) {
  const windowSize = useWindowSize();

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
        />
      ) : (
        <Mobile
          providers={Object.values(props.providers)}
          csrfToken={props.csrfToken}
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
