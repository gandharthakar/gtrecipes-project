import { useParams } from "react-router-dom";
import SideBarLeftLinks from "../../../../components/website/SideBarLeftLinks";
import SiteBreadcrumb from "../../../../components/website/SiteBreadcrumb";

const DeleteAccountSettings = () => {
    let { id } = useParams();
    const sideBarLinks = [
        {
            id: 1,
            page_name: "General",
            page_slug: `/user-area/settings/${id}`
        },
        {
            id: 2,
            page_name: "Password",
            page_slug: `/user-area/settings/change-password/${id}`
        },
        {
            id: 3,
            page_name: "Profile Picture",
            page_slug: `/user-area/settings/change-profile-picture/${id}`
        },
        {
            id: 4,
            page_name: "Delete Account",
            page_slug: `/user-area/settings/delete-account/${id}`
        },
    ];
    return (
        <>
            <SiteBreadcrumb page_name="Delete Account" page_title="User Settings" />
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-4">
                        <div className="twgtr-min-w-0 lg:twgtr-min-w-[250px] 2xl:twgtr-min-w-[300px]">
                            <div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
                                <SideBarLeftLinks nav_links_data={sideBarLinks} />
                            </div>
                        </div>
                        <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                            <form>
                                <div className="twgtr-pb-[15px]">
                                    <p className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14ox] md:twgtr-text-[16ox] twgtr-text-slate-700 dark:twgtr-text-theme-color-3">
                                        If you delete your account you will be loose everyting you have created on this site. You won't be able to restore categories and recipes you have created. So take a note that before deleting your account. 
                                    </p>
                                </div>
                                <div>
                                    <button type="button" title="Delete Account" className="twgtr-transition-all twgtr-py-[5px] twgtr-px-[10px] md:twgtr-px-[15px] md:twgtr-py-[7px] twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[18px] twgtr-bg-red-600 twgtr-text-white hover:twgtr-bg-red-700">
                                        Delete Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DeleteAccountSettings;