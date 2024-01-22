import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { set_dark_mode, unset_dark_mode } from "../../redux-service/website/SiteThemeModeReducer";
import { RootState } from "../../redux-service/ReduxStore";

const ThemeModeSwitchFooter = () => {
	const dispatch = useDispatch();
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);

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
                (
					<button type="button" title="Change Theme" className="twgtr-transition-all twgtr-border-2 twgtr-py-1 twgtr-px-2 twgtr-border-solid twgtr-border-slate-300 twgtr-text-slate-300 hover:twgtr-border-theme-color-4 hover:twgtr-text-theme-color-4" onClick={changeThemeToLight}>
						<div className="twgtr-flex twgtr-items-center twgtr-gap-x-2">
							<MdLightMode size={25} />
							<div>
								Light Mode
							</div>
						</div>
					</button>
				) 
                : 
                (
					<button type="button" title="Change Theme" className="twgtr-transition-all twgtr-border-2 twgtr-py-1 twgtr-px-2 twgtr-border-solid twgtr-border-slate-500 twgtr-text-slate-500 hover:twgtr-border-theme-color-4 hover:twgtr-text-theme-color-4" onClick={changeThemeToDark}>
						<div className="twgtr-flex twgtr-items-center twgtr-gap-x-2">
							<MdOutlineDarkMode size={25} />
							<div>
								Dark Mode
							</div>
						</div>
					</button>
				)
            }
		</>
	)
}

export default ThemeModeSwitchFooter;