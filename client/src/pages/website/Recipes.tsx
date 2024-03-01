import { useEffect, useRef, useState } from "react";
import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";
import { RiSearchLine } from "react-icons/ri";
import RecipesPg from "./RecipesPg";
import { gql, useQuery } from "@apollo/client";
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from "../../redux-service/ReduxStore";
import { useSelector } from "react-redux";
import { IoFilterSharp } from "react-icons/io5";

const GET_RECIPES = gql`
	query getAggrRecipes {
		getAggrRecipes {
			id,
			recipe_title,
			recipe_type,
			recipe_featured_image,
			recipe_summary,
			recipe_content,
			author {
				author_id,
				author_name
			},
			recipe_categories {
				id,
                recipe_category_name
			},
			recipe_ingradients
		}
	}
`;

const Recipes = () => {

	interface Cats {
        id: string,
        recipe_category_name: string
    }

    interface AllRecipesType {
        id: string,
        recipe_title: string,
        recipe_type: string,
        recipe_featured_image: string,
        recipe_summary: string,
        recipe_content: string,
        author: {
            author_id: string,
            author_name: string
        },
        recipe_categories: [Cats],
        recipe_ingradients: [string]
    }

	const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
	const [allRecipes, setAllRecipes] = useState<AllRecipesType[]>([]);
	let itemsPerPage:number = 9;
	const [searchTerm, setSearchTerm] = useState<string>('');
	const menuRef = useRef<HTMLDivElement>(null);
    const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
	const [recType, setRecType] = useState<string>('');

	let {data} = useQuery(GET_RECIPES, {
		onCompleted: fdata => {
			// console.log(fdata.getAggrRecipes);
			setAllRecipes(fdata.getAggrRecipes);
		}
	});

	const handleSearchInputChange = (e:any) => {
        setSearchTerm(e.target.value);
        if(searchTerm.length === 1) {
            setAllRecipes(data.getAggrRecipes);
        }
    }

    const handleSearchInputKeyDown = (e:any) => {
        setSearchTerm(e.target.value);
        if(e.key === "Backspace") {
            setAllRecipes(data.getAggrRecipes);
        }
    }

	const handleSearchSubmit = (e:any) => {
        e.preventDefault();
        const toastDefOpts = {
            autoClose: 1000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        };
        if(allRecipes.length > 0) {
            let res = allRecipes.filter((item) => {
                const srch_res = item.recipe_title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.recipe_summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.recipe_ingradients.map((itm) => itm.toLowerCase()).includes(searchTerm.toLowerCase()) || 
                item.recipe_content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.recipe_categories.map((itm) => itm.recipe_category_name.toLowerCase()).includes(searchTerm.toLowerCase()) || 
				item.recipe_type.toLowerCase().includes(searchTerm.toLowerCase());
                return srch_res;
            });

            if(res.length > 0) {
                setAllRecipes(res);
                if(searchTerm == '') {
                    // setAllRecipes(data.getAllRecipes);
                    setAllRecipes([]);
                    toast.warn("No Recipes Found", toastDefOpts);
                }
            } else {
                if(searchTerm == '') {
                    // setAllRecipes(data.getAllRecipes);
                    setAllRecipes([]);
                    toast.warn("No Recipes Found", toastDefOpts);
                }
                setAllRecipes(res);
            }
            // console.log(res);
        } else {
            toast.info("No Recipes Found", toastDefOpts);
            // setAllRecipes(data.getAllRecipes);
        }
    }

	const handleFilterSubmit = (e:any) => {
		e.preventDefault();
		const toastDefOpts = {
            autoClose: 1000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        };
		if(recType !== '') {
			if(data.getAggrRecipes.length > 0) {
				let res = data.getAggrRecipes.filter((item: AllRecipesType) => {
					const srch_res = item.recipe_type.toLowerCase() == recType;
					return srch_res;
				});
				if(res.length > 0) {
					setAllRecipes(res);
				}
			}  else {
				toast.info("No Recipes Found", toastDefOpts);
			}
		}
	}

	const handleClearClick = () => {
		setRecType("");
		setAllRecipes(data.getAggrRecipes);
		setShowFilterMenu(false);
	}

	useEffect(() => {
		let menuHandler = (e:any) => {
            if(menuRef.current !== null) {
                if(!menuRef.current.contains(e.target)) {
                    setShowFilterMenu(false);
                }
            }
        };
        document.addEventListener('mousedown', menuHandler);
	}, []);

	return (
		<>
			<ToastContainer />
			<SiteBreadcrumb page_name="Recipes" page_title="All Recipes" />
			<div className="twgtr-bg-slate-100 twgtr-px-4 dark:twgtr-bg-slate-800">
				<div className="site-container">
					{/* Search */}
					<div className="twgtr-py-[50px]">
						<div className="twgtr-flex twgtr-gap-x-[15px] twgtr-justify-between twgtr-items-center">
							<div className="md:twgtr-max-w-[300px]">
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

							<div className="twgtr-relative" ref={menuRef}>
								<button type="button" title="Filter" className="twgtr-transition-all twgtr-w-full twgtr-py-2 twgtr-px-2 md:twgtr-px-3 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200" onClick={() => setShowFilterMenu(!showFilterMenu)}>
									<div className="twgtr-flex twgtr-gap-x-[8px] twgtr-items-center">
										<IoFilterSharp size={20} />
										<div className="twgtr-hidden md:twgtr-inline-block">Filter</div>
									</div>
								</button>
								<ul className={`twgtr-absolute twgtr-right-0 twgtr-py-1 twgtr-z-10 twgtr-border twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-500 twgtr-mt-[2px] twgtr-w-[200px] twgtr-origin-top-right twgtr-rounded-md twgtr-bg-white twgtr-shadow-lg twgtr-ring-1 twgtr-ring-black twgtr-ring-opacity-5 twgtr-focus:outline-none twgtr-font-open_sans dark:twgtr-bg-slate-700 ${showFilterMenu ? 'twgtr-block' : 'twgtr-hidden'}`}>
									<form onSubmit={handleFilterSubmit}>
										<div className="gtr-flitem">
											<input type="radio" id="filt-li1" name="recipe_type_filter" className="radio" value="veg" checked={recType === "veg"} onChange={() => setRecType('veg')} />
											<label className="label" htmlFor="filt-li1">
												<div className="gtr-firof">
													<div className="radio-circle"></div>
													<div className="gtr-firif">
														<img src="/veg-icon.svg" className="vicon" alt="recipe-type" />
														<h4 className="gtr-filbl">Veg</h4>
													</div>
												</div>
											</label>
										</div>
										<div className="gtr-flitem">
											<input type="radio" id="filt-li2" name="recipe_type_filter" className="radio" value="nonveg" checked={recType === "nonveg"} onChange={() => setRecType('nonveg')} />
											<label className="label" htmlFor="filt-li2">
												<div className="gtr-firof">
													<div className="radio-circle"></div>
													<div className="gtr-firif">
														<img src="/nonveg-icon.svg" className="vicon" alt="recipe-type" />
														<h4 className="gtr-filbl">NonVeg</h4>
													</div>
												</div>
											</label>
										</div>
										<div className="twgtr-transition-all twgtr-w-full twgtr-my-[5px] twgtr-h-[1px] twgtr-bg-slate-300 dark:twgtr-bg-slate-500"></div>
										<div className="twgtr-flex twgtr-gap-[10px] twgtr-items-center twgtr-justify-between twgtr-px-[15px] twgtr-py-[5px]">
											<button type="button" title="Clear" className="twgtr-transition-all twgtr-text-[12px] twgtr-font-ubuntu twgtr-underline twgtr-text-slate-500 dark:twgtr-text-slate-300" onClick={handleClearClick}>
												Clear
											</button>
											<button type="submit" title="Apply" className="twgtr-transition-all twgtr-py-1 twgtr-px-3 twgtr-font-ubuntu twgtr-text-[16px] twgtr-text-slate-800 hover:twgtr-bg-slate-200 hover:twgtr-text-slate-800 dark:twgtr-text-slate-200 dark:hover:twgtr-bg-slate-800">
												Apply
											</button>
										</div>
									</form>
								</ul>
							</div>
						</div>
					</div>

					<div className="twgtr-pb-[50px]">
						{
							allRecipes.length > 0 ? 
							(
								<RecipesPg cdata={allRecipes} itemsPerPage={itemsPerPage} />
							) 
							: 
							(
								<h6>No Recipes Found.</h6>
							)
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Recipes;