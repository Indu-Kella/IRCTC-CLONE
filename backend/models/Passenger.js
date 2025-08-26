const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 16 },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        mobile: { type: String, required: true },
        trainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
        status: { type: String, enum: ["CONFIRMED", "WAITING"], default: "CONFIRMED" }

    }
);

module.exports = mongoose.model("Passenger", passengerSchema);
