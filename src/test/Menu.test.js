import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AppBar from '../components/AppBar/AppBar';

test('test menu', () => {
    render(<AppBar />);
    const inputElement = screen.getByRole("My Profile");
    expect(inputElement).toBeInTheDocument();
});