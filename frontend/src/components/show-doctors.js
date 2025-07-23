import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form, Card, Alert } from 'react-bootstrap';

const ViewDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const [form, setForm] = useState({ name: '', specialty: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        axios.get('http://localhost:5000/doctors')
            .then(res => setDoctors(res.data))
            .catch(err => {
                console.error('Error fetching doctors:', err);
                setError('Failed to fetch doctors. Please try again.');
            });
    };

    const openEditModal = (doctor) => {
        setEditingDoctor(doctor);
        setForm({ name: doctor.name, specialty: doctor.specialty });
    };

    const closeEditModal = () => {
        setEditingDoctor(null);
    };

    const openDeleteModal = (doctor) => {
        setDeletingDoctor(doctor);
    };

    const closeDeleteModal = () => {
        setDeletingDoctor(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/doctors/update/${editingDoctor._id}`, form)
            .then(() => {
                fetchDoctors();
                closeEditModal();
            })
            .catch(err => {
                console.error('Update failed:', err);
                setError('Failed to update doctor. Please try again.');
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/doctors/delete/${deletingDoctor._id}`)
            .then(() => {
                fetchDoctors();
                closeDeleteModal();
            })
            .catch(err => {
                console.error('Delete failed:', err);
                setError('Failed to delete doctor. Please try again.');
            });
    };

    // Custom color styles
    const customStyles = {
        headerBg: { backgroundColor: '#4a148c', color: '#ffecb3' },
        buttonPrimary: { backgroundColor: '#ffab00', borderColor: '#ffab00', color: '#4a148c' },
        buttonSecondary: { backgroundColor: '#7b1fa2', borderColor: '#7b1fa2', color: '#ffecb3' },
        buttonDanger: { backgroundColor: '#d32f2f', borderColor: '#d32f2f', color: '#ffecb3' },
        cardBg: { backgroundColor: '#f3e5f5' },
        tableHeader: { backgroundColor: '#7b1fa2', color: '#ffecb3' }
    };

    return (
        <div className="container py-4">
            <Card style={customStyles.cardBg} className="shadow-lg">
                <Card.Header style={customStyles.headerBg}>
                    <h2 className="mb-0">Doctor Management</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

                    {doctors.length === 0 ? (
                        <Alert variant="warning">No doctors found in the database.</Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr style={customStyles.tableHeader}>
                                        <th>Name</th>
                                        <th>Specialization</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map((doctor, index) => (
                                        <tr key={index}>
                                            <td>Dr. {doctor.name}</td>
                                            <td>{doctor.specialty}</td>
                                            <td>
                                                <Button 
                                                    style={customStyles.buttonPrimary} 
                                                    className="me-2"
                                                    onClick={() => openEditModal(doctor)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    style={customStyles.buttonDanger}
                                                    onClick={() => openDeleteModal(doctor)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Edit Modal */}
            <Modal show={!!editingDoctor} onHide={closeEditModal}>
                <Modal.Header closeButton style={customStyles.headerBg}>
                    <Modal.Title>Edit Doctor Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdate}>
                    <Modal.Body style={customStyles.cardBg}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Specialty</Form.Label>
                            <Form.Control
                                type="text"
                                name="specialty"
                                value={form.specialty}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={customStyles.cardBg}>
                        <Button 
                            style={customStyles.buttonSecondary} 
                            onClick={closeEditModal}
                        >
                            Cancel
                        </Button>
                        <Button 
                            style={customStyles.buttonPrimary} 
                            type="submit"
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={!!deletingDoctor} onHide={closeDeleteModal}>
                <Modal.Header closeButton style={customStyles.headerBg}>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body style={customStyles.cardBg}>
                    <p>Are you sure you want to permanently delete <strong>Dr. {deletingDoctor?.name}</strong>?</p>
                    <p className="text-danger">This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer style={customStyles.cardBg}>
                    <Button 
                        style={customStyles.buttonSecondary} 
                        onClick={closeDeleteModal}
                    >
                        Cancel
                    </Button>
                    <Button 
                        style={customStyles.buttonDanger} 
                        onClick={handleDelete}
                    >
                        Delete Permanently
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ViewDoctors;