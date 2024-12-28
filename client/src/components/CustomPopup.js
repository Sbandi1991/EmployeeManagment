import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomPopup = ({ show, message, onClose }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title className="text-danger">Error</Modal.Title>
    </Modal.Header>
    <Modal.Body className="fw-bold">{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CustomPopup;
