import Board from '../pages/Board/Board';
import {render,screen} from '@testing-library/react';

test('should render', async () =>{
    render(<Board/>);
    const boardElement = screen.getByText(/dsadad/i);
    expect(boardElement).toBeInTheDocument();
})