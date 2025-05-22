const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  doctorSpeciality: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  date: { type: Date, required: true },
  selectedSlot: { type: String, required: true },
  email: { type: String, required: true },
});
module.exports = mongoose.model("Appointment", appointmentSchema);
