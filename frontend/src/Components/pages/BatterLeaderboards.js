import React, { useState, useEffect } from "react";

function BatterLeaderboards() {
  const [players, setPlayers] = useState([]); // Add players state
  const [activeTab, setActiveTab] = useState("homeruns"); // Add activeTab state
  const [exitSpeedData, setExitSpeedData] = useState([]); // Add exitSpeedData state
  const [hitDistanceData, setHitDistanceData] = useState([]); // Add hitDistanceData state
  const [sweetSpotData, setSweetSpotData] = useState([]);

  useEffect(() => {
    //fetch exit speed
    fetch("/api/exitspeed")
      .then((response) => response.json())
      .then((data) => setExitSpeedData(data));

    //fetch hit distance
    fetch("/api/hitdistance")
      .then((response) => response.json())
      .then((data) => setHitDistanceData(data));

    fetch("/api/homeruns")
      .then((response) => response.json())
      .then((data) => {
        // Sort players by homeruns and take top 10
        const topPlayers = data
          .sort((a, b) => b.homeruns - a.homeruns)
          .slice(0, 10);
        setPlayers(topPlayers);
      });

    fetch("/api/sweetspots")
      .then((response) => response.json())
      .then((data) => setSweetSpotData(data));
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
            <li className="-mb-px mr-1">
              <button
                className={`py-2 px-4 border-l border-t border-r rounded-t ${
                  activeTab === "hitdistance"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 bg-white"
                }`}
                onClick={() => setActiveTab("hitdistance")}
              >
                Hit Distance
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
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        <td className="px-6 py-4 text-right">
                          {player.homeruns}
                        </td>
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
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        <td className="px-6 py-4 text-right">
                          <a
                            href={player.VIDEO_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline hover:text-blue-700"
                          >
                            {player.EXIT_SPEED} mph
                          </a>
                        </td>
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
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sweet Spot Hits
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sweetSpotData.map((player) => (
                      <tr key={player.BATTER}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {player.BATTER}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {player.sweetspots}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "hitdistance" && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Batter
                      </th>
                      <th className=" py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hit Distance (feet)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hitDistanceData.map((player) => (
                      <tr key={player.BATTER_ID}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {player.BATTER}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href={player.VIDEO_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline hover:text-blue-700"
                          >
                            {player.HIT_DISTANCE} feet
                          </a>
                        </td>
                      </tr>
                    ))}
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
