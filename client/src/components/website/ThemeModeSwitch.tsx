import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_dark_mode, unset_dark_mode } from "../../redux-service/website/SiteThemeModeReducer";
import { RootState } from "../../redux-service/ReduxStore";

const ThemeModeSwitch = () => {
    const dispatch = useDispatch();
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);

    useEffect(() => {
        // Automatically Check and Set Dark Mode.
        // const detectMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Manually Toggle and Save Dark Mode.
        const checkDM = JSON.parse(localStorage.getItem('site-dark-mode') || '');
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }
    }, []);

    const changeThemeToDark = () => {
        dispatch(set_dark_mode());
    }
    const changeThemeToLight = () => {
        dispatch(unset_dark_mode());
    }

    return (
        <>
            {
                ThemeMode ? 
                (<MdLightMode size={26} className="twgtr-cursor-pointer twgtr-text-slate-400 hover:twgtr-text-theme-color-4"  onClick={changeThemeToLight}/>) 
                : 
                (<MdOutlineDarkMode size={26} className="twgtr-cursor-pointer twgtr-text-slate-400 hover:twgtr-text-theme-color-4" onClick={changeThemeToDark} />)
            }
        </>
    )
}

export default ThemeModeSwitch;