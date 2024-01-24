import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { TfiAngleRight } from "react-icons/tfi";

const SiteBreadcrumb= (props:any) => {
    const { page_name, rest_pages } = props;
    return (
        <>
            <div className="twgtr-transition-all twgtr-py-6 lg:twgtr-py-12 twgtr-px-4 dark:twgtr-bg-slate-700">
                <div className="twgtr-max-w-[1440px] twgtr-mx-auto twgtr-w-full">
                    <h1 className="twgtr-transition-all twgtr-text-[20px] lg:twgtr-text-[35px] twgtr-font-open_sans twgtr-text-theme-color-1 twgtr-font-medium dark:twgtr-text-slate-200">
                        {page_name}
                    </h1>
                    <ul className="twgtr-flex twgtr-flex-wrap twgtr-items-center twgtr-font-ubuntu">
                        <li className="twgtr-pr-2">
                            <NavLink to="/" className="twgtr-py-0">
                                <IoHome size={20} className="twgtr-transition-all twgtr-text-slate-800 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4" />
                            </NavLink>
                        </li>
                        <li className="twgtr-px-2">
                            <TfiAngleRight size={20} className="twgtr-text-slate-800 dark:twgtr-text-slate-200" />
                        </li>
                        {
                            rest_pages ? (
                                rest_pages?.map((item:any) => {
                                    return (
                                        <>
                                            <li key={item.id}>
                                                <NavLink to={item.page_slug} title={item.page_name} className="twgtr-transition-all twgtr-text-sm lg:twgtr-text-lg twgtr-px-2 twgtr-py-1 twgtr-rounded-md hover:twgtr-bg-theme-color-3 hover:twgtr-shadow-md dark:twgtr-text-slate-200 dark:hover:twgtr-bg-theme-color-2">
                                                    {item.page_name}
                                                </NavLink>
                                            </li>
                                            <li className="twgtr-px-2">
                                                <TfiAngleRight size={20} className="twgtr-text-slate-800 dark:twgtr-text-slate-200" />
                                            </li>
                                        </>
                                    )
                                })
                            ) 
                            : 
                            ('')
                        }
                        <li className="twgtr-text-sm lg:twgtr-text-lg twgtr-px-2 twgtr-py-1 twgtr-font-bold twgtr-text-slate-800 dark:twgtr-text-slate-200">
                            {page_name}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SiteBreadcrumb;