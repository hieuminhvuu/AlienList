import React, {useContext} from 'react';
import {Dropdown} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext";

function MenuButton() {

    let history = useHistory();

    const { logoutUser } = useContext(AuthContext);

    const logout = () => {
        logoutUser();
    };

    return (
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
    )
}

export default MenuButton;