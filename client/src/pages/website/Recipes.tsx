import RecipeCard from "../../components/website/RecipeCard";
import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";
import { RiSearchLine } from "react-icons/ri";
import SiteConstants from "../../constants/SiteConstants";

const Recipes = () => {
	return (
		<>
			<SiteBreadcrumb page_name="Recipes" page_title="All Recipes" />
			<div className="twgtr-bg-slate-100 twgtr-px-4 dark:twgtr-bg-slate-800">
				<div className="site-container">
					{/* Search */}
					<div className="twgtr-py-[50px]">
						<div className="md:twgtr-max-w-[300px]">
							<form>
								<div className="twgtr-relative">
									<input 
										type="text" 
                                        id="unmfrm"
										className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-3 twgtr-pr-[35px] md:twgtr-pr-[45px] twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Search..." 
										autoComplete="off"
									/>
									<div className="twgtr-absolute twgtr-right-[10px] twgtr-top-[12px] md:twgtr-right-[15px] md:twgtr-top-[11px] twgtr-z-[5]">
										<button type="button" title="Search">
											<RiSearchLine size={20} className="twgtr-transition-all twgtr-w-[18px] twgtr-h-[18px] md:twgtr-w-[20px] md:twgtr-h-[20px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200" />
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>

					<div className="twgtr-pb-[50px]">
						<div className="twgtr-grid twgtr-grid-cols-1 md:twgtr-grid-cols-2 lg:twgtr-grid-cols-3 twgtr-gap-[20px]">
							<RecipeCard 
								recipe_id={"65df1b8d777171770af5703d"} 
								recipe_featured_image="/images/food-dummy.jpg" 
								categories={SiteConstants[0].static_cats} 
								recipe_title="This is title for this recipe box"
								recipe_summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente illum nisi mollitia recusandae ipsum "
								recipe_author_name="Gandhar Thakar" 
								recipe_author_id="65dedf807cc4e88439bcf216" 
								actions={false}
							/>
							<RecipeCard 
								recipe_id={"2"} 
								recipe_featured_image="/images/food-dummy.jpg" 
								categories={SiteConstants[0].static_cats} 
								recipe_title="This is title for this recipe box This is title for this recipe box"
								recipe_summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente illum nisi mollitia recusandae ipsum"
								recipe_author_id="65dfff52f69c34fbc23b49b3" 
								recipe_author_name="Author Name"
								actions={false}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Recipes;