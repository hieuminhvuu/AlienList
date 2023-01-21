import React from "react";

import "./BoardBar.scss";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";

const date: Date = new Date();
const year: number = date.getFullYear();
const month: number = date.getMonth();
const day: number = date.getDate();

const monthName: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const todayDate = `${year}, ${monthName[month].slice(0, 3)} ${day
    .toString()
    .padStart(2, "0")}`;

const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}}`;

function BoardBar() {
    return (
        <nav className="navbar-board">
            <BootstrapContainer className="alien-trello-container">
                <Row>
                    <Col sm={10} xs={12} className="col-no-padding">
                        <div className="board-info">
                            <div className="item board-logo-icon">
                                <i className="fa fa-coffee" />
                                &nbsp;&nbsp;<time dateTime={dateTimeFormat}>{todayDate}</time>
                            </div>
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
