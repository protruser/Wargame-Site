import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authFetch from "../utils/authFetch";

function Profile({ setIsLoggedIn }) {
  const [nickname, setUsername] = useState("loading...");
  const [id, setEmail] = useState("loading...");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authFetch("http://localhost:3000/api/profile")
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUsername(data.nickname);
        setEmail(data.id);
      })
      .catch(() => {
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
      const res = await authFetch("http://localhost:3000/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        setError(data.message || "Password update failed.");
      } else {
        setSuccess("Password updated successfully.");
        setPassword("");
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

  const handleDelete = async () => {
    setError("");
    setSuccess("");

    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await authFetch(`http://localhost:3000/api/user/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Account deletion failed.");
      } else {
        setShowModal(true);
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl bg-gray-800 p-10 rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Profile</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-300">Username</label>
            <input
              type="text"
              value={nickname}
              disabled
              className="w-full bg-gray-700 px-4 py-2 rounded text-white cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={id}
              disabled
              className="w-full bg-gray-700 px-4 py-2 rounded text-white cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-300">Current Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full bg-gray-700 px-4 py-2 rounded text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-gray-700 px-4 py-2 rounded text-white"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Update Password
            </button>
            <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-black">Account Deleted</h2>
            <p className="text-gray-700 mb-4">Your account has been successfully deleted.</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  setIsLoggedIn(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;