// src/main.jsx
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// AOS 불러오기
import AOS from "aos";
import "aos/dist/aos.css";

// AOS 초기화
AOS.init({
  duration: 800,
  once: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
