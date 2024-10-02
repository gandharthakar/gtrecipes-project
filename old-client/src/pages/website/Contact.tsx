import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";

function Contact() {
	
	return (
		<>
			<SiteBreadcrumb page_name="Contact" page_title="Contact Us" />

			<div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-min-h-0 lg:twgtr-min-h-[680px] twgtr-py-10 twgtr-px-4 twgtr-flex twgtr-items-center twgtr-justify-center dark:twgtr-bg-slate-800">
				<div className="site-container">
					<div className="twgtr-transition-all twgtr-border twgtr-bg-white twgtr-border-slate-300 twgtr-relative twgtr-grid twgtr-grid-cols-1 lg:twgtr-grid-cols-contact-tablet 2xl:twgtr-grid-cols-contact-desktop dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
						<div className="twgtr-p-5 lg:twgtr-p-10">
							<div className="twgtr-pb-16">
								<div className="twgtr-flex twgtr-items-start twgtr-gap-x-4">
									<MdAlternateEmail size={25} className="twgtr-transition-all twgtr-text-slate-800 dark:twgtr-text-slate-200" />
									<div className="twgtr-font-ubuntu">
										<h2 className="twgtr-transition-all twgtr-text-slate-800 twgtr-text-sm twgtr-font-medium dark:twgtr-text-slate-200">
											Email
										</h2>
										<h3 className="twgtr-transition-all twgtr-text-theme-color-2 twgtr-font-semibold twgtr-text-lg twgtr-break-all dark:twgtr-text-theme-color-3">
											contact@gtrecipes.com <br />
											support_all@gtrecipes.com
										</h3>
									</div>
								</div>
							</div>
							<div className="twgtr-pb-16">
								<div className="twgtr-flex twgtr-items-start twgtr-gap-x-4">
									<MdOutlineLocalPhone size={25} className="twgtr-transition-all twgtr-text-slate-800 dark:twgtr-text-slate-200" />
									<div className="twgtr-font-ubuntu">
										<h2 className="twgtr-transition-all twgtr-text-slate-800 twgtr-text-sm twgtr-font-medium dark:twgtr-text-slate-200">
											Phone
										</h2>
										<h3 className="twgtr-transition-all twgtr-text-theme-color-2 twgtr-font-semibold twgtr-text-lg dark:twgtr-text-theme-color-3">
											+91 1234567890 <br />
											+91 0987654321
										</h3>
									</div>
								</div>
							</div>
							<div className="">
								<div className="twgtr-flex twgtr-items-start twgtr-gap-x-4">
									<IoLocationOutline size={25} className="twgtr-transition-all twgtr-text-slate-800 dark:twgtr-text-slate-200" />
									<div className="twgtr-font-ubuntu">
										<h2 className="twgtr-transition-all twgtr-text-slate-800 twgtr-text-sm twgtr-font-medium dark:twgtr-text-slate-200">
											Location
										</h2>
										<h3 className="twgtr-transition-all twgtr-text-theme-color-2 twgtr-font-semibold twgtr-text-lg dark:twgtr-text-theme-color-3">
											515 Post Oak Blvd, Ste 200, Houston, TX 77027
										</h3>
									</div>
								</div>
							</div>
						</div>
						<div className="twgtr-bg-slate-200 twgtr-relative">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24473683.782665476!2d21.22783609193349!3d41.51488730081444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471643da928b97cf%3A0xe83d9f17ae8b28dd!2sTaxus%20Centrum%20Ogrodnicze!5e0!3m2!1sen!2sin!4v1705908527279!5m2!1sen!2sin" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="lg:twgtr-absolute lg:twgtr-z-10 lg:twgtr-left-0 lg:twgtr-top-0 twgtr-border-0 twgtr-w-full twgtr-h-[300px] lg:twgtr-h-full"></iframe>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Contact;