// src/pages/home/HeroSection.jsx
import React from "react";

export default function HeroSection() {
  return (
    <section className="w-screen min-h-screen py-32 bg-teal-50 flex justify-center items-center">
      <div
        className="w-full max-w-[1440px] px-4 text-center"
        data-aos="fade-down"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-teal-800 mb-4 leading-tight">
          Welcome to <br />
          <span className="text-4xl md:text-6xl">IT₩argame</span>
        </h1>
        <p className="text-base md:text-lg text-teal-600 mb-8">
          Practice. Compete. Improve your cybersecurity skills.
        </p>
        <a
          href="/scoreboard"
          role="button"
          aria-label="View the scoreboard"
          className="bg-teal-600 text-white px-8 py-4 rounded-lg shadow hover:bg-teal-700 transition"
        >
          View Scoreboard
        </a>
      </div>
    </section>
  );
}
