// src/components/Navbar/NavbarGuest.jsx
import React from "react";
import { FaSignInAlt } from "react-icons/fa";

export const NavbarGuest = () => (
  <div className="flex items-center gap-6">
    <a href="/register" className="text-white text-sm hover:opacity-80">
      Register
    </a>
    <a
      href="/login"
      className="flex items-center text-white text-sm hover:opacity-80"
    >
      <FaSignInAlt className="mr-1 text-base" />
      Login
    </a>
  </div>
);
