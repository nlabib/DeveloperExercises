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
    <div className="w-full h-full flex justify-center">
      <div className="px-40 w-full">
        <Plotly
          data={[
            {
              x: data.map((d) => d.EXIT_DIRECTION),
              y: data.map((d) => d.HIT_DISTANCE),
              z: data.map(() => 1),
              type: "heatmap",
              colorscale: "Viridis",
              showscale: false,
            },
            {
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
            autosize: true,
            margin: {
              l: 50,
              r: 50,
              b: 50,
              t: 50,
              pad: 4,
            },
          }}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Heatmap;
