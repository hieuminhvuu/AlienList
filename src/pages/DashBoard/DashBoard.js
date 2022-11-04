import React from "react";
import AppBar from "components/AppBar/AppBar";
import AllBoard from "components/AllBoard/AllBoard";

const DashBoard = () => {
    return (
        <div>
            <AppBar />
            <div>DashBoard</div>
            <AllBoard />
        </div>
    );
};

export default DashBoard;
