const mongoose = require('mongoose');

const berthSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true },
  waitingList: { type: Number, default: 0 }  // New field
});

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  trainName: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  departureDate: {
    type: String,
    required: true
  },
  arrivalDate: {
    type: String,
    required: true
  },
  berths: [berthSchema]

});

module.exports = mongoose.model('Train', trainSchema);
