import React, { useState } from "react";
import AppBar from "components/AppBar/AppBar";
import AllBoard from "components/AllBoard/AllBoard";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./DashBoard.scss";
import AddPostModal from "components/AddBoardModal/AddPostModal";

const DashBoard = () => {
    const toggleShowAddModal = () => setShowAddModal(!showAddModal);
    const [showAddModal, setShowAddModal] = useState(false);
    const onAddModalAction = () => {
        toggleShowAddModal();
    };

    return (
        <div className="dashboard toggle-dark-mode">
            <AppBar />
            <div>
                <Container className="all-board-container" fluid>
                    <Row xs={11}>
                        <Col>
                            <h2>All Boards</h2>
                        </Col>
                        <Col xs={1}>
                            <button className="btn custom-btn" onClick={toggleShowAddModal}>

                                    + Add

                            </button>
                        </Col>
                    </Row>
                    <AllBoard />
                </Container>
            </div>
            <AddPostModal show={showAddModal} onAction={onAddModalAction} />
        </div>
    );
};

export default DashBoard;
