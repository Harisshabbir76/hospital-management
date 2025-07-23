import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Appointments = () => {
    const [appointment, setAppointment] = useState({
        patientName: '',
        doctorName: '',
        date: ''
    });
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState({ text: '', variant: '' });
    const [loading, setLoading] = useState(true);

    // Color theme styles
    const customStyles = {
        headerBg: { backgroundColor: '#4a148c', color: '#ffecb3' },
        buttonPrimary: {
            backgroundColor: '#ffab00',
            borderColor: '#ffab00',
            color: '#4a148c',
            fontWeight: 'bold'
        },
        cardBg: { backgroundColor: '#f3e5f5' }
    };

    // Fetch patient and doctor data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientsRes, doctorsRes] = await Promise.all([
                    axios.get('http://localhost:5000/patients'),
                    axios.get('http://localhost:5000/doctors')
                ]);
                setPatients(patientsRes.data);
                setDoctors(doctorsRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setMessage({
                    text: 'Failed to load data. Please try again.',
                    variant: 'danger'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Input change handler
    const handleChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', variant: '' });

        try {
            await axios.post('http://localhost:5000/appointments/add', appointment);
            setMessage({
                text: 'Appointment scheduled successfully!',
                variant: 'success'
            });
            setAppointment({ patientName: '', doctorName: '', date: '' });
        } catch (err) {
            console.error(err);
            setMessage({
                text: 'Error scheduling appointment. Please try again.',
                variant: 'danger'
            });
        }
    };

    return (
        <div className="container py-4">
            <Card style={customStyles.cardBg} className="shadow-lg">
                <Card.Header style={customStyles.headerBg}>
                    <h2 className="mb-0">Schedule New Appointment</h2>
                </Card.Header>
                <Card.Body>
                    {loading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2">Loading data...</p>
                        </div>
                    ) : (
                        <>
                            {message.text && (
                                <Alert variant={message.variant} className="mb-4">
                                    {message.text}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                {/* Patient Dropdown */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Patient</Form.Label>
                                    <Form.Select
                                        name="patientName"
                                        value={appointment.patientName}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Select Patient --</option>
                                        {patients.map((patient) => (
                                            <option key={patient._id} value={patient.name}>
                                                {patient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {/* Doctor Dropdown */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Doctor</Form.Label>
                                    <Form.Select
                                        name="doctorName"
                                        value={appointment.doctorName}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Select Doctor --</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor._id} value={doctor.name}>
                                                Dr. {doctor.name} ({doctor.specialty})
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {/* Date Input */}
                                <Form.Group className="mb-4">
                                    <Form.Label>Appointment Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={appointment.date}
                                        onChange={handleChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </Form.Group>

                                {/* Submit Button */}
                                <div className="d-grid gap-2">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        style={customStyles.buttonPrimary}
                                    >
                                        Schedule Appointment
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Appointments;
