import { configureStore } from "@reduxjs/toolkit";
import SiteThemeModeReducer from "./website/SiteThemeModeReducer";
import userLoginReducer from "./website/auth/UserLoginReducer";

const ReduxStore = configureStore({ 
    reducer: {
        site_theme_mode: SiteThemeModeReducer,
        user_login: userLoginReducer
    }
});

export default ReduxStore;

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch