// src/pages/scoreboard/ScoreTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ScoreTable({ rows }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto text-left bg-gray-800 rounded-lg">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-sm text-gray-300">Place</th>
            <th className="p-3 text-sm text-gray-300">Username</th>
            <th className="p-3 text-sm text-gray-300">Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.rank}
              className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => navigate(`/myscore/${row.username}`)}
            >
              <td className="p-3 font-mono text-gray-100">{row.rank}</td>
              <td className="p-3 text-teal-300 hover:underline">
                {row.username}
              </td>
              <td className="p-3 text-gray-100">{row.total_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
