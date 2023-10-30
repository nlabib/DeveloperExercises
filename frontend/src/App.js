import React from "react";
import Base from "./Components/pages/base";
import BatterLeaderboards from "./Components/pages/BatterLeaderboards.js";
import PitcherLeaderboards from "./Components/pages/PitcherLeaderboards";
const App = () => {
  return (
    <div>
      <Base />
      <div id="BatterLeaderboards">
        <BatterLeaderboards />
      </div>
      <div id="PitcherLeaderboards" className="mt-6"></div>
      <PitcherLeaderboards />
      <div className="mt-6"></div>
    </div>
  );
};

export default App;
