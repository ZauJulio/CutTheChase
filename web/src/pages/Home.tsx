import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "../styles/pages/Home.scss";
import 'leaflet/dist/leaflet.css';

function EventsMap() {
  const style = { width: '100%', height: '100%' };

  return (
    <div id="page-map">
      <MapContainer center={[-6.4625567, -37.0962424]} zoom={14} style={style}>
        <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
      </MapContainer>
    </div>
  );
}

export default EventsMap;