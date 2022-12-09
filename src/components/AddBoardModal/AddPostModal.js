import React, { useState, useEffect, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "utilities/constans";

const AddPostModal = (props) => {
    const { title, show, onAction } = props;
    const toggleAddBoard = () => {
        console.log("here");
        onAction(MODAL_ACTION_CONFIRM);
    };
    const newBoardTitleRef = useRef(null);
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            onHide={() => onAction(MODAL_ACTION_CLOSE)}
        >
            <Modal.Header closeButton>
                <h3>Add a board</h3>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            value={title}
                            ref={newBoardTitleRef}
                        />
                    </Form.Group>
                </Modal.Body>
            </Form>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => onAction(MODAL_ACTION_CLOSE)}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={toggleAddBoard}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPostModal;
