const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  doctorName: { type: String, required: true },
  speciality: { type: String, required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
