import React from "react";

/**
 * ScoreTable lists each challenge with score and formatted timestamp.
 * @param {Array} points - array of { title, score, timestamp } entries
 */
export default function ScoreTable({ points }) {
  // Sort points by timestamp
  const sorted = [...points].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-3 text-left">Challenge</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, i) => (
            <tr key={i} className="border-t border-gray-600">
              <td className="p-3">{p.title}</td>
              <td className="p-3">{p.score}</td>
              <td className="p-3 text-gray-300">
                {new Date(p.timestamp).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
