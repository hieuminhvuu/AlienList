import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import AlertMessage from "pages/Auth/AlertMessage";
import "./LoginForm.scss";

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState(null);

    const { email, password } = loginForm;

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                //
            } else {
                setAlert({ type: "danger", message: loginData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container-login">
            <h1>Login</h1>

            <form onSubmit={login}>
                <AlertMessage info={alert} />
                <div className="txt_field">
                    <input
                        type="text"
                        required
                        name="email"
                        value={email}
                        onChange={onChangeLoginForm}
                    />
                    <span></span>
                    <label>Email</label>
                </div>
                <div className="txt_field">
                    <input
                        type="password"
                        required
                        name="password"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                    <span></span>
                    <label>Password</label>
                </div>
                <button type="submit" variant="success" className="btn-login">
                    Login
                </button>
                <div className="signup_link">
                    Not a member?
                    <span>
                        <Link to="/register">
                            <p role="button">Register</p>
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
