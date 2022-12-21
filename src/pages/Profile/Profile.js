import AppBar from "components/AppBar/AppBar";
import React, { useState, useEffect } from "react";
import {
    Button,
    Col,
    Container,
    FormGroup,
    FormLabel,
    Modal,
    Row,
    Form,
} from "react-bootstrap";
import "./Profile.scss";
import male from "../../assets/image/male.png";
import female from "../../assets/image/female.png";
import { check, updateUser } from "actions/ApiCall";
import AlertMessage from "pages/Auth/AlertMessage";

const Profile = () => {
    const [data, setData] = useState({
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        bio: "",
        sex: "",
    });
    useEffect(() => {
        check()
            .then((response) => {
                setData(response.data.user);
            })
            .catch((error) => console.error("Error fetching data : ", error));
    }, []);
    // Update information
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [sex, setSex] = useState(1);
    const [bio, setBio] = useState();
    const updateInfo = () => {
        if (firstName && lastName && bio) {
            const dataToUpdate = {
                firstName: firstName,
                lastName: lastName,
                sex: sex,
                bio: bio,
            };
            console.log(data._id);
            console.log(dataToUpdate);
            updateUser(data._id, dataToUpdate);
            const dataToState = {
                ...dataToUpdate,
                _id: data._id,
                email: data.email,
            };
            setData(dataToState);
            setShowModalUpdate(!showModalUpdate);
            setFirstName("");
            setLastName("");
            setBio("");
        } else {
            setAlert({ type: "danger", message: "Missing information!" });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
    };
    const [alert, setAlert] = useState(null);

    return (
        <div>
            <AppBar />
            <div className="div-first">
                <Container className="container-profile" fluid>
                    <Row className="first-row justify-content-md-left">
                        <Col xs={4} className="col-image">
                            <img
                                className="image"
                                src={data.sex ? female : male}
                            />
                        </Col>
                        <Col xs={6}>
                            <h2 className="name-profile">
                                {data.firstName} {data.lastName}
                            </h2>
                            <p>{data.bio}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <h5>Personal information</h5>
                    </Row>
                </Container>
            </div>
            <div className="div-second">
                <Container className="container-profile" fluid>
                    <FormGroup as={Row}>
                        <FormLabel column md="3" lg="4">
                            Email
                        </FormLabel>
                        <Col md="8" lg="7">
                            {data.email}
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row}>
                        <FormLabel column md="3" lg="4">
                            First Name
                        </FormLabel>
                        <Col md="8" lg="7">
                            {data.firstName}
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row}>
                        <FormLabel column md="3" lg="4">
                            Last name
                        </FormLabel>
                        <Col md="8" lg="7">
                            {data.lastName}
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row}>
                        <FormLabel column md="3" lg="4">
                            Sex
                        </FormLabel>
                        <Col md="8" lg="7">
                            {!data.sex ? <div>Male</div> : <div>Female</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row}>
                        <FormLabel column md="3" lg="4">
                            Bio
                        </FormLabel>
                        <Col md="8" lg="7">
                            {data.bio}
                        </Col>
                    </FormGroup>
                    <div className="div-button">
                        <Button
                            onClick={() => setShowModalUpdate(!showModalUpdate)}
                        >
                            Edit
                        </Button>
                    </div>
                </Container>
            </div>
            <Modal
                backdrop="static"
                keyboard={false}
                show={showModalUpdate}
                onHide={() => setShowModalUpdate(!showModalUpdate)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder={data.firstName}
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                required
                                placeholder={data.lastName}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Select
                                required
                                value={sex}
                                onChange={(e) => setSex(Number(e.target.value))}
                            >
                                <option value={0}>Male </option>
                                <option value={1}>Female</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <hr />
                    <Form.Control
                        type="text"
                        placeholder={data.bio}
                        required
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <AlertMessage info={alert} />
                    <Button variant="primary" onClick={updateInfo}>
                        Update cover
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Profile;
