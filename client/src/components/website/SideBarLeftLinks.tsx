import { NavLink } from "react-router-dom";

const SideBarLeftLinks = (props: any) => {
	const { nav_links_data } = props;
	return (
		<>
			<ul className="ssdl-nav twgtr-flex twgtr-flex-row lg:twgtr-flex-col twgtr-gap-x-8 twgtr-flex-nowrap twgtr-overflow-x-auto">
				{
					nav_links_data.map((item:any) => (
						<li className="twgtr-flex-none last:twgtr-pb-0 lg:twgtr-pb-2" key={item.id}>
							<NavLink to={item.page_slug} title={item.page_name} className="twgtr-transition-all twgtr-inline-block twgtr-font-ubuntu twgtr-text-[16px] md:twgtr-text-[18px] twgtr-py-1 lg:twgtr-pl-3 twgtr-text-slate-800 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-4 twgtr-relative">
								{item.page_name}
							</NavLink>
						</li>
					))
				}
			</ul>
		</>
	)
}

export default SideBarLeftLinks;