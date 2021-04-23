import { useState, useEffect } from "react";

interface Position {
  lat: number;
  lng: number;
}

interface useLocationProps {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

// Temporary solution to correct the rendering and update problem of the position
// of position, using a variable for comparison _postition
// https://stackoverflow.com/a/58877875

function useLocation(props?: useLocationProps) {
  const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 });
  const { enableHighAccuracy = false, maximumAge = 300000, timeout = 10000 } =
    props ?? {};

  var watcher: number;
  var _position = position;

  function onChange({ coords }) {
    if (coords.latitude != _position.lat || coords.longitude != _position.lng) {
      _position = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      setPosition(_position);
    }
  }

  useEffect(() => {
    if (typeof navigator.geolocation !== "undefined") {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        (err) => console.log(err),
        { enableHighAccuracy, maximumAge, timeout }
      );
    }
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return position;
}

export default useLocation;
