import React from "react";
import { motion } from "framer-motion";

export default function ChallengeCard({ data, solved, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        cursor-pointer p-4 rounded-lg shadow
        ${solved ? "bg-teal-700/40" : "bg-gray-800 hover:bg-gray-700"}
        flex flex-col justify-between
        aspect-square
        max-w-xs mx-auto
      `}
    >
      <div>
        <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
        <p className="text-gray-400 text-sm line-clamp-5">{data.description}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-teal-400 font-bold">{data.score} pts</span>
        {solved && <span className="text-green-400 font-medium">Solved ✔</span>}
      </div>
    </motion.div>
  );
}
