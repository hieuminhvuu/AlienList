import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SingleBoard = ({ board: { _id, title } }) => {
    let history = useHistory();

    const goToBoard = () => {
        history.push(`/dashboard/${_id}`);
    };

    return (
        <Card
            className="shadow"
            border="success"
            role="button"
            onClick={goToBoard}
        >
            <Card.Body>
                <Card.Title>
                    <p className="board.title">{title}</p>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default SingleBoard;
