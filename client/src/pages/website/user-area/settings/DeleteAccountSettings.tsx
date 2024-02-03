import { useParams } from "react-router-dom";
import SideBarLeftLinks from "../../../../components/website/SideBarLeftLinks";
import SiteBreadcrumb from "../../../../components/website/SiteBreadcrumb";
import SiteModal from "../../../../components/website/SiteModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-service/ReduxStore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from 'react-router';

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

    const navigate = useNavigate();
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {

        const toastDefOpts = {
            autoClose: 3000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        }

        toast.error("Required fields is empty.", toastDefOpts);
        navigate("/");
    }

    return (
        <>
            <ToastContainer />
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
                                    <button 
                                        type="button" 
                                        title="Delete Account" 
                                        className="twgtr-transition-all twgtr-py-[5px] twgtr-px-[10px] md:twgtr-px-[15px] md:twgtr-py-[7px] twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[18px] twgtr-bg-red-600 twgtr-text-white hover:twgtr-bg-red-700"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <SiteModal 
                modal_heading="Delete Confirmation" 
                backdrop={true} 
                hide_modal_on_backdrop_click={true}
                openState={showModal}
                setOpenState={setShowModal}
            >
                <div className="twgtr-py-[20px] twgtr-px-[20px] md:twgtr-py-[50px] twgtr-text-center">
                    <h5 className="twgtr-transition-all twgtr-font-open_sans twgtr-inline-block twgtr-text-[18px] md:twgtr-text-[25px] twgtr-text-slate-700 dark:twgtr-text-theme-color-3">
                        Are you sure want to delete account ?
                    </h5>

                    <div className="twgtr-pt-[5px] md:twgtr-pt-[15px] twgtr-text-center">
                        <div className="twgtr-px-[20px] twgtr-py-[10px] twgtr-flex twgtr-gap-x-4 twgtr-gap-y-3 twgtr-flex-wrap twgtr-items-center twgtr-justify-center">
                            <button type="button" title="Yes" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 hover:twgtr-bg-theme-color-4-hover-dark twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-border-theme-color-4-hover-dark" onClick={handleSubmit}>
                                Yes
                            </button>
                            <button type="button" title="No" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-2 twgtr-text-theme-color-2 hover:twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2 hover:twgtr-border-theme-color-2 dark:twgtr-border-slate-300 dark:twgtr-text-slate-300 dark:hover:twgtr-bg-slate-300 dark:hover:twgtr-text-slate-700" onClick={() => setShowModal(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </SiteModal>
        </>
    )
};

export default DeleteAccountSettings;