import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [nickname, setUsername] = useState("");
  const [id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, id, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Registration failed.");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-gray-800 p-10 shadow-md rounded-xl">
        <h1 className="text-3xl font-semibold mb-8 mt-4 text-center text-white border-b border-gray-600 pb-4">
          Register
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-300">Username</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-gray-700 px-4 py-2 rounded text-white"
            />
            <p className="text-sm text-gray-400 mt-1">your username on the site</p>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={id}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full bg-gray-700 px-4 py-2 rounded text-white"
            />
            <p className="text-sm text-gray-400 mt-1">
              Email must include "@seoultech.ac.kr"
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-gray-700 px-4 py-2 rounded text-white"
            />
            <p className="text-sm text-gray-400 mt-1">
              At least 8 characters, include number, uppercase, lowercase, and special character
            </p>
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
