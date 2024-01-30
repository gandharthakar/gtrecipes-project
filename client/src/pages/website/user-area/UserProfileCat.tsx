import SiteBreadcrumb from "../../../components/website/SiteBreadcrumb";
import { NavLink } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import SiteModal from "../../../components/website/SiteModal";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from '../../../redux-service/ReduxStore';
import { useSelector } from "react-redux";
import { MdOutlineCategory } from "react-icons/md";
import CategoryCard from "../../../components/website/CategoryCard";
import { useParams } from "react-router-dom";
import SideBarLeftLinks from "../../../components/website/SideBarLeftLinks";

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
    const [showModal, setShowModal] = useState(false);
    const [createCat, setCreateCat] = useState('');
    const [createCatSlug, setCreateCatSlug] = useState('');
    // console.log(convertToSlug("Cakes And Pastries"));
    const handleCreateCatModalInputChange = (e:any) => {
        const value = e.target.value;
        setCreateCat(value);
        setCreateCatSlug(convertToSlug(value));
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const toastDefOpts = {
            autoClose: 3000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        }

        let data = {};
        if(createCat == '') {
            toast.error("Required fields is empty.", toastDefOpts);
            data = {};
        } else {
            data = {
                category_name: createCat,
                category_slug: createCatSlug
            }
        }
        console.log(data);
    }
    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name="Categories" page_title="All Categories" />
            <div className="twgtr-transition-all twgtr-px-4 twgtr-py-6 lg:twgtr-py-12 twgtr-border-t twgtr-border-solid twgtr-border-slate-300 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-600">
                <div className="site-container">
                    <div className="twgtr-flex md:twgtr-items-center twgtr-flex-col md:twgtr-flex-row md:twgtr-flex-wrap md:twgtr-justify-between twgtr-gap-x-[10px] twgtr-gap-y-[15px] md:twgtr-gap-x-[20px]">
                        <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[10px] md:twgtr-gap-x-[20px]">
                            <div className="twgtr-transition-all twgtr-w-[50px] twgtr-h-[50px] md:twgtr-w-[80px] md:twgtr-h-[80px] twgtr-rounded-full twgtr-flex twgtr-items-center twgtr-justify-center twgtr-bg-slate-200 dark:twgtr-bg-slate-800">
                                <div className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-bold twgtr-text-slate-500 twgtr-uppercase twgtr-text-[20px] md:twgtr-text-[30px] dark:twgtr-text-slate-200">
                                    Jp
                                </div>
                            </div>
                            <div>
                                <h1 className="twgtr-transition-all twgtr-font-open_sans twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-medium twgtr-text-slate-600 dark:twgtr-text-slate-200">
                                    John Paul
                                </h1>
                                <div className="twgtr-pt-1">
                                    <h2 className="twgtr-transition-all twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-600 dark:twgtr-text-slate-300">
                                        <span className="twgtr-font-bold">10</span> Recipes . <span className="twgtr-font-bold">5</span> Categories
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
                                <button type="button" title="Close" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-2 twgtr-text-theme-color-2 hover:twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2 hover:twgtr-border-theme-color-2 dark:twgtr-border-slate-300 dark:twgtr-text-slate-300 dark:hover:twgtr-bg-slate-300 dark:hover:twgtr-text-slate-700" onClick={() => setShowModal(false)}>
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

                        <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                            {/* No Category Found */}
                            <div className="twgtr-text-center twgtr-py-2 md:twgtr-py-0">
                                <MdOutlineCategory size={100} className="twgtr-transition-all twgtr-inline-block twgtr-w-[50px] twgtr-h-[50px] md:twgtr-w-[100px] md:twgtr-h-[100px] twgtr-text-slate-300 dark:twgtr-text-slate-500" />
                                <div className="twgtr-pt-2 md:twgtr-pt-4">
                                    <h6 className="twgtr-transition-all twgtr-font-open_sans twgtr-font-bold twgtr-text-[20px] md:twgtr-text-[30px] twgtr-text-slate-400">
                                        No Categories Found
                                    </h6>
                                </div>
                                <div className="twgtr-pt-1">
                                    <NavLink to="#" title="+ Add New" className="twgtr-transition-all twgtr-font-open_sans twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-4" onClick={() => setShowModal(true)}>
                                        + Add New
                                    </NavLink>
                                </div>
                            </div>

                            <div className="">
                                <CategoryCard user_id={1} category_id={1} category_name={"Cookies"} category_slug={"cookies"} />
                                <CategoryCard user_id={1} category_id={2} category_name={"Cakes"} category_slug={"cakes"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileCat;