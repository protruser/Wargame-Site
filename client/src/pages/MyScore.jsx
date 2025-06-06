import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function MyScore() {
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/statistics")
      .then((res) => res.json())
      .then((data) => {
        const me = data.data.find((u) => u.username === username);
        setUserData(me);
      });
  }, [username]);

  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  const { rank, total_score, success_rate, points } = userData;

  const chartData = {
    series: [{
      name: username,
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
      <h2 className="text-2xl font-semibold text-center mb-6">{username}</h2>
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
              series={[Number(success_rate), 100 - success_rate]}
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
