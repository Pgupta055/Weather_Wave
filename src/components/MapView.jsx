import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// ✅ Fix Leaflet marker icon issue (important for Vite/React)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ✅ Helper: smooth fly animation when location changes
function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lon], 10, {
      animate: true,
      duration: 1.5,
    });
  }, [lat, lon, map]);

  return null;
}

function MapView({ data }) {
  if (!data?.location) return null;

  const { lat, lon } = data.location;

  return (
    <div className="w-full h-full min-h-[500px] rounded-[32px] overflow-hidden bg-[#0d0e12]">
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        {/* ✅ Dark Map (NO API KEY needed) */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* ✅ Marker */}
        <Marker position={[lat, lon]}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="font-bold text-slate-900">
                {data.location.name}
              </p>
              <p className="text-blue-600 font-bold">
                {data.current.temp_c}°C
              </p>
            </div>
          </Popup>
        </Marker>

        {/* ✅ Smooth recenter */}
        <RecenterMap lat={lat} lon={lon} />
      </MapContainer>

      {/* ✅ Clean CSS (NO DARK FILTER ISSUE) */}
      <style jsx global>{`
        .leaflet-container {
          background: #0d0e12 !important;
          outline: none;
        }

        /* REMOVE DARK FILTER */
        .leaflet-tile {
          filter: none;
        }

        /* Popup styling */
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95) !important;
          border-radius: 12px !important;
        }
      `}</style>
    </div>
  );
}

export default MapView;