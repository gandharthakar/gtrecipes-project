import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const initialState = {
    isAuthenticated: false
}

const userLoginReducer = createSlice({
    name: "user_login",
    initialState,
    reducers: {
        do_login: (state, action) => {
            // Expiry Date.
            // let expDays = 30;
            // let date = new Date();
            // date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);

            const ndate = new Date();
            ndate.setDate(ndate.getDate() + 30);
            
            // const days = 30;

            // 30 days in miliseconds.
            // const milliseconds = days * 24 * 60 * 60 * 1000;
            // console.log(milliseconds);

            // 24 hours * 60 minutes * 60 seconds
            // const secondsInADay = 24 * 60 * 60;
            // const secondsIn30Days = days * secondsInADay;
            // console.log(`There are ${secondsIn30Days} seconds in 30 days.`);

            const cookies = new Cookies(null, {path: "/", expires: ndate});
            // const cookies = new Cookies(null, {path: "/", maxAge: secondsIn30Days});
            cookies.set("gjtrewcipets_auth_user", action.payload.token);
            cookies.set("gjtrewcipets_auth_user_id", action.payload.user_id);
            state.isAuthenticated = true;
        },
        do_logout: (state) => {
            state.isAuthenticated = false;
            const cookies = new Cookies();
            const ss = setTimeout(function(){
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