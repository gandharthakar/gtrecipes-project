import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import URSpage from "./URSpage";
import { PiCookingPot } from "react-icons/pi";

const GET_PER_PAGE_COUNTS = gql`
    query getPerPagesCount($id: ID!) {
        getPerPagesCount(id: $id) {
            recipes_per_page
        }
    }
`;

const GET_ALL_RECIPES = gql`
    query getAllRecipes($id: ID!) {
        getAllRecipes(id: $id) {
            id,
            recipe_title,
            recipe_featured_image,
            recipe_categories {
                id,
                recipe_category_name
            }
            recipe_summary,
            author {
                author_id,
                author_name
            }
        }
    }
`;

const UserRecipes = (props:any) => {
    let { uid } = props;

    interface AllRecipesType {
        id: string,
        recipe_title: string,
        recipe_featured_image: string,
        recipe_summary: string,
        author: {
            author_id: string,
            author_name: string
        }
    }

    const [allRecipes, setAllRecipes] = useState<AllRecipesType[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    // Get Recipes Per Page From User Settings DB.
    useQuery(GET_PER_PAGE_COUNTS, {
        variables: { id: uid },
        onCompleted: grcdata => {
            // console.log(grcdata);
            setItemsPerPage(grcdata?.getPerPagesCount.recipes_per_page);
        }
    });

    // Get All Recipes.
    useQuery(GET_ALL_RECIPES, {
        variables: { id: uid },
        onCompleted: grcdata => {
            // console.log(grcdata);
            setAllRecipes(grcdata?.getAllRecipes);
        }
    });

    return (
        <>
            <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                {
                    allRecipes.length > 0 ? 
                    (
                        <div>
                            <URSpage cdata={allRecipes} itemsPerPage={itemsPerPage} />
                        </div>
                    ) 
                    : 
                    (
                        <div className="twgtr-text-center twgtr-py-2 md:twgtr-py-0">
                            <PiCookingPot size={100} className="twgtr-transition-all twgtr-inline-block twgtr-w-[50px] twgtr-h-[50px] md:twgtr-w-[100px] md:twgtr-h-[100px] twgtr-text-slate-300 dark:twgtr-text-slate-500" />
                            <div className="twgtr-pt-2 md:twgtr-pt-4">
                                <h6 className="twgtr-transition-all twgtr-font-open_sans twgtr-font-bold twgtr-text-[20px] md:twgtr-text-[30px] twgtr-text-slate-400">
                                    No Recipes Found
                                </h6>
                            </div>
                            <div className="twgtr-pt-1">
                                <NavLink to={`/create-recipe/${uid}`} title="+ Add New" className="twgtr-transition-all twgtr-font-open_sans twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-4">
                                    + Add New
                                </NavLink>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default UserRecipes;