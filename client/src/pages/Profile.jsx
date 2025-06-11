// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authFetch from "../utils/authFetch";

function Profile({ setIsLoggedIn }) {
  const [nickname, setNickname] = useState("loading...");
  const [id, setEmail] = useState("loading...");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    authFetch("http://localhost:3000/api/profile")
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setNickname(data.nickname);
        setEmail(data.id);
      })
      .catch(() => {
        // 인증 실패 시
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
      });
  }, [navigate, setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    try {
      const res = await authFetch(
        "http://localhost:3000/api/profile/password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, password: currentPassword, newPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        setError(data.message || "Password update failed.");
      } else {
        setSuccess("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (err) {
      if (err.message === "Unauthorized") {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        setError("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-10 shadow-md rounded">
        <h1 className="text-3xl font-semibold mb-8 text-center text-black">
          Profile
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={nickname}
              disabled
              className="w-full bg-gray-200 px-4 py-2 rounded text-black cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={id}
              disabled
              className="w-full bg-gray-200 px-4 py-2 rounded text-black cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full bg-gray-200 px-4 py-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-gray-200 px-4 py-2 rounded text-black"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Profile;
