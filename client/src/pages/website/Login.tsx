import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import SiteLogo from "../../components/website/SiteLogo";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-service/ReduxStore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMutation, gql } from "@apollo/client";
import { do_login } from "../../redux-service/website/auth/UserLoginReducer";

const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			user_id,
			token,
			message,
			success
		}
	}
`;

const Login = () => {
	const navigate = useNavigate();
	const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
	// const UserAuth = useSelector((state: RootState) => state.user_login.isAuthenticated);
	const dispatch = useDispatch();
	const[showPassword, setShowPassword] = useState(false);
	const [loginUser] = useMutation(LOGIN_USER, {
		onCompleted: data => {
			// console.log(data);
			const toastDefOpts = {
				autoClose: 2000,
				closeOnClick: true,
				theme: `${ThemeMode ? 'dark' : 'light'}`
			}
			if(data.loginUser.success) {
				toast.success(data.loginUser.message, toastDefOpts);
				dispatch(do_login(data.loginUser));
				let ss = setTimeout(function(){
					navigate(`/user-area/profile/${data.loginUser.user_id}`);
					clearTimeout(ss);
				}, 500);
			} else {
				toast.error(data.loginUser.message, toastDefOpts);
			}
		}
	});

	const validationSchema = z.object({
		email: z.string({
			required_error: "Please enter email address.",
			invalid_type_error: "Email must be in string format."
		}).email({
			message: "Please enter valid email address."
		}).min(1),
		password: z.string({
			invalid_type_error: "Password must be in string format."
		}).min(8).max(16),
	});

	type validationSchema = z.infer<typeof validationSchema>;

	const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema)
	});
	
	const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
		loginUser({
			variables: {
				email: formdata.email,
				password: formdata.password,
			}
		});
		// Reset Form
		reset();
	}

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
									User Login
								</h1>
							</div>
							<form onSubmit={handleSubmit(handleFormSubmit)}>
								<div className="twgtr-pb-6 twgtr-text-left">
									<input 
										type="email" 
										className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Email" 
										autoComplete="off"
										{...register("email")}
									/>
									{errors.email && (<p className="site-form-error">{errors.email?.message}</p>)}
								</div>
								<div className="twgtr-pb-6 twgtr-text-left">
									<div className="twgtr-relative">
										<input 
											type={`${showPassword ? 'text' : 'password'}`}
											className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-4 twgtr-pr-[45px] twgtr-py-1 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
											placeholder="Password" 
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
								<div>
									<button type="submit" title="Login" className="twgtr-transition-all twgtr-w-full twgtr-px-4 twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-theme-color-2 twgtr-bg-theme-color-2 twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[18px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2-hover-dark hover:twgtr-border-theme-color-2-hover-dark">
										Login
									</button>
								</div>
							</form>
							<div className="twgtr-block twgtr-text-center twgtr-pt-4">
								<h6 className="twgtr-font-open_sans twgtr-text-[14px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
									Don't have an account ?&nbsp;
									<NavLink to="/register" title="Please Register" className="twgtr-font-semibold twgtr-text-theme-color-2 hover:twgtr-text-theme-color-4">
										Please Register
									</NavLink>
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login;