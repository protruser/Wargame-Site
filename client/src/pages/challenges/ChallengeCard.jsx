// src/pages/challenges/ChallengeCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ChallengeCard({ data, solved, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={`
        cursor-pointer p-6 rounded-lg shadow
        transition hover:-translate-y-1
        ${solved ? "bg-teal-700/40" : "bg-gray-800 hover:bg-gray-700"}
      `}
    >
      <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
      <p className="text-gray-400 text-sm line-clamp-2">{data.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-teal-400 font-bold">{data.score} pts</span>
        {solved && <span className="text-green-400 font-medium">Solved ✔</span>}
      </div>
    </motion.div>
  );
}
