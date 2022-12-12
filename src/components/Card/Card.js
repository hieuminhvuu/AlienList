import React, { useEffect } from "react";
import { updateCard } from "actions/ApiCall";
import { useState } from "react";
//import { selectAllInlineText } from "utilities/contentEditable";
import { selectAllInlineText } from "utilities/contentEditable";
import "./Card.scss";
import { Form } from "react-bootstrap";
import { MODAL_ACTION_CONFIRM } from "utilities/constans";
import ConfirmModal from "components/Common/ConfirmModal";
import { saveContentAfterPressEnter } from "utilities/contentEditable";

function Card(props) {
    const { card } = props;

    const [cardTitleCancel, setCardTitleCancel] = useState("none");

    const [cardTitle, setCardTitle] = useState("");
    useEffect(() => {
        setCardTitle(card.title);
    }, [card.title]);

    const handleCardTitleChange = (e) => {
        setCardTitle(e.target.value);
    };

    const handleCardTitleBlur = () => {
        if (cardTitle !== card.title) {
            const newCard = {
                ...card,
                title: cardTitle,
            };
            // Call api update
            updateCard(newCard._id, newCard);
        }
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

    //const onUpdateTitle = () => {};

    // Remove column
    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newCard = {
                ...card,
                _destroy: true,
            };
            updateCard(card._id, newCard);
            setCardTitleCancel("line-through");
        }
        toggleShowConfirmModal();
    };

    return (
        <div className="card-item">
            {card.cover && (
                <img
                    onMouseDown={(e) => e.preventDefault()}
                    className="card-cover"
                    src={card.cover}
                    alt="alt-img"
                />
            )}
            <div className="content">
                <Form.Control
                    type="text"
                    style={{ textDecorationLine: cardTitleCancel }}
                    className="trello-content-editable name-content"
                    spellCheck="false"
                    value={cardTitle}
                    onClick={selectAllInlineText}
                    onChange={handleCardTitleChange}
                    onBlur={handleCardTitleBlur}
                    onKeyDown={saveContentAfterPressEnter}
                    onMouseDown={(e) => e.preventDefault()}
                ></Form.Control>
                {/* <div className="title">{card.title}</div> */}
                <div className="action">
                    {/* <i class="fa fa-pencil update" role="button"></i> */}
                    <i
                        className="fa fa-trash-o delete"
                        role="button"
                        onClick={toggleShowConfirmModal}
                    ></i>
                </div>
            </div>
            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={"Remove column"}
                content={`Are you sure to remove  ?`}
            ></ConfirmModal>
        </div>
    );
}

export default Card;
