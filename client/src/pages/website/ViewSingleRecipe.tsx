import { NavLink } from "react-router-dom";
import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";
import SiteConstants from "../../constants/SiteConstants";
import { CgBowl } from "react-icons/cg";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux-service/ReduxStore";
import { useSelector } from "react-redux";
// import { useState } from "react";
import RecipeCard from "../../components/website/RecipeCard";

const ViewSingleRecipe = () => {
    let { id } = useParams();
    const rp = [
        {
            id: 1,
            page_name: "All Recipes",
            page_slug: "/recipes"
        },
    ];
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    let share_uri = window.location.origin + "/view-recipe/" + id;
    // const [recipeTitle, setRecipeTitle] = useState('This is title for this recipe box This is title for this recipe box');
    let recipeTitle = 'This is title for this recipe box This is title for this recipe box';

    const copyURI = () => {
        const toastDefOpts = {
            autoClose: 3000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        };
        copy(share_uri);
        toast.success("Link coped!", toastDefOpts);
    }
    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name={recipeTitle} rest_pages={rp} page_title="Single Recipe" />
            <article>
                <div className="twgtr-bg-white srh-main twgtr-py-[30px] md:twgtr-py-[50px] twgtr-border-t twgtr-border-solid twgtr-border-slate-300 twgtr-px-4 dark:twgtr-bg-slate-800 dark:twgtr-border-slate-600">
                    <div className="site-container">
                        <div className="twgtr-pb-2">
                            <ul className="twgtr-flex twgtr-items-center twgtr-justify-center twgtr-flex-wrap twgtr-gap-x-[10px] twgtr-gap-y-[2px]">
                            {
                                SiteConstants[0].static_cats.map((item) => (
                                    <div key={item.id} className="twgtr-flex twgtr-flex-wrap twgtr-gap-x-[10px] twgtr-items-center rpcat-box">
                                        <li className="twgtr-transition-all twgtr-inline-block twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-1 dark:twgtr-text-slate-300">
                                            {item.recipe_category_name}
                                        </li>
                                        <li className="twgtr-transition-all twgtr-inline-block dot twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-1 dark:twgtr-text-slate-300">
                                            <div className="twgtr-transition-all twgtr-w-[3px] twgtr-h-[3px] twgtr-rounded-full twgtr-bg-theme-color-1 dark:twgtr-bg-theme-color-3"></div>
                                        </li>
                                    </div>
                                ))
                            }
                            </ul>
                        </div>
                        <div className="twgtr-pb-2 twgtr-text-center">
                            <h3 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[25px] md:twgtr-text-[30px] lg:twgtr-text-[40px] twgtr-font-bold twgtr-text-theme-color-2 dark:twgtr-text-theme-color-3">
                                {recipeTitle}
                            </h3>
                        </div>
                        <div className="twgtr-pb-[30px] twgtr-text-center">
                            <h4 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-400">
                                Posted On - 03 Feb 2024, 14:22:00
                            </h4>
                            <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-400">
                                By - <span className="twgtr-text-theme-color-4 twgtr-font-semibold twgtr-underline">Author Name</span>
                            </h5>
                        </div>
                        <div className="twgtr-text-center">
                            <div className="twgtr-flex twgtr-flex-wrap twgtr-items-center twgtr-justify-center twgtr-gap-x-[15px] twgtr-gap-y-[5px]">
                                <div className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                    Share :
                                </div>
                                <div>
                                    <NavLink to={`https://api.whatsapp.com/send?text=${share_uri}`} title="Share on WhatsApp" target="_blank">
                                        <img src="/social-media/whatsapp.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="WhatsApp" />
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to={`https://www.facebook.com/sharer/sharer.php?u=${share_uri}`} title="Share on Facebook" target="_blank">
                                        <img src="/social-media/facebook.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="Facebook" />
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to={`https://twitter.com/intent/tweet?text=${recipeTitle}&url=${share_uri}`} title="Share on Twitter" target="_blank">
                                        <img src="/social-media/twitter-x.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="Twitter" />
                                    </NavLink>
                                </div>
                                <div>
                                    <button type="button" title="Copy Link" onClick={copyURI}>
                                        <svg width="100" height="100" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]">
                                            <g clipPath="url(#clip0_2009_9684)">
                                                <path fill="#284218" className="twgtr-transition-all twgtr-fill-slate-700 dark:twgtr-fill-slate-400" d="M5.83333 5.49984V2.99984C5.83333 2.77882 5.92113 2.56686 6.07741 2.41058C6.23369 2.2543 6.44565 2.1665 6.66667 2.1665H16.6667C16.8877 2.1665 17.0996 2.2543 17.2559 2.41058C17.4122 2.56686 17.5 2.77882 17.5 2.99984V14.6665C17.5 14.8875 17.4122 15.0995 17.2559 15.2558C17.0996 15.412 16.8877 15.4998 16.6667 15.4998H14.1667V17.9998C14.1667 18.4598 13.7917 18.8332 13.3275 18.8332H3.33917C3.22927 18.8338 3.12033 18.8128 3.0186 18.7712C2.91687 18.7296 2.82436 18.6684 2.74638 18.5909C2.6684 18.5135 2.60649 18.4214 2.56421 18.32C2.52193 18.2185 2.50011 18.1097 2.5 17.9998L2.5025 6.33317C2.5025 5.87317 2.8775 5.49984 3.34167 5.49984H5.83333ZM4.16917 7.1665L4.16667 17.1665H12.5V7.1665H4.16917ZM7.5 5.49984H14.1667V13.8332H15.8333V3.83317H7.5V5.49984Z"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2009_9684">
                                                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="twgtr-bg-slate-100 dark:twgtr-bg-slate-700">
				    <div className="twgtr-max-w-[1240px] twgtr-px-4 twgtr-mx-auto twgtr-w-full md:twgtr-px-[20px] twgtr-relative twgtr-z-[5]">
                        <div className="twgtr-pb-4 md:twgtr-pb-8">
                            <img src="/images/food-dummy.jpg" className="twgtr-w-full" alt="featured image" />
                        </div>

                        <div className="twgtr-flex twgtr-gap-[20px] twgtr-flex-col lg:twgtr-flex-row twgtr-pb-[25px]">
                            <div className="twgtr-min-w-0 twgtr-w-full lg:twgtr-w-auto lg:twgtr-min-w-[280px]">
                                <div className="lg:twgtr-sticky lg:twgtr-top-[15px]">
                                    <div className="twgtr-transition-all twgtr-border twgtr-border-solid twgtr-border-slate-300 twgtr-w-full twgtr-p-[20px] twgtr-bg-white dark:twgtr-bg-slate-800 dark:twgtr-border-slate-600">
                                        <div className="twgtr-pb-4">
                                            <h3 className="twgtr-transition-all twgtr-flex twgtr-items-center twgtr-gap-x-[10px] twgtr-font-open_sans twgtr-text-[16px] md:twgtr-text-[20px] twgtr-font-semibold twgtr-text-theme-color-1 dark:twgtr-text-theme-color-3">
                                                <CgBowl size={26} className="twgtr-transition-all twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[26px] md:twgtr-h-[26px]" />
                                                <div>Ingredients</div>
                                            </h3>
                                        </div>
                                        <div>
                                            <ul className="twgtr-list-disc twgtr-font-open_sans twgtr-pl-[25px]">
                                                {
                                                    SiteConstants[0].static_ingredients.map((item:any) => (
                                                        <li key={item.id} className="twgtr-transition-all last:twgtr-mb-0 twgtr-mb-2 twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-300">
                                                            {item.ingredient_item}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-280px)] twgtr-border twgtr-border-solid twgtr-p-[20px] twgtr-bg-white dark:twgtr-bg-slate-800 dark:twgtr-border-slate-600">
                                <div className="recipe-content">
                                    <h1>This is H1</h1>
                                    <h2>This is H2</h2>
                                    <h3>This is H3</h3>
                                    <h4>This is H4</h4>
                                    <h5>This is H5</h5>
                                    <h6>This is H6</h6>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt asperiores et ad fugiat blanditiis reiciendis eveniet! Dolorum quidem expedita placeat eaque eligendi magni facilis ex repellat! At repellendus voluptate vitae laboriosam, exercitationem accusamus excepturi fugiat enim aut assumenda neque beatae id animi hic veniam eum blanditiis iusto? Esse fugiat nemo dolore atque, ab nesciunt delectus. Odit laudantium accusamus quod. Omnis a, recusandae sed pariatur maxime officiis, tempore veritatis delectus rerum incidunt eveniet exercitationem neque animi, repellat reprehenderit accusamus amet doloribus autem. In deleniti eaque aliquam dolores exercitationem tempora soluta vel rerum, necessitatibus ab impedit accusantium eligendi at? Vitae, nesciunt repellat.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt asperiores et ad fugiat blanditiis reiciendis eveniet! Dolorum quidem expedita placeat eaque eligendi magni facilis ex repellat! At repellendus voluptate vitae laboriosam, exercitationem accusamus excepturi fugiat enim aut assumenda neque beatae id animi hic veniam eum blanditiis iusto? Esse fugiat nemo dolore atque, ab nesciunt delectus. Odit laudantium accusamus quod. Omnis a, recusandae sed pariatur maxime officiis, tempore veritatis delectus rerum incidunt eveniet exercitationem neque animi, repellat reprehenderit accusamus amet doloribus autem. In deleniti eaque aliquam dolores exercitationem tempora soluta vel rerum, necessitatibus ab impedit accusantium eligendi at? Vitae, nesciunt repellat.
                                    </p>
                                    <ul>
                                        <li>This is some text here</li>
                                        <li>This is some text here</li>
                                        <li>This is some text here</li>
                                        <li>This is some text here</li>
                                        <li>This is some text here</li>
                                    </ul>
                                    <img src="/images/food-dummy.jpg" alt="photo" />
                                </div>
                                <div className="twgtr-pt-[30px]">
                                    <div className="twgtr-pt-[20px] twgtr-border-t twgtr-border-solid twgtr-border-slate-300">
                                        <div className="twgtr-text-center">
                                            <div className="twgtr-flex twgtr-flex-wrap twgtr-items-center twgtr-gap-x-[15px] twgtr-gap-y-[5px]">
                                                <div className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
                                                    Share :
                                                </div>
                                                <div>
                                                    <NavLink to={`https://api.whatsapp.com/send?text=${share_uri}`} title="Share on WhatsApp" target="_blank">
                                                        <img src="/social-media/whatsapp.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="WhatsApp" />
                                                    </NavLink>
                                                </div>
                                                <div>
                                                    <NavLink to={`https://www.facebook.com/sharer/sharer.php?u=${share_uri}`} title="Share on Facebook" target="_blank">
                                                        <img src="/social-media/facebook.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="Facebook" />
                                                    </NavLink>
                                                </div>
                                                <div>
                                                    <NavLink to={`https://twitter.com/intent/tweet?text=${recipeTitle}&url=${share_uri}`} title="Share on Twitter" target="_blank">
                                                        <img src="/social-media/twitter-x.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="Twitter" />
                                                    </NavLink>
                                                </div>
                                                <div>
                                                    <button type="button" title="Copy Link" onClick={copyURI}>
                                                        <svg width="100" height="100" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]">
                                                            <g clipPath="url(#clip0_2009_9684)">
                                                                <path fill="#284218" className="twgtr-transition-all twgtr-fill-slate-700 dark:twgtr-fill-slate-400" d="M5.83333 5.49984V2.99984C5.83333 2.77882 5.92113 2.56686 6.07741 2.41058C6.23369 2.2543 6.44565 2.1665 6.66667 2.1665H16.6667C16.8877 2.1665 17.0996 2.2543 17.2559 2.41058C17.4122 2.56686 17.5 2.77882 17.5 2.99984V14.6665C17.5 14.8875 17.4122 15.0995 17.2559 15.2558C17.0996 15.412 16.8877 15.4998 16.6667 15.4998H14.1667V17.9998C14.1667 18.4598 13.7917 18.8332 13.3275 18.8332H3.33917C3.22927 18.8338 3.12033 18.8128 3.0186 18.7712C2.91687 18.7296 2.82436 18.6684 2.74638 18.5909C2.6684 18.5135 2.60649 18.4214 2.56421 18.32C2.52193 18.2185 2.50011 18.1097 2.5 17.9998L2.5025 6.33317C2.5025 5.87317 2.8775 5.49984 3.34167 5.49984H5.83333ZM4.16917 7.1665L4.16667 17.1665H12.5V7.1665H4.16917ZM7.5 5.49984H14.1667V13.8332H15.8333V3.83317H7.5V5.49984Z"/>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_2009_9684">
                                                                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="twgtr-transition-all twgtr-px-4 twgtr-pt-[25px] twgtr-pb-[50px] twgtr-bg-slate-200 dark:twgtr-bg-slate-800">
                        <div className="twgtr-max-w-[1240px] twgtr-mx-auto twgtr-w-full md:twgtr-px-[20px] twgtr-relative twgtr-z-[5]">
                            <div className="twgtr-pb-[25px]">
                                <h4 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-bold twgtr-text-theme-color-1 dark:twgtr-text-theme-color-3">
                                    You May Also Like
                                </h4>
                            </div>

                            <div className="twgtr-grid twgtr-grid-cols-1 md:twgtr-grid-cols-2 lg:twgtr-grid-cols-3 twgtr-gap-[20px]">
                                <RecipeCard 
                                    recipe_id={"1"} 
                                    recipe_featured_image="/images/food-dummy.jpg" 
                                    categories={SiteConstants[0].static_cats} 
                                    recipe_title="Test Recipe 1"
                                    recipe_summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente illum nisi mollitia recusandae ipsum"
                                    recipe_author_name="Author Name"
                                    actions={false}
                                />
                                <RecipeCard 
                                    recipe_id={"2"} 
                                    recipe_featured_image="/images/food-dummy.jpg" 
                                    categories={SiteConstants[0].static_cats} 
                                    recipe_title="Test Recipe 2"
                                    recipe_summary=""
                                    recipe_author_name="Author Name"
                                    actions={false}
                                />
                                <RecipeCard 
                                    recipe_id={"3"} 
                                    recipe_featured_image="/images/food-dummy.jpg" 
                                    categories={SiteConstants[0].static_cats} 
                                    recipe_title="Test Recipe 3"
                                    recipe_summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                                    recipe_author_name="Author Name"
                                    actions={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
};

export default ViewSingleRecipe;