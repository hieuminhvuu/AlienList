import Task from "components/Task/Task";
import React from "react";

import "./Column.scss";

function Column() {
    return (
        <div className="column">
            <header>To do</header>
            <ul className="task-list">
                <Task />
                <li className="task-item">This is 1 row</li>
                <li className="task-item">This is 1 row</li>
                <li className="task-item">This is 1 row</li>
                <li className="task-item">This is 1 row</li>
            </ul>
            <footer>Add a card</footer>
        </div>
    );
}

export default Column;
