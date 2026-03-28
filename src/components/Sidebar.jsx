import { motion } from "framer-motion";

const GlobalCities = [
  { name: "New York", icon: "🗽" },
  { name: "London", icon: "🎡" },
  { name: "Tokyo", icon: "🗼" },
  { name: "Dubai", icon: "🏙️" },
  { name: "Paris", icon: "🗼" },
  { name: "Mumbai", icon: "🐘" }
];

const Sidebar = ({ onCitySelect, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Toggle Button (Visible only on small screens) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[2000] bg-blue-500 p-4 rounded-full shadow-2xl text-xl"
      >
        {isOpen ? "✕" : "🌍"}
      </button>

      {/* The Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed top-0 left-0 h-screen w-72 glass-card z-[1500] border-r border-white/10 flex flex-col p-6 backdrop-blur-2xl transition-all duration-500 ease-in-out lg:translate-x-0"
      >
        <div className="mb-10 mt-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">Command Center</h2>
          <p className="text-xl font-black italic tracking-tighter mt-1">GLOBAL HUBS</p>
        </div>

        <nav className="flex flex-col gap-3">
          {GlobalCities.map((city) => (
            // Change this section in your Sidebar.jsx map function:
<motion.button
  key={city.name}
  onClick={() => onCitySelect(city.name)}
  className="flex items-center justify-between p-4 rounded-2xl border border-white/5 transition-all text-left group bg-white/5 hover:bg-white/10"
>
  <div className="flex items-center gap-3">
    <span className="text-lg">{city.icon}</span>
    {/* Explicitly set text-white here */}
    <span className="text-sm font-bold tracking-wide text-white opacity-80 group-hover:opacity-100">
      {city.name}
    </span>
  </div>
  <span className="text-[10px] text-white opacity-20 group-hover:opacity-100">VIEW →</span>
</motion.button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
          <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest leading-relaxed">
            Select a city to sync the radar and environmental data.
          </p>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;