import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function GameplayVideos() {
  const [homeRunVideos, setHomeRunVideos] = useState([]);
  const [sweetSpotVideos, setSweetSpotVideos] = useState([]);
  const [spinRateVideos, setSpinRateVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("homeRun");

  const videoRefs = useRef([]);

  useEffect(() => {
    axios.get("/api/homeruns").then((response) => {
      setHomeRunVideos(response.data.slice(0, 2));
    });

    axios.get("/api/sweetspots").then((response) => {
      setSweetSpotVideos(response.data.slice(0, 2));
    });

    axios.get("/api/topspinrate").then((response) => {
      setSpinRateVideos(response.data.slice(0, 2));
    });
  }, []);

  const handleVideoPlay = (index) => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (videoIndex !== index && !video.paused) {
        video.pause();
      }
    });
  };

  const renderVideos = (videos) => (
    <div className="grid grid-cols-2 gap-4">
      {videos.map((game, index) => (
        <div key={game.GAME_DATE} className="mb-2">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            onPlay={() => handleVideoPlay(index)}
            controls
            className="w-full h-48 rounded shadow"
            src={game.VIDEO_LINK}
          ></video>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("homeRun")}
          className={`px-4 py-2 rounded ${
            activeTab === "homeRun" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Top Home Run
        </button>
        <button
          onClick={() => setActiveTab("sweetSpot")}
          className={`px-4 py-2 rounded ${
            activeTab === "sweetSpot" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Best Sweet Spot
        </button>
        <button
          onClick={() => setActiveTab("spinRate")}
          className={`px-4 py-2 rounded ${
            activeTab === "spinRate" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Best Spin Rate
        </button>
      </div>

      {activeTab === "homeRun" && renderVideos(homeRunVideos)}
      {activeTab === "sweetSpot" && renderVideos(sweetSpotVideos)}
      {activeTab === "spinRate" && renderVideos(spinRateVideos)}
    </div>
  );
}

export default GameplayVideos;
