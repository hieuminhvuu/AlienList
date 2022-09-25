import React from "react";

import "./Card.scss";

function Card(props) {
    const { card } = props;
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
            {card.title}
        </div>
    );
}

export default Card;
