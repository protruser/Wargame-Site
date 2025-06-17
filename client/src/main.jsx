// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import and configure AOS (Animate On Scroll) library
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS with animation settings
AOS.init({
  duration: 800, // Animation duration in ms
  once: true, // Trigger animation only once
});

// Mount the React application into the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
