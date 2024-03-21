import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "../styles/Map.css";

function Map() {
  const position = [41.3851, 2.1734]; // Set your initial position [lat, lng]

  return (
    <div className="map">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;