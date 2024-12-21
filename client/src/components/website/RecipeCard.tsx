import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from "../../redux-service/ReduxStore";
import { useSelector } from "react-redux";
// import axios from "axios";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const DELETE_RECIPE = gql`
    mutation deleteRecipe($id: ID!, $user_id: String!) {
        deleteRecipe(id: $id, user_id: $user_id) {
            message,
            success
        }
    }
`;

const SAVE_RECIPE_USER = gql`
    mutation saveRecipe($user_id: String!, $recipe_id: String!) {
        saveRecipe(user_id: $user_id, recipe_id: $recipe_id) {
            message,
            success
        }
    }
`;

const UNSAVE_RECIPE_USER = gql`
    mutation unsaveRecipe($user_id: String!, $recipe_id: String!) {
        unsaveRecipe(user_id: $user_id, recipe_id: $recipe_id) {
            message,
            success
        }
    }
`;

const GET_USER_FOR_SAVED_RECIPES = gql`
    query getUserByID($id: ID!) {
        getUserByID(id: $id) {
            saved_recipes {
                id
            }
        }
    }
`;

type Cats = {
    id: string,
    recipe_category_name: string
}

interface CompProp {
    recipe_id: string,
    rfeb_URI?: string,
    recipe_featured_image: string,
    categories?: Cats[],
    recipe_title: string,
    recipe_summary: string,
    recipe_author_id?: string,
    recipe_author_name: string,
    actions?: boolean,
    recipe_type?: string,
    page_reload_on_unsave?: boolean
}

const RecipeCard = (props: CompProp) => {
    const { recipe_id, rfeb_URI, recipe_featured_image, categories, recipe_title, recipe_summary, recipe_author_id, recipe_author_name, actions = false, recipe_type, page_reload_on_unsave = false } = props;
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const AuthUser = useSelector((state: RootState) => state.user_login.isAuthenticated);
    const navigate = useNavigate();
    const defaultFeImgPath = 'https://placehold.co/600x400?text=Featured+Image.';
    const fallBackFeImg = 'images/default-feimg.svg';
    const [compU, setCompU] = useState<boolean>(false);
    const cookies = new Cookies();
    const authUserID_g = cookies.get("gjtrewcipets_auth_user_id") || '';
    const [recSaved, setRecSaved] = useState<boolean>(false);

    useQuery(GET_USER_FOR_SAVED_RECIPES, {
        variables: { id: authUserID_g },
        onCompleted: fdata => {
            // console.log(fdata.getUserByID.saved_recipes);
            const extdt = fdata.getUserByID.saved_recipes;
            const arrids = extdt.map((item: any) => item.id);
            const chsr = arrids.includes(recipe_id);
            if (chsr) {
                setRecSaved(true);
            }
        }
    });

    // Delete Recipe
    const [delRec] = useMutation(DELETE_RECIPE, {
        onCompleted: fdata => {
            // console.log(fdata);
            const toastDefOpts = {
                autoClose: 1000,
                closeOnClick: true,
                theme: `${ThemeMode ? 'dark' : 'light'}`
            };
            if (fdata.deleteRecipe.success) {
                toast.success(fdata.deleteRecipe.message, toastDefOpts);
                if (recipe_featured_image == 'default') {
                    const suctmr = setTimeout(function () {
                        window.location.reload();
                        clearTimeout(suctmr);
                    }, 1500);
                }
            } else {
                toast.error(fdata.deleteRecipe.message, toastDefOpts);
            }
        }
    });

    // Save Recipe.
    const [savRec] = useMutation(SAVE_RECIPE_USER, {
        onCompleted: fdata => {
            // console.log(fdata);
            // const toastDefOpts = {
            //     autoClose: 1000,
            //     closeOnClick: true,
            //     theme: `${ThemeMode ? 'dark' : 'light'}`
            // };
            // if(fdata.saveRecipe.success) {
            //     toast.success(fdata.saveRecipe.message, toastDefOpts);
            // } else {
            //     toast.error(fdata.saveRecipe.message, toastDefOpts);
            // }
            alert(fdata.saveRecipe.message);
        }
    });

    // Unsave Recipe.
    const [unSavRec] = useMutation(UNSAVE_RECIPE_USER, {
        onCompleted: fdata => {
            // console.log(fdata);
            // const toastDefOpts = {
            //     autoClose: 1000,
            //     closeOnClick: true,
            //     theme: `${ThemeMode ? 'dark' : 'light'}`
            // };
            // if(fdata.unsaveRecipe.success) {
            //     toast.success(fdata.unsaveRecipe.message, toastDefOpts);
            // } else {
            //     toast.error(fdata.unsaveRecipe.message, toastDefOpts);
            // }
            alert(fdata.unsaveRecipe.message);
            const st = setTimeout(() => {
                window.location.reload();
                clearTimeout(st);
            }, 1000);
        }
    });

    const handleDeleteRecipe = () => {
        const conf = confirm("Are you sure want to delete this recipe ?");
        if (conf) {
            // if(recipe_featured_image !== 'default') {
            //     axios.post(`${import.meta.env.VITE_BACKEND_URI_BASE}/delete-uploads/recipe-featured-images`, {fileName: recipe_featured_image})
            //     .then((resp) => {
            //         // console.log(resp);
            //         if(resp.status === 200) {
            //             delRec({
            //                 variables: {
            //                     id: recipe_id,
            //                     user_id: recipe_author_id
            //                 }
            //             });
            //             let suctmr = setTimeout(function(){
            //                 window.location.reload();
            //                 clearTimeout(suctmr);
            //             }, 1500);
            //         }
            //     }).catch(err => console.log(err));
            // } else {
            //     delRec({
            //         variables: {
            //             id: recipe_id,
            //             user_id: recipe_author_id
            //         }
            //     });
            // }
            delRec({
                variables: {
                    id: recipe_id,
                    user_id: recipe_author_id
                }
            });
            const suctmr = setTimeout(function () {
                window.location.reload();
                clearTimeout(suctmr);
            }, 1500);
        }
    }

    const handleSaveChk = (e: any) => {
        const checked = e.target.checked;
        // console.log(AuthUser);
        if (AuthUser) {
            if (checked) {
                savRec({
                    variables: {
                        user_id: authUserID_g,
                        recipe_id
                    }
                });
                setRecSaved(true);
            } else {
                if (page_reload_on_unsave) {
                    const conf = confirm("Are you sure want to remove this recipe from saved collection ?");
                    if (conf) {
                        unSavRec({
                            variables: {
                                user_id: authUserID_g,
                                recipe_id
                            }
                        });
                        setRecSaved(false);
                    }
                } else {
                    unSavRec({
                        variables: {
                            user_id: authUserID_g,
                            recipe_id
                        }
                    });
                    setRecSaved(false);
                }
            }
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        const cookies = new Cookies();
        // const authUser = cookies.get("gjtrewcipets_auth_user") || '';
        const authUserID = cookies.get("gjtrewcipets_auth_user_id") || '';

        if (authUserID !== '') {
            if (recipe_author_id == authUserID) {
                // console.log("hey");
                setCompU(true);
            } else {
                setCompU(false);
            }
        }
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="twgtr-transition-all recipe-card twgtr-bg-white dark:twgtr-bg-slate-700">
                <ToastContainer />
                <div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%]">
                    <div className="twgtr-relative twgtr-bg-slate-300">
                        <a href={`/view-recipe/${recipe_id}`} title={recipe_title}>
                            <img src={recipe_featured_image == 'default' ? defaultFeImgPath : rfeb_URI ? rfeb_URI + '/' + recipe_featured_image : recipe_featured_image} className="twgtr-w-full" alt="photo"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = fallBackFeImg;
                                }} />
                        </a>
                        <div className="rcrd-bgc">
                            {
                                compU ?
                                    (<></>)
                                    :
                                    (
                                        <div className="rcbox-svrch-gp">
                                            <input type="checkbox" id={`chk__${recipe_id}`} className="chkbx" onChange={handleSaveChk} checked={recSaved} />
                                            <label htmlFor={`chk__${recipe_id}`}>
                                                <div className="inner">
                                                    <div className="icn-bcc">
                                                        <IoBookmarkOutline size={20} className="twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[30px] md:twgtr-h-[30px] twgtr-text-slate-700 dark:twgtr-text-slate-100" />
                                                    </div>
                                                    <div className="icn-acc">
                                                        <IoBookmark size={20} className="twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[30px] md:twgtr-h-[30px] twgtr-text-slate-700 dark:twgtr-text-slate-100" />
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    )
                            }

                            <div>
                                {
                                    recipe_type == "veg" ?
                                        (
                                            <img src="/veg-icon.svg" width="20px" height="20px" className="twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[30px] md:twgtr-h-[30px]" alt="recipe-type" />
                                        )
                                        :
                                        (
                                            <img src="/nonveg-icon.svg" width="20px" height="20px" className="twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[30px] md:twgtr-h-[30px]" alt="recipe-type" />
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="twgtr-hidden">{recipe_author_id}</div>
                    <div className="twgtr-w-full">
                        <div className="twgtr-pb-1 twgtr-pt-4 twgtr-px-[15px] md:twgtr-px-[20px] twgtr-hidden">
                            <ul className="twgtr-flex twgtr-items-center twgtr-flex-wrap twgtr-gap-x-[10px] twgtr-gap-y-[2px]">
                                {
                                    categories ?
                                        (
                                            categories.map((item: any) => (
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
                            <a href={`/view-recipe/${recipe_id}`} title={recipe_title} className="twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold">
                                <h5 className="twgtr-transition-all twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                    {recipe_title}
                                </h5>
                            </a>
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