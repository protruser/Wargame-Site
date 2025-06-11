import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

function MyScore() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch("http://localhost:3000/api/my_score", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to fetch statistics");
        return res.json();
      })
      .then((data) => {
        setUserData(data); // 서버가 바로 내 정보만 주는 경우
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
        localStorage.clear();
        navigate("/login");
      });
  }, [token, navigate]);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  const { nickname, rank, total_score, success_rate = 0, points } = userData;

  const chartData = {
    series: [{
      name: nickname,
      data: points.map((p, i) => {
        const sum = points.slice(0, i + 1).reduce((acc, cur) => acc + cur.score, 0);
        return { x: new Date(p.timestamp), y: sum };
      }),
    }],
    options: {
      chart: { type: "area" },
      xaxis: { type: "datetime" },
      dataLabels: { enabled: false },
    },
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">{nickname}</h2>
      <p className="text-center mb-4">
        <span className="font-bold">{rank}위</span> / {total_score}점
      </p>

      {points.length === 0 ? (
        <p className="text-center mt-12 text-gray-500">No solves yet</p>
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <Chart
              options={{
                labels: ["Success", "Fail"],
                colors: ["#10b981", "#ef4444"],
              }}
              series={[Number(success_rate), 100 - Number(success_rate)]}
              type="donut"
              width={300}
            />
          </div>

          <div className="mb-10">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={300}
            />
          </div>

          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Challenge</th>
                <th className="p-2 text-left">Score</th>
                <th className="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{p.title}</td>
                  <td className="p-2">{p.score}</td>
                  <td className="p-2">
                    {new Date(p.timestamp).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default MyScore;

