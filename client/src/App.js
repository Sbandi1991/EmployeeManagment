import React from 'react';
import './App.css';
import EmployeeDirectory from './components/EmployeeDirectory';
import Header from './components/Header';
import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeDetails from './components/EmployeeDetails';
import { Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import UpComingRetirement from './components/UpComingRetirement';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>

      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>

      <Row className="App">
        <Col>
          <Routes>
            <Route path="/" element={<Navigate replace to="/employeedirectory" />} />
            <Route path="/employeedirectory">
              <Route index element={<EmployeeDirectory />} />
              <Route path="edit/:id" element={<EmployeeEdit />} />
              <Route path="viewdetails/:id" element={<EmployeeDetails />} />
            </Route>
            <Route path="/upcomingRetirement" element={<UpComingRetirement />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
