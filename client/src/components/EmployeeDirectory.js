import React, { useState, useEffect } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomPopup from './CustomPopup';

async function fetchData(employeeType, filterUpcomingRetirement) {
  try {
    console.log('Fetching data with:', { employeeType, filterUpcomingRetirement });

    let query;

    if (filterUpcomingRetirement === 'upcomingRetirement') {
      query = `query {
        getUpcomingRetirement(employeeType: ${employeeType ? employeeType : null}) {
          id
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
          retirementDate
        }
      }`;
    } else {
      query = `query {
        getEmployees(employeeType: ${employeeType ? employeeType : null}) {
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
    }

    console.log('GraphQL query:', query);

    const response = await fetch('http://localhost:3002/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error:', errorText);
      throw new Error(`GraphQL query failed with status ${response.status}`);
    }

    const json = await response.json();
    console.log('Fetched data:', json.data);

    return filterUpcomingRetirement === 'upcomingRetirement'
      ? json.data.getUpcomingRetirement
      : json.data.getEmployees;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}



async function postEmployee(employee) {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation addEmployee($input:InputEmployee!) {
            addEmployee(employee: $input) {id,firstName, lastName, age, dateOfJoining, title, department, employeeType,currentStatus}
         }`,
      variables: { input: employee },
    }),
  });

  const json = await data.json();
  return json.data.addEmployee;
}

async function deleteEmployeeFromDB(id) {
  const response = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation deleteEmployee($id: Int!) {
        deleteEmployee(id: $id) {
          id
        }
      }`,
      variables: { id },
    }),
  });

  const json = await response.json();

  if (json.errors) {
    const errorMessages = json.errors.map(error => error.message);
    return { error: errorMessages.join(', ') };
  }

  if (!json.data || !json.data.deleteEmployee) {
    return { error: 'Unexpected error occurred' };
  }

  return json.data.deleteEmployee;
}


const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchParams, _] = useSearchParams();
  const employeeType = searchParams.get("EmployeeType");
  const filterUpcomingRetirement=searchParams.get("filterUpcomingRetirement");
  
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const addEmployee = async (employee) => {
    employee = await postEmployee(employee);
    setEmployees([...employees, employee]);
  };

  const deleteEmployee = async (id) => {
    const result = await deleteEmployeeFromDB(id);
    if (result.error) {
      setError(result.error);
      setShowError(true);
    } else {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
    };

  useEffect(() => {
    const wrap_function = async () => {
      const data = await fetchData(employeeType,filterUpcomingRetirement);
      setEmployees(data);
    };

    wrap_function();
  }, [employeeType, filterUpcomingRetirement]);

  const handleClosePopup = () => setShowError(false);


  return (
    <Container fluid className="my-2">
      <Card className="p-4 rounded shadow-sm bg-light">
        <Row>
          <Col>
            <EmployeeSearch />
          </Col>
        </Row>
        <Row>
          <Col>
            <EmployeeCreate addEmployee={addEmployee} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Employee Details</h2>
            <EmployeeTable employees={employees} deleteEmployee={deleteEmployee} />
          </Col>
        </Row>
        <CustomPopup show={showError} message={error} onClose={handleClosePopup} />

      </Card>
    </Container>
  );
};

export default EmployeeDirectory;
