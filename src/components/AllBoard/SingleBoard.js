import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Card, Form, Dropdown, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SingleBoard.scss";
import ConfirmModal from "components/Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "utilities/constans";
import { BoardContext } from "contexts/BoardContext";
import { selectAllInlineText } from "utilities/contentEditable";
import { saveContentAfterPressEnter } from "utilities/contentEditable";

const SingleBoard = ({ board: { _id, title, cover } }) => {
    let history = useHistory();

    const { deleteBoard } = useContext(BoardContext);
    const { updateBoard } = useContext(BoardContext);
    const goToBoard = () => {
        history.push(`/dashboard/${_id}`);
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = (e) => {
        setShowConfirmModal(!showConfirmModal);
        if (!showConfirmModal) {
            e.stopPropagation();
        }
    };

    const onConfirmModalAction = async (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const board = {
                _id: _id,
            };
            await deleteBoard(board);
        }
        toggleShowConfirmModal();
    };

    // Update board title
    const [boardTitle, setBoardTitle] = useState(title);
    const handleBoardTitleChange = (e) => {
        setBoardTitle(e.target.value);
    };
    const handleBoardTitleBlur = async () => {
        // Call api update board
        if (boardTitle !== title) {
            const board = {
                _id: _id,
                title: boardTitle,
                cover: cover,
            };
            await updateBoard(board);
        }
    };

    // Update board cover
    const [showModalUpdateBoardCover, setShowModalUpdateBoardCover] =
        useState(false);
    const [url, setUrl] = useState("");
    const newUrlRef = useRef(null);
    useEffect(() => {
        if (showModalUpdateBoardCover) {
            newUrlRef.current.focus();
        }
    });
    const handleOnChangeUrl = (e) => {
        setUrl(e.target.value);
    };
    const onUpdateBoardCover = async () => {
        if (url) {
            const board = {
                _id: _id,
                cover: url,
                title: title,
            };
            await updateBoard(board);
            setUrl("");
            setShowModalUpdateBoardCover(!showModalUpdateBoardCover);
        }
    };
    return (
        <div>
            <Card
                className="shadow my-card"
                border="success"
                role="button"
                onClick={goToBoard}
            >
                <Card.Img variant="top" src={cover} />
                <Card.Body className="card-body">
                    <Card.Title className="card-title">
                        <Form.Control
                            className="board-title"
                            type="text"
                            spellCheck="false"
                            value={boardTitle}
                            onClick={selectAllInlineText}
                            onChange={handleBoardTitleChange}
                            onBlur={handleBoardTitleBlur}
                            onKeyDown={saveContentAfterPressEnter}
                        ></Form.Control>
                    </Card.Title>
                    <div className="dropdown">
                        <Dropdown onClick={(e) => e.stopPropagation()}>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                size="sm"
                                className="dropdown-btn"
                            ></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() =>
                                        setShowModalUpdateBoardCover(
                                            !showConfirmModal
                                        )
                                    }
                                >
                                    Update cover{" "}
                                    <i className="fa fa-pencil"></i>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={toggleShowConfirmModal}>
                                    Remove board{" "}
                                    <i className="fa fa-trash-o"></i>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Body>
            </Card>
            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={"Remove board"}
                content={`Are you sure to remove  ?`}
            ></ConfirmModal>
            <Modal
                backdrop="static"
                keyboard={false}
                show={showModalUpdateBoardCover}
                onHide={() =>
                    setShowModalUpdateBoardCover(!showModalUpdateBoardCover)
                }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update board cover</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="url"
                            required
                            value={url}
                            onChange={handleOnChangeUrl}
                            ref={newUrlRef}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onUpdateBoardCover}>
                        Update cover
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SingleBoard;
