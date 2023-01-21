import React from "react";

import "./BoardBar.scss";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";

function BoardBar() {
    return (
        <nav className="navbar-board">
            <BootstrapContainer className="alien-trello-container">
                <Row>
                    <Col sm={10} xs={12} className="col-no-padding">
                        <div className="board-info">
                            <div className="item board-logo-icon">
                                <i className="fa fa-coffee" />
                                &nbsp;&nbsp;<strong>WorkSpace</strong>
                            </div>
                            <div className="divider"></div>
                            <div className="item board-type">Private</div>
                            <div className="divider"></div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="board-actions">
                            <div
                                className="item menu"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Reload
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    );
}

export default BoardBar;
