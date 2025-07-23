import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const AddDoctor = () => {
    const [form, setForm] = useState({
        name: '',
        specialty: ''
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

        try {
            await axios.post('http://51.20.54.29:5000/doctors/add', form);
            setMessage({
                text: 'Doctor added successfully!',
                variant: 'success'
            });
            setForm({ name: '', specialty: '' });
        } catch (err) {
            console.error(err);
            setMessage({
                text: 'Failed to add doctor. Please try again.',
                variant: 'danger'
            });
        }
    };

    return (
        <div className="container py-4">
            <Card style={customStyles.cardBg} className="shadow-lg">
                <Card.Header style={customStyles.headerBg}>
                    <h2 className="mb-0">Add New Doctor</h2>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit} autoComplete="on">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="doctorName">Doctor's Name</Form.Label>
                            <Form.Control
                                id="doctorName"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter doctor's full name"
                                autoComplete="name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="doctorSpecialty">Specialty</Form.Label>
                            <Form.Control
                                id="doctorSpecialty"
                                type="text"
                                name="specialty"
                                value={form.specialty}
                                onChange={handleChange}
                                required
                                placeholder="Enter medical specialty"
                                autoComplete="off"
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button
                                style={customStyles.buttonPrimary}
                                type="submit"
                                size="lg"
                            >
                                Add Doctor
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

export default AddDoctor;
