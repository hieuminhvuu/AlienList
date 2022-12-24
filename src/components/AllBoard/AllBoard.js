import React from "react";
import { BoardContext } from "contexts/BoardContext";
import { useContext, useEffect } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import SingleBoard from "./SingleBoard";
import oops from "../../assets/image/oops.png";
import "./AllBoard.scss";

const AllBoard = () => {
    // Contexts
    const {
        boardState: { boards, boardsLoading },
        getBoards,
    } = useContext(BoardContext);

    // Start: get all boards
    useEffect(() => getBoards(), []);

    let body = null;

    if (boardsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (boards.length === 0) {
        body = (
            <div className="oops">
                <div className="oops-img">
                    <img src={oops} />
                </div>
                <h5 className="oops-des">
                    You don't have any board! Create a board now!
                </h5>
            </div>
        );
    } else {
        body = (
            <div>
                <Row>
                    {boards.map((board) => (
                        <Col key={board._id} xs={2}>
                            <SingleBoard board={board} />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }

    return <div>{body}</div>;
};

export default AllBoard;
