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
            style={{ maxWidth: "15rem", marginTop: "1rem" }}
            onClick={goToBoard}
        >
            <Card.Img
                variant="top"
                src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg"
            />
            <Card.Body>
                <Card.Title>
                    <p>{title}</p>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default SingleBoard;
