// import { useState, useEffect } from "react";
// import { motion, animate } from "framer-motion";

// /* --- 1. WEATHER EFFECTS (Rain, Snow, etc.) --- */
// function WeatherEffects({ condition, isDay }) {
//   const text = condition.toLowerCase();
//   const isRain = text.includes("rain") || text.includes("drizzle");
//   const isSnow = text.includes("snow") || text.includes("ice");

//   return (
//     <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[31px] z-0">
//       <div className={`absolute inset-0 transition-colors duration-1000 ${isDay ? 'bg-blue-400/5' : 'bg-indigo-900/20'}`} />
//       {isRain && [...Array(25)].map((_, i) => (
//         <div key={i} className="absolute bg-white/30 w-[1.5px] h-12 animate-[fall_0.6s_linear_infinite]"
//           style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 20}%`, animationDelay: `${Math.random() * 2}s` }} />
//       ))}
//       {isSnow && [...Array(20)].map((_, i) => (
//         <div key={i} className="absolute bg-white rounded-full blur-[1px] animate-[fall_3s_linear_infinite]"
//           style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 10}%`, width: '5px', height: '5px', animationDelay: `${Math.random() * 4}s` }} 
//         />
//       ))}
//     </div>
//   );
// }

// /* --- 2. AQI SECTION --- */
// function AQISection({ value }) {
//   const aqiTips = ["Perfect day.", "Limit exertion.", "Wear a mask.", "Stay indoors.", "Use purifiers.", "Health alert!"];
//   const index = Math.min(Math.max(value - 1, 0), 5);
//   return (
//     <div className="flex flex-col gap-6 w-full">
//       <div className="flex justify-between items-center">
//         <p className="opacity-50 text-[11px] uppercase font-black tracking-widest">Air Quality</p>
//         <span className="text-[12px] font-bold text-white/90">Index: {value}</span>
//       </div>
//       <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
//         <motion.div initial={{ width: 0 }} animate={{ width: `${((index + 1) / 6) * 100}%` }} className="h-full bg-white/60 rounded-full" />
//       </div>
//       <p className="text-[13px] text-white/40 italic font-medium leading-tight">“{aqiTips[index]}”</p>
//     </div>
//   );
// }

// /* --- 3. SUN ARC --- */
// function SunArc({ astro, progress }) {
//   return (
//     <div className="flex flex-col items-center gap-2 w-full pt-1">
//       <div className="relative w-full h-14 border-b border-white/10 overflow-hidden">
//         <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-dashed border-white/10" />
//         <motion.div 
//           className="absolute w-4 h-4 bg-yellow-400 rounded-full z-20 shadow-[0_0_20px_#facc15] border border-white/20"
//           style={{ left: '50%', top: '12px', offsetPath: "path('M -80 40 A 80 40 0 0 1 80 40')", offsetDistance: `${progress}%` }}
//           animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
//         />
//       </div>
//       <div className="flex justify-between w-full mt-2 px-2">
//         <div className="text-center"><p className="text-[10px] opacity-40 font-black uppercase">Rise</p><p className="text-[12px] font-extrabold">{astro.sunrise}</p></div>
//         <div className="text-center"><p className="text-[10px] opacity-40 font-black uppercase">Set</p><p className="text-[12px] font-extrabold">{astro.sunset}</p></div>
//       </div>
//     </div>
//   );
// }

// /* --- 4. MAIN WEATHER CARD --- */
// function WeatherCard({ data }) {
//   if (!data?.current) return null;
//   const { current, location, forecast } = data;
//   const astro = forecast.forecastday[0].astro;
//   const isDay = current.is_day === 1;

//   // Formatting Date and Time
//   const localTime = new Date(location.localtime);
//   const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//   const formattedDate = localTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' });

//   const getSunProgress = () => {
//     const now = new Date().getTime();
//     const sunrise = new Date(`${forecast.forecastday[0].date} ${astro.sunrise}`).getTime();
//     const sunset = new Date(`${forecast.forecastday[0].date} ${astro.sunset}`).getTime();
//     if (now < sunrise) return 0; if (now > sunset) return 100;
//     return ((now - sunrise) / (sunset - sunrise)) * 100;
//   };

//   return (
//     <div className="glass-card rounded-[32px] p-10 h-full min-h-[500px] relative overflow-hidden border border-white/10 flex flex-col justify-between">
      
//       <WeatherEffects condition={current.condition.text} isDay={isDay} />

//       <div className="relative z-10">
//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-3">
//             <h2 className="text-4xl font-black tracking-tight leading-none">{location.name}</h2>
//             {/* Country Shortcut Badge */}
//             <span className="bg-white/10 px-2 py-0.5 rounded-md text-[12px] font-black text-white/60 border border-white/10 uppercase">
//               {location.country.substring(0, 3)}
//             </span>
//           </div>
          
//           {/* Time and Date Row */}
//           <div className="flex items-center gap-3 mt-1">
//             <p className="text-lg font-bold text-white/80">{formattedTime}</p>
//             <div className="w-[1px] h-4 bg-white/20" />
//             <p className="text-[14px] font-medium text-white/40 uppercase tracking-widest">{formattedDate}</p>
//           </div>
//         </div>
        
//         <div className="flex flex-col items-center my-6">
//           <img src={`https:${current.condition.icon}`} className="w-28 h-28 drop-shadow-2xl" alt="icon" />
//           <h1 className="text-8xl font-black tracking-tighter leading-none">{Math.round(current.temp_c)}°</h1>
//           <p className="text-xl font-bold opacity-60 uppercase tracking-[0.3em] mt-3">{current.condition.text}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10 relative z-10">
//         <AQISection value={current.air_quality?.["us-epa-index"] || 1} />
//         <SunArc astro={astro} progress={getSunProgress()} />
//       </div>

//       <style jsx global>{`
//         @keyframes fall {
//           from { transform: translateY(-30px); opacity: 0; }
//           50% { opacity: 1; }
//           to { transform: translateY(500px); opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default WeatherCard;




import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";

/* --- 1. WEATHER EFFECTS (Rain, Snow, etc.) --- */
function WeatherEffects({ condition, isDay }) {
  const text = condition.toLowerCase();
  const isRain = text.includes("rain") || text.includes("drizzle");
  const isSnow = text.includes("snow") || text.includes("ice");

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[31px] z-0">
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDay ? 'bg-blue-400/5' : 'bg-indigo-900/20'}`} />
      
      {/* Rain Animation */}
      {isRain && [...Array(30)].map((_, i) => (
        <div key={i} className="absolute bg-white/30 w-[1.5px] h-12 animate-[fall_0.6s_linear_infinite]"
          style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 20}%`, animationDelay: `${Math.random() * 2}s` }} />
      ))}
      
      {/* Snow Animation */}
      {isSnow && [...Array(20)].map((_, i) => (
        <div key={i} className="absolute bg-white rounded-full blur-[1px] animate-[fall_3s_linear_infinite]"
          style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 10}%`, width: '6px', height: '6px', animationDelay: `${Math.random() * 4}s` }} 
        />
      ))}
    </div>
  );
}

/* --- 2. AQI SECTION --- */
function AQISection({ value }) {
  const aqiTips = ["Perfect day.", "Limit exertion.", "Wear a mask.", "Stay indoors.", "Use purifiers.", "Health alert!"];
  const index = Math.min(Math.max(value - 1, 0), 5);
  
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-end pb-1">
      <div className="flex justify-between items-center">
        <p className="opacity-50 text-[11px] uppercase font-black tracking-widest">Air Quality</p>
        <span className="text-[12px] font-bold text-white/90">Index: {value}</span>
      </div>
      <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${((index + 1) / 6) * 100}%` }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-white/60 rounded-full" 
        />
      </div>
      <p className="text-[13px] text-white/40 italic font-medium leading-tight">“{aqiTips[index]}”</p>
    </div>
  );
}

/* --- 3. SUN ARC --- */
function SunArc({ astro, progress }) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="relative w-full h-16 border-b border-white/10 overflow-hidden">
        {/* The Semi-Circle Path */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-dashed border-white/10" />
        
        {/* The Sun Indicator */}
        <motion.div 
          className="absolute w-5 h-5 bg-yellow-400 rounded-full z-20 shadow-[0_0_25px_#facc15] border border-white/20"
          style={{ 
            left: '50%', 
            top: '14px', 
            offsetPath: "path('M -80 40 A 80 40 0 0 1 80 40')", 
            offsetDistance: `${progress}%` 
          }}
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      <div className="flex justify-between w-full mt-2 px-2">
        <div className="text-center">
          <p className="text-[10px] opacity-40 font-black uppercase tracking-widest">Rise</p>
          <p className="text-[13px] font-extrabold text-white/90">{astro.sunrise}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] opacity-40 font-black uppercase tracking-widest">Set</p>
          <p className="text-[13px] font-extrabold text-white/90">{astro.sunset}</p>
        </div>
      </div>
    </div>
  );
}

/* --- 4. MAIN WEATHER CARD --- */
function WeatherCard({ data }) {
  if (!data?.current || !data?.location || !data?.forecast) return null;

  const { current, location, forecast } = data;
  const astro = forecast.forecastday[0].astro;
  const isDay = current.is_day === 1;

  // Formatting Date and Time from API LocalTime
  const localTime = new Date(location.localtime);
  const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedDate = localTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' });

  // Improved Sun Progress Logic (Resets at night)
  const getSunProgress = () => {
    const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") hours = "00";
        if (modifier === "PM") hours = parseInt(hours, 10) + 12;
        return new Date(`${forecast.forecastday[0].date} ${hours}:${minutes}`).getTime();
    };

    const now = new Date(location.localtime).getTime();
    const sunrise = parseTime(astro.sunrise);
    const sunset = parseTime(astro.sunset);
    
    if (now < sunrise || now > sunset) return 0; // Sun resets to start position at night
    return ((now - sunrise) / (sunset - sunrise)) * 100;
  };

  return (
    <div className="glass-card rounded-[32px] p-10 h-full min-h-[520px] relative overflow-hidden border border-white/10 flex flex-col justify-between shadow-2xl transition-all duration-500">
      
      {/* Background Weather Animations */}
      <WeatherEffects condition={current.condition.text} isDay={isDay} />

      {/* Header Section */}
      <div className="relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black tracking-tight leading-none text-white">{location.name}</h2>
            <span className="bg-white/10 px-2 py-0.5 rounded-md text-[12px] font-black text-white/70 border border-white/10 uppercase tracking-wider">
              {location.country.substring(0, 3)}
            </span>
          </div>
          
          <div className="flex items-center gap-3 mt-1.5">
            <p className="text-xl font-bold text-white/90">{formattedTime}</p>
            <div className="w-[1px] h-4 bg-white/20" />
            <p className="text-[15px] font-medium text-white/40 uppercase tracking-[0.2em]">{formattedDate}</p>
          </div>
        </div>
        
        {/* Hero Temperature Section */}
        <div className="flex flex-col items-center my-10">
          <motion.img 
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 3 }}
            src={`https:${current.condition.icon}`} 
            className="w-32 h-32 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
            alt="weather icon" 
          />
          <h1 className="text-8xl font-black tracking-tighter leading-none text-white">{Math.round(current.temp_c)}°</h1>
          <p className="text-2xl font-bold opacity-70 uppercase tracking-[0.3em] mt-4 text-white">{current.condition.text}</p>
        </div>
      </div>

      {/* FOOTER SECTION: Perfectly Aligned AQI & Sun Arc */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10 relative z-10 items-end">
        <AQISection value={current.air_quality?.["us-epa-index"] || 1} />
        <SunArc astro={astro} progress={getSunProgress()} />
      </div>

      {/* Global CSS for Falling Rain/Snow */}
      <style jsx global>{`
        @keyframes fall {
          from { transform: translateY(-40px); opacity: 0; }
          30% { opacity: 1; }
          to { transform: translateY(520px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default WeatherCard;