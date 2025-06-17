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
        threshold: 0.3,
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
      <div
        className="lg:space-y-16 space-y-10 max-w-3xl mx-auto px-4 flex flex-col items-center"
        role="list"
      >
        {features.map((feat, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              data-index={idx}
              role="listitem"
              aria-current={isActive ? "true" : undefined}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`
                p-8 rounded-xl min-h-[320px] w-full
                flex flex-col justify-center items-center text-center
                transition-transform transition-opacity transition-shadow duration-700 ease-out
                ${
                  isActive
                    ? "bg-emerald-100 shadow-xl scale-105 opacity-100 hover:scale-[1.02] border-l-4 border-emerald-400"
                    : "bg-gray-100 opacity-50 scale-95"
                }
              `}
            >
              <h3
                className={`text-3xl font-bold mb-4 transition-colors duration-500 ${
                  isActive ? "text-teal-800" : "text-gray-600"
                }`}
              >
                {feat.title}
              </h3>
              <p className="text-lg text-gray-700">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
