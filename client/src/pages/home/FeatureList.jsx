import React, { useEffect, useRef, useState } from "react";

// Define the main features of the CTF platform
const features = [
  {
    title: "Challenge Success Tracking",
    description:
      "Upon solving a challenge, view your rank, score, solve date, and success rate on the leaderboard.",
  },
  {
    title: "Failure Attempt Insights",
    description:
      "If a challenge attempt fails, see your rank, penalty score, attempt date, and failure rate recorded on the leaderboard.",
  },
  {
    title: "My Score Dashboard",
    description:
      "Access a personalized dashboard to track your total points, solve history, and overall accuracy.",
  },
  {
    title: "Global Scoreboard Comparison",
    description:
      "Compare your performance against other users and explore individual profiles and stats.",
  },
];

// FeatureList component renders the list of platform features
export default function FeatureList() {
  // itemRefs stores references to each feature card element
  const itemRefs = useRef([]);
  // activeIndex indicates which feature card is currently highlighted
  const [activeIndex, setActiveIndex] = useState(0);

  // Use IntersectionObserver to update activeIndex when cards enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update activeIndex based on the data-index attribute
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      {
        root: null, // Observe within viewport
        rootMargin: "0px", // No margin
        threshold: 0.3, // 30% visibility threshold
      }
    );

    // Observe each feature card
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <section className="py-24 bg-white">
      {/* Section heading */}
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-12">
        🚩 Platform Features
      </h2>

      {/* Feature cards container */}
      <div
        className="lg:space-y-16 space-y-10 max-w-3xl mx-auto px-4 flex flex-col items-center"
        role="list"
      >
        {features.map((feat, idx) => {
          const isActive = idx === activeIndex;
          return (
            // Each card has dynamic styling based on isActive
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
              {/* Feature title */}
              <h3
                className={`text-3xl font-bold mb-4 transition-colors duration-500 ${
                  isActive ? "text-teal-800" : "text-gray-600"
                }`}
              >
                {feat.title}
              </h3>

              {/* Feature description */}
              <p className="text-lg text-gray-700">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
