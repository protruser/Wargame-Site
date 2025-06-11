// src/pages/challenges/ChallengeModal.jsx
import React, { useState } from "react";

export default function ChallengeModal({ challenge, onClose }) {
  const [flag, setFlag] = useState("");
  const [msg, setMsg] = useState("");

  const submitFlag = () => {
    fetch(
      `http://localhost:3000/api/challenges/${challenge.challenge_id}/solve`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ flag }),
      }
    )
      .then((r) => r.json())
      .then((res) => setMsg(res.message))
      .catch(() => setMsg("Error"));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 w-full max-w-lg p-6 rounded shadow relative">
        {/* Close X */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
        <p className="text-gray-300 mb-4">{challenge.description}</p>
        <p className="text-sm text-gray-400 mb-4">
          Service Port: {challenge.port}
        </p>

        {/* Flag 입력 */}
        <input
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="FLAG{...}"
          className="w-full p-2 rounded bg-gray-700 text-white mb-3"
        />
        <button
          onClick={submitFlag}
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 rounded"
        >
          Submit Flag
        </button>
        {msg && <p className="mt-2 text-center">{msg}</p>}
      </div>
    </div>
  );
}
