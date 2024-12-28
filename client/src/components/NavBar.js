import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="issue-navbar-nav" />
      <Navbar.Collapse id="issue-navbar-nav justify-content-center">
        <NavLink className="nav-link p-2 fw-bold" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link p-2 fw-bold" to="/upcomingRetirement">Upcoming Retirement</NavLink>
      </Navbar.Collapse>
    </Navbar>

  );
}
