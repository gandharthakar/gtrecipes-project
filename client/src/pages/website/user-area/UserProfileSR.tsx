import SiteBreadcrumb from "../../../components/website/SiteBreadcrumb";
import { useNavigate, useParams } from "react-router-dom";
// import SideBarLeftLinks from "../../../components/website/SideBarLeftLinks";
import { useDispatch } from "react-redux";
import { do_logout } from "../../../redux-service/website/auth/UserLoginReducer";
import Cookies from "universal-cookie";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import UserSavedRecipes from "./UserSavedRecipes";

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

const UserProfileSR = () => {
    const { id } = useParams();
    // const sideBarLinks = [
    //     {
    //         id: 1,
    //         page_name: "All Recipes",
    //         page_slug: `/user-area/profile/${id}`
    //     },
    //     {
    //         id: 2,
    //         page_name: "Categories",
    //         page_slug: `/user-area/categories/${id}`
    //     },
    // ];
    // const pp_path = 'http://localhost:48256/uploads/site-user-profile-photos/';
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
        //eslint-disable-next-line
        useQuery(GET_USER_DETAILS, {
            variables: { id: authUserID },
            onCompleted: data => {
                // Set Profile Photo.
                const upp = data.getUserPhotoAndName.user_photo;
                if(upp !== '') {
                    setProfilePhoto(upp);
                } else {
                    setProfilePhoto('');
                }

                setRecCount(data.getUserPhotoAndName.ripp);
                setCatCount(data.getUserPhotoAndName.cipp);

                // Set User Name.
                const unm = data.getUserPhotoAndName.user_name;
                setUname(unm);
                const spltar = unm.split(" ");
                if(spltar.length === 1) {
                    const slcnam = spltar[0].split();
                    if(slcnam.length === 1) {
                        const ch1 = slcnam[0].charAt(0);
                        const gch2 = slcnam[0].charAt(1);
                        const ch2 = gch2 ? gch2 : '';
                        setUserName(ch1+ch2);
                    } else {
                        if(slcnam < 3) {
                            const c1 = slcnam.charAt(0);
                            const c2 = slcnam.charAt(1);
                            setUserName(c1 + c2);
                        }
                    }
                } else {
                    if(spltar.length < 3) {
                        const w1 = spltar[0];
                        const w2 = spltar[1];
                        const fwc1 = w1.charAt(0);
                        const fwc2 = w2.charAt(0);
                        setUserName(fwc1+fwc2);
                    } else {
                        const w1 = spltar[0];
                        const w2 = spltar[1];
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
            const ss = setTimeout(function(){
                window.location.reload();
                clearTimeout(ss);
            }, 200);
        }

        if(authUserID !== id) {
            dispatch(do_logout());
            navigate("/");
            const ss = setTimeout(function(){
                window.location.reload();
                clearTimeout(ss);
            }, 200);
        }
    //eslint-disable-next-line
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
                                            {/* <img src={`${pp_path}${profilePhoto}`} className="twgtr-absolute twgtr-left-0 twgtr-top-0 twgtr-z-[5] twgtr-w-full twgtr-h-full twgtr-rounded-full" alt={userName} /> */}
                                            <img src={`${profilePhoto}`} className="twgtr-absolute twgtr-left-0 twgtr-top-0 twgtr-z-[5] twgtr-w-full twgtr-h-full twgtr-rounded-full" alt={userName} />
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
                    </div>
                </div>
            </div>
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-4">
						<div className="twgtr-min-w-0 lg:twgtr-min-w-[250px] 2xl:twgtr-min-w-[300px]">
							<div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
                                {/* <SideBarLeftLinks nav_links_data={sideBarLinks} /> */}
                                <ul className="ssdl-nav twgtr-flex twgtr-flex-row lg:twgtr-flex-col twgtr-gap-x-8 twgtr-flex-nowrap twgtr-overflow-x-auto">
                                    <li className="twgtr-flex-none last:twgtr-pb-0 lg:twgtr-pb-2">
                                        <a href={`/user-area/profile/${id}`} title="Recipes" className="twgtr-transition-all twgtr-inline-block twgtr-font-ubuntu twgtr-text-[16px] md:twgtr-text-[18px] twgtr-py-1 lg:twgtr-pl-3 twgtr-text-slate-800 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4 twgtr-relative">
                                            Recipes
                                        </a>
                                    </li>
                                    <li className="twgtr-flex-none last:twgtr-pb-0 lg:twgtr-pb-2">
                                        <a href={`/user-area/categories/${id}`} title="Categories" className="twgtr-transition-all twgtr-inline-block twgtr-font-ubuntu twgtr-text-[16px] md:twgtr-text-[18px] twgtr-py-1 lg:twgtr-pl-3 twgtr-text-slate-800 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4 twgtr-relative">
                                            Categories
                                        </a>
                                    </li>
                                    <li className="twgtr-flex-none last:twgtr-pb-0 lg:twgtr-pb-2">
                                        <a href={`/user-area/saved-recipes/${id}`} title="Saved Recipes" className="active twgtr-transition-all twgtr-inline-block twgtr-font-ubuntu twgtr-text-[16px] md:twgtr-text-[18px] twgtr-py-1 lg:twgtr-pl-3 twgtr-text-slate-800 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4 twgtr-relative">
                                            Saved Recipes
                                        </a>
                                    </li>
                                </ul>
							</div>
						</div>

                        <UserSavedRecipes uid={id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileSR;