import { NavLink, useNavigate } from "react-router-dom";
import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";
import { CgBowl } from "react-icons/cg";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux-service/ReduxStore";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import RecipeCard from "../../components/website/RecipeCard";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import Cookies from "universal-cookie";
import { gql, useMutation, useQuery } from "@apollo/client";
import parse from 'html-react-parser';
import RecipeToPrint from "./RecipeToPrint";
import { useReactToPrint } from 'react-to-print';
import { HiMiniPrinter } from "react-icons/hi2";
import NotifyBar from "./NotifyBar";

const CHECK_RECIPE_VALIDITY = gql`
    mutation checkRecipeInRecords($rid: String!) {
        checkRecipeInRecords(rid: $rid) {
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

const GET_RECIPE_DETAILS = gql`
    query getSIngleRecipeByID($id: ID!) {
        getSIngleRecipeByID(id: $id) {
            id,
            recipe_title,
            recipe_type,
            recipe_summary,
            recipe_content,
            recipe_ingradients,
            recipe_featured_image,
            recipe_categories {
                id,
                recipe_category_name
            },
            author {
                author_id,
                author_name
            },
            recipe_makes_servings,
            recipe_prep_time,
            recipe_cook_time,
            recipe_total_time,
            recipe_created_at
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

const GET_RANDOM_RECIPES = gql`
    query getAggrRec3($exc_id: ID!) {
        getAggrRec3(exc_id: $exc_id) {
            id,
            recipe_title,
            recipe_type,
            recipe_featured_image,
            recipe_summary,
            recipe_categories {
                id,
                recipe_category_name
            },
            author {
                author_id,
                author_name
            },
        }
    }
`;

const ViewSingleRecipe = () => {
    const { id } = useParams();
    const rp = [
        {
            id: 1,
            page_name: "All Recipes",
            page_slug: "/recipes"
        },
    ];
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const AuthUser = useSelector((state: RootState) => state.user_login.isAuthenticated);
    const share_uri = window.location.origin + "/view-recipe/" + id;
    // const [recipeTitle, setRecipeTitle] = useState('This is title for this recipe box This is title for this recipe box');
    const navigate = useNavigate();
    const defaultFeImgPath = 'https://placehold.co/1200x600?text=Featured+Image.';
    const fallBackFeImg = 'images/default-feimg.svg';
    const [compU, setCompU] = useState<boolean>(false);
    const cookies = new Cookies();
    const authUserID_g = cookies.get("gjtrewcipets_auth_user_id") || '';
    // const uplimgpath = `${import.meta.env.VITE_BACKEND_URI_BASE}/uploads/recipe-featured-images`;

    const [recTtl, setRecTtl] = useState<string>('');
    const [recTyp, setRecTyp] = useState<string>('veg');
    const [recFeImg, setRecFeImg] = useState<string>('default');
    const [recSum, setRecSum] = useState<string>('');
    interface Cats {
        id: string,
        recipe_category_name: string
    }
    const [recCats, setRecCats] = useState<Cats[]>([
        {
            id: "uncat_1",
            recipe_category_name: "Uncategorized"
        }
    ]);
    const [recCrat, setRecCrat] = useState<string>('15 Feb 2022, 02:14:00');
    const [recAuthNm, setRecAuthNm] = useState<string>('Author Name');
    const [recSaved, setRecSaved] = useState<boolean>(false);
    interface IngType {
        id: number,
        ingredient_item: string
    }
    const [recIngs, setRecIngs] = useState<IngType[]>([]);
    const [recCont, setRecCont] = useState<string>('');
    const [recPrpTm, setRecPrpTm] = useState<string>('NA');
    const [recCokTm, setRecCokTm] = useState<string>('NA');
    const [recTotTm, setRecTotTm] = useState<string>('NA');
    const [recSrv, setRecSrv] = useState<string>('NA');
    interface AllRecipesType {
        id: string,
        recipe_title: string,
        recipe_type: string,
        recipe_featured_image: string,
        recipe_summary: string,
        recipe_categories: [Cats],
        author: {
            author_id: string,
            author_name: string
        },
    }
    const [randRec, setRandRec] = useState<AllRecipesType[]>([]);
    const [showNotifyBar, setShowNotifyBar] = useState<boolean>(false);
    const [notifyBarMsg, setNotifyBarMsg] = useState<string>("");
    // const baseURIFeImg = `${import.meta.env.VITE_BACKEND_URI_BASE}/uploads/recipe-featured-images`;
    const componentRef = useRef<HTMLDivElement>(null);
    const pageStyle = `
    @page {
        // size: 80mm 50mm;
        margin: 30px 40px;
    }

    body{
        -webkit-print-color-adjust:exact !important;
        print-color-adjust:exact !important;
    }

    @media all {
        .pagebreak {
            display: none;
        }
    }

    @media print {
        .pagebreak {
            page-break-before: always;
        }
    }
    `;
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        pageStyle,
        documentTitle: `GTRecipes Print Recipe - ${recTtl}`
    });

    useQuery(GET_RANDOM_RECIPES, {
        variables: {
            exc_id: id,
        },
        onCompleted: fdata => {
            // console.log(fdata.getAggrRec3);
            // console.log(fdata.getAggrRecipes[fdata.getAggrRecipes.length - 2]);
            setRandRec(fdata.getAggrRec3);
        },
        onError(error) {
            // console.log(error.message);
            // const toastDefOpts = {
            // 	autoClose: 2000,
            // 	closeOnClick: true,
            // 	theme: `${ThemeMode ? 'dark' : 'light'}`
            // }
            // toast.error(error.message, toastDefOpts);
            // alert(error.message);
            setNotifyBarMsg(error.message);
            setShowNotifyBar(true);
        },
    })

    // Check Recipe Validity.
    const [chkRec] = useMutation(CHECK_RECIPE_VALIDITY, {
        onCompleted: fdata => {
            // console.log(fdata.checkRecipeInRecords);
            if (!fdata.checkRecipeInRecords.success) {
                // console.log("True");
                navigate("/recipe-not-found");
            }
        },
        onError(error) {
            // console.log(error);
            // console.log(clientOptions);
            if (error) {
                // console.log("Yes");
                navigate("/recipe-not-found");
            }
        },
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
        },
        onError(error) {
            // console.log(error.message);
            // const toastDefOpts = {
            // 	autoClose: 2000,
            // 	closeOnClick: true,
            // 	theme: `${ThemeMode ? 'dark' : 'light'}`
            // }
            // toast.error(error.message, toastDefOpts);
            // alert(error.message);
            setNotifyBarMsg(error.message);
            setShowNotifyBar(true);
        },
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
        },
        onError(error) {
            // console.log(error.message);
            // const toastDefOpts = {
            // 	autoClose: 2000,
            // 	closeOnClick: true,
            // 	theme: `${ThemeMode ? 'dark' : 'light'}`
            // }
            // toast.error(error.message, toastDefOpts);
            // alert(error.message);
            setNotifyBarMsg(error.message);
            setShowNotifyBar(true);
        },
    });

    useQuery(GET_USER_FOR_SAVED_RECIPES, {
        variables: { id: authUserID_g },
        onCompleted: fdata => {
            // console.log(fdata.getUserByID.saved_recipes);
            const extdt = fdata.getUserByID.saved_recipes;
            const arrids = extdt.map((item: any) => item.id);
            const chsr = arrids.includes(id);
            if (chsr) {
                setRecSaved(true);
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
            // alert(error.message);
            setNotifyBarMsg(error.message);
            setShowNotifyBar(true);
        },
    });

    const { data, loading, error } = useQuery(GET_RECIPE_DETAILS, {
        variables: { id },
        onCompleted: fdata => {
            // console.log(fdata.getSIngleRecipeByID);
            const mdata = fdata.getSIngleRecipeByID;

            // Set Recipe Title.
            setRecTtl(mdata.recipe_title);
            // Set Recipe Type.
            setRecTyp(mdata.recipe_type);
            // Set Recipe Featured Image.
            setRecFeImg(mdata.recipe_featured_image);
            // Set Recipe Summary.
            setRecSum(mdata.recipe_summary);
            // Set Recipe Categories
            const ctdata = mdata.recipe_categories;
            if (ctdata.length > 0) {
                const ctarr = ctdata.map((item: Cats) => {
                    return { id: item.id, recipe_category_name: item.recipe_category_name }
                });
                setRecCats(ctarr);
            } else {
                const nularr = [{ id: "uncat_2", recipe_category_name: "Uncategorized" }];
                setRecCats(nularr);
            }
            // Set Recipe Created At.
            setRecCrat(mdata.recipe_created_at);
            // Set Recipe Author Name.
            setRecAuthNm(mdata.author.author_name);
            // Set Recipe Ingradients.
            const grings = mdata.recipe_ingradients;
            const ingarr = grings.map((itm: string, idx: number) => {
                return { id: idx, ingredient_item: itm }
            });
            setRecIngs(ingarr);
            // Set Recipe Content.
            setRecCont(mdata.recipe_content);
            // Set Recipe Servings.
            setRecSrv(mdata.recipe_makes_servings);
            // Set Recipe Prep Time.
            setRecPrpTm(mdata.recipe_prep_time);
            // Set Recipe Cook Time.
            setRecCokTm(mdata.recipe_cook_time);
            // Set Recipe Total Time.
            setRecTotTm(mdata.recipe_total_time);

            setNotifyBarMsg("");
            setShowNotifyBar(false);
        },
        onError(error) {
            // console.log(error.message);
            // const toastDefOpts = {
            // 	autoClose: 2000,
            // 	closeOnClick: true,
            // 	theme: `${ThemeMode ? 'dark' : 'light'}`
            // }
            // toast.error(error.message, toastDefOpts);
            // alert(error.message);
            setNotifyBarMsg(error.message);
            setShowNotifyBar(true);
        },
    });

    const handleSaveChk = (e: any) => {
        const checked = e.target.checked;
        // console.log(AuthUser);
        if (AuthUser) {
            if (checked) {
                savRec({
                    variables: {
                        user_id: authUserID_g,
                        recipe_id: id
                    }
                });
                setRecSaved(true);
            } else {
                unSavRec({
                    variables: {
                        user_id: authUserID_g,
                        recipe_id: id
                    }
                });
                setRecSaved(false);
            }
        } else {
            navigate("/login");
        }
    }

    const copyURI = () => {
        const toastDefOpts = {
            autoClose: 3000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        };
        copy(share_uri);
        toast.success("Link coped!", toastDefOpts);
    }

    useEffect(() => {
        const cookies = new Cookies();
        // const authUser = cookies.get("gjtrewcipets_auth_user") || '';
        const authUserID = cookies.get("gjtrewcipets_auth_user_id") || '';
        const recipe_author_id = data?.getSIngleRecipeByID.author.author_id;
        if (authUserID !== '') {
            if (recipe_author_id == authUserID) {
                setCompU(true);
            } else {
                setCompU(false);
            }
        }

        chkRec({
            variables: {
                rid: id
            }
        })
        //eslint-disable-next-line
    }, [data]);

    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name={recTtl} rest_pages={rp} page_title="Single Recipe" />
            <NotifyBar
                notify_title="Server Error"
                view_notify_icon={true}
                message={notifyBarMsg}
                notify_type="error"
                notify_closable={true}
                show_bar={showNotifyBar}
                set_show_bar={setShowNotifyBar}
            />
            <article>
                <div className="twgtr-bg-white srh-main twgtr-py-[30px] md:twgtr-py-[50px] twgtr-border-t twgtr-border-solid twgtr-border-slate-300 twgtr-px-4 dark:twgtr-bg-slate-800 dark:twgtr-border-slate-600">
                    <div className="site-container">
                        {
                            loading ?
                                (
                                    <>
                                        <div className="twgtr-py-[20px] twgtr-text-center twgtr-bg-white dark:twgtr-bg-slate-700">
                                            <h6 className="twgtr-transition-all twgtr-font-bold twgtr-font-ubuntu twgtr-text-[]">
                                                Loading ...
                                            </h6>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {
                                            error ?
                                                (
                                                    <>
                                                        <div className="twgtr-py-[20px] twgtr-text-center twgtr-bg-white dark:twgtr-bg-slate-700">
                                                            <h6 className="twgtr-transition-all twgtr-font-bold twgtr-font-ubuntu twgtr-text-[]">
                                                                Something Went Wrong ...
                                                            </h6>
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>

                                                        <div className="twgtr-pb-4 twgtr-text-center">
                                                            {
                                                                recTyp == "veg" ?
                                                                    (
                                                                        <img src="/veg-icon.svg" width="25px" height="25px" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="recipe-type" />
                                                                    )
                                                                    :
                                                                    (
                                                                        <img src="/nonveg-icon.svg" width="25px" height="25px" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="recipe-type" />
                                                                    )
                                                            }
                                                        </div>
                                                        <div className="twgtr-pb-4">
                                                            <ul className="twgtr-flex twgtr-items-center twgtr-justify-center twgtr-flex-wrap twgtr-gap-x-[10px] twgtr-gap-y-[2px]">
                                                                {
                                                                    recCats.map((item) => (
                                                                        <div key={item.id} className="twgtr-flex twgtr-flex-wrap twgtr-gap-x-[10px] twgtr-items-center rpcat-box">
                                                                            <li className="twgtr-transition-all twgtr-inline-block twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-semibold twgtr-py-1 twgtr-px-4 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-4 twgtr-text-theme-color-4 twgtr-rounded-full dark:twgtr-border-theme-color-3 dark:twgtr-text-theme-color-3">
                                                                                {item.recipe_category_name}
                                                                            </li>
                                                                            {/* <li className="twgtr-transition-all twgtr-inline-block dot twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-theme-color-1 dark:twgtr-text-slate-300">
                                                                    <div className="twgtr-transition-all twgtr-w-[3px] twgtr-h-[3px] twgtr-rounded-full twgtr-bg-theme-color-1 dark:twgtr-bg-theme-color-3"></div>
                                                                </li> */}
                                                                        </div>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div className="twgtr-pb-6 twgtr-text-center">
                                                            <div className="twgtr-max-w-[1200px] twgtr-mx-auto">
                                                                <h1 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[25px] md:twgtr-text-[30px] lg:twgtr-text-[40px] twgtr-font-bold twgtr-text-theme-color-2 dark:twgtr-text-theme-color-3">
                                                                    {recTtl}
                                                                </h1>
                                                            </div>
                                                            <div className="twgtr-max-w-[1000px] twgtr-mx-auto">
                                                                <h2 className="twgtr-transition-all twgtr-block twgtr-font-open_sans twgtr-text-slate-800 twgtr-text-[16px] md:twgtr-text-[18px]">
                                                                    {recSum}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                        <div className="twgtr-pb-[30px] twgtr-text-center">
                                                            <h4 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-400 dark:twgtr-text-slate-500">
                                                                Posted On - {recCrat}
                                                            </h4>
                                                            <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-400 dark:twgtr-text-slate-500">
                                                                By - <span className="twgtr-text-theme-color-4 twgtr-font-semibold twgtr-underline">{recAuthNm}</span>
                                                            </h5>
                                                        </div>
                                                        <div className="twgtr-text-center">
                                                            <div className="twgtr-flex twgtr-flex-wrap twgtr-items-center twgtr-justify-center twgtr-gap-x-[35px] twgtr-gap-y-[25px]">
                                                                <div>
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
                                                                            <NavLink to={`https://twitter.com/intent/tweet?text=${recTtl}&url=${share_uri}`} title="Share on Twitter" target="_blank">
                                                                                <img src="/social-media/twitter-x.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="Twitter" />
                                                                            </NavLink>
                                                                        </div>
                                                                        <div>
                                                                            <button type="button" title="Copy Link" onClick={copyURI}>
                                                                                <svg width="100" height="100" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]">
                                                                                    <g clipPath="url(#clip0_2009_9684)">
                                                                                        <path fill="#284218" className="twgtr-transition-all twgtr-fill-slate-700 dark:twgtr-fill-slate-400" d="M5.83333 5.49984V2.99984C5.83333 2.77882 5.92113 2.56686 6.07741 2.41058C6.23369 2.2543 6.44565 2.1665 6.66667 2.1665H16.6667C16.8877 2.1665 17.0996 2.2543 17.2559 2.41058C17.4122 2.56686 17.5 2.77882 17.5 2.99984V14.6665C17.5 14.8875 17.4122 15.0995 17.2559 15.2558C17.0996 15.412 16.8877 15.4998 16.6667 15.4998H14.1667V17.9998C14.1667 18.4598 13.7917 18.8332 13.3275 18.8332H3.33917C3.22927 18.8338 3.12033 18.8128 3.0186 18.7712C2.91687 18.7296 2.82436 18.6684 2.74638 18.5909C2.6684 18.5135 2.60649 18.4214 2.56421 18.32C2.52193 18.2185 2.50011 18.1097 2.5 17.9998L2.5025 6.33317C2.5025 5.87317 2.8775 5.49984 3.34167 5.49984H5.83333ZM4.16917 7.1665L4.16667 17.1665H12.5V7.1665H4.16917ZM7.5 5.49984H14.1667V13.8332H15.8333V3.83317H7.5V5.49984Z" />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_2009_9684">
                                                                                            <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="twgtr-flex twgtr-items-center twgtr-flex-wrap twgtr-gap-x-[15px]">
                                                                    {
                                                                        compU ?
                                                                            (<></>)
                                                                            :
                                                                            (
                                                                                <div>
                                                                                    <div className="ssvc-gp">
                                                                                        <input type="checkbox" id="1" name="save_recipe" className="chkbx" onChange={handleSaveChk} checked={recSaved} />
                                                                                        <label htmlFor="1">
                                                                                            <div className="ssvc-igp">
                                                                                                <div>
                                                                                                    <div className="icon-befc">
                                                                                                        <IoBookmarkOutline size={20} />
                                                                                                    </div>
                                                                                                    <div className="icon-aftc">
                                                                                                        <IoBookmark size={20} />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <div className="lbl-befc">
                                                                                                        Save
                                                                                                    </div>
                                                                                                    <div className="lbl-aftc">
                                                                                                        Saved
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                    }
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            title="Print"
                                                                            className="twgtr-transition-all twgtr-py-[0px] twgtr-px-[10px] twgtr-font-open_sans twgtr-text-[20px] twgtr-text-slate-800 twgtr-border-2 twgtr-border-slate-800 dark:twgtr-text-slate-300 dark:twgtr-border-slate-300"
                                                                            onClick={() => handlePrint()}
                                                                        >
                                                                            <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[10px]">
                                                                                <HiMiniPrinter size={20} className="" />
                                                                                Print
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                        }
                                    </>
                                )
                        }
                    </div>
                </div>
                <div className="twgtr-bg-slate-100 dark:twgtr-bg-slate-700">
                    <div className="twgtr-max-w-[1240px] twgtr-px-4 twgtr-mx-auto twgtr-w-full md:twgtr-px-[20px] twgtr-relative twgtr-z-[5]">
                        {
                            loading ?
                                (
                                    <></>
                                )
                                :
                                (
                                    <>
                                        {
                                            error ?
                                                (
                                                    <></>
                                                )
                                                :
                                                (
                                                    <>
                                                        <div className="twgtr-relative" style={{ height: '1px', zIndex: '-10', visibility: 'hidden' }}>
                                                            <div ref={componentRef}>
                                                                <RecipeToPrint
                                                                    recipe_title={recTtl}
                                                                    recipe_type={recTyp}
                                                                    recipe_summary={recSum}
                                                                    recipe_content={recCont}
                                                                    recipe_serving={recSrv}
                                                                    recipe_prep_time={recPrpTm}
                                                                    recipe_cook_time={recCokTm}
                                                                    recipe_total_time={recTotTm}
                                                                    recipe_featured_image={recFeImg}
                                                                    recipe_ingredients={recIngs}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="twgtr-pb-4 md:twgtr-pb-8 twgtr-relative">
                                                            <img src={recFeImg == 'default' ? defaultFeImgPath : recFeImg} className="twgtr-w-full" alt="featured image" onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null; // prevents looping
                                                                currentTarget.src = fallBackFeImg;
                                                            }} />
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
                                                                            {
                                                                                recIngs.length > 0 ?
                                                                                    (
                                                                                        <ul className="twgtr-list-disc twgtr-font-open_sans twgtr-pl-[25px]">
                                                                                            {
                                                                                                recIngs.map((item: IngType) => (
                                                                                                    <li key={item.id} className="twgtr-transition-all last:twgtr-mb-0 twgtr-mb-2 twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-300">
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
                                                                    <div className="twgtr-pt-[20px]">
                                                                        <div className="twgtr-transition-all twgtr-border twgtr-border-solid twgtr-border-slate-300 twgtr-w-full twgtr-bg-white dark:twgtr-bg-slate-800 dark:twgtr-border-slate-600">
                                                                            <div className="twgtr-transition-all last:twgtr-border-b-0 twgtr-border-b twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-600 twgtr-p-[20px]">
                                                                                <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                                                                    Makes (Servings)
                                                                                </h5>
                                                                                <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                                                                    {recSrv == '' ? 'NA' : recSrv}
                                                                                </h6>
                                                                            </div>
                                                                            <div className="twgtr-transition-all last:twgtr-border-b-0 twgtr-border-b twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-600 twgtr-p-[20px]">
                                                                                <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                                                                    Prep Time
                                                                                </h5>
                                                                                <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                                                                    {recPrpTm == '' ? 'NA' : recPrpTm}
                                                                                </h6>
                                                                            </div>
                                                                            <div className="twgtr-transition-all last:twgtr-border-b-0 twgtr-border-b twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-600 twgtr-p-[20px]">
                                                                                <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                                                                    Cook Time
                                                                                </h5>
                                                                                <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                                                                    {recCokTm == '' ? 'NA' : recCokTm}
                                                                                </h6>
                                                                            </div>
                                                                            <div className="twgtr-transition-all last:twgtr-border-b-0 twgtr-border-b twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-600 twgtr-p-[20px]">
                                                                                <h5 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-theme-color-5 dark:twgtr-text-slate-300">
                                                                                    Total Time
                                                                                </h5>
                                                                                <h6 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-800 dark:twgtr-text-slate-300">
                                                                                    {recTotTm == '' ? 'NA' : recTotTm}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="twgtr-w-full lg:twgtr-w-[calc(100%-280px)]">
                                                                <div className="twgtr-transition-all twgtr-border-slate-300 twgtr-w-full twgtr-border twgtr-border-solid twgtr-p-[20px] twgtr-bg-white dark:twgtr-bg-slate-800 dark:twgtr-border-slate-600">
                                                                    <div className="recipe-content">
                                                                        {recCont !== '' ? parse(recCont) : (<h6>No Content Added By Author.</h6>)}
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
                                                                                        <NavLink to={`https://twitter.com/intent/tweet?text=${recTtl}&url=${share_uri}`} title="Share on Twitter" target="_blank">
                                                                                            <img src="/social-media/twitter-x.svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]" alt="Twitter" />
                                                                                        </NavLink>
                                                                                    </div>
                                                                                    <div>
                                                                                        <button type="button" title="Copy Link" onClick={copyURI}>
                                                                                            <svg width="100" height="100" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="twgtr-inline-block twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[35px] md:twgtr-h-[35px]">
                                                                                                <g clipPath="url(#clip0_2009_9684)">
                                                                                                    <path fill="#284218" className="twgtr-transition-all twgtr-fill-slate-700 dark:twgtr-fill-slate-400" d="M5.83333 5.49984V2.99984C5.83333 2.77882 5.92113 2.56686 6.07741 2.41058C6.23369 2.2543 6.44565 2.1665 6.66667 2.1665H16.6667C16.8877 2.1665 17.0996 2.2543 17.2559 2.41058C17.4122 2.56686 17.5 2.77882 17.5 2.99984V14.6665C17.5 14.8875 17.4122 15.0995 17.2559 15.2558C17.0996 15.412 16.8877 15.4998 16.6667 15.4998H14.1667V17.9998C14.1667 18.4598 13.7917 18.8332 13.3275 18.8332H3.33917C3.22927 18.8338 3.12033 18.8128 3.0186 18.7712C2.91687 18.7296 2.82436 18.6684 2.74638 18.5909C2.6684 18.5135 2.60649 18.4214 2.56421 18.32C2.52193 18.2185 2.50011 18.1097 2.5 17.9998L2.5025 6.33317C2.5025 5.87317 2.8775 5.49984 3.34167 5.49984H5.83333ZM4.16917 7.1665L4.16667 17.1665H12.5V7.1665H4.16917ZM7.5 5.49984H14.1667V13.8332H15.8333V3.83317H7.5V5.49984Z" />
                                                                                                </g>
                                                                                                <defs>
                                                                                                    <clipPath id="clip0_2009_9684">
                                                                                                        <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
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
                                                    </>
                                                )
                                        }
                                    </>
                                )
                        }
                    </div>

                    <div className="twgtr-transition-all twgtr-px-4 twgtr-pt-[25px] twgtr-pb-[50px] twgtr-bg-slate-200 dark:twgtr-bg-slate-800">
                        <div className="twgtr-max-w-[1240px] twgtr-mx-auto twgtr-w-full twgtr-relative twgtr-z-[5]">
                            <div className="twgtr-pb-[25px]">
                                <h4 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-bold twgtr-text-theme-color-1 dark:twgtr-text-theme-color-3">
                                    You May Also Like
                                </h4>
                            </div>

                            <div className="also-like">
                                {
                                    randRec.length > 0 ?
                                        (
                                            <>
                                                {
                                                    randRec.map((item) => (
                                                        <RecipeCard
                                                            key={item.id}
                                                            recipe_id={item.id}
                                                            recipe_type={item.recipe_type}
                                                            recipe_featured_image={item.recipe_featured_image}
                                                            categories={item.recipe_categories}
                                                            recipe_title={item.recipe_title}
                                                            recipe_summary={item.recipe_summary}
                                                            recipe_author_id={item.author.author_id}
                                                            recipe_author_name={item.author.author_name}
                                                        />
                                                    ))
                                                }
                                            </>
                                        )
                                        :
                                        (<h5>No Records Found</h5>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
};

export default ViewSingleRecipe;