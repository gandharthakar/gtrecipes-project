import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    dark_theme_mode: false
}

const themeModeReducer = createSlice({
    name: "site_theme_mode",
    initialState,
    reducers: {
        set_dark_mode: (state) => {
            const docHTML = document.querySelector('html');
            docHTML?.classList.add('twgtr-dark');
            state.dark_theme_mode = true;
        },
        unset_dark_mode: (state) => {
            const docHTML = document.querySelector('html');
            docHTML?.classList.remove('twgtr-dark');
            state.dark_theme_mode = false;
        },
    }
});

export const { set_dark_mode, unset_dark_mode} = themeModeReducer.actions;

export default themeModeReducer.reducer;