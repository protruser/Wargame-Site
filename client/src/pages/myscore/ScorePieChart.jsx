import React from "react";
import Chart from "react-apexcharts";

/**
 * ScorePieChart displays a donut chart representing success vs fail rates.
 * @param {number} successRate - percentage of successful solves
 */
export default function ScorePieChart({ successRate }) {
  return (
    <Chart
      options={{
        labels: ["Success", "Fail"],
        colors: ["#10b981", "#ef4444"],
        legend: {
          labels: { colors: ["#E5E7EB", "#E5E7EB"] },
        },
      }}
      series={[Number(successRate), 100 - Number(successRate)]}
      type="donut"
      width={400}
    />
  );
}
