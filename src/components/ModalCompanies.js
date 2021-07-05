import React from 'react';
import { Modal } from 'react-bootstrap';

function ModalCompanies({show, title, onHide, children}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            animation={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default ModalCompanies;