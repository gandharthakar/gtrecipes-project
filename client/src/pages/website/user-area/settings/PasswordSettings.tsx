import { useNavigate, useParams } from "react-router-dom";
import SideBarLeftLinks from "../../../../components/website/SideBarLeftLinks";
import SiteBreadcrumb from "../../../../components/website/SiteBreadcrumb";
import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-service/ReduxStore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { do_logout } from "../../../../redux-service/website/auth/UserLoginReducer";
import Cookies from "universal-cookie";
import { gql, useMutation } from "@apollo/client";

const UPDATE_USER_PWD = gql`
    mutation updatePassword($id: ID!, $password: String!, $confirm_password: String!) {
        updatePassword(id: $id, password: $password, confirm_password: $confirm_password) {
            message,
            success
        }
    }
`;

const PasswordSettings = () => {
    let { id } = useParams();
    const sideBarLinks = [
        {
            id: "1",
            page_name: "General",
            page_slug: `/user-area/settings/${id}`
        },
        {
            id: "2",
            page_name: "Password",
            page_slug: `/user-area/settings/change-password/${id}`
        },
        {
            id: "3",
            page_name: "Profile Picture",
            page_slug: `/user-area/settings/change-profile-picture/${id}`
        },
        {
            id: "4",
            page_name: "Delete Account",
            page_slug: `/user-area/settings/delete-account/${id}`
        },
    ];

    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[showPassword, setShowPassword] = useState<boolean>(false);
	const[showConfPassword, setShowConfPassword] = useState<boolean>(false);

    const validationSchema = z.object({
        userNewPassword: z.string({
            invalid_type_error: "Password must be in string format."
        }).min(8).max(16),
        userNewConfirmPassword: z.string({
            invalid_type_error: "Confirm password must be in string format."
        }).min(8).max(16)
    }).refine((data) => data.userNewPassword === data.userNewConfirmPassword, {
        path: ["userNewConfirmPassword"],
        message: "Your password didn't match."
    });

    type validationSchema = z.infer<typeof validationSchema>;

    // Update Password
    let [updPwd] = useMutation(UPDATE_USER_PWD, {
        onCompleted: fdata => {
            // console.log(fdata);
            const toastDefOpts = {
                autoClose: 3000,
                closeOnClick: true,
                theme: `${ThemeMode ? 'dark' : 'light'}`
            };
            if(fdata.updatePassword.success) {
                toast.success(fdata.updatePassword.message, toastDefOpts);
            } else {
                toast.error(fdata.updatePassword.message, toastDefOpts);
            }
        }
    })

    const { register, handleSubmit, formState: { errors }} = useForm<validationSchema>({
        resolver: zodResolver(validationSchema)
    });

    const handleFormSubmit: SubmitHandler<validationSchema> = (formData) => {
        // e.preventDefault();
        updPwd({
            variables: {
                id: id,
                password: formData.userNewPassword,
                confirm_password: formData.userNewConfirmPassword
            }
        })
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
            <SiteBreadcrumb page_name="Change Password" page_title="User Settings" />
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-4">
                        <div className="twgtr-min-w-0 lg:twgtr-min-w-[250px] 2xl:twgtr-min-w-[300px]">
                            <div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
                                <SideBarLeftLinks nav_links_data={sideBarLinks} />
                            </div>
                        </div>
                        <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <div className="twgtr-pb-4">
                                    <label htmlFor="pwdfrm" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                        New Password
                                    </label>
                                    <div className="twgtr-relative">
                                        <input 
                                            type={`${showPassword ? 'text' : 'password'}`} 
                                            id="pwdfrm"
                                            className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-4 twgtr-pr-[45px] twgtr-py-1 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                            autoComplete="off"
                                            {...register("userNewPassword")}
                                        />
                                        <div className="twgtr-absolute twgtr-right-[15px] twgtr-z-10 twgtr-top-[9px] md:twgtr-top-[13px]">
                                            {
                                                showPassword ? 
                                                (
                                                    <>
                                                        <FaRegEyeSlash scale={15} title="Show Pasword ?" className="twgtr-transition-all twgtr-text-slate-700 twgtr-cursor-pointer hover:twgtr-text-theme-color-4 dark:twgtr-text-theme-color-3 dark:hover:twgtr-text-theme-color-4"  onClick={() => setShowPassword(false)}/>
                                                    </>
                                                ) 
                                                : 
                                                (
                                                    <>
                                                        <FaRegEye scale={15} title="Show Pasword ?" className="twgtr-transition-all twgtr-text-slate-700 twgtr-cursor-pointer hover:twgtr-text-theme-color-4 dark:twgtr-text-theme-color-3 dark:hover:twgtr-text-theme-color-4"  onClick={() => setShowPassword(true)}/>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {errors.userNewPassword && (<p className="site-form-error">{errors.userNewPassword?.message}</p>)}
                                </div>
                                <div className="twgtr-pb-4">
                                    <label htmlFor="cpwdfrm" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                        Confirm New Password
                                    </label>
                                    <div className="twgtr-relative">
                                        <input 
                                            type={`${showConfPassword ? 'text' : 'password'}`} 
                                            id="cpwdfrm"
                                            className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-4 twgtr-pr-[45px] twgtr-py-1 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                            autoComplete="off"
                                            {...register("userNewConfirmPassword")}
                                        />
                                        <div className="twgtr-absolute twgtr-right-[15px] twgtr-z-10 twgtr-top-[9px] md:twgtr-top-[13px]">
                                            {
                                                showConfPassword ? 
                                                (
                                                    <>
                                                        <FaRegEyeSlash scale={15} title="Show Pasword ?" className="twgtr-transition-all twgtr-text-slate-700 twgtr-cursor-pointer hover:twgtr-text-theme-color-4 dark:twgtr-text-theme-color-3 dark:hover:twgtr-text-theme-color-4"  onClick={() => setShowConfPassword(false)}/>
                                                    </>
                                                ) 
                                                : 
                                                (
                                                    <>
                                                        <FaRegEye scale={15} title="Show Pasword ?" className="twgtr-transition-all twgtr-text-slate-700 twgtr-cursor-pointer hover:twgtr-text-theme-color-4 dark:twgtr-text-theme-color-3 dark:hover:twgtr-text-theme-color-4"  onClick={() => setShowConfPassword(true)}/>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {errors.userNewConfirmPassword && (<p className="site-form-error">{errors.userNewConfirmPassword?.message}</p>)}
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

export default PasswordSettings;