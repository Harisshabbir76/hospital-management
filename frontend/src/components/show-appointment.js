import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Card, Alert, Badge } from 'react-bootstrap';

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    // Custom color styles
    const customStyles = {
        headerBg: { backgroundColor: '#4a148c', color: '#ffecb3' },
        buttonPrimary: { backgroundColor: '#ffab00', borderColor: '#ffab00', color: '#4a148c' },
        buttonSecondary: { backgroundColor: '#7b1fa2', borderColor: '#7b1fa2', color: '#ffecb3' },
        buttonDanger: { backgroundColor: '#d32f2f', borderColor: '#d32f2f', color: '#ffecb3' },
        cardBg: { backgroundColor: '#f3e5f5' },
        tableHeader: { backgroundColor: '#7b1fa2', color: '#ffecb3' },
        completedBadge: { backgroundColor: '#388e3c' },
        pendingBadge: { backgroundColor: '#fb8c00' }
    };

    const fetchAppointments = () => {
        axios.get('http://51.20.54.29:5000 /appointments')
            .then(res => setAppointments(res.data))
            .catch(err => {
                console.error('Error fetching appointments:', err);
                setError('Failed to fetch appointments. Please try again.');
            });
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const markAsCompleted = (id) => {
        axios.patch(`http://51.20.54.29:5000 /appointments/complete/${id}`)
            .then(() => fetchAppointments())
            .catch(err => {
                console.error('Error marking appointment as completed:', err);
                setError('Failed to update appointment status. Please try again.');
            });
    };

    return (
        <div className="container py-4">
            <Card style={customStyles.cardBg} className="shadow-lg">
                <Card.Header style={customStyles.headerBg}>
                    <h2 className="mb-0">Appointment Management</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

                    {appointments.length === 0 ? (
                        <Alert variant="warning">No appointments found in the database.</Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr style={customStyles.tableHeader}>
                                        <th>Patient</th>
                                        <th>Doctor</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appt, index) => (
                                        <tr key={index}>
                                            <td>{appt.patientName}</td>
                                            <td>Dr. {appt.doctorName}</td>
                                            <td>{new Date(appt.date).toLocaleDateString()}</td>
                                            <td>
                                                {appt.completed ? (
                                                    <Badge style={customStyles.completedBadge}>Completed</Badge>
                                                ) : (
                                                    <Badge style={customStyles.pendingBadge}>Pending</Badge>
                                                )}
                                            </td>
                                            <td>
                                                {!appt.completed && (
                                                    <Button 
                                                        style={customStyles.buttonPrimary}
                                                        onClick={() => markAsCompleted(appt._id)}
                                                    >
                                                        Mark as Completed
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ViewAppointments;