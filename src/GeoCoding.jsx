import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
export default function GeoCoding() {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 25.61000000000001,
    longitude: 85.14139,
    zoom: 8,
  });
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  useEffect(() => {
    console.log(viewport.longitude, viewport.latitude);
    // // GET Request.
    // fetch(
    //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${viewport.longitude},${viewport.latitude}.json?limit=1&access_token=pk.eyJ1IjoiYXNtZGFzZGFkIiwiYSI6ImNrdXl0ZXU0NDNjcGcydnFyNXJ4eHgxeW0ifQ.zc06sT9W0yViwa4SX1gXXQ`
    // )
    //   // Handle success
    //   .then((response) => response.json()) // convert to json
    //   .then((json) => console.log(json)) //print data to console
    //   .catch((err) => console.log("Request Failed", err)); // Catch errors
  }, [viewport]);

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position="top-left"
        // inputValue={`${viewport.latitude},${viewport.longitude}`}
        // reverseGeocode
      />
    </ReactMapGL>
  );
}
