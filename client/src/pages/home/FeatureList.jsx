// src/pages/home/FeatureList.jsx
import React, { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Interactive Tutorials",
    description:
      "Step-by-step guided tutorials to master core cybersecurity concepts.",
  },
  {
    title: "Real-World Labs",
    description:
      "Hands-on labs simulating real attack scenarios in a safe environment.",
  },
  {
    title: "Global Leaderboard",
    description: "Compete worldwide and see your rank update in real time.",
  },
  {
    title: "Personalized Analytics",
    description:
      "Track your progress with custom dashboards and detailed metrics.",
  },
  {
    title: "Achievement Badges",
    description:
      "Unlock badges for milestones and showcase your security skills.",
  },
];

export default function FeatureList() {
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white">
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-12">
        🔍 Key Features
      </h2>
      <div className="space-y-16 max-w-3xl mx-auto px-4">
        {features.map((feat, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              data-index={idx}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`
                p-6 rounded-xl transition-all duration-500
                ${
                  isActive
                    ? "bg-teal-50 shadow-lg scale-105 opacity-100"
                    : "bg-gray-100 opacity-50 scale-95"
                }
              `}
            >
              <h3
                className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${
                  isActive ? "text-teal-800" : "text-gray-600"
                }`}
              >
                {feat.title}
              </h3>
              <p className="text-gray-700">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
