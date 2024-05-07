const mongoose = require('mongoose');
const { Schema } = mongoose;

const compartmentSchema = new Schema({
  type: { type: String, required: true },
  seats: { type: Number, required: true },
  farePerKm: { type: Number, required: true },
  bookedSeats: [{ type: String }] 
});

const trainSchema = new Schema({
  trainNumber: { type: String, required: true, unique: true },
  trainName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  compartments: [compartmentSchema]
});

module.exports = mongoose.model('Train', trainSchema);
