// models/Appointment.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false }, // ✅ NEW FIELD
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
