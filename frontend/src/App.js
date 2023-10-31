import React from "react";
import Base from "./Components/pages/base";
import BatterLeaderboards from "./Components/pages/BatterLeaderboards.js";
import PitcherLeaderboards from "./Components/pages/PitcherLeaderboards";
import Heatmap from "./Components/pages/Heatmap";
import PlayOutcomeChart from "./Components/pages/PlayOutcomeChart";
const App = () => {
  return (
    <div>
      <Base />
      <div id="BatterLeaderboards">
        <BatterLeaderboards />
      </div>
      <div id="PitcherLeaderboards" className="mt-6"></div>
      <PitcherLeaderboards />
      <div id="Charts" className="px-4">
        <h2 className="text-2xl font-semibold text-center">Graphs</h2>
        <div className="mt-6">
          <div>
            <PlayOutcomeChart />
          </div>
        </div>
        <div>
          <Heatmap />
        </div>
      </div>
    </div>
  );
};

export default App;
