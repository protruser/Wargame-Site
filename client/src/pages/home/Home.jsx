// src/pages/home/Home.jsx
import React from "react";
import HeroSection from "./HeroSection";
import FeatureTimeline from "./FeatureTimeline";

export default function Home() {
  return (
    <main className="pt-[60px]">
      <HeroSection />
      <FeatureTimeline />
    </main>
  );
}
