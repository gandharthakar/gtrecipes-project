import { useParams } from "react-router-dom";
import SideBarLeftLinks from "../../../../components/website/SideBarLeftLinks";
import SiteBreadcrumb from "../../../../components/website/SiteBreadcrumb";
import { RiCloseCircleFill } from "react-icons/ri";
import { useState } from "react";
import { RootState } from "../../../../redux-service/ReduxStore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const ProfilePictureSettings = () => {
    let { id } = useParams();
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
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

    const defaultFeImgPath = 'https://placehold.co/500x500?text=Profile.';
    const [image, setImage] = useState<string>(defaultFeImgPath);
    const [profile, setProfile] = useState<string>('');
    const [fileext, setFileExt] = useState<string>('');
    const [filSize, setFileSize] = useState<boolean>(false);
    const [fileDimensions, setFileDimensions] = useState<boolean>(false);

    const handleFileChange = (e:any) => {
        let file = e.target.files[0];
        if(!file) {
            setProfile('');
        } else {
            let gfnext = file.name;
            let fext = gfnext.split('.').pop();
            setFileExt(fext);
            setProfile(file);
            setImage(URL.createObjectURL(file));
        
            if (file.size > 500 * 1024) {
                setFileSize(false);
            } else {
                setFileSize(true);
            }

            const img = document.createElement('img');
            const objectURL = URL.createObjectURL(file);
            img.src = objectURL;
            img.onload = function handleLoad() {
                let {width, height} = img;
                if(width <= 500 && height <= 500) {
                    setFileDimensions(true);
                } else {
                    setFileDimensions(false);
                }
                URL.revokeObjectURL(objectURL);
            }
        }
    }

    const resetForm = () => {
        setImage(defaultFeImgPath);
        setProfile('');
        setFileExt('');
        setFileSize(false);
        setFileDimensions(false);
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const toastDefOpts = {
            autoClose: 5000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        }

        // Get file extention.
        const allowedFileTypes = ["jpg", "png"];
        
        if(profile === '') {
            toast.error("You must select a photo", toastDefOpts);
        } else {
            if(!allowedFileTypes.includes(fileext)) {
                toast.error("Only .jpg and .png files are allowed.", toastDefOpts);
            } else {
                if(!filSize) {
                    toast.error("Image file size is bigger than 500 kb.", toastDefOpts);
                } else {
                    if(!fileDimensions) {
                        toast.error("Image size is expected 500px x 500px. (square size)", toastDefOpts);
                    } else {
                        toast.success("Changes Saved Successfully.", toastDefOpts);
                    }
                }
            }
        }
    }

    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name="Change Profile Picture" page_title="User Settings" />
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-4">
                        <div className="twgtr-min-w-0 lg:twgtr-min-w-[250px] 2xl:twgtr-min-w-[300px]">
                            <div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
                                <SideBarLeftLinks nav_links_data={sideBarLinks} />
                            </div>
                        </div>
                        <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                            <form onSubmit={handleSubmit}>
                                <div className="twgtr-pb-4">
                                    <label className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                        Profile Photo
                                    </label>

                                    <div className="twgtr-transition-all twgtr-border twgtr-border-dashed twgtr-border-slate-500 twgtr-bg-white twgtr-p-[20px] dark:twgtr-bg-slate-600 dark:twgtr-border-slate-400">
                                        <div className="twgtr-flex twgtr-gap-x-[15px] md:twgtr-gap-x-[20px] twgtr-items-center md:twgtr-items-start">
                                            <div className="twgtr-min-w-[60px] twgtr-min-h-[60px] twgtr-max-h-[60px] md:twgtr-min-w-[100px] md:twgtr-min-h-[100px] md:twgtr-max-w-[100px] md:twgtr-max-h-[100px] twgtr-relative twgtr-bg-slate-200">
                                                <img src={image} className="twgtr-w-full twgtr-h-auto" alt="photo" />
                                                <div className="twgtr-absolute twgtr-right-[-9px] twgtr-top-[-9px] twgtr-z-[5px] md:twgtr-right-[-10px] md:twgtr-top-[-10px]">
                                                    <RiCloseCircleFill size={20} className="twgtr-transition-all twgtr-text-red-600 twgtr-cursor-pointer twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[30px] md:twgtr-h-[30px]" onClick={resetForm} />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="nfimg" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-3 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-theme-color-2 twgtr-bg-theme-color-2 twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2-hover-dark hover:twgtr-border-theme-color-2-hover-dark">
                                                    <input type="file" id="nfimg" name="featured_image" className="twgtr-hidden" value={""} onChange={handleFileChange} />
                                                    Choose Image
                                                </label>
                                                <div className="twgtr-pt-2 twgtr-hidden md:twgtr-block">
                                                    <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-bold twgtr-text-[16px] md:twgtr-text-[18px] twgtr-break-before-all twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                                        Requirements:
                                                    </h5>
                                                    <ul className="twgtr-list-disc twgtr-font-open_sans twgtr-pl-[18px]">
                                                        <li className="twgtr-transition-all twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                                            The image file size should be less than 500 KB. &#x3c; less 500 KB
                                                        </li>
                                                        <li className="twgtr-transition-all twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                                            The maximum height and width of image shuld be 500px x 500px.
                                                        </li>
                                                        <li className="twgtr-transition-all twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                                            Image file format should be ".jpg" or ".png". Other files are not allowed.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="twgtr-pt-2 twgtr-block md:twgtr-hidden">
                                            <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-bold twgtr-text-[16px] md:twgtr-text-[18px] twgtr-break-before-all twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                                Requirements:
                                            </h5>
                                            <ul className="twgtr-list-disc twgtr-font-open_sans twgtr-pl-[18px]">
                                                <li className="twgtr-transition-all twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                                    The image file size should be less than 500 KB. &#x3c; less 500 KB
                                                </li>
                                                <li className="twgtr-transition-all twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                                    The maximum height and width of image shuld be 500px x 500px.
                                                </li>
                                                <li className="twgtr-transition-all twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                                    Image file format should be ".jpg" or ".png". Other files are not allowed.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="twgtr-pt-4 twgtr-text-right">
                                    <button type="submit" title="Save Changes" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 hover:twgtr-bg-theme-color-4-hover-dark twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-border-theme-color-4-hover-dark">
                                        Save Changes
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

export default ProfilePictureSettings;