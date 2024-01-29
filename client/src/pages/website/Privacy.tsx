import SideBarLeftLinks from "../../components/website/SideBarLeftLinks";
import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";
import SiteConstants from "../../constants/SiteConstants";

const Privacy = () => {
	return (
		<>
			<SiteBreadcrumb page_name="Privacy" page_title="Privacy Policy" />
			<div className="twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
				<div className="site-container">
					<div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-4">
						<div className="twgtr-min-w-0 lg:twgtr-min-w-[250px] 2xl:twgtr-min-w-[300px]">
							<div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
								<div className="twgtr-pb-1 md:twgtr-pb-3">
									<h2 className="twgtr-transition-all twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-ubuntu twgtr-font-medium twgtr-text-theme-color-4">
										Legal
									</h2>
								</div>
								<SideBarLeftLinks nav_links_data={SiteConstants[0].legal} />
							</div>
						</div>

						<div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
							<h2 className="twgtr-transition-all twgtr-pb-2 twgtr-font-open_sans twgtr-text-[22px] md:twgtr-text-[30px] twgtr-text-theme-color-1 twgtr-font-bold dark:twgtr-text-slate-200">
								Privacy Policy
							</h2>
							<div className="terms-privacy-content">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tempore quam quisquam laboriosam ea, totam sapiente asperiores facilis dicta repellat voluptates, natus magni placeat aspernatur labore at ex nisi soluta! Aut animi dolore, facilis quos quod enim repellendus beatae omnis maxime iure aspernatur nisi! Ex veritatis porro facilis repellendus nam?
								</p>
								<p>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos ab doloremque corporis soluta itaque, omnis quo, ex ducimus facilis deserunt dignissimos voluptas nam? Error et totam laborum. Corporis, dicta cumque.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, quae!
								</p>
								<ul>
									<li>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus alias voluptates similique ullam tenetur hic quos! Et inventore reprehenderit quae.
									</li>
									<li>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus odio ea rerum, vitae quasi repellendus?
									</li>
									<li>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat voluptatibus animi aliquam odit nisi aspernatur quos?
									</li>
									<li>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
									</li>
									<li>
										Lorem ipsum dolor sit amet.
									</li>
								</ul>
								<h4>Sub Heading 1</h4>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione maxime temporibus explicabo nobis nam ab perspiciatis quasi voluptate, soluta fuga dolorem impedit eaque aliquam dolores assumenda neque, animi rem suscipit! Quis, dolorem beatae ipsam quibusdam corporis placeat eius, libero reprehenderit facilis accusantium voluptas hic nihil quo voluptatum est consectetur aut quod saepe, ad eos maxime error! Quam natus et sint architecto odio dicta laborum esse provident magni quidem. Excepturi placeat aliquam quae velit praesentium officiis. Molestiae odio deleniti quam accusantium incidunt aperiam ad dolorem iste ut perferendis inventore ratione amet fugit quas libero, eos repellendus facilis error nihil nostrum numquam.
								</p>
								<h4>Sub Heading 2</h4>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione maxime temporibus explicabo nobis nam ab perspiciatis quasi voluptate, soluta fuga dolorem impedit eaque aliquam dolores assumenda neque, animi rem suscipit! Quis, dolorem beatae ipsam quibusdam corporis placeat eius, libero reprehenderit facilis accusantium voluptas hic nihil quo voluptatum est consectetur aut quod saepe, ad eos maxime error! Quam natus et sint architecto odio dicta laborum esse provident magni quidem. Excepturi placeat aliquam quae velit praesentium officiis. Molestiae odio deleniti quam accusantium incidunt aperiam ad dolorem iste ut perferendis inventore ratione amet fugit quas libero, eos repellendus facilis error nihil nostrum numquam.
								</p>
								<p>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut dolores doloribus labore, laudantium repudiandae nostrum perferendis illum omnis sit ratione unde expedita, minus ullam. Atque, dolorum, omnis minima, exercitationem adipisci eveniet provident dolore asperiores consequatur minus nostrum velit earum praesentium explicabo eligendi reprehenderit vitae dolores similique sed eum iusto et!
								</p>
								<h4>Sub Heading 3</h4>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis repudiandae aperiam ad accusamus, cupiditate molestiae aliquid sed expedita consequuntur. Ratione, fugiat recusandae aspernatur placeat repellendus, sapiente tenetur magnam repellat sint totam voluptate rem non exercitationem consequatur, obcaecati quas soluta fuga odit cumque. Et laboriosam amet, architecto quia praesentium ad temporibus obcaecati in tenetur esse distinctio aut quasi corporis odit deserunt expedita dolorum quos libero placeat, ex commodi, possimus debitis? Distinctio voluptatum consequuntur perferendis, suscipit ab saepe dolores nam quae sequi voluptates minus unde exercitationem doloremque pariatur officia rem accusamus eveniet repellat! Aut, quae officia. Ipsa dicta, voluptates soluta velit in iure quibusdam rem enim obcaecati laborum sequi non aperiam, similique odit voluptas ad quae! Quos perferendis animi ipsa id deserunt.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Privacy;