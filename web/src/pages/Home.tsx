import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { Typography, Box } from "@material-ui/core";

import Aside from "../components/Aside";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MapMarker from "../components/MapMarker";
import { getEvents, getCategorys } from "../services/api";
import { Category } from "../services/api";

import "../styles/pages/Home.scss";

function EventsMap() {
  const [categorys, setCategorys] = useState<Category[]>(getCategorys());
  const [searchArgs, setSearchArgs] = useState<string[]>([]);

  function onCategoryChange(e: any) {
    setCategorys(e);
    console.log(e);
  }

  function onSearchChange(e: any) {
    setSearchArgs(e);
    console.log(e);
  }

  function getCategorysSelected() {
    return categorys.filter((category) => category.selected).map((o) => o.name);
  }

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
          {getEvents(searchArgs, getCategorysSelected()).map((event) => {
            return <MapMarker isLoggedIn={true} event={event} />;
          })}
          ;
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
          <SearchBar onChange={onSearchChange} />
          <CategoryFilter items={categorys} onChange={onCategoryChange} />
        </Box>
      </Typography>
    </div>
  );
}

export default EventsMap;
