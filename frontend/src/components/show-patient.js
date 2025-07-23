import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form, Card, Alert } from 'react-bootstrap';

const ViewPatients = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', age: '', gender: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        axios.get('http://51.20.54.29:5000 /patients')
            .then(res => setPatients(res.data))
            .catch(err => {
                console.error('Error fetching patients:', err);
                setError('Failed to fetch patients. Please try again.');
            });
    };

    const handleEditClick = (patient) => {
        setSelectedPatient(patient);
        setEditForm({ name: patient.name, age: patient.age, gender: patient.gender });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://51.20.54.29:5000 /patients/update/${selectedPatient._id}`, editForm)
            .then(() => {
                setShowEditModal(false);
                fetchPatients();
            })
            .catch(err => {
                console.error('Error updating patient:', err);
                setError('Failed to update patient. Please try again.');
            });
    };

    const confirmDelete = (patient) => {
        setSelectedPatient(patient);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        axios.delete(`http://51.20.54.29:5000 /patients/delete/${selectedPatient._id}`)
            .then(() => {
                setShowDeleteModal(false);
                fetchPatients();
            })
            .catch(err => {
                console.error('Error deleting patient:', err);
                setError('Failed to delete patient. Please try again.');
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
                    <h2 className="mb-0">Patient Management</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

                    {patients.length === 0 ? (
                        <Alert variant="warning">No patients found in the database.</Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr style={customStyles.tableHeader}>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map((patient, index) => (
                                        <tr key={index}>
                                            <td>{patient.name}</td>
                                            <td>{patient.age}</td>
                                            <td>{patient.gender}</td>
                                            <td>
                                                <Button 
                                                    style={customStyles.buttonPrimary} 
                                                    className="me-2"
                                                    onClick={() => handleEditClick(patient)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    style={customStyles.buttonDanger}
                                                    onClick={() => confirmDelete(patient)}
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
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton style={customStyles.headerBg}>
                    <Modal.Title>Edit Patient Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateSubmit}>
                    <Modal.Body style={customStyles.cardBg}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={editForm.age}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={editForm.gender}
                                onChange={handleEditChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={customStyles.cardBg}>
                        <Button 
                            style={customStyles.buttonSecondary} 
                            onClick={() => setShowEditModal(false)}
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
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton style={customStyles.headerBg}>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body style={customStyles.cardBg}>
                    <p>Are you sure you want to permanently delete <strong>{selectedPatient?.name}</strong>?</p>
                    <p className="text-danger">This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer style={customStyles.cardBg}>
                    <Button 
                        style={customStyles.buttonSecondary} 
                        onClick={() => setShowDeleteModal(false)}
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

export default ViewPatients;