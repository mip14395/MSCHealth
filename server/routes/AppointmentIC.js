const express = require("express");
const router = express.Router();
const AppointmentIC = require("../models/AppointmentIC");

router.get("/", async (req, res) => {
  const appointmentsIC = await AppointmentIC.find();
  res.json(appointmentsIC);
});

router.post("/", async (req, res) => {
  const newAppointmentIC = new AppointmentIC(req.body);
  await newAppointmentIC.save();
  res.status(201).json(newAppointmentIC);
});

module.exports = router;
