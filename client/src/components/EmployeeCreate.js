import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeCreate = ({ addEmployee }) => {
    const [formData, setEmployeeForm] = useState({
        id: -1,
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: 'Employee',
        department: 'IT',
        employeeType: 'FullTime',
        currentStatus: '1',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        age: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        const regex = /^[a-zA-Z ]*$/;

        if ((name === 'firstName' || name === 'lastName') && !regex.test(value)) {
            setErrors({ ...errors, [name]: 'Only letters and spaces are allowed' });
        } else {
            setErrors({ ...errors, [name]: '' });
            setEmployeeForm({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { firstName: '', lastName: '', age: '' };

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
            valid = false;
        } else if (!/^[a-zA-Z ]*$/.test(formData.firstName)) {
            newErrors.firstName = 'Only letters and spaces are allowed';
            valid = false;
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        } else if (!/^[a-zA-Z ]*$/.test(formData.lastName)) {
            newErrors.lastName = 'Only letters and spaces are allowed';
            valid = false;
        }

        if (!formData.age) {
            newErrors.age = 'Age is required';
            valid = false;
        } else if (formData.age < 20 || formData.age > 70) {
            newErrors.age = 'Age must be between 20 and 70';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            addEmployee(formData);
            setEmployeeForm({
                id: -1,
                firstName: '',
                lastName: '',
                age: '',
                dateOfJoining: '',
                title: 'Employee',
                department: 'IT',
                employeeType: 'FullTime',
                currentStatus: '1',
            });
        }
    };

    return (
        <Container className="my-4">
            <h2 className="text-center mb-4">Create Employee</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label className="fw-bold">First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                placeholder="First Name"
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formLastName">
                            <Form.Label className="fw-bold">Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                placeholder="Last Name"
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formAge">
                            <Form.Label className="fw-bold">Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age}
                                placeholder="Age"
                                onChange={handleChange}
                                isInvalid={!!errors.age}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.age}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formDateOfJoining">
                            <Form.Label className="fw-bold">Date of Joining</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfJoining"
                                value={formData.dateOfJoining}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Group controlId="formTitle">
                            <Form.Label className="fw-bold">Title</Form.Label>
                            <Form.Select
                                name="title"
                                onChange={handleChange}
                                value={formData.title}
                            >
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formDepartment">
                            <Form.Label className="fw-bold">Department</Form.Label>
                            <Form.Select
                                name="department"
                                onChange={handleChange}
                                value={formData.department}
                            >
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formEmployeeType">
                            <Form.Label className="fw-bold">Employee Type</Form.Label>
                            <Form.Select
                                name="employeeType"
                                onChange={handleChange}
                                value={formData.employeeType}
                            >
                                <option value="FullTime">FullTime</option>
                                <option value="PartTime">PartTime</option>
                                <option value="Contract">Contract</option>
                                <option value="Seasonal">Seasonal</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formCurrentStatus">
                            <Form.Label className="fw-bold">Current Status</Form.Label>
                            <Form.Control
                                type="text"
                                name="currentStatus"
                                value="1"
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button type="submit" variant="success">
                        Add Employee
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EmployeeCreate;
