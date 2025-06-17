// src/components/Navbar/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom"; // Used for client-side routing
import Logo from "../../assets/logo.svg"; // Logo image
import { NavbarAuth } from "./NavbarAuth"; // Navigation for authenticated users
import { NavbarGuest } from "./NavbarGuest"; // Navigation for guests (not logged in)

/**
 * Navbar Component
 * A top-fixed navigation bar that displays links and user controls.
 * Shows different menus based on the user's login status.
 *
 * Props:
 * - isLoggedIn: Boolean indicating if the user is logged in
 * - setIsLoggedIn: Function to update login status
 */
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => (
  <nav className="fixed top-0 left-0 w-full h-[60px] bg-teal-600 flex justify-center z-50 shadow-md">
    {/* Container with max width and padding */}
    <div className="w-[1440px] h-full flex items-center justify-between px-10">
      {/* Left section: Logo and main navigation links */}
      <div className="flex items-center gap-8">
        {/* Logo that links to the homepage */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8" />
        </Link>

        {/* Link to Scoreboard page */}
        <Link to="/scoreboard" className="text-white text-sm hover:opacity-80">
          Scoreboard
        </Link>

        {/* Link to Challenges page */}
        <Link to="/challenges" className="text-white text-sm hover:opacity-80">
          Challenges
        </Link>
      </div>

      {/* Right section: Authenticated or Guest menu based on login status */}
      {isLoggedIn ? (
        // If user is logged in, show authenticated menu
        <NavbarAuth setIsLoggedIn={setIsLoggedIn} />
      ) : (
        // If user is not logged in, show guest menu (e.g., Login/Sign up)
        <NavbarGuest />
      )}
    </div>
  </nav>
);

export default Navbar;
