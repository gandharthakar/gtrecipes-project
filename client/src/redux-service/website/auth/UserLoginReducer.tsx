import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

let initialState = {
    isAuthenticated: false
}

const userLoginReducer = createSlice({
    name: "user_login",
    initialState,
    reducers: {
        do_login: (state, action) => {
            let expDays = 30;
            let date = new Date();
            date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));

            const cookies = new Cookies(null, {path: "/", expires: date});
            cookies.set("gjtrewcipets_auth_user", action.payload.token);
            cookies.set("gjtrewcipets_auth_user_id", action.payload.user_id);
            state.isAuthenticated = true;
        },
        do_logout: (state) => {
            state.isAuthenticated = false;
            const cookies = new Cookies();
            let ss = setTimeout(function(){
                cookies.remove("gjtrewcipets_auth_user", { path: '/' });
                cookies.remove("gjtrewcipets_auth_user_id", { path: '/' });
                clearTimeout(ss);
            }, 100);
        },
        do_login_check: (state) => {
            state.isAuthenticated = true;
        },
        do_logout_check: (state) => {
            state.isAuthenticated = false;
        }
    }
});

export const { do_login, do_logout, do_login_check, do_logout_check } = userLoginReducer.actions;

export default userLoginReducer.reducer;