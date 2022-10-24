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
                                &nbsp;&nbsp;<strong>Alien MERN Stack</strong>
                            </div>
                            <div className="divider"></div>
                            <div className="item board-type">
                                Private Workspace
                            </div>
                            <div className="divider"></div>
                            <div className="item member-avatar">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/290/290836.png"
                                    alt="avatar"
                                    title="alien"
                                />
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/71/71298.png"
                                    alt="avatar"
                                    title="alien"
                                />
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/124/124627.png"
                                    alt="avatar"
                                    title="alien"
                                />
                                <img
                                    src="https://i.pinimg.com/564x/c1/03/14/c103149377ed3e8cc2ec64d9e168c825.jpg"
                                    alt="avatar"
                                    title="alien"
                                />
                                <img
                                    src="https://e7.pngegg.com/pngimages/222/339/png-clipart-alien-extraterrestrial-life-alien-purple-desktop-wallpaper.png"
                                    alt="avatar"
                                    title="alien"
                                />
                                <span className="more-members">+7</span>
                                <span className="invite">Invite</span>
                            </div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="board-actions">
                            <div className="item menu">
                                <i className="fa fa-ellipsis-h mr-2" />
                                Show menu
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    );
}

export default BoardBar;
