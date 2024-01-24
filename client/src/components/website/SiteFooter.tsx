import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import ThemeModeSwitchFooter from "./ThemeModeSwitchFooter";

const SiteFooter = () => {

    // let activeFlink = () => {
    //     return ({ isActive }: any) => isActive ? 'active' : '';
    // }

    return (
        <footer className="twgtr-font-ubuntu site-footer">
            <div className="twgtr-transition-all twgtr-bg-white twgtr-border-t twgtr-border-solid twgtr-px-4 twgtr-py-5 md:twgtr-py-10 twgtr-border-slate-300 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-600">
                <div className="site-container">
                    <div className="twgtr-grid twgtr-grid-cols-none md:twgtr-grid-cols-2 lg:twgtr-grid-cols-3">
                        <div className="twgtr-py-1">
                            <div>
                                <div className="twgtr-py-2">
                                    <h4 className="twgtr-transition-all twgtr-font-semibold twgtr-text-theme-color-4 twgtr-text-[18px] md:twgtr-text-[20px]">
                                        Site Links
                                    </h4>
                                </div>
                                <div>
                                    <ul>
                                        <li className="twgtr-pb-1">
                                            <NavLink to="/" title="Home" className={`twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-400 dark:hover:twgtr-text-theme-color-2`}>
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className="twgtr-pb-1">
                                            <NavLink to="/recipes" title="Recipes" className={`twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-400 dark:hover:twgtr-text-theme-color-2`}>
                                                Recipes
                                            </NavLink>
                                        </li>
                                        <li className="twgtr-pb-1">
                                            <NavLink to="/about" title="About" className={`twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-400 dark:hover:twgtr-text-theme-color-2`}>
                                                About
                                            </NavLink>
                                        </li>
                                        <li className="twgtr-pb-1">
                                            <NavLink to="/contact" title="Contact" className={`twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-400 dark:hover:twgtr-text-theme-color-2`}>
                                                Contact
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/faqs" title="FAQs" className={`twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-400 dark:hover:twgtr-text-theme-color-2`}>
                                                FAQs
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="twgtr-py-1">
                            <div className="twgtr-py-2">
                                <div className="twgtr-py-2">
                                    <h4 className="twgtr-transition-all twgtr-font-semibold twgtr-text-theme-color-4 twgtr-text-[18px] md:twgtr-text-[20px]">
                                        Company Address
                                    </h4>
                                </div>
                                <div>
                                    <h5 className="twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium dark:twgtr-text-slate-400">
                                        515 Post Oak Blvd, Ste 200, Houston, TX 77027
                                    </h5>
                                </div>
                            </div>
                            <div>
                                <div className="twgtr-py-2">
                                    <h4 className="twgtr-transition-all twgtr-font-semibold twgtr-text-theme-color-4 twgtr-text-[18px] md:twgtr-text-[20px]">
                                        Change Theme
                                    </h4>
                                </div>
                                <div>
                                    <ThemeModeSwitchFooter />
                                </div>
                            </div>
                        </div>
                        <div className="twgtr-py-1 md:twgtr-col-span-2 lg:twgtr-col-auto">
                            <div className="twgtr-py-2">
                                <div className="twgtr-py-2">
                                    <h4 className="twgtr-transition-all twgtr-font-semibold twgtr-text-theme-color-4 twgtr-text-[18px] md:twgtr-text-[20px]">
                                        Social Media
                                    </h4>
                                </div>
                                <div>
                                    <ul className="twgtr-flex twgtr-flex-wrap twgtr-items-center twgtr-gap-x-4 twgtr-gap-y-2">
                                        <li>
                                            <NavLink to="https://www.facebook.com/" title="Follow us on Facebook" className="twgtr-transition-all twgtr-w-[35px] twgtr-h-[35px] twgtr-bg-slate-200 twgtr-rounded-full twgtr-flex twgtr-justify-center twgtr-items-center twgtr-text-slate-700 hover:twgtr-bg-theme-color-4 hover:twgtr-text-slate-200 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                                <FaFacebook size={16} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="https://twitter.com/?lang=en" title="Follow us on Twitter" className="twgtr-transition-all twgtr-w-[35px] twgtr-h-[35px] twgtr-bg-slate-200 twgtr-rounded-full twgtr-flex twgtr-justify-center twgtr-items-center twgtr-text-slate-700 hover:twgtr-bg-theme-color-4 hover:twgtr-text-slate-200 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                                <FaXTwitter size={18} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="https://www.whatsapp.com/" title="Chat on WhatsApp" className="twgtr-transition-all twgtr-w-[35px] twgtr-h-[35px] twgtr-bg-slate-200 twgtr-rounded-full twgtr-flex twgtr-justify-center twgtr-items-center twgtr-text-slate-700 hover:twgtr-bg-theme-color-4 hover:twgtr-text-slate-200 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                                <FaWhatsapp size={18} />
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="https://www.instagram.com/" title="Follow us on WhatsApp" className="twgtr-transition-all twgtr-w-[35px] twgtr-h-[35px] twgtr-bg-slate-200 twgtr-rounded-full twgtr-flex twgtr-justify-center twgtr-items-center twgtr-text-slate-700 hover:twgtr-bg-theme-color-4 hover:twgtr-text-slate-200 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-theme-color-4 dark:hover:twgtr-text-slate-200">
                                                <FaInstagram size={18} />
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="twgtr-py-2">
                                    <h4 className="twgtr-transition-all twgtr-font-semibold twgtr-text-theme-color-4 twgtr-text-[18px] md:twgtr-text-[20px]">
                                        Legal
                                    </h4>
                                </div>
                                <div>
                                    <ul>
                                        <li className="twgtr-pb-1">
                                            <NavLink to="/terms" title="Terms & Services" className={`twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-400 dark:hover:twgtr-text-theme-color-2`}>
                                                Terms & Services
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/privacy" title="Privacy Policy" className={`twgtr-transition-all twgtr-text-theme-color-1 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-medium hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-400 dark:hover:twgtr-text-theme-color-2`}>
                                                Privacy Policy
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="twgtr-transition-all twgtr-bg-white twgtr-border-t twgtr-border-solid twgtr-px-4 twgtr-py-3 twgtr-border-slate-300 dark:twgtr-bg-slate-900 dark:twgtr-border-slate-600">
                <div className="site-container">
                    <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-slate-800 twgtr-font-normal twgtr-text-[14px] dark:twgtr-text-slate-400">
                        &copy; {new Date().getFullYear()} All Rights Reserved.
                    </h6>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter;