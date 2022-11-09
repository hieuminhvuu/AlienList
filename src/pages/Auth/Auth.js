import React from "react";
import "./Auth.scss";
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

    return <div className="auth-master">{body}</div>;
}

export default Auth;
