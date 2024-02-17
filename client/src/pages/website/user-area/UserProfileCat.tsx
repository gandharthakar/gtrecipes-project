import SiteBreadcrumb from "../../../components/website/SiteBreadcrumb";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import SiteModal from "../../../components/website/SiteModal";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from '../../../redux-service/ReduxStore';
import { useSelector } from "react-redux";
import SideBarLeftLinks from "../../../components/website/SideBarLeftLinks";
import { useDispatch } from "react-redux";
import { do_logout } from "../../../redux-service/website/auth/UserLoginReducer";
import Cookies from "universal-cookie";
import { gql, useQuery, useMutation } from "@apollo/client";
import RecipeCategories from "./RecipeCategories";

/* Encode string to slug */
function convertToSlug( str:string ) {
    
    //replace all special characters | symbols with a space
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
             .toLowerCase();
      
    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm,'');
      
    // replace space with dash/hyphen
    str = str.replace(/\s+/g, '-');   
    return str;
}

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

const CREATE_RECIPE_CATEGORY = gql`
    mutation createRecipeCategories($category_name: String!, $category_slug: String!, $category_auth_id: String!, $category_auth_name: String!) {
        createRecipeCategories(category_name: $category_name, category_slug: $category_slug, category_auth_id: $category_auth_id, category_auth_name: $category_auth_name) {
            message,
            success
        }
    }
`;

const UserProfileCat = () => {
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
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const pp_path = 'http://localhost:48256/uploads/site-user-profile-photos/';
    const [showModal, setShowModal] = useState<boolean>(false);
    const [createCat, setCreateCat] = useState<string>('');
    const [createCatSlug, setCreateCatSlug] = useState<string>('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('Jp');
    const [uname, setUname] = useState<string>('John Paul');
    const [profilePhoto, setProfilePhoto] = useState<string>('');
    const [recCount, setRecCount] = useState<number>(0);
    const [catCount, setCatCount] = useState<number>(0);

    const cookies = new Cookies();
    const authUserID = cookies.get("gjtrewcipets_auth_user_id");
    
    useQuery(GET_USER_DETAILS, {
        variables: { id: authUserID },
        onCompleted: fdata => {
            // Set Profile Photo.
            let upp = fdata.getUserPhotoAndName.user_photo;
            if(upp !== '') {
                setProfilePhoto(upp);
            } else {
                setProfilePhoto('');
            }

            setRecCount(fdata.getUserPhotoAndName.ripp);
            setCatCount(fdata.getUserPhotoAndName.cipp);

            // Set User Name.
            let unm = fdata.getUserPhotoAndName.user_name;
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

    // Create Categories.
    let [crtCats] = useMutation(CREATE_RECIPE_CATEGORY, {
        onCompleted: fdata => {
            // console.log(fdata);
            const toastDefOpts = {
                autoClose: 3000,
                closeOnClick: true,
                theme: `${ThemeMode ? 'dark' : 'light'}`
            };
            if(fdata.createRecipeCategories.success) {
                toast.success(fdata.createRecipeCategories.message, toastDefOpts);
                let suctmr = setTimeout(function(){
                    window.location.reload();
                    clearTimeout(suctmr);
                }, 1000);
            } else {
                toast.error(fdata.createRecipeCategories.message, toastDefOpts);
            }
            // alert(fdata.createRecipeCategories.message);
            // if(fdata.createRecipeCategories.success) {
            //     window.location.reload();
            // }
        },
    })

    // console.log(convertToSlug("Cakes And Pastries"));
    const handleCreateCatModalInputChange = (e:any) => {
        const value = e.target.value;
        setCreateCat(value);
        setCreateCatSlug(convertToSlug(value));
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const toastDefOpts = {
            autoClose: 1000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        }

        let ct_data = {
            category_name: '',
            category_slug: '',
            category_auth_id: '',
            category_auth_name: ''
        };
        if(createCat == '') {
            toast.error("Required fields is empty.", toastDefOpts);
            // alert("Required fields is empty.");
            ct_data = {
                category_name: '',
                category_slug: '',
                category_auth_id: '',
                category_auth_name: ''
            };
        } else {
            ct_data = {
                category_name: createCat,
                category_slug: createCatSlug,
                category_auth_id: id ? id : '',
                category_auth_name: uname
            }
            setShowModal(!showModal);
            crtCats({
                variables: {
                    category_name: ct_data.category_name,
                    category_slug: ct_data.category_slug,
                    category_auth_id: ct_data.category_auth_id,
                    category_auth_name: ct_data.category_auth_name
                }
            });        
            setCreateCat('');
            setCreateCatSlug('');
        }
        // console.log(ct_data);
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
            }, 10);
        }

        if(authUserID !== id) {
            dispatch(do_logout());
            navigate("/");
            let ss = setTimeout(function(){
                window.location.reload();
                clearTimeout(ss);
            }, 10);
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name="Categories" page_title="All Categories" />
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
                            <NavLink 
                                to="#" 
                                title="+ New Category" 
                                className="twgtr-transition-all twgtr-inline-block twgtr-border-2 twgtr-font-open_sans twgtr-font-bold twgtr-text-sm twgtr-border-theme-color-2 twgtr-py-[7px] twgtr-px-3 twgtr-text-theme-color-2 hover:twgtr-bg-theme-color-2 hover:twgtr-text-slate-200 md:twgtr-text-base md:twgtr-px-5 dark:twgtr-border-theme-color-4 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200"
                                onClick={() => setShowModal(true)}
                            >
                                <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[10px]">
                                    <PiPlusBold size={15} />
                                    <div>New Category</div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <SiteModal 
                modal_heading="Create New Category" 
                backdrop={true} 
                hide_modal_on_backdrop_click={true}
                openState={showModal}
                setOpenState={setShowModal}
            >
                <form onSubmit={handleSubmit}>
                    <div className="twgtr-transition-all twgtr-bg-white dark:twgtr-bg-slate-700">
                        <div className="twgtr-p-[20px]">
                            <div className="twgtr-pb-4">
                                <label htmlFor="catnam" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                    Category Name
                                </label>
                                <input 
                                    type="text" 
                                    name="category_name" 
                                    id="catnam"
                                    className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                    placeholder="Eg. Cakes And Pastries" 
                                    autoComplete="off"
                                    onChange={handleCreateCatModalInputChange}
                                    value={createCat}
                                />
                            </div>
                            <div>
                                <label htmlFor="catslg" className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                    Category Slug
                                </label>
                                <input 
                                    type="text" 
                                    name="category_slug" 
                                    id="catslg"
                                    className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 read-only:twgtr-bg-slate-100 read-only:focus:twgtr-border-slate-400 dark:read-only:twgtr-bg-slate-500" 
                                    placeholder="Eg. cakes-and-pastries" 
                                    autoComplete="off"
                                    readOnly
                                    value={createCatSlug}
                                />
                            </div>
                        </div>
                        <div className="twgtr-transition-all twgtr-border-t twgtr-border-slate-300 twgtr-border-solid dark:twgtr-border-slate-500">
                            <div className="twgtr-px-[20px] twgtr-py-[10px] twgtr-flex twgtr-gap-x-4 twgtr-gap-y-3 twgtr-flex-wrap twgtr-items-center twgtr-justify-end">
                                <button type="button" title="Close" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-2 twgtr-text-theme-color-2 hover:twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2 hover:twgtr-border-theme-color-2 dark:twgtr-border-slate-300 dark:twgtr-text-slate-300 dark:hover:twgtr-bg-slate-300 dark:hover:twgtr-text-slate-700" onClick={() => setShowModal(!showModal)}>
                                    Close
                                </button>
                                <button type="submit" title="Create" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 hover:twgtr-bg-theme-color-4-hover-dark twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-border-theme-color-4-hover-dark">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </SiteModal>
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-4">
						<div className="twgtr-min-w-0 lg:twgtr-min-w-[250px] 2xl:twgtr-min-w-[300px]">
							<div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
                                <SideBarLeftLinks nav_links_data={sideBarLinks} />
							</div>
						</div>

                        <RecipeCategories uid={id} showModal={showModal} setShowModal={setShowModal} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileCat;