import Card from "components/Card/Card";
import React, { useState, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { mapOrder } from "utilities/sorts";
import { Dropdown, Form } from "react-bootstrap";
import { saveContentAfterPressEnter } from "utilities/contentEditable";
import { selectAllInlineText } from "utilities/contentEditable";

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
                            <Dropdown.Item>Add card</Dropdown.Item>
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
            </div>
            <footer>
                <div className="footer-action">
                    <i className="fa fa-plus icon" />
                    Add another card
                </div>
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
