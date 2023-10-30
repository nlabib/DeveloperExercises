import React, { useState, useEffect } from "react";

function PitcherLeaderboards() {
  const [activeTab, setActiveTab] = useState("Pitching Velocity");
  const [topPitchersData, setTopPitchersData] = useState([]);
  const [spinRateData, setSpinRateData] = useState([]);
  const [strikeOutData, setStrikeOutData] = useState([]);
  console.log(strikeOutData);

  useEffect(() => {
    // Fetch top pitchers data
    fetch("/api/toppitchers")
      .then((response) => response.json())
      .then((data) => setTopPitchersData(data));

    // 2. Fetch spin rate data
    fetch("/api/topspinrate")
      .then((response) => response.json())
      .then((data) => setSpinRateData(data));

    fetch("/api/strikeouts")
      .then((response) => response.json())
      .then((data) => setStrikeOutData(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md">
        <div className="p-6">
          <h5 className="text-2xl font-semibold mb-4">Pitcher Leaderboards</h5>
          <ul className="flex border-b">
            <li className="-mb-px mr-1">
              <button
                className={`py-2 px-4 border-l border-t border-r rounded-t ${
                  activeTab === "Pitching Velocity"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 bg-white"
                }`}
                onClick={() => setActiveTab("Pitching Velocity")}
              >
                Pitching Velocity
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`py-2 px-4 border-l border-t border-r rounded-t ${
                  activeTab === "Spin Rate"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 bg-white"
                }`}
                onClick={() => setActiveTab("Spin Rate")}
              >
                Spin Rate
              </button>
            </li>
            <li className="-mb-px">
              <button
                className={`py-2 px-4 border-l border-t border-r rounded-t ${
                  activeTab === "Strike Out"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 bg-white"
                }`}
                onClick={() => setActiveTab("Strike Out")}
              >
                Strike Out
              </button>
            </li>
          </ul>
          <div className="p-4">
            {activeTab === "Pitching Velocity" && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pitcher
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average Exit Velocity (mph)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topPitchersData.map((pitcher) => (
                      <tr key={pitcher.PITCHER}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {pitcher.PITCHER}
                        </td>
                        <td className="text-right px-6 py-4">
                          {pitcher.EXIT_SPEED.toFixed(2)} mph
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "Spin Rate" && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pitcher
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average Spin Rate (rpm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {spinRateData.map((pitcher) => (
                      <tr key={pitcher.PITCHER}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {pitcher.PITCHER}
                        </td>
                        <td className="text-right px-6 py-4">
                          {pitcher.HIT_SPIN_RATE.toFixed(2)} rpm
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "Strike Out" && (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pitcher
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Strike Outs
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {strikeOutData.map((pitcher) => (
                      <tr key={pitcher.PITCHER}>
                        <td className="text-left px-6 py-4 whitespace-nowrap">
                          {pitcher.PITCHER}
                        </td>
                        <td className="text-right px-6 py-4">
                          {pitcher.strikeouts}
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
export default PitcherLeaderboards;
