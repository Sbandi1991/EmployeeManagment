import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col ,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EmployeeEdit() {
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const getEmployeeAndUpdateLoading = async () => {
        await getOneEmployee(id);
        setLoading(false);
    };

    useEffect(() => {
        getEmployeeAndUpdateLoading();
    }, [id]);

    const fetchData = async (query, variables = {}) => {
        const response = await fetch('http://localhost:3002/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });

        if (response.ok) {
            const result = await response.json();
            return result.data;
        } else {
            console.error("Error in fetching data from server:", response.statusText);
        }
    };

    const getOneEmployee = async (id) => {
        const query = `query GetEmployee($id: Int!) {
            getEmployee(id: $id) {
                id
                firstName
                lastName
                age
                dateOfJoining
                title
                department
                employeeType
                currentStatus
            }
        }`;

        const data = await fetchData(query, { id: parseInt(id) });

        if (data && data.getEmployee) {
            setEmployee(data.getEmployee);
        } else {
            navigate("/NotFound");
        }
    };

    const editEmployee = async (id, employee) => {
        const query = `mutation editEmployee($id: Int!, $employee: EditEmployee!) {
            editEmployee(id: $id, employee: $employee) {
                id
                firstName
                lastName
                age
                dateOfJoining
                title
                department
                employeeType
                currentStatus
            }
        }`;

        const data = await fetchData(query, { id: parseInt(id), employee });
        return data.editEmployee;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editEmployee(parseInt(id), {
            title: employee.title,
            department: employee.department,
            currentStatus: employee.currentStatus
        });
        navigate("/employeedirectory");
    };

    const onChange = (e) => {
        const component = e.target.name;
        setEmployee({ ...employee, [component]: e.target.value });
    };

    return loading ? (
        <div>LOADING...</div>
    ) : (
        <Container fluid className="my-2">
             <Card className="p-4 rounded shadow-sm bg-light">
            <h2 className="text-center mb-4">Edit Employee</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label className="fw-bold">First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={employee.firstName}
                                onChange={onChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formLastName">
                            <Form.Label className="fw-bold">Last Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={employee.lastName}
                                onChange={onChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formAge">
                            <Form.Label className="fw-bold">Age:</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={employee.age}
                                onChange={onChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formDateOfJoining">
                            <Form.Label className="fw-bold">Date of Joining:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfJoining"
                                value={employee.dateOfJoining}
                                onChange={onChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={3}>
                        <Form.Group controlId="formTitle">
                            <Form.Label className="fw-bold">Title:</Form.Label>
                            <Form.Control
                                as="select"
                                name="title"
                                value={employee.title}
                                onChange={onChange}
                                required
                            >
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formDepartment">
                            <Form.Label className="fw-bold">Department:</Form.Label>
                            <Form.Control
                                as="select"
                                name="department"
                                value={employee.department}
                                onChange={onChange}
                                required
                            >
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formEmployeeType">
                            <Form.Label className="fw-bold">Employee Type:</Form.Label>
                            <Form.Control
                                type="text"
                                name="employeeType"
                                value={employee.employeeType}
                                onChange={onChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formCurrentStatus">
                            <Form.Label className="fw-bold">Current Status:</Form.Label>
                            <Form.Control
                                type="text"
                                name="currentStatus"
                                value={employee.currentStatus}
                                onChange={onChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <Button variant="success" type="submit" className="mx-2 outline-success">Edit</Button>
                    <Button
                        variant="success"
                        type="button"
                        onClick={() => navigate("/employeedirectory")}
                        className="mx-2 outline-success"
                    >
                        Back
                    </Button>
                </div>
            </Form>
            </Card>
        </Container>
    );
}
