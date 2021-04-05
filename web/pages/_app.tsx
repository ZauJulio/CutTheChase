import { Provider } from "next-auth/client";
import "../styles/global.scss";
import "reflect-metadata";

export default function App({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </Provider>
  );
}
