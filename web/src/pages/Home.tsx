import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import Aside from "../components/Aside";
import SearchBar from "../components/SearchBar";
import "../styles/pages/Home.scss";

function EventsMap() {
  function handleChange(e:any) {
    console.log(e.target.value);
  }

  return (
    <div id="page-map">
      <Aside></Aside>
      <div className="Map">
        <MapContainer className="MapContainer" center={[-6.4625567, -37.0962424]} zoom={14} style={{ width: "100%", height: "100%" }}>
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>
      <div className="Search">
        <SearchBar onChange={handleChange}></SearchBar>
      </div>
    </div>
  );
}

export default EventsMap;
