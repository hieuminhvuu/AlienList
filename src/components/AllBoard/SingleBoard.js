import React, { useState, useContext } from "react";
import { Button, Card, Form, Dropdown, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SingleBoard.scss";
import ConfirmModal from "components/Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "utilities/constans";
import { BoardContext } from "contexts/BoardContext";
import { selectAllInlineText } from "utilities/contentEditable";
import { saveContentAfterPressEnter } from "utilities/contentEditable";
import img0 from "../../assets/image/BoardCover/0.png";
import img1 from "../../assets/image/BoardCover/1.png";
import img2 from "../../assets/image/BoardCover/2.png";
import img3 from "../../assets/image/BoardCover/3.jpeg";
import img4 from "../../assets/image/BoardCover/4.jpeg";
import img5 from "../../assets/image/BoardCover/5.png";
import img6 from "../../assets/image/BoardCover/6.png";
import img7 from "../../assets/image/BoardCover/7.png";
import img8 from "../../assets/image/BoardCover/8.jpeg";
import img9 from "../../assets/image/BoardCover/9.png";
import img10 from "../../assets/image/BoardCover/10.png";
import img11 from "../../assets/image/BoardCover/11.png";

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
                id: _id,
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
    const [url, setUrl] = useState(10);
    const onUpdateBoardCover = async () => {
        if (url !== 10) {
            const board = {
                _id: _id,
                cover: url,
                title: title,
            };
            await updateBoard(board);
            setUrl(10);
            setShowModalUpdateBoardCover(!showModalUpdateBoardCover);
        }
    };
    const [temp, setTemp] = useState(img0);

    let srcCover;
    switch (cover) {
        case 0:
            srcCover = img0;
            break;
        case 1:
            srcCover = img1;
            break;
        case 2:
            srcCover = img2;
            break;
        case 3:
            srcCover = img3;
            break;
        case 4:
            srcCover = img4;
            break;
        case 5:
            srcCover = img5;
            break;
        case 6:
            srcCover = img6;
            break;
        case 7:
            srcCover = img7;
            break;
        case 8:
            srcCover = img8;
            break;
        case 9:
            srcCover = img9;
            break;
        case 10:
            srcCover = img10;
            break;
        case 11:
            srcCover = img11;
            break;
    }
    return (
        <div>
            <Card
                className="shadow my-card"
                border="success"
                role="button"
                onClick={goToBoard}
            >
                <Card.Img variant="top" src={srcCover} />
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
                className="update-board-modal"
                backdrop="static"
                keyboard={false}
                show={showModalUpdateBoardCover}
                onHide={() =>
                    setShowModalUpdateBoardCover(!showModalUpdateBoardCover)
                }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update board cover to : </Modal.Title>
                    <img src={temp} />
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={img0}
                        role="button"
                        onClick={() => {
                            setUrl(0);
                            setTemp(img0);
                        }}
                    />
                    <img
                        src={img1}
                        role="button"
                        onClick={() => {
                            setUrl(1);
                            setTemp(img1);
                        }}
                    />
                    <img
                        src={img2}
                        role="button"
                        onClick={() => {
                            setUrl(2);
                            setTemp(img2);
                        }}
                    />
                    <img
                        src={img3}
                        role="button"
                        onClick={() => {
                            setUrl(3);
                            setTemp(img3);
                        }}
                    />
                    <img
                        src={img4}
                        role="button"
                        onClick={() => {
                            setUrl(4);
                            setTemp(img4);
                        }}
                    />
                    <img
                        src={img5}
                        role="button"
                        onClick={() => {
                            setUrl(5);
                            setTemp(img5);
                        }}
                    />
                    <img
                        src={img6}
                        role="button"
                        onClick={() => {
                            setUrl(6);
                            setTemp(img6);
                        }}
                    />
                    <img
                        src={img7}
                        role="button"
                        onClick={() => {
                            setUrl(7);
                            setTemp(img7);
                        }}
                    />
                    <img
                        src={img8}
                        role="button"
                        onClick={() => {
                            setUrl(8);
                            setTemp(img8);
                        }}
                    />
                    <img
                        src={img9}
                        role="button"
                        onClick={() => {
                            setUrl(9);
                            setTemp(img9);
                        }}
                    />
                    <img
                        src={img10}
                        role="button"
                        onClick={() => {
                            setUrl(9);
                            setTemp(img10);
                        }}
                    />
                    <img
                        src={img11}
                        role="button"
                        onClick={() => {
                            setUrl(9);
                            setTemp(img11);
                        }}
                    />
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
