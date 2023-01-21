import React from "react";
import { useHistory } from "react-router-dom";
import "./AppBar.scss";
import {
    Container as BootstrapContainer,
    Row,
    Col,
    Dropdown,
} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

function AppBar() {
    let history = useHistory();

    const { logoutUser } = useContext(AuthContext);

    const logout = () => {
        logoutUser();
    };

    return (
        <nav className="navbar-app toggle-dark-mode">
            <BootstrapContainer className="alien-trello-container">
                <Row>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="app-actions">
                            <div
                                className="item home"
                                role="button"
                                onClick={() => history.push(`/dashboard`)}
                            >
                                <i className="fa fa-home" />
                                &nbsp;&nbsp;<strong>Home</strong>
                            </div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding center">
                        TO-DO-LIST
                    </Col>
                    <Col sm={5} xs={12} className="col-no-padding right">
                        <div className="user-actions">
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    size="sm"
                                    className="dropdown-btn"
                                >
                                    <strong className="name-user">Menu</strong>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                    <Dropdown.Item
                                        onClick={() =>
                                            history.push(`/dashboard`)
                                        }
                                    >
                                        <i className="fa fa-list-alt"/>{" "}
                                        &nbsp;&nbsp;&nbsp;&nbsp;Boards
                                    </Dropdown.Item>
                                    <hr />
                                    <Dropdown.Item
                                        onClick={() => history.push(`/profile`)}
                                    >
                                        <i className="fa fa-user-circle"/>{" "}
                                        &nbsp;&nbsp;&nbsp;&nbsp;My Profile
                                    </Dropdown.Item>
                                    <hr />
                                    <Dropdown.Item onClick={logout}>
                                        <i className="fa fa-sign-out" />{" "}
                                        &nbsp;&nbsp;&nbsp;&nbsp;Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    );
}

export default AppBar;
