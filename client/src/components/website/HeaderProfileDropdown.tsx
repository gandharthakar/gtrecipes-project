import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { RootState } from "../../redux-service/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { do_logout, do_login_check } from "../../redux-service/website/auth/UserLoginReducer";
import Cookies from "universal-cookie";
import { gql, useQuery } from "@apollo/client";

const GET_USER_DETAILS = gql`
    query getUserPhotoAndName($id: ID!) {
        getUserPhotoAndName(id: $id) {
            user_name,
            user_photo
        }
    }
`;

const HeaderProfileDropdown = () => {
    // const pp_path = `${import.meta.env.VITE_BACKEND_URI_BASE}/uploads/site-user-profile-photos/`;
    const navigate = useNavigate();
    const UserAuth = useSelector((state: RootState) => state.user_login.isAuthenticated);
    const dispatch = useDispatch();
    const [uaURLs, setUaURLs] = useState({
        user_profile_uri: '/',
        user_settings_uri: '/',
    });

    const [userName, setUserName] = useState<string>('Jp');
    const [profilePhoto, setProfilePhoto] = useState<string>('');
    const menuRef = useRef<HTMLDivElement>(null);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const cookies = new Cookies();
    const authUser = cookies.get("gjtrewcipets_auth_user");
    const authUserID = cookies.get("gjtrewcipets_auth_user_id");
    if(authUser) {
        useQuery(GET_USER_DETAILS, {
            variables: { id: authUserID },
            onCompleted: data => {
                // Set Profile Photo.
                let upp = data.getUserPhotoAndName.user_photo;
                if(upp !== '') {
                    setProfilePhoto(upp);
                } else {
                    setProfilePhoto('');
                }

                // Set User Name.
                let unm = data.getUserPhotoAndName.user_name;
                let spltar = unm?.split(" ") || [];
                if(spltar?.length === 1) {
                    let slcnam = spltar[0].split();
                    if(slcnam?.length === 1) {
                        let ch1 = slcnam[0].charAt(0);
                        let gch2 = slcnam[0].charAt(1);
                        let ch2 = gch2 ? gch2 : '';
                        setUserName(ch1+ch2);
                    } else {
                        if(slcnam < 3) {
                            let c1 = slcnam.charAt(0);
                            let c2 = slcnam.charAt(1);
                            setUserName(c1 + c2);
                        }
                    }
                } else {
                    if(spltar?.length < 3) {
                        let w1 = spltar[0];
                        let w2 = spltar[1];
                        let fwc1 = w1.charAt(0);
                        let fwc2 = w2.charAt(0);
                        setUserName(fwc1+fwc2);
                    } else {
                        let w1 = spltar[0];
                        let w2 = spltar[1];
                        let sp1 = '';
                        let sp2 = '';
                        if(w1.length === 1) {
                            sp1 = w1;
                        } else {
                            sp1 = w1.charAt(0);
                        }

                        if(w2.length === 1) {
                            sp2 = w2;
                        } else {
                            sp2 = w2.charAt(0);
                        }
                        setUserName(sp1+sp2);
                    }
                }
            }
        });
    }

    useEffect(()=> {
        const cookies = new Cookies();
        const authUser = cookies.get("gjtrewcipets_auth_user") || '';
        const authUserID = cookies.get("gjtrewcipets_auth_user_id") || '';
        if(authUser) {
            dispatch(do_login_check());
        }
        if(authUserID) {
            setUaURLs(() => {
                return {
                    user_profile_uri: `/user-area/profile/${authUserID}`,
                    user_settings_uri: `/user-area/settings/${authUserID}`
                }
            });
        } else {
            setUaURLs(() => {
                return {
                    user_profile_uri: '/',
                    user_settings_uri: '/'
                }
            });
        }

        let menuHandler = (e:any) => {
            if(menuRef.current !== null) {
                if(!menuRef.current.contains(e.target)) {
                    setShowProfileMenu(false);
                }
            }
        };

        document.addEventListener('mousedown', menuHandler);
    }, []);

    const handleClick = () => {
        setShowProfileMenu(false);
    }

    const makeLogoutUser = () => {
        dispatch(do_logout());
        navigate("/");
        let ss = setTimeout(function(){
            window.location.reload();
            clearTimeout(ss);
        }, 300);
    }

    return (
        <>
            {
                UserAuth ? 
                (
                    <div className="twgtr-relative" ref={menuRef}>
                        <button type="button" title="Profile" className="twgtr-transition-all twgtr-px-2 twgtr-py-2" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                            <div className="twgtr-relative twgtr-w-[40px] twgtr-h-[40px] twgtr-uppercase twgtr-bg-slate-200 twgtr-text-theme-color-5 twgtr-rounded-full twgtr-flex twgtr-items-center twgtr-justify-center twgtr-font-semibold twgtr-font-open_sans">
                                <span className="twgtr-relative twgtr-z-[2]">{userName}</span>
                                {
                                    profilePhoto !== '' ? 
                                    (
                                        <>
                                            {/* <img src={`${pp_path}${profilePhoto}`} className="twgtr-absolute twgtr-left-0 twgtr-top-0 twgtr-z-[5] twgtr-w-full twgtr-h-full twgtr-rounded-full" alt={userName} /> */}
                                            <img src={`${profilePhoto}`} className="twgtr-absolute twgtr-left-0 twgtr-top-0 twgtr-z-[5] twgtr-w-full twgtr-h-full twgtr-rounded-full" alt={userName} />
                                        </>
                                    ) 
                                    : 
                                    ('')
                                }
                            </div>
                        </button>
                        <div className={`twgtr-absolute twgtr-right-0 twgtr-py-1 twgtr-z-10 twgtr-border twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-500 twgtr-mt-[2px] twgtr-w-[180px] twgtr-origin-top-right twgtr-rounded-md twgtr-bg-white twgtr-shadow-lg twgtr-ring-1 twgtr-ring-black twgtr-ring-opacity-5 twgtr-focus:outline-none twgtr-font-open_sans dark:twgtr-bg-slate-700 ${showProfileMenu ? 'twgtr-block' : 'twgtr-hidden'}`}>
                            <div className="py-1">
                                <NavLink to={uaURLs.user_profile_uri} title="Profile" className="twgtr-text-gray-700 twgtr-block twgtr-px-4 twgtr-py-2 twgtr-text-md hover:twgtr-bg-slate-100 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-slate-900" onClick={handleClick}>
                                    <div className="twgtr-flex twgtr-items-center twgtr-gap-x-3 ">
                                        <CgProfile size={20} />
                                        <div>Profile</div>
                                    </div>
                                </NavLink>
                                <NavLink to={uaURLs.user_settings_uri} title="Settings" className="twgtr-text-gray-700 twgtr-block twgtr-px-4 twgtr-py-2 twgtr-text-md hover:twgtr-bg-slate-100 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-slate-900" onClick={handleClick}>
                                    <div className="twgtr-flex twgtr-items-center twgtr-gap-x-3">
                                        <IoSettingsOutline size={20} />
                                        <div>Settings</div>
                                    </div>
                                </NavLink>
                                <div className="twgtr-h-[1px] twgtr-w-full twgtr-bg-slate-300 twgtr-my-1 dark:twgtr-bg-slate-500"></div>
                                <NavLink to="#" title="Settings" className="twgtr-text-theme-color-5 twgtr-block twgtr-px-4 twgtr-py-2 twgtr-text-md hover:twgtr-bg-slate-100 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-slate-900" onClick={makeLogoutUser}>
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
                        <div className="twgtr-py-4 twgtr-pr-3 lg:twgtr-py-3">
                            <NavLink to="/login" title="Login" className="twgtr-transition-all twgtr-border-2 twgtr-font-open_sans twgtr-font-bold twgtr-text-sm twgtr-border-theme-color-2 twgtr-py-[7px] twgtr-px-3 twgtr-text-slate-100 twgtr-bg-theme-color-2 dark:twgtr-bg-theme-color-4 hover:twgtr-bg-theme-color-2-hover-dark hover:twgtr-text-slate-200 md:twgtr-text-base md:twgtr-px-5 dark:twgtr-border-theme-color-4 dark:twgtr-text-slate-100 dark:hover:twgtr-border-theme-color-4-hover-dark dark:hover:twgtr-bg-theme-color-4-hover-dark dark:hover:twgtr-text-slate-200">
                                Login
                            </NavLink>
                            <NavLink to="/register" title="Register" className="twgtr-transition-all twgtr-hidden lg:twgtr-inline-block twgtr-ml-[15px] twgtr-border-2 twgtr-font-open_sans twgtr-font-bold twgtr-text-sm twgtr-border-theme-color-2 twgtr-py-[7px] twgtr-px-3 twgtr-text-theme-color-2 hover:twgtr-bg-theme-color-2 hover:twgtr-text-slate-200 md:twgtr-text-base md:twgtr-px-5 dark:twgtr-border-theme-color-4 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                Register
                            </NavLink>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default HeaderProfileDropdown;