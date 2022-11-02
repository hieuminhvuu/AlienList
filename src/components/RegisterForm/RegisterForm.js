import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AlertMessage from "pages/Auth/AlertMessage";
import axios from "axios";
import { API_ROOT } from "utilities/constans";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    let history = useHistory();

    const [registerForm, setRegisterForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { firstName, lastName, email, password, confirmPassword } =
        registerForm;

    const onChangeRegisterForm = (event) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    const [alert, setAlert] = useState(null);

    const register = async (event) => {
        event.preventDefault();
        if (email.length < 5) {
            setAlert({ type: "danger", message: "Email invalid!" });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        if (password.length < 6) {
            setAlert({
                type: "danger",
                message: "Password must be at least 6 characters long!",
            });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Passwords do not match!" });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        try {
            //register trong backend, thuc hien duoc thi sang login
            const res = await axios.post(`${API_ROOT}/v1/auth/register`, {
                firstName,
                lastName,
                email,
                password,
            });
            if (res.data.success) {
                console.log("cc");
                history.push("/login");
            } else {
                setAlert({
                    type: "danger",
                    message: res.data.message,
                });
                setTimeout(() => setAlert(null), 5000);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <label>First name :</label>
                    <Form.Control
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        required
                        value={firstName}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <label>Last name :</label>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        required
                        value={lastName}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <label>Email :</label>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        name="email"
                        required
                        value={email}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <label>Password :</label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <label>Confirm password :</label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>

            <p>
                Don't have an account ?
                <Link to="/Login">
                    <Button>Login</Button>
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
