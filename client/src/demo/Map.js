import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/Map.css";

const Map = () => {
  return (
    <div className="map-container">
      <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[1.3521, 103.8198]}>
          <Popup>
            Singapore
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
