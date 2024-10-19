
import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie, Bar, Line,  Bubble } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students");
  const [chartType, setChartType] = useState("Bar");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  };

  // Function to render the appropriate chart component based on user selection
  const renderChart = () => {
    const data = currChart === "students" ? chartDataStudents : chartIncomeData;

    switch (chartType) {
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
     
     
      case "bubble":
        return <Bubble data={data} options={options} />;
      default:
        return <Pie data={data} options={options} />;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-full p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-full p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className=" flex  space-x-4 mt-4">
        {/* Buttons to switch between different chart types */}
        {["bar","pie",  "line", "bubble"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className={`rounded-xl p-1 px-4 transition-all duration-200 ${
              chartType === type
                ? "bg-yellow-400 text-richblack-100"
                : "text-yellow-400"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="relative mx-auto aspect-square h-[200px] w-auto mt-4">
        {renderChart()}
      </div>
    </div>
  );
}
