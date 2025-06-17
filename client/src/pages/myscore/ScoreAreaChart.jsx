import React from "react";
import Chart from "react-apexcharts";

/**
 * ScoreAreaChart renders an area chart of cumulative score over time.
 * @param {Array} points - array of { timestamp, score } entries
 */
export default function ScoreAreaChart({ points }) {
  // Sort points by timestamp ascending
  const sorted = [...points].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  // Build series data: cumulative sum
  const series = [
    {
      name: "Total Score",
      data: sorted.map((p, idx) => ({
        x: new Date(p.timestamp).getTime(),
        y: sorted.slice(0, idx + 1).reduce((sum, cur) => sum + cur.score, 0),
      })),
    },
  ];

  const options = {
    chart: {
      type: "area",
      foreColor: "#E5E7EB",
      toolbar: { show: true, tools: { zoomin: true, zoomout: true } },
      zoom: { enabled: true },
    },
    xaxis: {
      type: "datetime",
      datetimeUTC: false,
      labels: { style: { colors: "#E5E7EB" }, format: "yyyy-MM-dd HH:mm:ss" },
    },
    yaxis: { labels: { style: { colors: "#E5E7EB" } } },
    tooltip: { theme: "dark", x: { format: "yyyy-MM-dd HH:mm:ss" } },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#3b82f6"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: { borderColor: "#374151" },
  };

  return <Chart options={options} series={series} type="area" height={350} />;
}
