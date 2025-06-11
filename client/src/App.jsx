// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyScore from "./pages/MyScore";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import Challenges from "./pages/challenges/Challenges";
import authFetch from "./utils/authFetch";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // 기존에는 nickname으로 판별했지만, 이제는 token 유무로 초기화
    return Boolean(localStorage.getItem("token"));
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // (선택) 토큰 유효성 검증용 API 호출
      authFetch("http://localhost:3000/api/auth/verify")
        .then((res) => {
          if (!res.ok) {
            // 만료된 토큰 등 문제 있을 때
            localStorage.clear();
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.clear();
          setIsLoggedIn(false);
        });
    }
  }, []);

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/myscore" element={<MyScore />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  );
}
