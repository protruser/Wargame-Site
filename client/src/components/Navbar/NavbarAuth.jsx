// src/components/Navbar/NavbarAuth.jsx

import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

/**
 * NavbarAuth Component
 * Renders the right-side navbar section for authenticated users.
 * Includes links to profile, personal score, and a logout button.
 *
 * Props:
 * - setIsLoggedIn: Function to update the login state after logout
 */
export const NavbarAuth = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Handles user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-6">
      <a href="/profile" className="text-white text-sm hover:opacity-80">
        Profile
      </a>

      <a href="/myscore" className="text-white text-sm hover:opacity-80">
        My score
      </a>

      {/* Logout button with color inversion on hover */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-white border border-white rounded-md bg-teal-600 hover:bg-white hover:text-teal-600 hover:border-teal-600 transition"
      >
        <HiOutlineLogout className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );
};
