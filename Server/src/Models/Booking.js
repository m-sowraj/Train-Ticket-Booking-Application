const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  bookingDate: { type: Date, required: true },
  seatsBooked:  [{ type: String }] ,
  compartmentType: { type: String },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], required: true, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
