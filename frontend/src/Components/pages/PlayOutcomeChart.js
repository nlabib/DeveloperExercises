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

  // Define a list of colors for different play outcomes.
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "cyan",
    "magenta",
  ];

  const traces = playOutcomes.map((outcome, index) => {
    const filteredData = data.filter((d) => d.PLAY_OUTCOME === outcome);

    return {
      name: outcome,
      y: filteredData.map((d) => d.EXIT_DIRECTION),
      type: "violin",
      box: {
        visible: true,
      },
      line: {
        color: colors[index % colors.length],
      },
      meanline: {
        visible: true,
      },
    };
  });

  return (
    <div className="w-full h-full px-40 py-2 ">
      <Plotly
        data={traces}
        layout={{
          title: "Play Outcome vs. Exit Direction",
          xaxis: { title: "Play Outcome" },
          yaxis: { title: "Exit Direction" },
          autosize: true,
          hovermode: "closest",
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default PlayOutcomeChart;
