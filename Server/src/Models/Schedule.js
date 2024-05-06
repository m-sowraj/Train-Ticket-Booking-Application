const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  date: { type: Date, required: true }, 
  stops: [{
    stopNo: { type: Number, required: true }, 
    station: { type: String, required: true },
    arrivalTime: { type: Date, required: true },
    departureTime: { type: Date, required: true },
    distanceFromFirst: { type: Number, required: true } 
  }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
