// src/pages/challenges/ChallengeModal.jsx
import React, { useState } from "react";
import authFetch from "../../utils/authFetch";

export default function ChallengeModal({ challenge, onClose }) {
  const [flag, setFlag] = useState("");
  const [msg, setMsg] = useState("");

  const submitFlag = async () => {
    setMsg("");

    try {
      const res = await authFetch(
        "http://localhost:3000/api/challenge/submit-answer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            challenge_id: challenge.challenge_id,
            submitted_flag: flag,
          }),
        }
      );

      // 먼저 raw JSON을 로그로 찍어 봅시다
      const data = await res.json();
      console.log("🏷 Server response data:", data);

      // 그리고 서버가 보내준 'message'를 그대로 화면에 띄워 보세요
      // 예: data.message 가 "정답입니다" 또는 "오답입니다"라면
      setMsg(data.message);
    } catch (err) {
      console.error("Submit Exception:", err);
      setMsg("Error submitting flag");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 w-full max-w-lg p-6 rounded shadow relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
        <p className="text-gray-300 mb-4">{challenge.description}</p>

        <p className="text-sm text-gray-400 mb-4">
          Service Port:{" "}
          <a
            href={`http://localhost:${challenge.port}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline"
          >
            {challenge.port}
          </a>
        </p>

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

        {msg && (
          <p
            className={`mt-2 text-center ${
              msg === "Correct!" ? "text-green-400" : "text-red-400"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
