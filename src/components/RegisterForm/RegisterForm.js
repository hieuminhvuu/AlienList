import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "pages/Auth/AlertMessage";
import axios from "axios";
import { API_ROOT } from "utilities/constans";
import { useHistory } from "react-router-dom";
import validator from "email-validator";
import "./RegisterForm.scss";

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
        if (!validator.validate(email)) {
            setAlert({
                type: "danger",
                message: "Email invalid!",
            });
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
            const res = await axios.post(`${API_ROOT}/v1/auth/register`, {
                firstName,
                lastName,
                email,
                password,
            });
            if (res.data.success) {
                setAlert({
                    type: "success",
                    message: res.data.message,
                });
                setTimeout(() => history.push("/login"), 2000);
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
        <div className="container-register">
            <h1>Register</h1>
            <form onSubmit={register}>
                <AlertMessage info={alert} />
                <div className="txt_field">
                    <input
                        type="text"
                        required
                        name="firstName"
                        value={firstName}
                        onChange={onChangeRegisterForm}
                    />
                    <span></span>
                    <label>First name</label>
                </div>
                <div className="txt_field">
                    <input
                        type="text"
                        required
                        name="lastName"
                        value={lastName}
                        onChange={onChangeRegisterForm}
                    />
                    <span></span>
                    <label>Last name</label>
                </div>
                <div className="txt_field">
                    <input
                        type="text"
                        required
                        name="email"
                        value={email}
                        onChange={onChangeRegisterForm}
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
                        onChange={onChangeRegisterForm}
                    />
                    <span></span>
                    <label>Password</label>
                </div>
                <div className="txt_field">
                    <input
                        type="password"
                        required
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                    <span></span>
                    <label>Confirm password</label>
                </div>
                <button
                    type="submit"
                    variant="success"
                    className="btn-register"
                >
                    Register
                </button>
                <div className="signup_link">
                    Already have account?
                    <span>
                        <Link to="/login">
                            <p role="button">Login</p>
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
