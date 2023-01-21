import {render,screen} from "@testing-library/react";
import AppBar from "../components/AppBar/AppBar";

test('render Appbar', async ()=>{
    render(<AppBar/>);
    const appbar = screen.getByText(/Appbar/i);
    expect(appbar).toBeInTheDocument();
})