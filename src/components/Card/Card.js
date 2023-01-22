import React, { useEffect, useState } from "react";
import { updateCard } from "actions/ApiCall";
import "./Card.scss";
import { Form } from "react-bootstrap";
import ConfirmModal from "components/Common/ConfirmModal";
import { Modal, Button } from "react-bootstrap";
import { MODAL_ACTION_CONFIRM } from "utilities/constans";

function Card(props) {
    const { card } = props;
    const [showCard, setShowCard] = useState("block");

    const [cardTitle, setCardTitle] = useState("");
    useEffect(() => {
        setCardTitle(card.title);
    }, [card.title]);

    // Update card title
    const updateCardTitle = () => {
        if (cardTitle !== card.title) {
            const newCard = {
                ...card,
                title: cardTitle,
            };
            // Call api update
            updateCard(newCard._id, newCard);
            setShowModalUpdateCardCover(!showModalUpdateCardCover);
            window.location.reload();
        }
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

    // Remove card
    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newCard = {
                ...card,
                _destroy: true,
            };
            updateCard(card._id, newCard);
            setShowCard("none");
        }
        toggleShowConfirmModal();
        setShowActiveIcon(false);
    };

    // Update card cover
    const [showModalUpdateCardCover, setShowModalUpdateCardCover] =
        useState(false);

    const toggleShowUpdateCover = () => {
        setShowModalUpdateCardCover(!showModalUpdateCardCover);
        setInvalidUrl("none");
        setUrl("");
        setShowActiveIcon(false);
    };
    const [url, setUrl] = useState("");
    const handleOnChangeUrl = (e) => {
        setUrl(e.target.value);
    };
    function isImage(imgURL) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL);
    }

    const [invalidUrl, setInvalidUrl] = useState("none");
    const onUpdateCardCover = () => {
        if (isImage(url)) {
            const newCard = {
                ...card,
                cover: url,
            };
            // Call api update
            updateCard(card._id, newCard);
            // set state
            setUrl("");
            setShowModalUpdateCardCover(!showModalUpdateCardCover);
            window.location.reload();
        } else {
            setInvalidUrl("block");
            newUrlRef.current.focus();
        }
    };
    const onDeleteCardCover = () => {
        const newCard = {
            ...card,
            cover: null,
        };
        // Call api update card
        updateCard(card._id, newCard);
        // set state
        setUrl("");
        setShowModalUpdateCardCover(!showModalUpdateCardCover);
        window.location.reload();
    };

    const [showActiveIcon, setShowActiveIcon] = useState(false);
    const toggleShowActionIcon = () => {
        setShowActiveIcon(!showActiveIcon);
    };

    return (
        <div className="card-item toggle-dark-mode-card" style={{ display: showCard }}>
            {card.cover && (
                <img
                    onMouseDown={(e) => e.preventDefault()}
                    className="card-cover"
                    src={card.cover}
                    alt="Card cover"
                />
            )}
            <div className="content">
                <p
                    contentEditable="true"
                    spellCheck="false"
                    suppressContentEditableWarning={true}
                    className="trello-content-editable name-content"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {card.title}
                </p>
                <div className="action">
                    {showActiveIcon && (
                        <div>
                            <i
    className="fa fa-pencil update"
    role="button"
    onClick={toggleShowUpdateCover}
    />
                            <i
    className="fa fa-trash-o delete"
    role="button"
    onClick={toggleShowConfirmModal}
    />
                        </div>
                    )}
                    {!showActiveIcon && (
                        <i
    className="fa fa-ellipsis-h menu"
    role="button"
    onClick={toggleShowActionIcon}
    />
                    )}
                </div>
            </div>
            <ConfirmModal
    show={showConfirmModal}
    onAction={onConfirmModalAction}
    title={"Remove card"}
    content={`Are you sure to remove  ?`}
    />
            <Modal
                backdrop="static"
                keyboard={false}
                show={showModalUpdateCardCover}
                onHide={toggleShowUpdateCover}
                className="modal-update-card"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="update-card-cover">
                        <Form.Label>Update cover</Form.Label>
                        <h6 style={{ display: invalidUrl, color: "red" }}>
                            URL invalid !
                        </h6>
                        <Form.Group>
                            <Form.Control
                                className="form-update"
                                type="text"
                                placeholder="url"
                                required
                                value={url}
                                onChange={handleOnChangeUrl}
                                // ref={newUrlRef}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={onUpdateCardCover}>
                            Update cover
                        </Button>
                        <Button variant="secondary" onClick={onDeleteCardCover}>
                            Delete cover
                        </Button>
                    </div>
                    <div>
                        <Form.Label>Update title</Form.Label>
                        <Form.Control
    className="form-update-title"
    value={cardTitle}
    onChange={(e) => {
        setCardTitle(e.target.value);
    }}
    />
                        <Button variant="primary" onClick={updateCardTitle}>
                            Update title
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer/>
            </Modal>
        </div>
    );
}

export default Card;
