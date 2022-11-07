import React from "react";

import "./AppBar.scss";
import {
    Container as BootstrapContainer,
    Row,
    Col,
    // InputGroup,
    // FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

function AppBar() {
    const { logoutUser } = useContext(AuthContext);

    const logout = () => {
        logoutUser();
    };

    return (
        <nav className="navbar-app">
            <BootstrapContainer className="alien-trello-container">
                <Row>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="app-actions">
                            {/* <div className="item all">
                                <i className="fa fa-th" />
                            </div> */}
                            <div className="item home">
                                <i className="fa fa-home" />
                            </div>
                            <div className="item boards">
                                <Link
                                    to="/dashboard"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    <i className="fa fa-columns" />
                                    &nbsp;&nbsp;<strong>Boards</strong>
                                </Link>
                            </div>
                            {/* <div className="item search">
                                <InputGroup className="group-search">
                                    <FormControl
                                        className="input-search"
                                        placeholder="Jump to ..."
                                    />
                                    <InputGroup.Text className="input-icon-search">
                                        <i className="fa fa-search" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </div> */}
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="app-branding text-center">
                            <a
                                href="https://github.com/hieuminhvuu"
                                target="blank"
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/290/290836.png"
                                    className="top-logo"
                                    alt="alien-logo"
                                />
                                <span className="alien-slogan">Alien</span>
                            </a>
                        </div>
                    </Col>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="user-actions">
                            {/* <div className="item quick">
                                <i className="fa fa-plus-square-o" />
                            </div>
                            <div className="item news">
                                <i className="fa fa-info-circle" />
                            </div>
                            <div className="item notification">
                                <i className="fa fa-bell-o" />
                            </div> */}
                            <div className="item user-avatar">
                                <img
                                    src="https://play-lh.googleusercontent.com/tZsW2cETxSjdJk7RGW6hskzEHBjMGUhvbi7qG-Ae8nJMkGegbpMmE_GoCMLW8ROpgY4"
                                    alt="avatar-alien"
                                    title="alien"
                                />
                            </div>
                            <div className="item logout">
                                <i
                                    onClick={logout}
                                    className="fa fa-sign-out"
                                    role="button"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    );
}

export default AppBar;
