import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { TfiAngleRight } from "react-icons/tfi";

type NavLink = {
	id: number,
	page_name: string,
	page_slug: string
}

interface CompProp {
    page_name: string,
    page_title: string,
    home_uri?: string,
    rest_pages?: NavLink[]
}

const SiteBreadcrumb= (props: CompProp) => {
    const { page_name, page_title, home_uri, rest_pages } = props;
    return (
        <>
            <div className="twgtr-transition-all twgtr-py-6 lg:twgtr-py-12 twgtr-px-4 dark:twgtr-bg-slate-700">
                <div className="twgtr-max-w-[1440px] twgtr-mx-auto twgtr-w-full">
                    <h1 className="twgtr-transition-all twgtr-text-[20px] lg:twgtr-text-[35px] twgtr-font-open_sans twgtr-text-theme-color-2 twgtr-font-medium dark:twgtr-text-slate-200">
                        {page_title}
                    </h1>
                    <ul className="twgtr-flex twgtr-flex-wrap twgtr-items-center twgtr-font-ubuntu">
                        <li className="twgtr-pr-2">
                            <NavLink to={home_uri ? home_uri : '/'} className="twgtr-py-0">
                                <IoHome size={20} className="twgtr-transition-all twgtr-text-slate-800 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4 twgtr-w-[16px] twgtr-h-[16px] md:twgtr-w-[20px] md:twgtr-h-[20px]" />
                            </NavLink>
                        </li>
                        <li className="twgtr-px-2">
                            <TfiAngleRight size={20} className="twgtr-text-slate-800 dark:twgtr-text-slate-200 twgtr-w-[16px] twgtr-h-[16px] md:twgtr-w-[20px] md:twgtr-h-[20px]" />
                        </li>
                        {
                            rest_pages ? (
                                rest_pages?.map((item:any) => {
                                    return (
                                        <div key={item.id} className="twgtr-flex twgtr-flex-wrap twgtr-items-center">
                                            <li>
                                                <NavLink to={item.page_slug} title={item.page_name} className="twgtr-transition-all twgtr-text-sm lg:twgtr-text-lg twgtr-px-2 twgtr-py-1 twgtr-rounded-md hover:twgtr-bg-theme-color-3 hover:twgtr-shadow-md dark:twgtr-text-slate-200 dark:hover:twgtr-bg-theme-color-2">
                                                    {item.page_name}
                                                </NavLink>
                                            </li>
                                            <li className="twgtr-px-2">
                                                <TfiAngleRight size={20} className="twgtr-text-slate-800 dark:twgtr-text-slate-200 twgtr-w-[16px] twgtr-h-[16px] md:twgtr-w-[20px] md:twgtr-h-[20px]" />
                                            </li>
                                        </div>
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