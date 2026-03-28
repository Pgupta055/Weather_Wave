import { motion } from "framer-motion"; // CRITICAL: This prevents the 'not defined' error

function Forecast({ data }) {
  if (!data?.forecast?.forecastday) return null;

  const days = data.forecast.forecastday;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
      {days.map((day, index) => (
        <motion.div
          key={index}
          // Animation: Days pop in one by one
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl text-center shadow-lg border border-white/10 hover:bg-white/20 transition-colors"
        >
          <p className="font-bold text-xs uppercase tracking-widest opacity-60">
            {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
          </p>

          <img
            src={`https:${day.day.condition.icon}`}
            alt=""
            className="mx-auto w-12 h-12 my-2 drop-shadow-md"
          />

          <div className="flex justify-center gap-2 items-baseline">
            <span className="text-lg font-bold">{Math.round(day.day.maxtemp_c)}°</span>
            <span className="text-xs opacity-50">{Math.round(day.day.mintemp_c)}°</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Forecast;