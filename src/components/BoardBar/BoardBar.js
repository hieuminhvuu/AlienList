import React from "react";
import date_img from "../../assets/image/date.svg";

import "./BoardBar.scss";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

const monthName = [
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
        <nav className="navbar-board toggle-dark-mode">
            <BootstrapContainer className="alien-trello-container">
                <Row>
                    <Col sm={10} xs={12} className="col-no-padding">
                        <div className="board-info">
                            <div className="item board-logo-icon">
                                <img src={date_img} className="date_img" alt="date_"/>
                                &nbsp;&nbsp;<time dateTime={dateTimeFormat}>{todayDate}</time>
                            </div>
                        </div>
                    </Col>
                    {/*<Col sm={2} xs={12} className="col-no-padding">*/}
                    {/*    <div className="board-actions">*/}
                    {/*        <div*/}
                    {/*            className="item menu"*/}
                    {/*            onClick={() => {*/}
                    {/*                window.location.reload();*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            Reload*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                    <Col sm={2} xs={12} className="col-no-padding">

                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    );
}

export default BoardBar;
