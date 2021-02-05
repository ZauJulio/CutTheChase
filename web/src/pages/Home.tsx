import React from "react";
import { MapContainer, TileLayer, Pane, ZoomControl } from "react-leaflet";

import Aside from "../components/Aside";
import SearchBar from "../components/SearchBar";
import "../styles/pages/Home.scss";

function EventsMap() {
  const style = { width: "100%", height: "100%" };

  return (
    <div id="page-map">
      <Aside></Aside>
      <MapContainer center={[-6.4625567, -37.0962424]} zoom={14} style={style}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Pane name="Test">
          <SearchBar onChange={() => {}}></SearchBar>
        </Pane>
        <ZoomControl position="bottomright" />

      </MapContainer>
    </div>
  );
}

export default EventsMap;
