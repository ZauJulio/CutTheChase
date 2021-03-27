import L from "leaflet";

const iconMarker = L.icon({
  iconUrl: require("../public/map-marker.svg"),
  iconSize: [50, 60],
  iconAnchor: [25, 68],
  popupAnchor: [0, -60],
});

export default iconMarker;