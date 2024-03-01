import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import ThemeModeSwitch from "./ThemeModeSwitch";
import SiteLogo from "./SiteLogo";
import HeaderProfileDropdown from "./HeaderProfileDropdown";
import { useEffect, useRef, useState } from "react";

const SiteHeader = () => {
	const [menuToggle, setToggleMenu] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const toggleSIteMenu = () => {
		setToggleMenu(!menuToggle);
	}

	useEffect(() => {
		let menuHandler = (e:any) => {
            if(menuRef.current !== null) {
                if(!menuRef.current.contains(e.target)) {
                    setToggleMenu(false);
                }
            }
        };

        document.addEventListener('mousedown', menuHandler);
	}, []);

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
						<nav ref={menuRef} className={`site-header lg:twgtr-block twgtr-pr-0 lg:twgtr-pr-2 ${menuToggle ? 'twgtr-block' : 'twgtr-hidden'}`}>
							<ul className="twgtr-flex twgtr-items-center twgtr-flex-col lg:twgtr-flex-row lg:twgtr-items-start twgtr-flex-wrap twgtr-gap-x-6 twgtr-font-ubuntu twgtr-absolute lg:twgtr-relative twgtr-left-0 twgtr-top-[57px] twgtr-z-20 lg:twgtr-top-0 lg:twgtr-w-auto twgtr-w-full twgtr-bg-white lg:twgtr-bg-transparent">
								<li className="twgtr-px-3 lg:twgtr-px-0 twgtr-w-full lg:twgtr-w-auto twgtr-py-3 lg:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 lg:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/" title="Home" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4" onClick={toggleSIteMenu}>
										Home
									</NavLink>
								</li>
								<li className="twgtr-px-3 lg:twgtr-px-0 twgtr-w-full lg:twgtr-w-auto twgtr-py-3 lg:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 lg:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/recipes" title="Recipes" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4" onClick={toggleSIteMenu}>
										Recipes
									</NavLink>
								</li>
								<li className="twgtr-px-3 lg:twgtr-px-0 twgtr-w-full lg:twgtr-w-auto twgtr-py-3 lg:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 lg:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/about" title="About" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4" onClick={toggleSIteMenu}>
										About
									</NavLink>
								</li>
								<li className="twgtr-px-3 lg:twgtr-px-0 twgtr-w-full lg:twgtr-w-auto twgtr-py-3 lg:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 lg:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<NavLink to="/contact" title="Contact" className="twgtr-transition-all twgtr-font-medium twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4" onClick={toggleSIteMenu}>
										Contact
									</NavLink>
								</li>
								<li className="twgtr-px-3 lg:twgtr-px-0 twgtr-w-full lg:twgtr-w-auto twgtr-py-3 lg:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 lg:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700">
									<div className="lg:twgtr-hidden">
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
								<li className="twgtr-px-3 lg:twgtr-px-0 twgtr-w-full lg:twgtr-w-auto twgtr-py-3 lg:twgtr-py-0 twgtr-border-b-[1px] twgtr-border-slate-300 lg:twgtr-border-0 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-700 lg:twgtr-hidden">
									<NavLink to="/register" title="Register" className="twgtr-transition-all twgtr-inline-block twgtr-border-2 twgtr-font-open_sans twgtr-font-bold twgtr-text-sm twgtr-border-theme-color-2 twgtr-py-[7px] twgtr-px-3 twgtr-text-theme-color-2 hover:twgtr-bg-theme-color-2 hover:twgtr-text-slate-200 md:twgtr-text-base md:twgtr-px-5 dark:twgtr-border-theme-color-4 dark:twgtr-text-theme-color-4 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                		Register
                            		</NavLink>
								</li>
							</ul>
						</nav>
						<div className="twgtr-pr-2 lg:twgtr-pr-4">
							<HeaderProfileDropdown />
						</div>
						<div className="twgtr-pr-4 twgtr-hidden lg:twgtr-block">
							<ThemeModeSwitch />
						</div>
						<div className="twgtr-block lg:twgtr-hidden">
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