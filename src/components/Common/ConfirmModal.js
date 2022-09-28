import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import HTMLReactParser from "html-react-parser";

import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "utilities/constans";

function ConfirmModal(props) {
    const { title, content, show, onAction } = props;
    return (
        <Modal
            backdrop="static"
            keyboard={false}
            show={show}
            onHide={() => onAction(MODAL_ACTION_CLOSE)}
            //animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => onAction(MODAL_ACTION_CLOSE)}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => onAction(MODAL_ACTION_CONFIRM)}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;
