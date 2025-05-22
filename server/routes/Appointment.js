const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

router.post("/", async (req, res) => {
  const newAppointment = new Appointment(req.body);
  await newAppointment.save();
  res.status(201).json(newAppointment);
});

module.exports = router;
