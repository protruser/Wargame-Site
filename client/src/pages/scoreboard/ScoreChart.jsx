import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ScoreChart component: Renders a line chart of top 10 users' cumulative scores over time
export default function ScoreChart({ data }) {
  // Filter top 10 ranked users and sort by rank
  const top10 = data
    .filter((u) => u.rank >= 1 && u.rank <= 10)
    .sort((a, b) => a.rank - b.rank);

  // Collect all unique timestamps and sort them in ascending order
  const allTimestamps = Array.from(
    new Set(top10.flatMap((u) => u.points.map((p) => p.timestamp)))
  ).sort((a, b) => new Date(a) - new Date(b));

  // Build a cumulative score map for each user across all timestamps
  const userCumMap = {};
  top10.forEach((user) => {
    // Sort user's score events by timestamp
    const sorted = [...user.points].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    let cum = 0;
    const map = {};

    // Calculate cumulative scores per timestamp
    sorted.forEach((p) => {
      cum += p.score;
      map[p.timestamp] = cum;
    });

    // Interpolate scores to fill in all timestamps
    let lastScore = 0;
    const fullMap = {};
    allTimestamps.forEach((ts) => {
      if (map[ts] != null) {
        lastScore = map[ts];
      }
      fullMap[ts] = lastScore;
    });

    userCumMap[user.username] = fullMap;
  });

  // Format chart data: each entry contains timestamp and each user's score
  const chartData = allTimestamps.map((ts) => {
    const row = { timestamp: ts };
    top10.forEach((user) => {
      row[user.username] = userCumMap[user.username][ts];
    });
    return row;
  });

  // Preset color palette for user lines
  const colors = [
    "#A855F7",
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
    "#F97316",
    "#22D3EE",
    "#F43F5E",
  ];

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">
        Top 10 Users Over Time
      </h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            {/* X-axis with formatted date labels */}
            <XAxis
              dataKey="timestamp"
              type="category"
              interval={0}
              tickFormatter={(ts) =>
                new Date(ts).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              stroke="#DDD"
            />
            {/* Y-axis for score */}
            <YAxis
              stroke="#DDD"
              domain={[0, "dataMax + 10"]}
              allowDataOverflow={true}
            />
            {/* Tooltip shows score on hover */}
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
              itemStyle={{ color: "#FFF" }}
              labelFormatter={(label) =>
                new Date(label).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }
            />
            {/* Legend to distinguish users */}
            <Legend wrapperStyle={{ color: "#FFF" }} />
            {/* Line for each user */}
            {top10.map((user, idx) => (
              <Line
                key={user.username}
                type="monotone"
                dataKey={user.username}
                stroke={colors[idx]}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
