import { useParams, useNavigate } from "react-router-dom";
import SideBarLeftLinks from "../../../../components/website/SideBarLeftLinks";
import SiteBreadcrumb from "../../../../components/website/SiteBreadcrumb";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-service/ReduxStore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { do_logout } from "../../../../redux-service/website/auth/UserLoginReducer";
import { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_USER_DETAILS = gql`
    query getGeneralSettings($id: ID!) {
        getGeneralSettings(id: $id) {
            user_name,
            user_email,
            ripp,
            cipp
        }
    }
`;

const UPDATE_USER_DETAILS = gql`
    mutation updateGeneralSettings($id: ID!, $user_name: String!, $user_email: String!, $ripp: Int!, $cipp: Int!) {
        updateGeneralSettings(id: $id, user_name: $user_name, user_email: $user_email, ripp: $ripp, cipp: $cipp) {
            message,
            success
        }
    }
`;

const GeneralSettings = () => {
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
    const cookies = new Cookies();
    const authUserID = cookies.get("gjtrewcipets_auth_user_id");
    const validationSchema = z.object({
        userFullName: z.string({
            required_error: "Please enter Full Name",
            invalid_type_error: "Full Name must be in string format."
        }).min(6, {message: "Full name must be contains at least 6 characters."}),

        userEmail: z.string({
            required_error: "Please enter email address.",
            invalid_type_error: "Email must be in string format."
        }).email({
            message: "Please enter valid email address."
        }).min(1),

        recipeItemsPerPage: z.number({
            required_error: "Please enter the number.",
            invalid_type_error: "Value must be typed in numbers."
        }).max(20, {message: "You can put numbers upto 20."}).min(1),

        categoryItemsPerPage: z.number({
            required_error: "Please enter the number.",
            invalid_type_error: "Value must be typed in numbers."
        }).max(20, {message: "You can put numbers upto 20."}).min(1),
    });

    type validationSchema = z.infer<typeof validationSchema>;

    // Get values from DB.
    let {loading, data} = useQuery(GET_USER_DETAILS, {
        variables: { id: authUserID },
    });

    // Update Values
    let [uGenSet] = useMutation(UPDATE_USER_DETAILS, {
        onCompleted: fdata => {
            // console.log(fdata);
            const toastDefOpts = {
                autoClose: 3000,
                closeOnClick: true,
                theme: `${ThemeMode ? 'dark' : 'light'}`
            };
            if(fdata.updateGeneralSettings.success) {
                toast.success("Settings Saved Successfully!", toastDefOpts);
            } else {
                toast.error(fdata.updateGeneralSettings.message, toastDefOpts);
            }
        }
    })

    const { register, handleSubmit, setValue, formState: { errors }} = useForm<validationSchema>({
        resolver: zodResolver(validationSchema)
    });
    
    const handleFormSubmit: SubmitHandler<validationSchema> = (formData) => {
        // e.preventDefault();
        uGenSet({
            variables: {
                id: id,
                user_name: formData.userFullName,
                user_email: formData.userEmail,
                ripp: formData.recipeItemsPerPage,
                cipp: formData.categoryItemsPerPage
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

        if (data && !loading) {
            // Set default values from the query data
            setValue("userFullName", data?.getGeneralSettings.user_name);
            setValue("userEmail", data?.getGeneralSettings.user_email);
            setValue("recipeItemsPerPage", data?.getGeneralSettings.ripp);
            setValue("categoryItemsPerPage", data?.getGeneralSettings.cipp);
        }
    }, [data, loading, setValue]);

    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name="Genral" page_title="User Settings" />
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
                                    <label htmlFor="unmfrm" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                        Full Name
                                    </label>
                                    <input 
										type="text" 
                                        id="unmfrm"
										className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Eg. John Paul" 
										autoComplete="off"
                                        {...register("userFullName")}
									/>
                                    {errors.userFullName && (<p className="site-form-error">{errors.userFullName?.message}</p>)}
                                </div>
                                <div className="twgtr-pb-4">
                                    <label htmlFor="emlfrm" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                        Email
                                    </label>
                                    <input 
										type="email" 
                                        id="emlfrm"
										className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Eg. paul_john048@email.com" 
										autoComplete="off"
                                        {...register("userEmail")}
									/>
                                    {errors.userEmail && (<p className="site-form-error">{errors.userEmail?.message}</p>)}
                                </div>
                                <div className="twgtr-pb-4">
                                    <label htmlFor="ripfrm" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                        Recipe Items Per Page
                                    </label>
                                    <div className="twgtr-max-w-[80px]">
                                        <input 
                                            type="number" 
                                            id="ripfrm"
                                            className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                            placeholder="Eg. 5" 
                                            autoComplete="off"
                                            {...register("recipeItemsPerPage", { valueAsNumber: true })}
                                        />
                                    </div>
                                    {errors.recipeItemsPerPage && (<p className="site-form-error">{errors.recipeItemsPerPage?.message}</p>)}
                                </div>
                                <div className="twgtr-pb-4">
                                    <label htmlFor="cipfrm" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                        Category Items Per Page
                                    </label>
                                    <div className="twgtr-max-w-[80px]">
                                        <input 
                                            type="number" 
                                            id="cipfrm"
                                            className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                            placeholder="Eg. 5" 
                                            autoComplete="off"
                                            {...register("categoryItemsPerPage", { valueAsNumber: true })}
                                        />
                                    </div>
                                    {errors.categoryItemsPerPage && (<p className="site-form-error">{errors.categoryItemsPerPage?.message}</p>)}
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

export default GeneralSettings;