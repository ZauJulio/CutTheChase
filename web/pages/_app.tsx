import { Provider } from "next-auth/client";
import "../styles/global.scss";
import "reflect-metadata";

export default function App({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 60,
        keepAlive: Number(process.env.EXPIRATION_TIME_SEC),
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </Provider>
  );
}
