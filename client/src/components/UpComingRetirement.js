import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

async function fetchUpcomingRetirements() {
    try {
      console.log('Sending request...');
      const response = await fetch('http://localhost:3002/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query {
              getUpcomingRetirement { id, firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus, retirementDate }
            }`,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log('Received response:', json);
  
      if (json.errors) {
        throw new Error(`GraphQL error: ${json.errors.map(err => err.message).join(', ')}`);
      }
  
      return json.data ? json.data.getUpcomingRetirement.map(emp => ({
        ...emp,
        // Convert Unix timestamp to a readable date format
        dateOfJoining: formatDate(emp.dateOfJoining),
        retirementDate: formatDate(emp.retirementDate),
      })) : [];
    } catch (error) {
      console.error('Error fetching upcoming retirements:', error);
      return [];
    }
  }
  
  // Function to format Unix timestamp to YYYY-MM-DD
  function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = new Date(parseInt(timestamp, 10));
    return date.toISOString().split('T')[0];
  }
  

const UpComingRetirement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await fetchUpcomingRetirements();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <Container fluid className="my-2">
        <Row>
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="my-2">
        <Row>
          <Col className="text-center">
            <p className="text-danger">Error: {error}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="my-2">
      <Card className="p-4 rounded shadow-sm bg-light">
        <Row>
          <Col>
            <h2 className="mb-4">Upcoming Retirements</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr >
                  <th className="bg-success text-white">ID</th>
                  <th className="bg-success text-white">First Name</th>
                  <th className="bg-success text-white">Last Name</th>
                  <th className="bg-success text-white">Age</th>
                  <th className="bg-success text-white">Date of Joining</th>
                  <th className="bg-success text-white">Title</th>
                  <th className="bg-success text-white">Department</th>
                  <th className="bg-success text-white">Employee Type</th>
                  <th className="bg-success text-white">Current Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.firstName}</td>
                      <td>{emp.lastName}</td>
                      <td>{emp.age}</td>
                      <td>{emp.dateOfJoining}</td>
                      <td>{emp.title}</td>
                      <td>{emp.department}</td>
                      <td>{emp.employeeType}</td>
                      <td>{emp.currentStatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No upcoming retirements found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default UpComingRetirement;
