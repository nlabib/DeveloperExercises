import React, { useState, useEffect } from "react";

function PitcherLeaderboards() {
  const [activeTab, setActiveTab] = useState("Pitching Velocity");

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
                        Batter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Home Runs
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
            {activeTab === "Spin Rate" && (
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
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                      <td className="px-6 py-4">0 mph</td>
                    </tr>
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
export default PitcherLeaderboards;
