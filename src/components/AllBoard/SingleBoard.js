import React, { useState, useContext } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SingleBoard.scss";
import ConfirmModal from "components/Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "utilities/constans";
import { BoardContext } from "contexts/BoardContext";
import { selectAllInlineText } from "utilities/contentEditable";
import { saveContentAfterPressEnter } from "utilities/contentEditable";

const SingleBoard = ({ board: { _id, title } }) => {
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

    //Update board title
    const [boardTitle, setBoardTitle] = useState(title);
    const handleBoardTitleChange = (e) => {
        setBoardTitle(e.target.value);
    };
    const handleBoardTitleBlur = async () => {
        // Call api update board
        if (boardTitle !== title) {
            const board = {
                id: _id,
                title: boardTitle,
            };
            await updateBoard(board);
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
                <Card.Img
                    variant="top"
                    src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg"
                />
                <Card.Body>
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
                        <i
                            className="fa fa-trash-o delete"
                            role="button"
                            onClick={toggleShowConfirmModal}
                        ></i>
                    </Card.Title>
                </Card.Body>
            </Card>
            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={"Remove board"}
                content={`Are you sure to remove  ?`}
            ></ConfirmModal>
        </div>
    );
};

export default SingleBoard;
