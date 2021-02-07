import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import Aside from "../components/Aside";
import SearchBar from "../components/SearchBar";
import CategoryFilter, { Category } from "../components/CategoryFilter";
import { Typography, Box } from "@material-ui/core";
import "../styles/pages/Home.scss";

function EventsMap() {
  function handleChange(e: any) {
    console.log(e);
  }

  var categorys: Category[] = [
    { name: "Hello", selected: false },
    { name: "World", selected: false },
    { name: "test", selected: false },
    { name: "temp", selected: false },
  ];

  return (
    <div id="page-map">
      <Aside></Aside>
      <div className="Map">
        <MapContainer
          className="MapContainer"
          center={[-6.4625567, -37.0962424]}
          zoom={14}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>
      <Typography
        component="div"
        variant="body1"
        style={{ height: 100, width: "100%", position: "relative" }}
      >
        <Box
          bgcolor="transparent"
          position="absolute"
          display="flex"
          zIndex="1000"
          top="2em"
          left="6em"
        >
          <SearchBar onChange={handleChange} />
          <CategoryFilter items={categorys} onChange={handleChange} />
        </Box>
      </Typography>
    </div>
  );
}

export default EventsMap;
