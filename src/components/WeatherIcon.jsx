import { motion } from "framer-motion";

const WeatherIcon = ({ condition, isDay }) => {
  const text = condition.toLowerCase();

  // Sunny / Clear
  if (text.includes("sun") || text.includes("clear")) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.6)]"
        />
        <div className="absolute w-20 h-20 border-2 border-dashed border-yellow-200/30 rounded-full animate-[spin_15s_linear_infinite]" />
      </div>
    );
  }

  // Rainy
  if (text.includes("rain") || text.includes("drizzle")) {
    return (
      <div className="relative w-24 h-24 flex flex-col items-center">
        <div className="w-16 h-10 bg-slate-300 rounded-full blur-[1px] shadow-lg relative z-10" />
        <div className="flex gap-2 mt-1">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, 15], opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              className="w-[2px] h-3 bg-blue-400 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  // Cloudy
  if (text.includes("cloud") || text.includes("overcast")) {
    return (
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ x: [-5, 5] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-4 left-2 w-16 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-xl z-20"
        />
        <div className="absolute top-6 left-8 w-14 h-9 bg-slate-200/50 backdrop-blur-sm rounded-full z-10" />
      </div>
    );
  }

  // Night / Moon (If it's night time)
  if (!isDay) {
    return (
      <motion.div
        animate={{ rotate: [-5, 5] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        className="w-16 h-16 bg-gradient-to-tr from-slate-100 to-slate-400 rounded-full shadow-[inset_-8px_-4px_0_0_rgba(0,0,0,0.1),0_0_30px_rgba(255,255,255,0.2)] relative"
      >
         <div className="absolute top-4 left-6 w-2 h-2 bg-black/10 rounded-full" />
         <div className="absolute top-8 left-3 w-3 h-3 bg-black/10 rounded-full" />
      </motion.div>
    );
  }

  // Fallback to default API icon if no match
  return <img src={condition} className="w-20 h-20" alt="weather" />;
};

export default WeatherIcon;