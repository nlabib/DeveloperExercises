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
      <div className="mt-6">
        <div>
          <PlayOutcomeChart />
        </div>
      </div>
      <div>
        <Heatmap />
      </div>
    </div>
  );
};

export default App;
