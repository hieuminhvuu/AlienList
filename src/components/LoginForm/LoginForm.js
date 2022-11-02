import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import AlertMessage from "pages/Auth/AlertMessage";

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
        <div>
            <Form onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <label>Email</label>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        name="email"
                        required
                        value={email}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <label>Password</label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>

            <p>
                Don't have an account ?
                <Link to="/register">
                    <Button>Register</Button>
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
