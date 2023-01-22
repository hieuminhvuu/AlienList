import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import DarkMode from "../components/AccountData/DarkMode";

test("renders dark mode component", () => {
    render(<DarkMode />);
    // 2
    const inputElement = screen.getByRole("checkbox");
    expect(inputElement).toBeInTheDocument();
});


test("toggles dark mode", () => {
    render(<DarkMode />);
    const inputElement = screen.getByRole("checkbox");

    expect(inputElement.checked).toEqual(false);
    fireEvent.click(inputElement);
    expect(inputElement.checked).toEqual(true);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
});