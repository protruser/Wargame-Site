import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login component: Handles user login and redirects on success
function Login({ setIsLoggedIn }) {
  const navigate = useNavigate(); // Hook for navigation
  const [id, setEmail] = useState(""); // Stores user ID (email)
  const [password, setPassword] = useState(""); // Stores password
  const [errorMsg, setErrorMsg] = useState(""); // Error message for failed login

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send login request to backend
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json(); // Parse response JSON

      // Handle unsuccessful login attempt
      if (!res.ok) {
        setErrorMsg(data.message || "Login failed.");
      } else {
        // Store token and nickname in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("nickname", data.user.nickname);

        // Update app state and navigate to home
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      // Handle server/network error
      setErrorMsg("Server error. Please try again later.");
    }
  };

  return (
    // Fullscreen layout with centered login form
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-gray-800 p-10 shadow-md rounded">
        <h1 className="text-3xl font-semibold mb-8 text-center">Login</h1>

        {/* Login form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email input */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={id}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 px-4 py-2 rounded text-white"
              placeholder="Enter email"
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 px-4 py-2 rounded text-white"
              placeholder="Enter password"
            />
          </div>

          {/* Error message */}
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
