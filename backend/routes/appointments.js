// routes/appointments.js

const express = require('express');
const router = express.Router();
const Appointment =require('../Models/Appointment');

// Get all appointments
router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments =>
            res.json(appointments))
        .catch(err =>
            res.status(400).json('Error: ' + err));
});

// Add new appointment
router.route('/add').post((req, res) => {
    const { patientName, doctorName, date } = req.body;
    const newAppointment =
        new Appointment({ patientName, doctorName, date });

    newAppointment.save()
        .then(savedAppointment => res.json(savedAppointment))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/complete/:id').patch((req, res) => {
    Appointment.findByIdAndUpdate(req.params.id, { completed: true }, { new: true })
        .then(updatedAppt => res.json(updatedAppt))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;