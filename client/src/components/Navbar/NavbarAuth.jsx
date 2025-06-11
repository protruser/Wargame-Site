// src/components/Navbar/NavbarAuth.jsx
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

export const NavbarAuth = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-6">
      <a href="/profile" className="text-white text-sm hover:opacity-80">
        Profile
      </a>
      <a href="/myscore" className="text-white text-sm hover:opacity-80">
        My score
      </a>
      <button onClick={handleLogout} className="text-white hover:opacity-80">
        <FaSignOutAlt className="text-lg" />
      </button>
    </div>
  );
};
