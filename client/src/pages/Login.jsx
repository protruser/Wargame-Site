import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login failed.");
      } else {
        localStorage.setItem("username", data.username || data.id);
        localStorage.setItem("email", data.id);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-10 shadow-md rounded">
        <h1 className="text-3xl font-semibold mb-8 text-center text-black">Login</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={id}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full bg-gray-200 px-4 py-2 rounded text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-gray-200 px-4 py-2 rounded text-black"
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
