import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    if (!city) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        className="px-4 py-2 rounded-lg outline-none w-64"
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;