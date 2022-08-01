import React from 'react';
import { Button, Modal } from "react-bootstrap"
import format from 'date-fns/format';

const CustomModal = ({ show, handleClose, deleteBtn, name, location, startTime, endTime }) => {
    
    return (
        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{name} / {location} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*{format(startTime, "HH:mm")} - {format(endTime, "HH:mm")}*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteBtn}>Delete</Button>
                </Modal.Footer>
            </Modal>
    );
};

export default CustomModal;