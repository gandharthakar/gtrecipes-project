import { useState } from "react";
import FAQAccordion from "../../components/website/FAQAccordion";
import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";
import { NavLink } from "react-router-dom";

const FAQs = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const handleItemClick = (index:any) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<>
			<SiteBreadcrumb page_name="FAQs" />
			<div className="twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
				<div className="site-container">
					<div className="twgtr-max-w-[1124px] twgtr-mx-auto">
						<div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
							<h2 className="twgtr-transition-all twgtr-font-open_sans twgtr-text-[22px] md:twgtr-text-[30px] twgtr-text-theme-color-1 twgtr-font-bold dark:twgtr-text-slate-200">
								General FAQs
							</h2>
							<div className="twgtr-pb-2">
								<p className="twgtr-transition-all twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
									For More Queries, Please <NavLink to="/contact" className="twgtr-transition-all twgtr-font-bold hover:twgtr-text-theme-color-4">Contact</NavLink> Us.
								</p>
							</div>
							<div>
								<FAQAccordion 
									ques_text="This is question number 1"
									show_icon="true"
									is_open={activeIndex === 1}
									onClick={() => handleItemClick(1)}
								>
									<div className="terms-privacy-content twgtr-py-4">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem, rerum ratione ducimus temporibus quos maxime inventore saepe exercitationem quasi. Quasi, soluta exercitationem nisi dolore veniam unde iure ratione voluptate!
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, hic fugit molestiae animi dignissimos minima soluta accusamus eligendi architecto, suscipit, consequuntur nostrum! Minima, laudantium nisi hic eaque quos laboriosam assumenda autem labore animi earum sequi quo, molestiae numquam? Suscipit maiores, quod facilis saepe esse magnam deleniti distinctio earum officia?
										</p>
									</div>
								</FAQAccordion>
								<FAQAccordion 
									ques_text="This is question number 2"
									show_icon="true"
									is_open={activeIndex === 2}
									onClick={() => handleItemClick(2)}
								>
									<div className="terms-privacy-content twgtr-py-4">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem, rerum ratione ducimus temporibus quos maxime inventore saepe exercitationem quasi. Quasi, soluta exercitationem nisi dolore veniam unde iure ratione voluptate!
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, hic fugit molestiae animi dignissimos minima soluta accusamus eligendi architecto, suscipit, consequuntur nostrum! Minima, laudantium nisi hic eaque quos laboriosam assumenda autem labore animi earum sequi quo, molestiae numquam? Suscipit maiores, quod facilis saepe esse magnam deleniti distinctio earum officia?
										</p>
									</div>
								</FAQAccordion>
								<FAQAccordion 
									ques_text="This is question number 3"
									show_icon="true"
									is_open={activeIndex === 3}
									onClick={() => handleItemClick(3)}
								>
									<div className="terms-privacy-content twgtr-py-4">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem, rerum ratione ducimus temporibus quos maxime inventore saepe exercitationem quasi. Quasi, soluta exercitationem nisi dolore veniam unde iure ratione voluptate!
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, hic fugit molestiae animi dignissimos minima soluta accusamus eligendi architecto, suscipit, consequuntur nostrum! Minima, laudantium nisi hic eaque quos laboriosam assumenda autem labore animi earum sequi quo, molestiae numquam? Suscipit maiores, quod facilis saepe esse magnam deleniti distinctio earum officia?
										</p>
									</div>
								</FAQAccordion>
								<FAQAccordion 
									ques_text="This is question number 4"
									show_icon="true"
									is_open={activeIndex === 4}
									onClick={() => handleItemClick(4)}
								>
									<div className="terms-privacy-content twgtr-py-4">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem, rerum ratione ducimus temporibus quos maxime inventore saepe exercitationem quasi. Quasi, soluta exercitationem nisi dolore veniam unde iure ratione voluptate!
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, hic fugit molestiae animi dignissimos minima soluta accusamus eligendi architecto, suscipit, consequuntur nostrum! Minima, laudantium nisi hic eaque quos laboriosam assumenda autem labore animi earum sequi quo, molestiae numquam? Suscipit maiores, quod facilis saepe esse magnam deleniti distinctio earum officia?
										</p>
									</div>
								</FAQAccordion>
								<FAQAccordion 
									ques_text="This is question number 5"
									show_icon="true"
									is_open={activeIndex === 5}
									onClick={() => handleItemClick(5)}
								>
									<div className="terms-privacy-content twgtr-py-4">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem, rerum ratione ducimus temporibus quos maxime inventore saepe exercitationem quasi. Quasi, soluta exercitationem nisi dolore veniam unde iure ratione voluptate!
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, hic fugit molestiae animi dignissimos minima soluta accusamus eligendi architecto, suscipit, consequuntur nostrum! Minima, laudantium nisi hic eaque quos laboriosam assumenda autem labore animi earum sequi quo, molestiae numquam? Suscipit maiores, quod facilis saepe esse magnam deleniti distinctio earum officia?
										</p>
									</div>
								</FAQAccordion>
								<FAQAccordion 
									ques_text="This is question number 6"
									show_icon="true"
									is_open={activeIndex === 6}
									onClick={() => handleItemClick(6)}
								>
									<div className="terms-privacy-content twgtr-py-4">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem, rerum ratione ducimus temporibus quos maxime inventore saepe exercitationem quasi. Quasi, soluta exercitationem nisi dolore veniam unde iure ratione voluptate!
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, hic fugit molestiae animi dignissimos minima soluta accusamus eligendi architecto, suscipit, consequuntur nostrum! Minima, laudantium nisi hic eaque quos laboriosam assumenda autem labore animi earum sequi quo, molestiae numquam? Suscipit maiores, quod facilis saepe esse magnam deleniti distinctio earum officia?
										</p>
									</div>
								</FAQAccordion>
								<FAQAccordion 
									ques_text="This is question number 7"
									show_icon="true"
									is_open={activeIndex === 7}
									onClick={() => handleItemClick(7)}
								>
									<div className="terms-privacy-content twgtr-py-4">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem, rerum ratione ducimus temporibus quos maxime inventore saepe exercitationem quasi. Quasi, soluta exercitationem nisi dolore veniam unde iure ratione voluptate!
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, hic fugit molestiae animi dignissimos minima soluta accusamus eligendi architecto, suscipit, consequuntur nostrum! Minima, laudantium nisi hic eaque quos laboriosam assumenda autem labore animi earum sequi quo, molestiae numquam? Suscipit maiores, quod facilis saepe esse magnam deleniti distinctio earum officia?
										</p>
									</div>
								</FAQAccordion>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default FAQs;