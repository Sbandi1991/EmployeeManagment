import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeSearch = () => {
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const queryParams = new URLSearchParams(location.search);

    if (name === 'filterUpcomingRetirement') {
      if (value === 'upcomingRetirement') {
        queryParams.set(name, value);
      } else {
        queryParams.delete(name);
      }
    } else {
      queryParams.set(name, value);
    }

    navigate(`/employeedirectory?${queryParams.toString()}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <Link to="/employeedirectory" className="text-decoration-none">
        <Form.Label className="fs-4 btn btn-link cursor-pointer">
          Reset Filter
        </Form.Label>
      </Link>
      <Form.Select 
        className="form-select form-select-lg w-25 mx-2" 
        name="EmployeeType"
        onChange={handleFilterChange}
      >
        <option value="FullTime">FullTime</option>
        <option value="PartTime">PartTime</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
      </Form.Select>
      <Form.Select 
        className="form-select form-select-lg w-25 mx-2" 
        name="filterUpcomingRetirement"
        onChange={handleFilterChange}
      >
        <option value="">Select Filter</option>
        <option value="upcomingRetirement">Upcoming Retirement</option>
      </Form.Select>
    </div>
  );
};

export default EmployeeSearch;
