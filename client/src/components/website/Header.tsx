import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import ThemeModeSwitch from "./ThemeModeSwitch";
import SiteLogo from "./SiteLogo";

const Header = () => {
	return (
		<>
			<div className="twgtr-transition-all twgtr-relative twgtr-border-b twgtr-border-slate-200 twgtr-border-solid twgtr-px-3 twgtr-py-4 twgtr-bg-white dark:twgtr-bg-zinc-900 dark:twgtr-border-zinc-700">
				<header className="twgtr-flex twgtr-items-center twgtr-gap-x-4">
					<div className="twgtr-mr-auto">
						<NavLink to="/" title="Home">
							<SiteLogo />
						</NavLink>
					</div>
					<div className="twgtr-flex twgtr-items-center">
						<nav className="site-header twgtr-hidden md:twgtr-block twgtr-pr-0 md:twgtr-pr-8">
							<ul className="twgtr-flex twgtr-items-center twgtr-flex-col md:twgtr-flex-row md:twgtr-items-start twgtr-flex-wrap twgtr-gap-x-6 twgtr-font-ubuntu twgtr-absolute md:twgtr-relative twgtr-left-0 twgtr-top-[55px] md:twgtr-top-0 md:twgtr-w-auto twgtr-w-full twgtr-bg-white md:twgtr-bg-transparent">
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-2 md:twgtr-py-0 twgtr-border-b-[1px] md:twgtr-border-0">
									<NavLink to="/recipes" title="Recipes" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4">
										Recipes
									</NavLink>
								</li>
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-2 md:twgtr-py-0 twgtr-border-b-[1px] md:twgtr-border-0">
									<NavLink to="/about" title="About" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4">
										About
									</NavLink>
								</li>
								<li className="twgtr-px-3 md:twgtr-px-0 twgtr-w-full md:twgtr-w-auto twgtr-py-2 md:twgtr-py-0 twgtr-border-b-[1px] md:twgtr-border-0">
									<NavLink to="/contact" title="Contact" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4">
										Contact
									</NavLink>
								</li>
							</ul>
						</nav>
						<div className="twgtr-pr-4">
							<ThemeModeSwitch />
						</div>
						<div className="twgtr-block md:twgtr-hidden">
							<IoMdMenu size={30} className="twgtr-cursor-pointer twgtr-text-slate-500" />
						</div>
					</div>
				</header>
			</div>
		</>
	)
}

export default Header;