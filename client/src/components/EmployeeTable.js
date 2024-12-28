import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeTable = ({ employees, deleteEmployee }) => {
    return (
        <div className="container mt-4">
            <table className="table table-striped table-bordered">
                <thead >
                    <tr >
                        <th className="bg-success text-white">ID</th>
                        <th className="bg-success text-white">First Name</th>
                        <th className="bg-success text-white">Last Name</th>
                        <th className="bg-success text-white" >Age</th>
                        <th className="bg-success text-white">Date of Joining</th>
                        <th className="bg-success text-white">Title</th>
                        <th className="bg-success text-white">Department</th>
                        <th className="bg-success text-white">Employee Type</th>
                        <th className="bg-success text-white">Current Status</th>
                        <th className="bg-success text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.age}</td>
                            <td>{employee.dateOfJoining}</td>
                            <td>{employee.title}</td>
                            <td>{employee.department}</td>
                            <td>{employee.employeeType}</td>
                            <td>{employee.currentStatus}</td>
                            <td>
                                <div className="d-flex justify-content-around">
                                    <Link to={`edit/${employee.id}`} className="btn btn-outline-success btn-sm">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <Button 
                                        variant="outline-success" 
                                        size="sm"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                    <Link to={`viewdetails/${employee.id}`} className="btn btn-outline-success btn-sm">
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
