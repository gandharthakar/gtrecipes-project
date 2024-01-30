import SiteBreadcrumb from "../../../components/website/SiteBreadcrumb";
import { NavLink } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import { PiCookingPot } from "react-icons/pi";
import { useParams } from "react-router-dom";
import SideBarLeftLinks from "../../../components/website/SideBarLeftLinks";

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
    return (
        <>
            <SiteBreadcrumb page_name="John Paul" page_title="User Profile" />
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
                            <NavLink to="/create-recipe/1" title="+ New Recipe" className="twgtr-transition-all twgtr-inline-block twgtr-border-2 twgtr-font-open_sans twgtr-font-bold twgtr-text-sm twgtr-border-theme-color-2 twgtr-py-[7px] twgtr-px-3 twgtr-text-theme-color-2 hover:twgtr-bg-theme-color-2 hover:twgtr-text-slate-200 md:twgtr-text-base md:twgtr-px-5 dark:twgtr-border-theme-color-4 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
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
                                    <NavLink to="/create-recipe/1" title="+ Add New" className="twgtr-transition-all twgtr-font-open_sans twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-4">
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