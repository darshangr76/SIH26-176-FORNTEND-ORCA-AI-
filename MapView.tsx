"use client";

import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const vesselPosition: [number, number] = [12.8500, 74.8200];

const fishingZone: [number, number] = [12.7600, 74.9500];

const route: [number, number][] = [
  vesselPosition,
  [12.8250, 74.8500],
  [12.7900, 74.9000],
  fishingZone,
];

const vesselIcon = L.divIcon({
  className: "orca-marker",
  html: `<div class="vessel-marker">🚤</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const pfzIcon = L.divIcon({
  className: "orca-marker",
  html: `<div class="pfz-marker">🎯</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function MapView() {
  return (
    <div className="orca-map-wrapper">

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={false}
        className="orca-map"
      >
    <TileLayer
       attribution='&copy; OpenStreetMap contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
       

        <ZoomControl position="bottomright" />

        {/* VESSEL */}
        <Marker
          position={vesselPosition}
          icon={vesselIcon}
        >
          <Popup>
            <strong>Your Vessel</strong>
            <br />
            Mangaluru Coast
          </Popup>
        </Marker>

        {/* PFZ */}
        <Marker
          position={fishingZone}
          icon={pfzIcon}
        >
          <Popup>
            <strong>Potential Fishing Zone</strong>
            <br />
            Favourable fishing conditions
          </Popup>
        </Marker>

        {/* PFZ AREA */}
        <Circle
          center={fishingZone}
          radius={4500}
          pathOptions={{
            color: "#16d47b",
            fillColor: "#16d47b",
            fillOpacity: 0.18,
            weight: 3,
            dashArray: "8 6",
          }}
        />

        {/* RISK AREA */}
        <Circle
          center={[12.88, 75.05]}
          radius={5500}
          pathOptions={{
            color: "#ff5b68",
            fillColor: "#ff5b68",
            fillOpacity: 0.16,
            weight: 3,
            dashArray: "8 6",
          }}
        >
          <Popup>
            <strong>Risk Zone</strong>
            <br />
            Avoid this area.
          </Popup>
        </Circle>

        {/* RECOMMENDED ROUTE */}
        <Polyline
          positions={route}
          pathOptions={{
            color: "#249cff",
            weight: 5,
            opacity: 0.95,
          }}
        />

      </MapContainer>

      

      {/* LEGEND */}
      <div className="marine-map-legend">

        <div>
          <i className="legend-safe" />
          Safe
        </div>

        <div>
          <i className="legend-caution" />
          Caution
        </div>

        <div>
          <i className="legend-risk" />
          Risk
        </div>

        <div>
          <i className="legend-route" />
          Recommended Route
        </div>

      </div>

    </div>
  );
}