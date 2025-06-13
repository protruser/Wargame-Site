import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

function MyScore() {
  const navigate = useNavigate();
  const { nickname: routeNickname } = useParams();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isViewingOtherUser = Boolean(routeNickname);
    const endpoint = isViewingOtherUser
      ? `http://localhost:3000/api/my_score/${encodeURIComponent(routeNickname)}`
      : "http://localhost:3000/api/my_score";

    const fetchOptions = {
      method: "GET",
      headers: {},
    };

    if (!isViewingOtherUser && token) {
      fetchOptions.headers["Authorization"] = `Bearer ${token}`;
    }

    fetch(endpoint, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          if (!isViewingOtherUser && res.status === 401) {
            throw new Error("Unauthorized");
          }
          throw new Error("Failed to fetch statistics");
        }
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
        if (!isViewingOtherUser) {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, [routeNickname, token, navigate]);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  const { nickname, rank, total_score, success_rate = 0, points } = userData;

  const sortedPoints = [...points].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const chartData = {
    series: [
      {
        name: "Total Score",
        data: sortedPoints.map((p, i) => {
          const sum = sortedPoints
            .slice(0, i + 1)
            .reduce((acc, cur) => acc + cur.score, 0);
          return { x: new Date(p.timestamp).getTime(), y: sum };
        }),
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
        zoom: { enabled: true },
        foreColor: "#E5E7EB",
      },
      xaxis: {
        type: "datetime",
        datetimeUTC: false,
        labels: {
          style: { colors: "#E5E7EB" },
          format: "yyyy-MM-dd HH:mm:ss",
        },
        tooltip: { enabled: true },
      },
      yaxis: {
        labels: { style: { colors: "#E5E7EB" } },
      },
      tooltip: {
        theme: "dark",
        x: {
          format: "yyyy-MM-dd HH:mm:ss",
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#3b82f6"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      grid: {
        borderColor: "#374151",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-5xl bg-gray-800 rounded-xl p-10 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">{nickname}</h2>
        <p className="text-center text-lg mb-6">
          <span className="font-bold">{rank}위</span> / {total_score}점
        </p>

        {points.length === 0 ? (
          <p className="text-center text-gray-400 mt-12">No solves yet</p>
        ) : (
          <>
            <div className="flex justify-center mb-10">
              <Chart
                options={{
                  labels: ["Success", "Fail"],
                  colors: ["#10b981", "#ef4444"],
                  legend: {
                    labels: {
                      colors: ["#E5E7EB"],
                    },
                  },
                }}
                series={[Number(success_rate), 100 - Number(success_rate)]}
                type="donut"
                width={400}
              />
            </div>

            <div className="mb-10">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={350}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="p-3 text-left">Challenge</th>
                    <th className="p-3 text-left">Score</th>
                    <th className="p-3 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPoints.map((p, idx) => (
                    <tr key={idx} className="border-t border-gray-600">
                      <td className="p-3">{p.title}</td>
                      <td className="p-3">{p.score}</td>
                      <td className="p-3 text-gray-300">
                        {new Date(p.timestamp).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyScore;
