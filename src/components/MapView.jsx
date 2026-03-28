import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
const apiKey = import.meta.env.VITE_STADIA_API_KEY;
// Helper to fly to new location when city changes
function RecenterMap({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 10, { animate: true, duration: 1.5 });
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
        {/* --- HIGH VISIBILITY DARK TILES --- 
            This URL specifically includes 'labels' and 'roads' in high-contrast silver/white
        */}
        

<TileLayer
  attribution='&copy; Stadia Maps, &copy; OpenMapTiles, &copy; OpenStreetMap contributors'
  url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${apiKey}`}
/>

        {/* Optional: Add a subtle blue glow to the user's location marker */}
        <Marker position={[lat, lon]}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="font-bold text-slate-900">{data.location.name}</p>
              <p className="text-blue-600 font-bold">{data.current.temp_c}°C</p>
            </div>
          </Popup>
        </Marker>

        <RecenterMap lat={lat} lon={lon} />
      </MapContainer>

      {/* Internal CSS to ensure the map labels don't get blurred by the glass effect */}
      <style jsx global>{`
        .leaflet-container {
          background: #0d0e12 !important;
          outline: none;
        }
        /* Ensure the tiles are crisp and text is readable */
        .leaflet-tile {
          filter: brightness(0.8) contrast(1.2);
        }
        /* Style the popup to match your glass theme */
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.9) !important;
          border-radius: 12px !important;
        }
      `}</style>
    </div>
  );
}

export default MapView;