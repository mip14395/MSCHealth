const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db");

// Import routes
const userRoutes = require("./routes/User");
const appointmentRoutes = require("./routes/Appointment");
const reviewRoutes = require("./routes/Review");
const appointmentICRoutes = require("./routes/AppointmentIC");

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Sử dụng routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/appointmentsIC", appointmentICRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
