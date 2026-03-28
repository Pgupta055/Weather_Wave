import { useState } from "react";

function Navbar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput(""); // Clears the bar after searching
    }
  };

  return (
    <nav className="w-full bg-white/5 backdrop-blur-md text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌦</span>
        <h1 className="text-xl font-bold tracking-tighter uppercase">SkyCast Pro</h1>
      </div>

      {/* SEARCH FORM */}
      <form onSubmit={handleSubmit} className="relative w-full md:w-96">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search city (e.g. Mumbai, New York)..."
          className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-6 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder:text-white/40 text-sm"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold transition-colors"
        >
          SEARCH
        </button>
      </form>

      <div className="hidden md:block text-[10px] font-bold opacity-40 tracking-[0.2em]">
        REAL-TIME SATELLITE DATA
      </div>
    </nav>
  );
}

export default Navbar;