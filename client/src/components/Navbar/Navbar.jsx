import React from "react";
import Logo from "../../assets/logo.svg";
import { NavbarAuth } from "./NavbarAuth";
import { NavbarGuest } from "./NavbarGuest";

const Navbar = ({ isLoggedIn }) => (
  <nav className="fixed top-0 left-0 w-full h-[60px] bg-teal-600 flex justify-center z-50 shadow-md">
    <div className="w-[1440px] h-full flex items-center justify-between px-10">
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8" />
        </a>
        <a href="/scoreboard" className="text-white text-sm hover:opacity-80">
          Scoreboard
        </a>
        <a href="/challenges" className="text-white text-sm hover:opacity-80">
          Challenges
        </a>
      </div>

      {isLoggedIn ? <NavbarAuth /> : <NavbarGuest />}
    </div>
  </nav>
);

export default Navbar;
