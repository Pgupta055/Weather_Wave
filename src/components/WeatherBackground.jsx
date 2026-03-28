import React from 'react';

const WeatherBackground = ({ condition }) => {
  const text = condition?.toLowerCase() || "";

  // 1. THUNDER FLASH EFFECT
  const isThunder = text.includes("thunder") || text.includes("lightning");
  
  // 2. RAIN EFFECT
  if (text.includes("rain") || text.includes("drizzle") || text.includes("showers")) {
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${isThunder ? 'animate-[thunder_5s_infinite]' : ''}`}>
        <div className="rain-container absolute inset-0 opacity-40">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="rain-drop" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random() * 2}s` 
              }} 
            />
          ))}
        </div>
      </div>
    );
  }

  // 3. SNOW EFFECT
  if (text.includes("snow") || text.includes("ice") || text.includes("blizzard")) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-900/20">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="snow-flake" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }} 
          />
        ))}
      </div>
    );
  }

  // 4. MIST / FOG EFFECT
  if (text.includes("mist") || text.includes("fog") || text.includes("overcast")) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden blur-[80px] opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-gray-200 to-slate-500 animate-[fog_20s_linear_infinite]" />
      </div>
    );
  }

  return null; // No effect for clear/sunny days
};

export default WeatherBackground;