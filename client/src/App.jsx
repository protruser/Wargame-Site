// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyScore from "./pages/MyScore";
import Scoreboard from "./pages/scoreboard/Scoreboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const nickname = localStorage.getItem("nickname");
    return nickname !== null;
  });

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myscore" element={<MyScore />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </BrowserRouter>
  );
}
