import SiteBreadcrumb from "../../../components/website/SiteBreadcrumb";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import { PiCookingPot } from "react-icons/pi";
import SideBarLeftLinks from "../../../components/website/SideBarLeftLinks";
import { useDispatch } from "react-redux";
import { do_logout } from "../../../redux-service/website/auth/UserLoginReducer";
import Cookies from "universal-cookie";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_USER_DETAILS = gql`
    query getUserPhotoAndName($id: ID!) {
        getUserPhotoAndName(id: $id) {
            user_name,
            user_photo,
            ripp,
            cipp
        }
    }
`;

const UserProfile = () => {
    let { id } = useParams();
    const sideBarLinks = [
        {
            id: 1,
            page_name: "All Recipes",
            page_slug: `/user-area/profile/${id}`
        },
        {
            id: 2,
            page_name: "Categories",
            page_slug: `/user-area/categories/${id}`
        },
    ];
    const pp_path = 'http://localhost:48256/uploads/site-user-profile-photos/';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('Jp');
    const [uname, setUname] = useState<string>('John Paul');
    const [profilePhoto, setProfilePhoto] = useState<string>('');
    const [recCount, setRecCount] = useState<number>(0);
    const [catCount, setCatCount] = useState<number>(0);

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

                setRecCount(data.getUserPhotoAndName.ripp);
                setCatCount(data.getUserPhotoAndName.cipp);

                // Set User Name.
                let unm = data.getUserPhotoAndName.user_name;
                setUname(unm);
                let spltar = unm.split(" ");
                if(spltar.length === 1) {
                    let slcnam = spltar[0].split();
                    if(slcnam.length === 1) {
                        setUserName(slcnam);
                    } else {
                        if(slcnam < 3) {
                            let c1 = slcnam.charAt(0);
                            let c2 = slcnam.charAt(1);
                            setUserName(c1 + c2);
                        }
                    }
                } else {
                    if(spltar.length < 3) {
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

    useEffect(() => {
        const cookies = new Cookies();
        const authUserID = cookies.get("gjtrewcipets_auth_user_id");
        if(id !== authUserID) {
            dispatch(do_logout());
            navigate("/");
            let ss = setTimeout(function(){
                window.location.reload();
                clearTimeout(ss);
            }, 200);
        }

        if(authUserID !== id) {
            dispatch(do_logout());
            navigate("/");
            let ss = setTimeout(function(){
                window.location.reload();
                clearTimeout(ss);
            }, 200);
        }
    }, []);

    return (
        <>
            <SiteBreadcrumb page_name={uname} page_title="User Profile" />
            <div className="twgtr-transition-all twgtr-px-4 twgtr-py-6 lg:twgtr-py-12 twgtr-border-t twgtr-border-solid twgtr-border-slate-300 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-600">
                <div className="site-container">
                    <div className="twgtr-flex md:twgtr-items-center twgtr-flex-col md:twgtr-flex-row md:twgtr-flex-wrap md:twgtr-justify-between twgtr-gap-x-[10px] twgtr-gap-y-[15px] md:twgtr-gap-x-[20px]">
                        <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[10px] md:twgtr-gap-x-[20px]">
                            <div className="twgtr-transition-all twgtr-relative twgtr-w-[50px] twgtr-h-[50px] md:twgtr-w-[80px] md:twgtr-h-[80px] twgtr-rounded-full twgtr-flex twgtr-items-center twgtr-justify-center twgtr-bg-slate-200 dark:twgtr-bg-slate-800">
                                <div className="twgtr-transition-all twgtr-relative twgtr-z-[3] twgtr-font-ubuntu twgtr-font-bold twgtr-text-slate-500 twgtr-uppercase twgtr-text-[20px] md:twgtr-text-[30px] dark:twgtr-text-slate-200">
                                    {userName}
                                </div>
                                {
                                    profilePhoto !== '' ? 
                                    (
                                        <>
                                            <img src={`${pp_path}${profilePhoto}`} className="twgtr-absolute twgtr-left-0 twgtr-top-0 twgtr-z-[5] twgtr-w-full twgtr-h-full twgtr-rounded-full" alt={userName} />
                                        </>
                                    ) 
                                    : 
                                    ('')
                                }
                            </div>
                            <div>
                                <h1 className="twgtr-transition-all twgtr-font-open_sans twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-medium twgtr-text-slate-600 dark:twgtr-text-slate-200">
                                    {uname}
                                </h1>
                                <div className="twgtr-pt-1">
                                    <h2 className="twgtr-transition-all twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-600 dark:twgtr-text-slate-300">
                                        <span className="twgtr-font-bold">{recCount}</span> Recipes . <span className="twgtr-font-bold">{catCount}</span> Categories
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="twgtr-ml-[60px] md:twgtr-ml-0">
                            <NavLink to={`/create-recipe/${id}`} title="+ New Recipe" className="twgtr-transition-all twgtr-inline-block twgtr-border-2 twgtr-font-open_sans twgtr-font-bold twgtr-text-sm twgtr-border-theme-color-2 twgtr-py-[7px] twgtr-px-3 twgtr-text-theme-color-2 hover:twgtr-bg-theme-color-2 hover:twgtr-text-slate-200 md:twgtr-text-base md:twgtr-px-5 dark:twgtr-border-theme-color-4 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[10px]">
                                    <PiPlusBold size={15} />
                                    <div>New Recipe</div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-4">
						<div className="twgtr-min-w-0 lg:twgtr-min-w-[250px] 2xl:twgtr-min-w-[300px]">
							<div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
                                <SideBarLeftLinks nav_links_data={sideBarLinks} />
							</div>
						</div>

                        <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                            {/* No Recipes Found */}
                            <div className="twgtr-text-center twgtr-py-2 md:twgtr-py-0">
                                <PiCookingPot size={100} className="twgtr-transition-all twgtr-inline-block twgtr-w-[50px] twgtr-h-[50px] md:twgtr-w-[100px] md:twgtr-h-[100px] twgtr-text-slate-300 dark:twgtr-text-slate-500" />
                                <div className="twgtr-pt-2 md:twgtr-pt-4">
                                    <h6 className="twgtr-transition-all twgtr-font-open_sans twgtr-font-bold twgtr-text-[20px] md:twgtr-text-[30px] twgtr-text-slate-400">
                                        No Recipes Found
                                    </h6>
                                </div>
                                <div className="twgtr-pt-1">
                                    <NavLink to={`/create-recipe/${id}`} title="+ Add New" className="twgtr-transition-all twgtr-font-open_sans twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-4">
                                        + Add New
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;