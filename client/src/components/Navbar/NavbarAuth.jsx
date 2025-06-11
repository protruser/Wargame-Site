// src/components/Navbar/NavbarAuth.jsx
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const NavbarAuth = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 모든 인증 관련 정보 제거
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");

    // 상태 업데이트
    setIsLoggedIn(false);

    // 페이지 이동
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
      <button onClick={handleLogout} className="text-white hover:opacity-80">
        <FaSignOutAlt className="text-lg" />
      </button>
    </div>
  );
};
