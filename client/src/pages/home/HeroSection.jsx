// src/pages/home/HeroSection.jsx
import React from "react";

export default function HeroSection() {
  return (
    <section
      className="
        relative 
        left-1/2 
        -translate-x-1/2 
        w-screen 
        h-[970px] 
        bg-teal-50 
        flex flex-col justify-center items-center text-center
      "
      data-aos="fade-down"
    >
      <h1 className="text-5xl font-extrabold text-teal-800 mb-4">
        Welcome to <span className="block">ITWargame</span>
      </h1>
      <p className="text-lg text-teal-600 mb-8">
        Practice. Compete. Improve your cybersecurity skills.
      </p>
      <a
        href="/scoreboard"
        className="bg-teal-600 text-white px-8 py-4 rounded-lg shadow hover:bg-teal-700 transition"
      >
        View Scoreboard
      </a>
    </section>
  );
}
