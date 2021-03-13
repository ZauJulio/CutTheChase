import React from "react";
import "../styles/global.scss";
import 'leaflet/dist/leaflet.css';
import Aside from "../components/Aside";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Aside />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
