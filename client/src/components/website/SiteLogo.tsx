import { useSelector } from "react-redux";
import { RootState } from "../../redux-service/ReduxStore";

const SiteLogo = () => {
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    return (
        <>
            {
                ThemeMode ? 
                (<img src="logo-dark.svg" width={180} alt="logo" className="twgtr-w-[130px] md:twgtr-w-[180px]" />) 
                : 
                (<img src="logo.svg" width={180} alt="logo" className="twgtr-w-[130px] md:twgtr-w-[180px]" />)
            }
        </>
    )
}

export default SiteLogo;