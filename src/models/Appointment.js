const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    time: { type: Date, required: true },
    status: { type: String, enum: ['booked', 'canceled'], default: 'booked' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);