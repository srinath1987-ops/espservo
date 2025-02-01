require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let servoAngle = 90; // Default angle

// home
app.get("/", (req, res) => {
    res.send("Backend is running...");
  });

// Endpoint to update servo angle from React frontend
app.post("/set-servo", (req, res) => {
    const { angle } = req.body;
    if (angle >= 0 && angle <= 180) {
        servoAngle = angle;
        console.log(`✅ Servo angle updated to: ${angle}`);
        res.json({ success: true, angle });
    } else {
        res.status(400).json({ success: false, message: "Invalid angle" });
    }
});

// Endpoint for ESP8266 to get the latest servo angle
app.get("/get-servo", (req, res) => {
    res.send(servoAngle.toString()); // Returns 180 (without quotes)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
