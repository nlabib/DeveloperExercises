import React from "react";

import Base from "./Components/pages/base";
import BatterLeaderboards from "./Components/pages/BatterLeaderboards.js";
import PitcherLeaderboards from "./Components/pages/PitcherLeaderboards";
const App = () => {
  return (
    <div>
      <Base />
      <BatterLeaderboards />
      <div className="mt-6"></div>
      <PitcherLeaderboards />
    </div>
  );
};

export default App;
