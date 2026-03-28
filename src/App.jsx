import { useState, useEffect } from "react";
import Home from "./pages/Home";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London"); // Default starting city
  const API_KEY = "7de48b25e82b4dbdb52200657262503"; 

  // 1. AUTO-LOCATION: Tries to find the user's city on load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // WeatherAPI allows "lat,lon" as a search query
          setCity(`${latitude},${longitude}`); 
        },
        () => {
          console.log("Location access denied. Staying on default city.");
        }
      );
    }
  }, []);

  // 2. MAIN API CALL: Includes 'aqi=yes' for your Health Widgets
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // We add &aqi=yes to the end of this URL string
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          console.error("API Error:", data.error.message);
        } else {
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Network Error:", error);
      }
    };

    fetchWeather();

    // Auto-refresh every 15 minutes to keep the 'Live Radar' updated
    const interval = setInterval(fetchWeather, 900000);
    return () => clearInterval(interval);
  }, [city]); 

  return (
    <div className="app min-h-screen bg-[#0a0f1e] selection:bg-blue-500/30">
      {/* Pass the city setter to onSearch so the Navbar can update it */}
      <Home data={weatherData} onSearch={setCity} />
    </div>
  );
}

export default App;