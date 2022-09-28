//on key down
export const saveContentAfterPressEnter = (e) => {
    if (e.key === "Enter") {
        e.target.blur();
        e.preventDefault();
    }
};

//select all input value
export const selectAllInlineText = (e) => {
    e.target.focus();
    e.target.select();
};
