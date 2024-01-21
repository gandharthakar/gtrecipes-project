import { configureStore } from "@reduxjs/toolkit";
import SiteThemeModeReducer from "./website/SiteThemeModeReducer";

const ReduxStore = configureStore({ 
    reducer: {
        site_theme_mode: SiteThemeModeReducer
    }
});

export default ReduxStore;

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch