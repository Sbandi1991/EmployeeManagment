import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

const calculateRetirementTimeLeft = (retirementDate) => {
    const today = new Date();
    const retirement = new Date(retirementDate);

    const yearsLeft = differenceInYears(retirement, today);
    const monthsLeft = differenceInMonths(retirement, today) % 12;
    const daysLeft = differenceInDays(retirement, today) % 30;

    return { yearsLeft, monthsLeft, daysLeft };
};

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch('http://localhost:3002/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query GetEmployee($id: Int!) {
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
                retirementDate
              }
            }`,
            variables: { id: parseInt(id) }
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setEmployee(result.data.getEmployee);
        } else {
          console.error("Failed to fetch employee details.");
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  const { yearsLeft, monthsLeft, daysLeft } = calculateRetirementTimeLeft(employee.retirementDate);

  return (
    <Container className="mt-4">
      <Card className="p-4 rounded shadow-sm bg-light">
        <Card.Body>
          <Card.Title>Employee Details</Card.Title>
          <Card.Text>
            <strong>ID:</strong> {employee.id}
          </Card.Text>
          <Card.Text>
            <strong>First Name:</strong> {employee.firstName}
          </Card.Text>
          <Card.Text>
            <strong>Last Name:</strong> {employee.lastName}
          </Card.Text>
          <Card.Text>
            <strong>Age:</strong> {employee.age}
          </Card.Text>
          <Card.Text>
            <strong>Date of Joining:</strong> {employee.dateOfJoining}
          </Card.Text>
          <Card.Text>
            <strong>Title:</strong> {employee.title}
          </Card.Text>
          <Card.Text>
            <strong>Department:</strong> {employee.department}
          </Card.Text>
          <Card.Text>
            <strong>Employee Type:</strong> {employee.employeeType}
          </Card.Text>
          <Card.Text>
            <strong>Current Status:</strong> {employee.currentStatus}
          </Card.Text>
          <Card.Text>
            <strong>Retirement Date:</strong> {employee.retirementDate}
          </Card.Text>
          <Card.Text>
            <strong>Time Left Until Retirement:</strong> {yearsLeft} years, {monthsLeft} months, and {daysLeft} days
          </Card.Text>
          <Button
            variant="success"
            onClick={() => navigate("/employeedirectory")}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeDetails;
