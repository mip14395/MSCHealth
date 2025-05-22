const mongoose = require("mongoose");

const appointmentICSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("AppointmentIC", appointmentICSchema);
