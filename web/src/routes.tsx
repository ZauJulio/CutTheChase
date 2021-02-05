import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import EventsMap from "./pages/Home";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={EventsMap} />
    </BrowserRouter>
  );
}

export default Routes;
