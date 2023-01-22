import {render,screen} from "@testing-library/react";
import AppBar from "../components/AppBar/AppBar";
import '@testing-library/jest-dom/extend-expect';

test('render Appbar', async ()=>{
    render(<AppBar/>);
    const appbar = screen.getByText(/Appbar/i);
    expect(appbar).toBeInTheDocument();
})