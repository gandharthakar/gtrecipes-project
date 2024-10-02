import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import RCSpage from "./RCSpage";
import { RiSearchLine } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RootState } from '../../../redux-service/ReduxStore';
import { useSelector } from "react-redux";
import NotifyBar from "../NotifyBar";

const GET_RECIPE_CATEGORIES = gql`
    query getAllRecipeCategories($id: ID!) {
        getAllRecipeCategories(id: $id) {
            id,
            recipe_category_name,
            recipe_category_slug,
            author {
                author_id,
                author_name
            }
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

const DELETE_ALL_CATEGORIES = gql`
    mutation deleteAllRecipeCategory($user_id: String!) {
        deleteAllRecipeCategory(user_id: $user_id) {
            message,
            success
        }
    }
`;

const RecipeCategories = (props:any) => {

    const { uid, showModal, setShowModal } = props;

    interface RecCats {
        id: string,
        recipe_category_name: string,
        recipe_category_slug: string,
        author: {
            author_id: string,
            author_name: string
        }
    }

    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const [recipeCats, setRecipeCats] = useState<RecCats[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showNotifyBar, setShowNotifyBar] = useState<boolean>(false);
    const [notifyBarMsg, setNotifyBarMsg] = useState<string>("");

    // Get All Categories.
    const {data, loading} = useQuery(GET_RECIPE_CATEGORIES, {
        variables: { id: uid },
        onCompleted: grcdata => {
            // console.log(grcdata);
            let rev_cats = [...grcdata?.getAllRecipeCategories].reverse();
            setRecipeCats(rev_cats);
            setShowNotifyBar(false);
            setNotifyBarMsg('');
        },
        onError(error) {
			// console.log(error.message);
			// const toastDefOpts = {
			// 	autoClose: 2000,
			// 	closeOnClick: true,
			// 	theme: `${ThemeMode ? 'dark' : 'light'}`
			// }
			// toast.error(error.message, toastDefOpts);
            setShowNotifyBar(true);
            setNotifyBarMsg(error.message);
		},
    });

    // Get Categories Per Page From User Settings DB.
    useQuery(GET_PER_PAGE_COUNTS, {
        variables: { id: uid },
        onCompleted: grcdata => {
            // console.log(grcdata);
            setItemsPerPage(grcdata?.getPerPagesCount.category_per_page);
        },
        onError(error) {
            setShowNotifyBar(true);
            setNotifyBarMsg(error.message);
        },
    });

    const [delAlCts] = useMutation(DELETE_ALL_CATEGORIES, {
        onCompleted: fdata => {
            // console.log(fdata);
            const toastDefOpts = {
                autoClose: 1000,
                closeOnClick: true,
                theme: `${ThemeMode ? 'dark' : 'light'}`
            };
            if(fdata.deleteAllRecipeCategory.success) {
                toast.success(fdata.deleteAllRecipeCategory.message, toastDefOpts);
                if(fdata.deleteAllRecipeCategory.message !== "No Categories Found.") {
                    const suctmr = setTimeout(function(){
                        window.location.reload();
                        clearTimeout(suctmr);
                    }, 1000);
                }
            } else {
                alert(fdata.deleteAllRecipeCategory.message);
            }
        },
        onError(error) {
			// console.log(error.message);
			// const toastDefOpts = {
			// 	autoClose: 2000,
			// 	closeOnClick: true,
			// 	theme: `${ThemeMode ? 'dark' : 'light'}`
			// }
			// toast.error(error.message, toastDefOpts);
            setShowNotifyBar(true);
            setNotifyBarMsg(error.message);
		},
    })

    const handleDeleteAll = () => {
        const conf = confirm("Are you sure want to delete all categories ?");
        if(conf) {
            delAlCts({
                variables: {
                    user_id: uid
                }
            })
        }
    }

    const handleSearchInputChange = (e:any) => {
        setSearchTerm(e.target.value);
        if(searchTerm.length === 1) {
            let rev_rec = [...data.getAllRecipeCategories].reverse();
            setRecipeCats(rev_rec);
        }
    }

    const handleSearchInputKeyDown = (e:any) => {
        setSearchTerm(e.target.value);
        if(e.target.value !== '') {
            if(e.key === "Backspace") {
                let rev_rec = [...data.getAllRecipeCategories].reverse();
                setRecipeCats(rev_rec);
            }
        }
    }

    const handleSearchSubmit = (e:any) => {
        e.preventDefault();
        const toastDefOpts = {
            autoClose: 1000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        };
        if(searchTerm !== '') {
            if(recipeCats.length > 0) {
                const res = recipeCats.filter((item) => {
                    const srch_res = item.recipe_category_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.recipe_category_slug.toLowerCase().includes(searchTerm.toLowerCase());
                    return srch_res;
                });

                if(res.length > 0) {
                    setRecipeCats(res);
                    if(searchTerm == '') {
                        // setRecipeCats(data.getAllRecipeCategories);
                        setRecipeCats([]);
                        toast.warn("No Recipes Found", toastDefOpts);
                    }
                } else {
                    if(searchTerm == '') {
                        // setRecipeCats(data.getAllRecipeCategories);
                        setRecipeCats([]);
                        toast.warn("No Recipes Found", toastDefOpts);
                    }
                    setRecipeCats(res);
                }
            } else {
                toast.info("No Categories Found", toastDefOpts);
            }
        } else {
            toast.error("Please enter some value.", toastDefOpts);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full lg:twgtr-w-[calc(100%-250px)] 2xl:twgtr-w-[calc(100%-300px)] twgtr-border twgtr-border-solid twgtr-px-[20px] twgtr-py-[30px] lg:twgtr-px-10 lg:twgtr-py-8 twgtr-bg-white dark:twgtr-bg-slate-700 dark:twgtr-border-slate-500">
                <div className="twgtr-pb-[30px]">
                    <div className="twgtr-pb-[20px]">
                        <NotifyBar 
                            notify_title="Server Error" 
                            view_notify_icon={true} 
                            message={notifyBarMsg} 
                            notify_type="error" 
                            notify_closable={true} 
                            show_bar={showNotifyBar}
                            set_show_bar={setShowNotifyBar}
                        />
                    </div>
                    <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[15px] twgtr-gap-y-[10px] twgtr-justify-between twgtr-flex-wrap">
                        <div className="md:twgtr-max-w-[300px] twgtr-w-full md:twgtr-w-auto">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="twgtr-relative">
                                    <input 
                                        type="text" 
                                        id="unmfrm"
                                        className="twgtr-transition-all twgtr-w-full twgtr-pl-2 md:twgtr-pl-3 twgtr-pr-[35px] md:twgtr-pr-[45px] twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                        placeholder="Search..." 
                                        autoComplete="off"
                                        value={searchTerm}
                                        onChange={handleSearchInputChange}
                                        onKeyDown={handleSearchInputKeyDown}
                                    />
                                    <div className="twgtr-absolute twgtr-right-[10px] twgtr-top-[12px] md:twgtr-right-[15px] md:twgtr-top-[11px] twgtr-z-[5]">
                                        <button type="submit" title="Search">
                                            <RiSearchLine size={20} className="twgtr-transition-all twgtr-w-[18px] twgtr-h-[18px] md:twgtr-w-[20px] md:twgtr-h-[20px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="twgtr-text-right twgtr-w-full md:twgtr-w-auto">
                            <button type="button" title="Delete All" className="twgtr-transition-all twgtr-inline-block twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-underline twgtr-text-red-600 dark:twgtr-text-slate-200" onClick={handleDeleteAll}>
                                Delete All
                            </button>
                        </div>
                    </div>
                </div>

                {
                    loading ? 
                    (
                        <h6 className="twgtr-transition-all twgtr-font-bold twgtr-font-ubuntu twgtr-text-[]">
                            Loading ...
                        </h6>
                    ) 
                    : 
                    (
                        <>
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
                        </>
                    )
                }
                
            </div>
        </>
    )
};

export default RecipeCategories;