import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const AddPatient = () => {
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: ''
    });

    const [message, setMessage] = useState({ text: '', variant: '' });

    // Custom color styles
    const customStyles = {
        headerBg: { backgroundColor: '#4a148c', color: '#ffecb3' },
        buttonPrimary: { backgroundColor: '#ffab00', borderColor: '#ffab00', color: '#4a148c' },
        cardBg: { backgroundColor: '#f3e5f5' }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', variant: '' });
        console.log('Submitting form:', form); // ✅ DEBUG
        try {
            const res = await axios.post('http://localhost:5000/patients/add', form);
            console.log('Response:', res); // ✅ DEBUG
            setMessage({
                text: 'Patient added successfully!',
                variant: 'success'
            });
            setForm({ name: '', age: '', gender: '' });
        } catch (err) {
            console.error('API Error:', err); // ✅ DEBUG
            setMessage({
                text: 'Error adding patient. Please try again.',
                variant: 'danger'
            });
            console.error(err);
        }
    };

    return (
        <div className="container py-4">
            <Card style={customStyles.cardBg} className="shadow-lg">
                <Card.Header style={customStyles.headerBg}>
                    <h2 className="mb-0">Add New Patient</h2>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit} autoComplete="on">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="patientName">Full Name</Form.Label>
                            <Form.Control
                                id="patientName"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter patient's full name"
                                autoComplete="name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="patientAge">Age</Form.Label>
                            <Form.Control
                                id="patientAge"
                                type="number"
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                required
                                placeholder="Enter patient's age"
                                min="0"
                                autoComplete="off"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="patientGender">Gender</Form.Label>
                            <Form.Select
                                id="patientGender"
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                required
                                autoComplete="sex"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button
                                style={customStyles.buttonPrimary}
                                type="submit"
                                size="lg"
                            >
                                Add Patient
                            </Button>
                        </div>
                    </Form>

                    {message.text && (
                        <Alert variant={message.variant} className="mt-3">
                            {message.text}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default AddPatient;
