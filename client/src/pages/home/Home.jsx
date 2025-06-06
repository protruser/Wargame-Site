// src/pages/home/Home.jsx
import React from "react";
import HeroSection from "./HeroSection";
import FeatureList from "./FeatureList";

export default function Home() {
  return (
    <main className="pt-[60px]">
      <HeroSection />
      <FeatureList />
    </main>
  );
}
