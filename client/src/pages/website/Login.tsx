import { NavLink } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import SiteLogo from "../../components/website/SiteLogo";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";

const Login = () => {
	const[showPassword, setShowPassword] = useState(false);
	return (
		<>
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
							<form>
								<div className="twgtr-pb-6">
									<input 
										type="email" 
										name="user_email" 
										className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Email" 
										autoComplete="off"
									/>
								</div>
								<div className="twgtr-pb-6 twgtr-relative">
									<input 
										type={`${showPassword ? 'text' : 'password'}`}
										name="user_password" 
										className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-4 twgtr-pr-[45px] twgtr-py-1 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Password" 
										autoComplete="off"
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
								<div>
									<button type="button" title="Login" className="twgtr-transition-all twgtr-w-full twgtr-px-4 twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-theme-color-2 twgtr-bg-theme-color-2 twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[18px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2-hover-dark hover:twgtr-border-theme-color-2-hover-dark">
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