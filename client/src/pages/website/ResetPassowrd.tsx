import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import SiteLogo from "../../components/website/SiteLogo";
import { FaRegEye } from "react-icons/fa6";
import { useState, useEffect } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-service/ReduxStore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMutation, gql } from "@apollo/client";
import { set_dark_mode, unset_dark_mode } from "../../redux-service/website/SiteThemeModeReducer";

const RESET_PASSWORD = gql`
	mutation resetUserPassword($password: String!, $confirm_password: String!, $user_id: String!, $token: String!) {
		resetUserPassword(password: $password, confirm_password: $confirm_password, user_id: $user_id, token: $token) {
			message,
			success
		}
	}
`;

const ResetPassowrd = () => {
	const { id, token } = useParams();

	const navigate = useNavigate();
	const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
	const dispatch = useDispatch();
	const[showPassword, setShowPassword] = useState<boolean>(false);
	const[showConfPassword, setShowConfPassword] = useState<boolean>(false);
	const [pros, setPros] = useState<boolean>(false);

	const [rstPwd] = useMutation(RESET_PASSWORD, {
		onCompleted: data => {
			const toastDefOpts = {
				autoClose: 2000,
				closeOnClick: true,
				theme: `${ThemeMode ? 'dark' : 'light'}`
			}
			if(data.resetUserPassword.success) {
				toast.success(data.resetUserPassword.message, toastDefOpts);
				const ss = setTimeout(function(){
					navigate("/");
					clearTimeout(ss);
				}, 2000);
				setPros(false);
			} else {
				toast.error(data.resetUserPassword.message, toastDefOpts);
				setPros(false);
			}
			// console.log(data.registerNewUser.message);
		},
		onError(error) {
			// console.log(error.message);
			const toastDefOpts = {
				autoClose: 2000,
				closeOnClick: true,
				theme: `${ThemeMode ? 'dark' : 'light'}`
			}
			toast.error(error.message, toastDefOpts);
			setPros(false);
		},
	})

	const validationSchema = z.object({
		password: z.string({
			invalid_type_error: "Password must be in string format."
		}).min(8).max(16),
	
		confirmPassword: z.string({
			invalid_type_error: "Confirm password must be in string format."
		}).min(8).max(16)
	
	}).refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Your password didn't match."
	});
	
	type validationSchema = z.infer<typeof validationSchema>;
	
	const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema)
	});
	
	const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
		rstPwd({
			variables: {
				password: formdata.password,
				confirm_password: formdata.confirmPassword,
				user_id: id,
				token
			}
		});
		// Reset Form
		reset();
		setPros(true);
	}

	useEffect(() => {
        // Automatically Check and Set Dark Mode.
        // const detectMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Manually Toggle and Save Dark Mode.
        const glsi = localStorage.getItem('site-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }
	//eslint-disable-next-line
    }, []);

	return (
		<>
			<ToastContainer />
			<div className="twgtr-transition-all twgtr-bg-slate-200 dark:twgtr-bg-theme-color-1">
				<div className="twgtr-flex">
					<div 
					className="twgtr-flex-1 twgtr-bg-center twgtr-bg-cover twgtr-bg-no-repeat twgtr-hidden lg:twgtr-block twgtr-relative before:twgtr-content-[''] before:twgtr-absolute before:twgtr-left-0 before:twgtr-top-0 before:twgtr-z-10 before:twgtr-w-full before:twgtr-h-full before:twgtr-bg-[#000000] before:twgtr-opacity-[0.5]" 
					style={{backgroundImage: `url('/images/register-bg.jpg')`}}></div>
					<div className="twgtr-flex twgtr-items-center twgtr-justify-center twgtr-min-h-screen twgtr-flex-col twgtr-min-w-0 twgtr-w-full lg:twgtr-w-auto lg:twgtr-min-w-[500px] twgtr-px-4 twgtr-py-6 lg:twgtr-px-8">
						<div className="twgtr-w-full twgtr-max-w-[300px] twgtr-mx-auto twgtr-text-center">
							<div className="twgtr-inline-block twgtr-pb-4 md:twgtr-pb-8">
								<NavLink to="/" title="Home">
									<SiteLogo />
								</NavLink>
							</div>
							<div className="twgtr-block twgtr-pb-6 md:twgtr-pb-8">
								<h1 className="twgtr-transition-all twgtr-text-[25px] md:twgtr-text-[30px] twgtr-text-slate-800 twgtr-font-ubuntu dark:twgtr-text-slate-200">
									Reset Password
								</h1>
							</div>
							<form onSubmit={handleSubmit(handleFormSubmit)}>
								<div className="twgtr-pb-6 twgtr-text-left">
									<div className="twgtr-relative">
										<input 
											type={`${showPassword ? 'text' : 'password'}`}
											className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-4 twgtr-pr-[45px] twgtr-py-1 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
											placeholder="New Password" 
											autoComplete="off"
											{...register("password")}
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
									{errors.password && (<p className="site-form-error">{errors.password?.message}</p>)}
								</div>
								<div className="twgtr-pb-6 twgtr-text-left">
									<div className="twgtr-relative">
										<input 
											type={`${showConfPassword ? 'text' : 'password'}`}
											className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-4 twgtr-pr-[45px] twgtr-py-1 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
											placeholder="Confirm Password" 
											autoComplete="off"
											{...register("confirmPassword")}
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
									{errors.confirmPassword && (<p className="site-form-error">{errors.confirmPassword?.message}</p>)}
								</div>
								<div>
									{
										pros ? 
										(
											<div className="twgtr-flex twgtr-gap-x-[10px] twgtr-items-center">
                                                <div>
                                                    <div className="site-spinner !twgtr-w-[30px] !twgtr-h-[30px] md:!twgtr-w-[35px] md:!twgtr-h-[35px]"></div>
                                                </div>
                                                <div>
                                                    <h6 className="twgtr-text-[16px] md:twgtr-text-[20px] twgtr-text-slate-600">
                                                        Processing...
                                                    </h6>
                                                </div>
                                            </div>
										) 
										: 
										(
											<button type="submit" title="Submit" className="twgtr-transition-all twgtr-w-full twgtr-px-4 twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-theme-color-2 twgtr-bg-theme-color-2 twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[18px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2-hover-dark hover:twgtr-border-theme-color-2-hover-dark">
												Submit
											</button>
										)
									}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ResetPassowrd;