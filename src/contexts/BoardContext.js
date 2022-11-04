import { createContext, useReducer } from "react";
import { boardReducer } from "reducers/boardReducer";
import { API_ROOT } from "utilities/constans";
import axios from "axios";

export const BoardContext = createContext();

const BoardContentProvider = ({ children }) => {
    // State
    const [boardState, dispatch] = useReducer(boardReducer, {
        boards: [],
        boardsLoading: true,
    });

    // Get all boards
    const getBoards = async () => {
        try {
            const response = await axios.get(`${API_ROOT}/v1/boards`);
            if (response.data.success) {
                dispatch({
                    type: "BOARDS_LOADED_SUCCESS",
                    payload: response.data.boards,
                });
            }
        } catch (error) {
            dispatch({ type: "BOARDS_LOADED_FAIL" });
        }
    };

    // Post context data
    const boardContextData = { boardState, getBoards };

    return (
        <BoardContext.Provider value={boardContextData}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardContentProvider;
