import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import HourlyForecast from "../components/HourlyForecast";
import Forecast from "../components/Forecast";
import MapView from "../components/MapView";
import HealthWidgets from "../components/HealthWidgets";
import WeatherBackground from "../components/WeatherBackground";
import { motion } from "framer-motion";

function Home({ data, onSearch }) {
  if (!data) return <div className="h-screen bg-[#0a0f1e]" />;

  return (
    <div className="relative min-h-screen bg-[#0a0f1e] overflow-x-hidden selection:bg-blue-500/30">
      
      <WeatherBackground condition={data.current.condition.text} />

      <Navbar onSearch={onSearch} />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-[1600px] mx-auto p-4 lg:p-8 flex flex-col gap-10"
      >
        
        {/* --- TOP ROW: Expanded WeatherCard & Shrunk Insights --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* WeatherCard: Takes 70% of width (Expanded) */}
          <div className="lg:w-[70%] flex-none">
            <WeatherCard data={data} />
          </div>

          {/* Environmental Insights: Takes 30% of width (Shrunk) */}
          <div className="lg:w-[30%] flex-grow">
            <HealthWidgets data={data} />
          </div>
        </div>

        {/* --- MIDDLE SECTION: Stacked Forecasts --- */}
        <div className="flex flex-col gap-8">
          <HourlyForecast data={data} />
          
          <div className="glass-card rounded-[32px] p-8 relative overflow-hidden border border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-white/20"></span>
              7-Day Forecast
            </h3>
            <Forecast data={data} />
          </div>
        </div>

        {/* --- BOTTOM SECTION: FIXED MAP VISIBILITY --- */}
        <div className="w-full h-[500px] min-h-[500px] mb-10">
          <div className="glass-card rounded-[32px] overflow-hidden h-full border border-white/10 shadow-2xl relative z-10">
            <div className="absolute top-6 left-6 z-[50] bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] border border-white/10 flex items-center gap-2 shadow-xl">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]"></span>
              LIVE INTERACTIVE RADAR
            </div>
            
            {/* MapView must fill its parent height */}
            <div className="w-full h-full min-h-full">
               <MapView data={data} />
            </div>
          </div>
        </div>

      </motion.main>
    </div>
  );
}

export default Home;