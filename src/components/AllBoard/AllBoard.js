import React from "react";
import { BoardContext } from "contexts/BoardContext";
import { useContext, useEffect } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import SingleBoard from "./SingleBoard";

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
        body = <div>U didn't create any board !!!</div>;
    } else {
        body = (
            <div>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {boards.map((board) => (
                        <Col key={board._id} className="my-2">
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
