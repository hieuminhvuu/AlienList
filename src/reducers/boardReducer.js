export const boardReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "BOARDS_LOADED_SUCCESS":
            return {
                ...state,
                boards: payload,
                boardsLoading: false,
            };
        case "BOARDS_LOADED_FAIL":
            return {
                ...state,
                boards: [],
                boardsLoading: false,
            };
        case "ADD_BOARD":
            return {
                ...state,
                boards: [...state.boards, payload],
            };
        case "DELETE_BOARD":
            return {
                ...state,
                boards: state.boards.filter(
                    (board) => board._id !== payload._id
                ),
            };
        case "UPDATE_BOARD":
            const newBoards = state.boards.map((board) =>
                board._id === payload._id ? payload : board
            );
            return {
                ...state,
                boards: newBoards,
            };
        default:
            return state;
    }
};
