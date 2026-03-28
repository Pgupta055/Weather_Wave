import { motion } from "framer-motion";

function HourlyForecast({ data }) {
  if (!data?.forecast?.forecastday) return null;

  const hours = data.forecast.forecastday[0].hour;

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6">
      <div className="flex gap-5"> 
        {hours.map((hour, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            /* Updated classes: 
               - Added 'text-white' to parent
               - Improved glass border on hover
            */
            className="bg-white/5 backdrop-blur-md text-white p-5 rounded-[24px] text-center min-w-[110px] border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all shadow-xl group cursor-pointer"
          >
            {/* Time label: Forced white with 40% opacity */}
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
              {new Date(hour.time).getHours()}:00
            </p>

            <img
              src={`https:${hour.condition.icon}`}
              alt="weather"
              className="mx-auto w-12 h-12 mb-2 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
            />

            {/* Main Temperature: Bold Pure White */}
            <p className="text-xl font-bold tracking-tighter text-white">
              {Math.round(hour.temp_c)}°
            </p>
            
            {/* Humidity: Forced white with 30% opacity */}
            <p className="text-[9px] text-white/30 mt-1 font-medium">
              💧 {hour.humidity}%
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;