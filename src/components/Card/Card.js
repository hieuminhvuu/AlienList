import React, { useEffect, useRef, useState } from "react";
import { updateCard } from "actions/ApiCall";
import { selectAllInlineText } from "utilities/contentEditable";
import "./Card.scss";
import { Form } from "react-bootstrap";
import ConfirmModal from "components/Common/ConfirmModal";
import { saveContentAfterPressEnter } from "utilities/contentEditable";
import { Modal, Button } from "react-bootstrap";
import { MODAL_ACTION_CONFIRM } from "utilities/constans";

function Card(props) {
    const { card } = props;
    const [showCard, setShowCard] = useState("block");

    const [cardTitle, setCardTitle] = useState("");
    useEffect(() => {
        setCardTitle(card.title);
    }, [card.title]);

    const [textAreaHeight, setTextAreaHeight] = useState(
        card.title.length / 24 + 1
    );

    const handleCardTitleChange = (e) => {
        const height = e.target.scrollHeight;
        const rows = e.target.rows;
        const rowHeight = 15;
        const trows = Math.ceil(height / rowHeight) - 1;

        if (trows > rows) {
            setTextAreaHeight(trows);
        }

        setCardTitle(e.target.value);
    };

    const handleCardTitleBlur = () => {
        if (cardTitle !== card.title) {
            const newCard = {
                ...card,
                title: cardTitle,
            };
            // Update text area height
            setTextAreaHeight(cardTitle.length / 26 + 1);
            // Call api update
            updateCard(newCard._id, newCard);
        }
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

    // Remove column
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
    };

    // Update card cover
    const [showModalUpdateCardCover, setShowModalUpdateCardCover] =
        useState(false);

    const toggleShowUpdateCover = () => {
        setShowModalUpdateCardCover(!showModalUpdateCardCover);
        setInvalidUrl("none");
        setUrl("");
    };
    const [url, setUrl] = useState("");
    const handleOnChangeUrl = (e) => {
        setUrl(e.target.value);
    };
    const newUrlRef = useRef(null);
    useEffect(() => {
        if (showModalUpdateCardCover) {
            newUrlRef.current.focus();
        }
    });
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
        <div className="card-item" style={{ display: showCard }}>
            {card.cover && (
                <img
                    onMouseDown={(e) => e.preventDefault()}
                    className="card-cover"
                    src={card.cover}
                    alt="Card cover"
                />
            )}
            <div className="content">
                <Form.Control
                    type="text"
                    as="textarea"
                    rows={textAreaHeight}
                    className="trello-content-editable name-content"
                    spellCheck="false"
                    value={cardTitle}
                    onClick={selectAllInlineText}
                    onChange={handleCardTitleChange}
                    onBlur={handleCardTitleBlur}
                    onKeyDown={saveContentAfterPressEnter}
                    onMouseDown={(e) => e.preventDefault()}
                ></Form.Control>
                <div className="action">
                    {showActiveIcon && (
                        <div>
                            <i
                                className="fa fa-pencil update"
                                role="button"
                                onClick={toggleShowUpdateCover}
                            ></i>
                            <i
                                className="fa fa-trash-o delete"
                                role="button"
                                onClick={toggleShowConfirmModal}
                            ></i>
                            <i
                                className="fa fa-caret-up menu"
                                role="button"
                                onClick={toggleShowActionIcon}
                            ></i>
                        </div>
                    )}
                    {!showActiveIcon && (
                        <i
                            className="fa fa-caret-down menu"
                            role="button"
                            onClick={toggleShowActionIcon}
                        ></i>
                    )}
                </div>
            </div>
            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={"Remove card"}
                content={`Are you sure to remove  ?`}
            ></ConfirmModal>
            <Modal
                backdrop="static"
                keyboard={false}
                show={showModalUpdateCardCover}
                onHide={toggleShowUpdateCover}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update card cover</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 style={{ display: invalidUrl, color: "red" }}>
                        URL invalid !
                    </h6>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="url"
                            required
                            value={url}
                            onChange={handleOnChangeUrl}
                            ref={newUrlRef}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onDeleteCardCover}>
                        Delete cover
                    </Button>
                    <Button variant="primary" onClick={onUpdateCardCover}>
                        Update cover
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Card;
