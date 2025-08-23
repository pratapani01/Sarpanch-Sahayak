import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapDisplay = ({ position, description }) => {
  // position should be an array like [latitude, longitude]
  if (!position || position.length !== 2) {
    return <div>Invalid location data</div>;
  }

  return (
    <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {description}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;