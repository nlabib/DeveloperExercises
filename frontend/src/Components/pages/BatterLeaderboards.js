import React, { useState, useEffect } from "react";

function BatterLeaderboards() {
  const [players, setPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState("homeruns");
  const [exitSpeedData, setExitSpeedData] = useState([]);

  useEffect(() => {
    // Fetch data from Flask API

    fetch("/api/exitspeed")
      .then((response) => response.json())
      .then((data) => setExitSpeedData(data));

    fetch("/api/homeruns")
      .then((response) => response.json())
      .then((data) => {
        // Sort players by homeruns and take top 10
        const topPlayers = data
          .sort((a, b) => b.homeruns - a.homeruns)
          .slice(0, 10);
        setPlayers(topPlayers);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md">
        <div className="p-6">
          <h5 className="text-2xl font-semibold mb-4">Batter Leaderboards</h5>
          <ul className="flex border-b">
            <li className="-mb-px mr-1">
              <button
                className={`py-2 px-4 border-l border-t border-r rounded-t ${
                  activeTab === "homeruns"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 bg-white"
                }`}
                onClick={() => setActiveTab("homeruns")}
              >
                Home Runs
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`py-2 px-4 border-l border-t border-r rounded-t ${
                  activeTab === "speed"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 bg-white"
                }`}
                onClick={() => setActiveTab("speed")}
              >
                Exit Speed
              </button>
            </li>
            <li className="-mb-px">
              <button
                className={`py-2 px-4 border-l border-t border-r rounded-t ${
                  activeTab === "sweetspots"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 bg-white"
                }`}
                onClick={() => setActiveTab("sweetspots")}
              >
                Sweet Spots
              </button>
            </li>
          </ul>

          <div className="p-4">
            {activeTab === "homeruns" && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Batter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Home Runs
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {players.map((player) => (
                      <tr key={player.BATTER}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {player.BATTER}
                        </td>
                        <td className="px-6 py-4">{player.homeruns}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "speed" && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Batter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average Exit Speed (mph)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exitSpeedData.map((player) => (
                      <tr key={player.BATTER_ID}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {player.BATTER}
                        </td>
                        <td className="px-6 py-4">{player.EXIT_SPEED}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "sweetspots" && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Batter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Sweet Spot Hits
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                      <td className="px-6 py-4">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatterLeaderboards;
