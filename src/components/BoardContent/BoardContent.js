import React, {useEffect, useRef, useState} from "react";
import Column from "components/Column/Column";
import {mapOrder} from "utilities/sorts";
import "./BoardContent.scss";
import {cloneDeep, isEmpty} from "lodash";
import {Container, Draggable} from "react-smooth-dnd";
import {applyDrag} from "utilities/dragDrop";
import {Button, Col, Container as BootstrapContainer, Form, Row,} from "react-bootstrap";
import {createNewColumn, fetchBoardDetails, updateBoard, updateCard, updateColumn,} from "actions/ApiCall";
import {useParams} from "react-router-dom";

function BoardContent() {
    let { id } = useParams();

    const [board, setBoard] = useState([]);
    const [columns, setColumns] = useState([]);

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm);
    };

    const newColumnInputRef = useRef(null);

    const [newColumnTitle, setNewColumnTitle] = useState("");
    const openNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value);

    useEffect(() => {
        fetchBoardDetails(id).then((board) => {
            setBoard(board);
            setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
        });
    }, []);

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus();
            newColumnInputRef.current.select();
        }
    }, [openNewColumnForm]);

    if (isEmpty(board)) {
        return (
            <div
                className="not-found"
                style={{ padding: "10px", color: "white" }}
            >
                Board not found!
            </div>
        );
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = cloneDeep(columns);
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = cloneDeep(board);
        newBoard.columnOrder = newColumns.map((c) => c._id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);

        // Call api update columnOrder in board details.
        updateBoard(newBoard._id, newBoard).catch(() => {
            setColumns(columns);
            setBoard(board);
        });
    };

    const onCardDrop = async (columnId, dropResult) => {
        if (
            dropResult.removedIndex !== null ||
            dropResult.addedIndex !== null
        ) {
            let newColumns = cloneDeep(columns);

            let currentColumn = newColumns.find((c) => c._id === columnId);
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);
            setColumns(newColumns);
            if (
                dropResult.removedIndex !== null &&
                dropResult.addedIndex !== null
            ) {
                /**
                 * Action: move card inside its columns
                 * Call api update cardOrder in current column
                 */
                updateColumn(currentColumn._id, currentColumn).catch(() => {
                    setColumns(columns);
                });
            } else {
                /**
                 * Action: move card between two columns
                 */
                // Call api update cardOrder in current column
                updateColumn(currentColumn._id, currentColumn).catch(() => {
                    setColumns(columns);
                });
                if (dropResult.addedIndex !== null) {
                    let currentCard = cloneDeep(dropResult.payload);
                    currentCard.columnId = currentColumn._id;
                    // Call api update columnId in current card
                    updateCard(currentCard._id, currentCard);
                }
            }
        }
    };

    function addNewColumn() {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus();
            return;
        }
        const newColumnToAdd = {
            boardId: board._id,
            title: newColumnTitle.trim(),
        };

        createNewColumn(newColumnToAdd).then((column) => {
            let newColumns = [...columns];
            newColumns.push(column);

            let newBoard = { ...board };
            newBoard.columnOrder = newColumns.map((c) => c._id);
            newBoard.columns = newColumns;

            setColumns(newColumns);
            setBoard(newBoard);
            setNewColumnTitle("");
            toggleOpenNewColumnForm();
        });
    }

    const onUpdateColumnState = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id;

        let newColumns = [...columns];
        const columnIndexToUpdate = newColumns.findIndex(
            (i) => i._id === columnIdToUpdate
        );
        if (newColumnToUpdate._destroy) {
            newColumns.splice(columnIndexToUpdate, 1);
        } else {
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
        }

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((c) => c._id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    };

    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={(index) => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: "column-drop-preview",
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column
                            column={column}
                            onCardDrop={onCardDrop}
                            onUpdateColumnState={onUpdateColumnState}
                        />
                    </Draggable>
                ))}
            </Container>

            <BootstrapContainer className="trello-container">
                {!openNewColumnForm && (
                    <Row>
                        <Col
                            className="add-new-column"
                            onClick={toggleOpenNewColumnForm}
                        >
                            <i className="fa fa-plus icon" />
                            Add another column
                        </Col>
                    </Row>
                )}

                {openNewColumnForm && (
                    <Row>
                        <Col className="enter-new-column">
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Enter column title ..."
                                className="input-enter-new-column"
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={openNewColumnTitleChange}
                                onKeyDown={(event) =>
                                    event.key === "Enter" && addNewColumn()
                                }
                            />
                            <Button
                                type="button"
                                className="btn btn-success"
                                size="sm"
                                onClick={addNewColumn}
                            >
                                Add column
                            </Button>
                            <span
                                className="cancel-icon"
                                onClick={toggleOpenNewColumnForm}
                            >
                                <i className="fa fa-trash icon" />
                            </span>
                        </Col>
                    </Row>
                )}
            </BootstrapContainer>
        </div>
    );
}

export default BoardContent;
