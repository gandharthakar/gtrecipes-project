import { CgBowl } from "react-icons/cg";
import parse from 'html-react-parser';

interface IngType {
    id: number,
    ingredient_item: string
}

interface CompProp {
    recipe_title: string,
    recipe_type: string,
    recipe_summary: string,
    recipe_content: string,
    recipe_serving: string,
    recipe_prep_time: string,
    recipe_cook_time: string,
    recipe_total_time: string,
    recipe_featured_image: string,
    recipe_ingredients: IngType[]
}

const RecipeToPrint = (props: CompProp) => {
    const {
        recipe_title,
        recipe_type = "veg",
        recipe_summary,
        recipe_content,
        recipe_serving,
        recipe_prep_time,
        recipe_cook_time,
        recipe_total_time,
        recipe_featured_image,
        recipe_ingredients
    } = props;
    const defaultFeImgPath = 'https://placehold.co/1200x600?text=Featured+Image.';
    const fallBackFeImg = 'images/default-feimg.svg';

    return (
        <>
            <div className="twgtr-p-[0px]">
                <div className="twgtr-flex twgtr-justify-between twgtr-items-center gap-x-[20px] twgtr-bg-slate-200 twgtr-text-center twgtr-p-[20px]">
                    <img src="/logo.svg" width={180} alt="logo" className="twgtr-inline-block twgtr-w-[180px]" />
                    <div>
                        {
                            recipe_type == "veg" ?
                                (
                                    <img src="/veg-icon.svg" width="30px" height="30px" alt="Recipe Type" />
                                )
                                :
                                (
                                    <img src="/nonveg-icon.svg" width="30px" height="30px" alt="Recipe Type" />
                                )
                        }
                    </div>
                </div>
                <div className="twgtr-pt-[15px] twgtr-pb-[20px]">
                    {/* <div className="twgtr-pb-[5px]">
                        {
                            recipe_type == "veg" ?
                                (
                                    <img src="/veg-icon.svg" width="30px" height="30px" alt="Recipe Type" />
                                )
                                :
                                (
                                    <img src="/nonveg-icon.svg" width="30px" height="30px" alt="Recipe Type" />
                                )
                        }
                    </div> */}
                    <h1 className="twgtr-font-ubuntu twgtr-text-slate-700 twgtr-text-[26px] twgtr-font-bold">
                        {recipe_title}
                    </h1>
                    <p className="twgtr-font-open_sans twgtr-text-slate-500 twgtr-text-[16px]">
                        {recipe_summary}
                    </p>
                </div>
                <div className="twgtr-pb-[20px]">
                    <div className="twgtr-grid twgtr-grid-cols-2 twgtr-gap-[20px]">
                        <div className="twgtr-p-[15px] twgtr-bg-slate-200">
                            <h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                Makes (Servings)
                            </h2>
                            <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                {recipe_serving}
                            </h6>
                        </div>
                        <div className="twgtr-p-[15px] twgtr-bg-slate-200">
                            <h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                Prep Time
                            </h2>
                            <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                {recipe_prep_time}
                            </h6>
                        </div>
                        <div className="twgtr-p-[15px] twgtr-bg-slate-200">
                            <h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                Cook Time
                            </h2>
                            <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                {recipe_cook_time}
                            </h6>
                        </div>
                        <div className="twgtr-p-[15px] twgtr-bg-slate-200">
                            <h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                Total Time
                            </h2>
                            <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                {recipe_total_time}
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="twgtr-pb-[20px] twgtr-text-center">
                    <img src={recipe_featured_image == 'default' ? defaultFeImgPath : recipe_featured_image} className="twgtr-inline-block twgtr-w-auto twgtr-max-h-[400px]" alt="photo" onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = fallBackFeImg;
                    }} />
                </div>
                <div className="twgtr-pb-[20px]">
                    <div className="twgtr-p-[20px] twgtr-bg-slate-100">
                        <div className="twgtr-transition-all twgtr-flex twgtr-items-center twgtr-gap-x-[10px] twgtr-font-open_sans twgtr-text-[20px] twgtr-font-semibold twgtr-text-theme-color-1">
                            <CgBowl size={26} className="twgtr-transition-all twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[26px] md:twgtr-h-[26px]" />
                            <div>Ingredients</div>
                        </div>
                        <div className="twgtr-pt-[10px]">
                            {
                                recipe_ingredients.length > 0 ?
                                    (
                                        <ul className="twgtr-list-disc twgtr-font-open_sans twgtr-pl-[25px]">
                                            {
                                                recipe_ingredients.map((item: IngType) => (
                                                    <li key={item.id} className="twgtr-transition-all last:twgtr-mb-0 twgtr-mb-2 twgtr-font-open_sans twgtr-text-[16px] twgtr-text-slate-700">
                                                        {item.ingredient_item}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                                    :
                                    (
                                        <div className="twgtr-text-left">
                                            <h6>
                                                No Ingradients Available.
                                            </h6>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className="twgtr-pb-[0px]">
                    <div className="recipe-content-print">
                        {recipe_content == '' ? (<h6>No Content Added By Author.</h6>) : (parse(recipe_content))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeToPrint;