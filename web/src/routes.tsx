import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import EventsMap from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Favorites from "./pages/Favorites";
import Rating from "./pages/Rating";
import Users from "./pages/Users";
import Events from "./pages/Events";
import Preferences from "./pages/Preferences";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={EventsMap} />
      <Route path="/Login" component={Login} />
      <Route path="/Home" component={Landing} />
      <Route path="/Favorites" component={Favorites} />
      <Route path="/Rating" component={Rating} />
      <Route path="/Users" component={Users} />
      <Route path="/Events" component={Events} />
      <Route path="/Preferences" component={Preferences} />
    </BrowserRouter>
  );
}

export default Routes;
