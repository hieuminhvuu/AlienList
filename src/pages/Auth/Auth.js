import React from "react";
import "./Auth.scss";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";
import logo from "../../assets/image/AL.jpg";
import LoginForm from "components/LoginForm/LoginForm";
import RegisterForm from "components/RegisterForm/RegisterForm";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Auth({ authRoute }) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    } else {
        body = (
            <div>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </div>
        );
    }

    return (
        <div className="auth-master">
            <BootstrapContainer className="container-auth">
                <Row>
                    <Col sm={6} xs={12} className="col-no-padding left-col">
                        <img
                            src="https://images.fineartamerica.com/images/artworkimages/medium/3/space-alien-buddha-nikolay-todorov-transparent.png"
                            alt="page"
                        />
                    </Col>
                    <Col sm={6} xs={12} className="col-no-padding right-col">
                        <div className="content-right">
                            <div className="logo-div">
                                <img className="logo" src={logo} alt="logo" />
                            </div>
                            <div>Sign up now to enjoy</div>
                            <div>
                                <h2>REMEMBER</h2>
                                <h6>all your task, work more efficiently!</h6>
                            </div>
                            {body}
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </div>
    );
}

export default Auth;
