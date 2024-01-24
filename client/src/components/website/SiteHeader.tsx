import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import ThemeModeSwitch from "./ThemeModeSwitch";
import SiteLogo from "./SiteLogo";
import HeaderProfileDropdown from "./HeaderProfileDropdown";
import { useState } from "react";

const SiteHeader = () => {
	const [menuToggle, setToggleMenu] = useState(false);

	const toggleSIteMenu = () => {
		setToggleMenu(!menuToggle);
	}

	return (
		<>
			<div className="twgtr-transition-all twgtr-relative twgtr-border-b twgtr-border-slate-300 twgtr-border-solid twgtr-px-4 twgtr-bg-white dark:twgtr-bg-slate-900 dark:twgtr-border-slate-600">
				<header className="twgtr-flex twgtr-items-center twgtr-gap-x-4">
					<div className="twgtr-mr-auto">
						<NavLink to="/" title="Home">
							<SiteLogo />
						</NavLink>
					</div>
					<div className="twgtr-flex twgtr-items-center">
						<nav className={`site-header md:twgtr-block twgtr-pr-0 md:twgtr-pr-2 ${menuToggle ? 'twgtr-block' : 'twgtr-hidden'}`}>
							<ul className="twgtr-flex twgtr-items-center twgtr-flex-col md:twgtr-flex-row md:twgtr-items-start twgtr-flex-wrap twgtr-gap-x-6 twgtr-font-ubuntu twgtr-absolute md:twgtr-relative twgtr-left-0 twgtr-top-[57px] twgtr-z-20 md:twgtr-top-0 md:twgtr-w-auto twgtr-w-full twgtr-bg-white md:twgtr-bg-transparent">
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-3 md:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 md:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/" title="Home" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4">
										Home
									</NavLink>
								</li>
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-3 md:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 md:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/recipes" title="Recipes" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4">
										Recipes
									</NavLink>
								</li>
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-3 md:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 md:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/about" title="About" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4">
										About
									</NavLink>
								</li>
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-3 md:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 md:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/contact" title="Contact" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4">
										Contact
									</NavLink>
								</li>
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-3 md:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 md:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<div className="md:twgtr-hidden">
										<div className="twgtr-flex twgtr-items-center twgtr-gap-3">
											<div className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-medium twgtr-text-slate-700 dark:twgtr-text-slate-200">
												Choose Theme
											</div>
											<div>
												<ThemeModeSwitch />
											</div>
										</div>
									</div>
								</li>
							</ul>
						</nav>
						<div className="twgtr-pr-2 md:twgtr-pr-4">
							<HeaderProfileDropdown />
						</div>
						<div className="twgtr-pr-4 twgtr-hidden md:twgtr-block">
							<ThemeModeSwitch />
						</div>
						<div className="twgtr-block md:twgtr-hidden">
							{
								menuToggle ? 
								(<IoMdClose size={30} className="twgtr-cursor-pointer twgtr-text-slate-500" onClick={toggleSIteMenu} />) 
								: 
								(<IoMdMenu size={30} className="twgtr-cursor-pointer twgtr-text-slate-500" onClick={toggleSIteMenu} />)
							}
						</div>
					</div>
				</header>
			</div>
		</>
	)
}

export default SiteHeader;