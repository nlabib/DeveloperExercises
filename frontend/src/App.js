import React from "react";

import Base from "./Components/pages/base";
import BatterLeaderboards from "./Components/pages/BatterLeaderboards.js";
import PitcherLeaderboards from "./Components/pages/PitcherLeaderboards";
import GameplayCalendar from "./Components/pages/GameplayCalendar";
const App = () => {
  return (
    <div>
      <Base />
      <BatterLeaderboards />
      <div className="mt-6"></div>
      <PitcherLeaderboards />
      <div className="mt-6"></div>
      <GameplayCalendar />
    </div>
  );
};

export default App;
