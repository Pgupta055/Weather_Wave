import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function TempChart({ data }) {

if (!data?.forecast?.forecastday) return null;

  const hours = data.forecast.forecastday[0].hour;

  const chartData = {
    labels: hours.map(h => h.time.split(" ")[1]),
    datasets: [
      {
        label: "Temperature (°C)",
        data: hours.map(h => h.temp_c),
      }
    ]
  };

  return (
    <div className="bg-white/20 p-4 rounded-xl mt-6 w-full max-w-3xl">
      <Line data={chartData} />
    </div>
  );
}

export default TempChart;