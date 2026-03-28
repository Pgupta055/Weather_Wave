import { motion } from "framer-motion";

function HealthWidgets({ data }) {
  if (!data?.current) return null;

  const { current } = data;

  const insights = [
    { label: "UV Index", value: current.uv, desc: current.uv > 5 ? "High" : "Moderate", icon: "☀️", color: "shadow-yellow-500/40" },
    { label: "Wind Speed", value: `${current.wind_kph} km/h`, desc: current.wind_dir, icon: "💨", color: "shadow-blue-400/40" },
    { label: "Humidity", value: `${current.humidity}%`, desc: "Moisture level", icon: "💧", color: "shadow-cyan-400/40" },
    { label: "Visibility", value: `${current.vis_km} km`, desc: "Clear air", icon: "👁️", color: "shadow-white/20" },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {insights.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card flex-1 rounded-[24px] p-5 flex items-center justify-between border border-white/5 hover:bg-white/10 transition-all group"
        >
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-1">
              {item.label}
            </p>
            <p className="text-2xl font-black text-white tracking-tight">{item.value}</p>
            <p className="text-[9px] text-white/20 font-bold mt-1 uppercase tracking-widest">
              {item.desc}
            </p>
          </div>
          
          {/* PERMANENT GLOW ICON SECTION */}
          <div className="relative">
            {/* The Outer Glow Layer */}
            <div className={`absolute inset-0 blur-[15px] opacity-60 ${item.color} rounded-full`}></div>
            
            {/* The Actual Icon (Full opacity and color by default) */}
            <span className="relative z-10 text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              {item.icon}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default HealthWidgets;