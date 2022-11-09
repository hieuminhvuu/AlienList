import React from "react";

const AlertMessage = ({ info }) => {
    return info === null ? null : (
        <p style={{ color: "red" }}>{info.message}</p>
    );
};

export default AlertMessage;
