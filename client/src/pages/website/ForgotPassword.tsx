import { NavLink, useNavigate } from "react-router-dom";
import SiteLogo from "../../components/website/SiteLogo";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-service/ReduxStore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMutation, gql } from "@apollo/client";
import { set_dark_mode, unset_dark_mode } from "../../redux-service/website/SiteThemeModeReducer";

const FORGOT_PASSWORD = gql`
	mutation forgotPassword($email: String!) {
		forgotPassword(email: $email) {
			message,
			success
		}
	}
`;

const ForgotPassword = () => {
	const navigate = useNavigate();
	const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
	const dispatch = useDispatch();
	const [pros, setPros] = useState<boolean>(false);

	const [fgtPwd] = useMutation(FORGOT_PASSWORD, {
		onCompleted: data => {
			// console.log(data);
			const toastDefOpts = {
				autoClose: 2000,
				closeOnClick: true,
				theme: `${ThemeMode ? 'dark' : 'light'}`
			}
			if(data.forgotPassword.success) {
				toast.success(data.forgotPassword.message, toastDefOpts);
				let ss = setTimeout(function(){
					navigate(`/login`);
					clearTimeout(ss);
					setPros(false);
				}, 2000);
			} else {
				toast.error(data.forgotPassword.message, toastDefOpts);
			}
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
	});

	const validationSchema = z.object({
		email: z.string({
			required_error: "Please enter email address.",
			invalid_type_error: "Email must be in string format."
		}).email({
			message: "Please enter valid email address."
		}).min(1),
	});

	type validationSchema = z.infer<typeof validationSchema>;

	const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema)
	});
	
	const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
		fgtPwd({
			variables: {
				email: formdata.email
			}
		});
		setPros(true);
		// Reset Form
		reset();
	}

	useEffect(() => {
        // Automatically Check and Set Dark Mode.
        // const detectMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Manually Toggle and Save Dark Mode.
        let glsi = localStorage.getItem('site-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }
    }, []);

	return (
		<>
			<ToastContainer />
			<div className="twgtr-transition-all twgtr-bg-slate-200 dark:twgtr-bg-theme-color-1">
				<div className="twgtr-flex">
					<div 
					className="twgtr-flex-1 twgtr-bg-center twgtr-bg-cover twgtr-bg-no-repeat twgtr-hidden lg:twgtr-block twgtr-relative before:twgtr-content-[''] before:twgtr-absolute before:twgtr-left-0 before:twgtr-top-0 before:twgtr-z-10 before:twgtr-w-full before:twgtr-h-full before:twgtr-bg-[#000000] before:twgtr-opacity-[0.5]" 
					style={{backgroundImage: `url('images/login-bg.jpg')`}}></div>
					<div className="twgtr-flex twgtr-items-center twgtr-justify-center twgtr-min-h-screen twgtr-flex-col twgtr-min-w-0 twgtr-w-full lg:twgtr-w-auto lg:twgtr-min-w-[500px] twgtr-px-4 twgtr-py-6 lg:twgtr-px-8">
						<div className="twgtr-w-full twgtr-max-w-[300px] twgtr-mx-auto twgtr-text-center">
							<div className="twgtr-inline-block twgtr-pb-4 md:twgtr-pb-8">
								<NavLink to="/" title="Home">
									<SiteLogo />
								</NavLink>
							</div>
							<div className="twgtr-block twgtr-pb-6 md:twgtr-pb-8">
								<h1 className="twgtr-transition-all twgtr-text-[25px] md:twgtr-text-[30px] twgtr-text-slate-800 twgtr-font-ubuntu dark:twgtr-text-slate-200">
									Forgot Password
								</h1>
							</div>
							<form onSubmit={handleSubmit(handleFormSubmit)}>
								<div className="twgtr-pb-4 twgtr-text-left">
									<input 
										type="email" 
										className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Email" 
										autoComplete="off"
										{...register("email")}
									/>
									{errors.email && (<p className="site-form-error">{errors.email?.message}</p>)}
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

export default ForgotPassword;