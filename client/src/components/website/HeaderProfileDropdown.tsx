import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const HeaderProfileDropdown = () => {
    const [login, setLogin] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <>
            {
                login ? 
                (
                    <div className="twgtr-relative">
                        <button type="button" title="Profile" className="twgtr-transition-all twgtr-px-2 twgtr-py-2" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                            <div className="twgtr-w-[40px] twgtr-h-[40px] twgtr-uppercase twgtr-bg-slate-200 twgtr-text-theme-color-5 twgtr-rounded-full twgtr-flex twgtr-items-center twgtr-justify-center twgtr-font-semibold twgtr-font-open_sans">
                                <span>Jp</span>
                            </div>
                        </button>
                        <div className={`twgtr-absolute twgtr-right-0 twgtr-py-1 twgtr-z-10 twgtr-border twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-500 twgtr-mt-[2px] twgtr-w-[180px] twgtr-origin-top-right twgtr-rounded-md twgtr-bg-white twgtr-shadow-lg twgtr-ring-1 twgtr-ring-black twgtr-ring-opacity-5 twgtr-focus:outline-none twgtr-font-open_sans dark:twgtr-bg-slate-700 ${showProfileMenu ? 'twgtr-block' : 'twgtr-hidden'}`}>
                            <div className="py-1">
                                <NavLink to="/user-profile" title="Profile" className="twgtr-text-gray-700 twgtr-block twgtr-px-4 twgtr-py-2 twgtr-text-md hover:twgtr-bg-slate-100 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-slate-900">
                                    <div className="twgtr-flex twgtr-items-center twgtr-gap-x-3 ">
                                        <CgProfile size={20} />
                                        <div>Profile</div>
                                    </div>
                                </NavLink>
                                <NavLink to="/user-profile/setting" title="Settings" className="twgtr-text-gray-700 twgtr-block twgtr-px-4 twgtr-py-2 twgtr-text-md hover:twgtr-bg-slate-100 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-slate-900">
                                    <div className="twgtr-flex twgtr-items-center twgtr-gap-x-3">
                                        <IoSettingsOutline size={20} />
                                        <div>Settings</div>
                                    </div>
                                </NavLink>
                                <div className="twgtr-h-[1px] twgtr-w-full twgtr-bg-slate-300 twgtr-my-1 dark:twgtr-bg-slate-500"></div>
                                <NavLink to="/logout" title="Settings" className="twgtr-text-theme-color-5 twgtr-block twgtr-px-4 twgtr-py-2 twgtr-text-md hover:twgtr-bg-slate-100 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-slate-900">
                                    <div className="twgtr-flex twgtr-items-center twgtr-gap-x-3">
                                        <FaPowerOff size={20} />
                                        <div>Logout</div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ) 
                : 
                (
                    <>
                        <div className="twgtr-py-4 twgtr-pr-3">
                            <NavLink to="/login" title="Login" className="twgtr-transition-all twgtr-border-2 twgtr-font-open_sans twgtr-font-bold twgtr-text-sm twgtr-border-theme-color-2 twgtr-py-[7px] twgtr-px-3 twgtr-text-theme-color-2 hover:twgtr-bg-theme-color-2 hover:twgtr-text-slate-200 md:twgtr-text-base md:twgtr-px-5 dark:twgtr-border-theme-color-4 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                Login
                            </NavLink>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default HeaderProfileDropdown;