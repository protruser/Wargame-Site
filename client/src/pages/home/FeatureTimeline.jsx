import React from "react";

// placeholder 이미지 URL
const placeholderImg = "https://via.placeholder.com/300x200.png?text=Preview";

const features = [
  {
    title: "정기 세션",
    description:
      "매주 진행되는 정기 세션을 통해 실력을 키우고, 팀원들과 함께 협업하며 성장할 수 있어요.",
    badge: "정기세션",
  },
  {
    title: "해킹 대회 모의 훈련",
    description:
      "CTF(해킹대회) 형식으로 실전 문제를 풀며 실력을 확인하고 경험을 쌓을 수 있어요.",
    badge: "모의훈련",
  },
  {
    title: "리더십 & 협업 기회",
    description:
      "팀 프로젝트와 발표 등을 통해 커뮤니케이션과 협업 능력을 키울 수 있어요.",
    badge: "협업",
  },
];

export default function FeatureTimeline() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          🔍 주요 기능 소개
        </h2>
        <div className="relative border-l-4 border-teal-600 ml-4">
          {features.map((feature, index) => (
            <div key={index} className="mb-16 ml-6 relative group">
              <span className="absolute -left-3 top-1 w-6 h-6 bg-teal-600 rounded-full border-4 border-white group-hover:scale-110 transition"></span>
              <div
                className={`${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex flex-col md:flex gap-6 bg-white shadow-lg p-6 rounded-xl`}
              >
                <img
                  src={placeholderImg}
                  alt="Preview"
                  className="w-full md:w-64 rounded-lg shadow-md"
                />
                <div>
                  <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mb-2">
                    {feature.badge}
                  </span>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
