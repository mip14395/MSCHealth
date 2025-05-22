const express = require("express");
const User = require("../models/User"); // Đảm bảo đường dẫn đúng
const router = express.Router();

// Lấy danh sách user
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Lấy toàn bộ user từ MongoDB
    console.log("Users from MongoDB:", users); // Kiểm tra dữ liệu từ DB
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Thêm user mới
router.post("/", async (req, res) => {
  console.log("Received data:", req.body); // Kiểm tra dữ liệu từ frontend
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user" });
  }
});

module.exports = router;
