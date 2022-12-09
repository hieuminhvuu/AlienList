import React, { useState, useEffect, useRef, useContext } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "utilities/constans";
import { BoardContext } from "contexts/BoardContext";

const AddPostModal = (props) => {
    // Context
    const { addBoard } = useContext(BoardContext);
    const { show, onAction } = props;
    const newBoardTitleRef = useRef(null);
    useEffect(() => {
        if (show) {
            newBoardTitleRef.current.focus();
        }
    });
    const [boardTitle, setBoardTitle] = useState("");
    const onChangeAddNewBoard = (e) => setBoardTitle(e.target.value);
    const onSubmitAddBoard = async (event) => {
        event.preventDefault();
        if (!boardTitle.trim()) {
            newBoardTitleRef.current.focus();
            return;
        }
        const newBoardToAdd = {
            title: boardTitle,
        };
        await addBoard(newBoardToAdd);

        setBoardTitle("");
        onAction(MODAL_ACTION_CONFIRM);
    };
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
                            name="boardTitle"
                            required
                            value={boardTitle}
                            ref={newBoardTitleRef}
                            onChange={onChangeAddNewBoard}
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
                    onClick={onSubmitAddBoard}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPostModal;
