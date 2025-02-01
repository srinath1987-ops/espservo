import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Ensure this file exists

const API_URL = "http://192.168.29.156:5000/set-servo"; // Replace with Render backend URL
const GET_SERVO_URL = "http://192.168.29.156:5000/get-servo"; // URL to get current servo position

function App() {
  const [angle, setAngle] = useState(90);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch current servo position
  const fetchCurrentPosition = async () => {
    try {
      const response = await axios.get(GET_SERVO_URL);
      setCurrentPosition(parseInt(response.data, 10)); // Convert string to number
    } catch (error) {
      console.error("Error fetching current servo position:", error);
    }
  };

  useEffect(() => {
    fetchCurrentPosition();
  }, []);

  const handleMoveServo = async () => {
    setLoading(true);
    try {
      await axios.post(API_URL, { angle });
      fetchCurrentPosition(); // Update after moving
    } catch (error) {
      alert("❌ Error sending data to server");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Servo Controller</h1>
        <div className="gauge-container">
          <div
            className="gauge"
            style={{ transform: `rotate(${angle - 90}deg)` }}
          ></div>
          <span className="angle-display">{angle}°</span>
        </div>
        {currentPosition !== null && (
          <div className="current-position">
            Current Position: {currentPosition}°
          </div>
        )}
        <input
          type="range"
          min="0"
          max="180"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value, 10))}
          className="slider"
        />
        <button onClick={handleMoveServo} className="move-button" disabled={loading}>
          {loading ? "Moving..." : "Move Servo"}
        </button>
      </div>
    </div>
  );
}

export default App;
