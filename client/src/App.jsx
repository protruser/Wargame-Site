import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyScore from "./pages/MyScore";
import Scoreboard from "./pages/scoreboard/Scoreboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/myscore" element={<MyScore />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </BrowserRouter>
  );
}
