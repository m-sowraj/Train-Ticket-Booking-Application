const mongoose = require('mongoose');

const compartmentSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  seats: { type: Number, required: true }, 
  farePerKm: { type: Number, required: true }, 
  compartmentsAvailable: { type: Number, required: true } 
});

const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  compartmentTypes: [compartmentSchema] 
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
