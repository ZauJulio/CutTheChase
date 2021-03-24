import React from "react";
import { Provider } from 'next-auth/client'
import "../styles/global.scss";
import "leaflet/dist/leaflet.css";

import { UserProvider } from "../contexts/UserContext";
import { GetServerSideProps } from "next";
import { User } from "../services/interfaces";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps}) {
  const cre = {
    user: {
      id: 1,
      name: "Zaú Júlio",
      email: "zauhdf@gmail.com",
      password: "senha",
      preferences: {
        id: 1,
        favcategories: [
          {
            id: 1,
            name: "Música",
          },
        ],
      },
      role: {
        id: 1,
        name: "promotor",
      },
      favorites: [
        {
          id: 1,
          event: 1,
        },
      ],
    },
    timestamp: 0,
  };

  return (
    <div>
      <Provider session={pageProps.session}>
        <UserProvider user={cre.user}>
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
