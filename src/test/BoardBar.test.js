import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import BoardBar from "../components/BoardBar/BoardBar";

test('test board bar', () => {
    render(<BoardBar />);
    const inputElement = screen.getByText("2023, Jan 23");
    expect(inputElement).toBeInTheDocument();
});