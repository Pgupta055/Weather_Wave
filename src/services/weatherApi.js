const API_KEY = "7de48b25e82b4dbdb52200657262503";

export const getWeather = async (city) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes`
  );

  const data = await res.json();
  return data;
};



