import React, { useState, useEffect } from "react";
import Plotly from "react-plotly.js";

const ScatterPlot = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/scatterdata")
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const topBatters = data
    .sort((a, b) => b.EXIT_VELO - a.EXIT_VELO)
    .slice(0, 10);
  const bottomBatters = data
    .sort((a, b) => a.EXIT_VELO - b.EXIT_VELO)
    .slice(0, 10);

  return (
    <div className="h-90 w-1/2">
      <Plotly
        data={[
          {
            x: data.map((d) => d.LAUNCH_ANGLE),
            y: data.map((d) => d.EXIT_VELO),
            mode: "markers",
            type: "scatter",
            marker: { size: 6 },
            text: data.map((d) => d.BATTER), // Setting the batter name as hover text
            hoverinfo: "text+y+x",
          },
          {
            // Top 10 Batters by Exit Velocity
            x: topBatters.map((d) => d.LAUNCH_ANGLE),
            y: topBatters.map((d) => d.EXIT_VELO),
            mode: "markers+text",
            type: "scatter",
            marker: { size: 8, color: "red" },
            text: topBatters.map((d) => d.BATTER),
            textposition: "top",
            hoverinfo: "skip",
          },
          {
            // Bottom 10 Batters by Exit Velocity
            x: bottomBatters.map((d) => d.LAUNCH_ANGLE),
            y: bottomBatters.map((d) => d.EXIT_VELO),
            mode: "markers+text",
            type: "scatter",
            marker: { size: 8, color: "blue" },
            text: bottomBatters.map((d) => d.BATTER),
            textposition: "bottom",
            hoverinfo: "skip",
          },
        ]}
        layout={{
          title: "Launch Angle vs. Exit Velocity",
          xaxis: { title: "Launch Angle" },
          yaxis: { title: "Exit Velocity" },
          autosize: true,
          margin: { t: 40, b: 40, l: 60, r: 30 },
          hovermode: "closest",
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ScatterPlot;
