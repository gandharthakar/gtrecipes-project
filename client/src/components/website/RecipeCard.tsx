import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from "../../redux-service/ReduxStore";
import { useSelector } from "react-redux";
import axios from "axios";

const DELETE_RECIPE = gql`
    mutation deleteRecipe($id: ID!, $user_id: String!) {
        deleteRecipe(id: $id, user_id: $user_id) {
            message,
            success
        }
    }
`;

const RecipeCard = (props:any) => {
    let { recipe_id, rfeb_URI, recipe_featured_image, categories, recipe_title, recipe_summary, recipe_author_id, recipe_author_name, actions=false } = props;
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const defaultFeImgPath = 'https://placehold.co/600x400?text=Featured+Image.';
    
    const fallBackFeImg = 'images/default-feimg.svg';

    // Delete Recipe
    let [delRec] = useMutation(DELETE_RECIPE, {
        onCompleted: fdata => {
            // console.log(fdata);
            const toastDefOpts = {
                autoClose: 1000,
                closeOnClick: true,
                theme: `${ThemeMode ? 'dark' : 'light'}`
            };
            if(fdata.deleteRecipe.success) {
                toast.success(fdata.deleteRecipe.message, toastDefOpts);
                if(recipe_featured_image == 'default') {
                    let suctmr = setTimeout(function(){
                        window.location.reload();
                        clearTimeout(suctmr);
                    }, 1500);
                }
            } else {
                toast.error(fdata.deleteRecipe.message, toastDefOpts);
            }
        }
    })
    
    const handleDeleteRecipe = () => {
        let conf = confirm("Are you sure want to delete this recipe ?");
        if(conf) {
            if(recipe_featured_image !== 'default') {
                axios.post(`${import.meta.env.VITE_BACKEND_URI_BASE}/delete-uploads/recipe-featured-images`, {fileName: recipe_featured_image})
                .then((resp) => {
                    // console.log(resp);
                    if(resp.status === 200) {
                        delRec({
                            variables: {
                                id: recipe_id,
                                user_id: recipe_author_id
                            }
                        });
                        let suctmr = setTimeout(function(){
                            window.location.reload();
                            clearTimeout(suctmr);
                        }, 1500);
                    }
                }).catch(err => console.log(err));
            } else {
                delRec({
                    variables: {
                        id: recipe_id,
                        user_id: recipe_author_id
                    }
                });
            }
        }
    }

    return (
        <>
            <div className="twgtr-transition-all recipe-card twgtr-bg-white dark:twgtr-bg-slate-700">
                <ToastContainer />
                <div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%]">
                    <NavLink to={`/view-recipe/${recipe_id}`} title={recipe_title}>
                        <img src={recipe_featured_image == 'default' ? defaultFeImgPath : rfeb_URI ? rfeb_URI + '/' + recipe_featured_image : recipe_featured_image} className="twgtr-w-full" alt="photo" 
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src=fallBackFeImg;
                          }} />
                    </NavLink>
                    <div className="twgtr-hidden">{recipe_author_id}</div>
                    <div className="twgtr-w-full">
                        <div className="twgtr-pb-1 twgtr-pt-4 twgtr-px-[15px] md:twgtr-px-[20px] twgtr-hidden">
                            <ul className="twgtr-flex twgtr-items-center twgtr-flex-wrap twgtr-gap-x-[10px] twgtr-gap-y-[2px]">
                                {
                                    categories ? 
                                    (
                                        categories.map((item:any) => (
                                            <div key={item.id} className="twgtr-flex twgtr-flex-wrap twgtr-gap-x-[10px] twgtr-items-center rpcat-box">
                                                <li className="twgtr-transition-all twgtr-inline-block twgtr-font-open_sans twgtr-text-[10px] md:twgtr-text-[12px] twgtr-text-theme-color-1 dark:twgtr-text-theme-color-3">
                                                    {item.recipe_category_name}
                                                </li>
                                                <li className="twgtr-transition-all twgtr-inline-block dot twgtr-font-open_sans twgtr-text-[10px] md:twgtr-text-[12px] twgtr-text-theme-color-1 dark:twgtr-text-theme-color-3">
                                                    <div className="twgtr-transition-all twgtr-w-[3px] twgtr-h-[3px] twgtr-rounded-full twgtr-bg-theme-color-1 dark:twgtr-bg-theme-color-3"></div>
                                                </li>
                                            </div>
                                        ))
                                    ) 
                                    : 
                                    ('')
                                }
                            </ul>
                        </div>
                        <div className="twgtr-px-[15px] md:twgtr-px-[20px] twgtr-pt-3 twgtr-pb-1">
                            <NavLink to={`/view-recipe/${recipe_id}`} title={recipe_title} className="twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold">
                                <h5 className="twgtr-transition-all twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                    {recipe_title}
                                </h5>
                            </NavLink>
                        </div>
                        {
                            recipe_summary ? 
                            (
                                <div className="twgtr-px-[15px] md:twgtr-px-[20px] twgtr-pb-[35px]">
                                    <p className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-300">
                                        {recipe_summary}
                                    </p>
                                </div>
                            ) 
                            : 
                            ('')
                        }
                    </div>
                    <div className="twgtr-w-full twgtr-mt-auto">
                        <div className={`twgtr-px-[15px] twgtr-pt-2 ${actions ? '' : 'twgtr-pb-[15px]'}`}>
                            <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-uppercase twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-500 dark:twgtr-text-slate-400">
                                {recipe_author_name}
                            </h6>
                        </div>
                        {
                            actions ? (
                                <div className="twgtr-px-[15px] md:twgtr-px-[20px] twgtr-mt-[15px] twgtr-py-2 twgtr-border-t twgtr-border-solid twgtr-border-slate-400 dark:twgtr-border-slate-500">
                                    <div className="twgtr-flex twgtr-items-center twgtr-flex-wrap twgtr-gap-x-[20px] twgtr-gap-y-[3px]">
                                        <NavLink to={`/edit-recipe/${recipe_author_id}/${recipe_id}`} title="Edit Recipe" className="twgtr-transition-all twgtr-inline-block twgtr-font-ubuntu twgtr-text-[14px] twgtr-font-semibold twgtr-text-sky-600 dark:twgtr-text-sky-300">
                                            <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[5px]">
                                                <MdEdit size={20} className="twgtr-transition-all twgtr-w-[15px] twgtr-h-[15px] md:twgtr-w-[15px] md:twgtr-h-[15px]" />
                                                <div>Edit</div>
                                            </div>
                                        </NavLink>
                                        <button type="button" title="Delete Recipe" className="twgtr-transition-all twgtr-inline-block twgtr-font-ubuntu twgtr-text-[14px] twgtr-font-semibold twgtr-text-red-600 dark:twgtr-text-red-300" onClick={handleDeleteRecipe}>
                                            <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[5px]">
                                                <FaRegTrashAlt size={20} className="twgtr-transition-all twgtr-w-[15px] twgtr-h-[15px] md:twgtr-w-[15px] md:twgtr-h-[15px]" />
                                                <div>Delete</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ) 
                            : 
                            ('')
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default RecipeCard;