import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import RCSpage from "./RCSpage";

const GET_RECIPE_CATEGORIES = gql`
    query getAllRecipeCategories($id: ID!) {
        getAllRecipeCategories(id: $id) {
            id,
            category_name,
            category_slug,
            category_auth_id,
            category_auth_name
        }
    }
`;

const GET_PER_PAGE_COUNTS = gql`
    query getPerPagesCount($id: ID!) {
        getPerPagesCount(id: $id) {
            category_per_page
        }
    }
`;

const RecipeCategories = (props:any) => {

    let { uid, showModal, setShowModal } = props;

    interface RecCats {
        id: string,
        category_name: string,
        category_slug: string,
        category_auth_id: string,
        category_auth_name: string
    }

    const [recipeCats, setRecipeCats] = useState<RecCats[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    // Get All Categories.
    useQuery(GET_RECIPE_CATEGORIES, {
        variables: { id: uid },
        onCompleted: grcdata => {
            // console.log(grcdata);
            setRecipeCats(grcdata?.getAllRecipeCategories);
        }
    });

    // Get Categories Per Page From User Settings DB.
    useQuery(GET_PER_PAGE_COUNTS, {
        variables: { id: uid },
        onCompleted: grcdata => {
            // console.log(grcdata);
            setItemsPerPage(grcdata?.getPerPagesCount.category_per_page);
        }
    });

    return (
        <>
            <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-4 twgtr-py-3 lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                {
                    recipeCats?.length > 0 ? 
                    (
                        <div>
                            <RCSpage cdata={recipeCats} itemsPerPage={itemsPerPage} />
                        </div>
                    ) 
                    : 
                    (
                        <div className="twgtr-text-center twgtr-py-2 md:twgtr-py-0">
                            <MdOutlineCategory size={100} className="twgtr-transition-all twgtr-inline-block twgtr-w-[50px] twgtr-h-[50px] md:twgtr-w-[100px] md:twgtr-h-[100px] twgtr-text-slate-300 dark:twgtr-text-slate-500" />
                            <div className="twgtr-pt-2 md:twgtr-pt-4">
                                <h6 className="twgtr-transition-all twgtr-font-open_sans twgtr-font-bold twgtr-text-[20px] md:twgtr-text-[30px] twgtr-text-slate-400">
                                    No Categories Found
                                </h6>
                            </div>
                            <div className="twgtr-pt-1">
                                <NavLink to="#" title="+ Add New" className="twgtr-transition-all twgtr-font-open_sans twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-4" onClick={() => setShowModal(!showModal)}>
                                    + Add New
                                </NavLink>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
};

export default RecipeCategories;