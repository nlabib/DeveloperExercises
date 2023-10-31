import React, { useState, useEffect } from "react";
import Plotly from "react-plotly.js";

const PlayOutcomeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/playoutcome")
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      });
  }, []);

  // If data is not yet loaded, display loading message.
  if (!data.length) return <div>Loading...</div>;

  const playOutcomes = [...new Set(data.map((d) => d.PLAY_OUTCOME))];
  const traces = playOutcomes.map((outcome) => {
    const filteredData = data.filter((d) => d.PLAY_OUTCOME === outcome);
    return {
      name: outcome,
      x: filteredData.map((d) => d.LAUNCH_ANGLE),
      y: filteredData.map((d) => d.counts),
      marker: {
        size: filteredData.map((d) => d.EXIT_VELO),
        sizemode: "diameter",
        color: filteredData.map((d) => d.EXIT_DIRECTION),
        colorscale: "Viridis",
        sizeref: 0.1,
        colorbar: { title: "Exit Direction" },
      },
      mode: "markers",
      type: "scatter",
    };
  });

  return (
    <Plotly
      data={traces}
      layout={{
        title:
          "Play Outcome vs. Launch Angle with Exit Velocity and Exit Direction",
        xaxis: { title: "Launch Angle" },
        yaxis: { title: "Count of Play Outcomes" },
        autosize: true,
        hovermode: "closest",
      }}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default PlayOutcomeChart;
