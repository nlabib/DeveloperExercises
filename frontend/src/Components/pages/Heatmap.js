import React, { useState, useEffect } from "react";
import Plotly from "react-plotly.js";

const Heatmap = () => {
  const [data, setData] = useState([]);
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    fetch("/api/heatmapdata")
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
        setBounds(response.bounds);
      });
  }, []);

  return (
    <Plotly
      data={[
        {
          // Heatmap Data
          x: data.map((d) => d.EXIT_DIRECTION),
          y: data.map((d) => d.HIT_DISTANCE),
          z: data.map(() => 1), // Assuming you just want all data points to be visible
          type: "heatmap",
          colorscale: "Viridis",
          showscale: false,
        },
        {
          // Scatter Overlay for data points
          x: data.map((d) => d.EXIT_DIRECTION),
          y: data.map((d) => d.HIT_DISTANCE),
          mode: "markers",
          type: "scatter",
          marker: {
            color: "black",
            size: 6,
          },
        },
      ]}
      layout={{
        title: "Exit Direction vs. Hit Distance",
        xaxis: {
          title: "Exit Direction",
          range: [bounds.min_exit_direction, bounds.max_exit_direction],
        },
        yaxis: {
          title: "Hit Distance",
          range: [bounds.min_hit_distance, bounds.max_hit_distance],
        },
      }}
    />
  );
};

export default Heatmap;
