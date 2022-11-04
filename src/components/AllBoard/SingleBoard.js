import React from "react";
import { Card } from "react-bootstrap";
//import Button from "react-bootstrap";

const SingleBoard = ({ board: { _id, title } }) => {
    return (
        <Card className="shadow" border="success">
            <Card.Body>
                <Card.Title>
                    <p className="board.title">{title}</p>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default SingleBoard;
