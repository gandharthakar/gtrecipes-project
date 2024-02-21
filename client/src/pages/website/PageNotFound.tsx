import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set_dark_mode, unset_dark_mode } from "../../redux-service/website/SiteThemeModeReducer";
import { PiCookingPot } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Automatically Check and Set Dark Mode.
        // const detectMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Manually Toggle and Save Dark Mode.
        let glsi = localStorage.getItem('site-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }
    }, []);

    return (
        <>
            <div className="twgtr-flex twgtr-items-center twgtr-justify-center twgtr-px-[20px] twgtr-py-[50px] twgtr-min-h-screen twgtr-bg-slate-200 dark:twgtr-bg-theme-color-1">
                <div className="twgtr-text-center">
                    <div className="twgtr-pb-[5px]">
                        <PiCookingPot size={100} className="twgtr-transition-all twgtr-inline-block twgtr-w-[80px] twgtr-h-[80px] md:twgtr-w-[100px] md:twgtr-h-[100px] twgtr-text-slate-400" />
                    </div>
                    <div className="twgtr-pb-[20px]">
                        <h1 className="twgtr-transition-all twgtr-inline-block twgtr-font-bold twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[30px] twgtr-text-theme-color-2 dark:twgtr-text-slate-200">
                            404 Page Not Found.
                        </h1>
                    </div>
                    <div>
                        <NavLink to="/" title="Back To Home" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-4 twgtr-py-2 md:twgtr-px-5 md:twgtr-py-3 twgtr-border twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-4-hover-dark hover:twgtr-border-theme-color-4-hover-dark">
                            Back To Home
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PageNotFound;