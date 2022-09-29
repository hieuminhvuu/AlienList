import Card from "components/Card/Card";
import React, { useState, useEffect, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { mapOrder } from "utilities/sorts";
import { Dropdown, Form } from "react-bootstrap";
import { saveContentAfterPressEnter } from "utilities/contentEditable";
import { selectAllInlineText } from "utilities/contentEditable";
import { Button } from "react-bootstrap";
import { cloneDeep } from "lodash";

import "./Column.scss";
import ConfirmModal from "components/Common/ConfirmModal";

import { MODAL_ACTION_CONFIRM } from "utilities/constans";

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props;
    const cards = mapOrder(column.cards, column.cardOrder, "id");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

    const [columnTitle, setColumnTitle] = useState("");

    const handleColumnTitleChange = (e) => {
        setColumnTitle(e.target.value);
    };

    const newCardTextareaRef = useRef(null);

    const [newCardTitle, setNewCardTitle] = useState("");
    const openNewCardTitleChange = (e) => setNewCardTitle(e.target.value);

    const [openNewCardForm, setOpenNewCardForm] = useState(false);
    const toggleOpenNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm);
    };
    const handleOpenNewCardForm = () => {
        if (!openNewCardForm) {
            setOpenNewCardForm(true);
        } else {
            newCardTextareaRef.current.focus();
        }
    };

    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle,
        };
        onUpdateColumn(newColumn);
    };

    useEffect(() => {
        setColumnTitle(column.title);
    }, [column.title]);

    useEffect(() => {
        if (newCardTextareaRef && newCardTextareaRef.current) {
            newCardTextareaRef.current.focus();
            newCardTextareaRef.current.select();
        }
    }, [openNewCardForm]);

    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true,
            };
            onUpdateColumn(newColumn);
        }
        toggleShowConfirmModal();
    };

    const addNewCard = () => {
        if (!newCardTitle.trim()) {
            newCardTextareaRef.current.focus();
            return;
        }
        const newCardToAdd = {
            id: Math.random().toString(36).substring(2, 5), //5 random characters, will remove when we implement code api
            boardId: column.boardId,
            columnId: column.id,
            title: newCardTitle.trim(),
            cover: null,
        };
        let newColumn = cloneDeep(column);
        newColumn.cards.push(newCardToAdd);
        newColumn.cardOrder.push(newCardToAdd.id);

        onUpdateColumn(newColumn);
        setNewCardTitle("");
        toggleOpenNewCardForm();
    };

    return (
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        className="trello-content-editable"
                        value={columnTitle}
                        spellCheck="false"
                        onClick={selectAllInlineText}
                        onChange={handleColumnTitleChange}
                        onBlur={handleColumnTitleBlur}
                        onKeyDown={saveContentAfterPressEnter}
                        onMouseDown={(e) => e.preventDefault()}
                    />
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            size="sm"
                            className="dropdown-btn"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleOpenNewCardForm}>
                                Add card
                            </Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>
                                Remove column
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Move all card in this column
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Archive all card in this column
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    groupName="minhhieu_column"
                    onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
                    getChildPayload={(index) => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: "card-drop-preview",
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                </Container>
                {openNewCardForm && (
                    <div className="add-new-card-area">
                        <Form.Control
                            size="sm"
                            as="textarea"
                            rows={3}
                            placeholder="Enter a title for this card ..."
                            className="textarea-enter-new-card"
                            ref={newCardTextareaRef}
                            value={newCardTitle}
                            onChange={openNewCardTitleChange}
                            onKeyDown={(event) =>
                                event.key === "Enter" && addNewCard()
                            }
                        />
                    </div>
                )}
            </div>
            <footer>
                {openNewCardForm && (
                    <div className="add-new-card-actions">
                        <Button
                            type="button"
                            class="btn btn-success"
                            size="sm"
                            onClick={addNewCard}
                        >
                            Add card
                        </Button>
                        <span
                            className="cancel-icon"
                            onClick={toggleOpenNewCardForm}
                        >
                            <i className="fa fa-trash icon" />
                        </span>
                    </div>
                )}
                {!openNewCardForm && (
                    <div
                        className="footer-action"
                        onClick={toggleOpenNewCardForm}
                    >
                        <i className="fa fa-plus icon" />
                        Add another card
                    </div>
                )}
            </footer>
            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={"Remove column"}
                content={`Are you sure to remove <strong>${column.title}</strong> ! <br/> All related cards will also be remove!`}
            ></ConfirmModal>
        </div>
    );
}

export default Column;
