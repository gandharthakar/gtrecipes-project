import { useEffect, useState } from 'react';
import JoditReact from "jodit-react-ts";
import { Jodit } from 'jodit';
import Select from "react-tailwindcss-select";
import 'react-tailwindcss-select/dist/index.css';
// import 'jodit/build/jodit.min.css';
import './../../../jodit.min.css';
import SiteBreadcrumb from "../../../components/website/SiteBreadcrumb";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RootState } from '../../../redux-service/ReduxStore';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { HiOutlinePlus } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { do_logout } from "../../../redux-service/website/auth/UserLoginReducer";

let checkDTheme = localStorage.getItem('site-dark-mode');
let thm = false;
if(checkDTheme) {
    let prs = JSON.parse(checkDTheme);
    thm = prs;
}

const config: Jodit['options'] = { ...Jodit.defaultOptions, height: 400, theme: `${thm ? 'dark':'light'}` }

function makeid(length:any) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

const GET_RECIPE_CATEGORIES = gql`
    query getAllRecipeCategories($id: ID!) {
        getAllRecipeCategories(id: $id) {
            id,
            recipe_category_name
        }
    }
`;

const GET_RECIPE_DETAILS = gql`
    query getSingleRecipe($id: ID!, $user_id: String!) {
        getSingleRecipe(id: $id, user_id: $user_id) {
            recipe_title,
            recipe_summary,
            recipe_categories {
                id,
                recipe_category_name
            },
            recipe_content,
            recipe_ingradients,
            recipe_featured_image
        }
    }
`;

const UPDATE_RECIPE = gql`
    mutation updateRecipe(
            $id: ID!, 
            $user_id: String!, 
            $recipe_title: String!, 
            $recipe_featured_image: String!, 
            $recipe_categories: [String], 
            $recipe_summary: String!, 
            $recipe_content: String!, 
            $recipe_ingradients: [String], 
        ) 
        {
            updateRecipe(
                id: $id, 
                user_id: $user_id, 
                recipe_title: $recipe_title, 
                recipe_featured_image: $recipe_featured_image, 
                recipe_categories: $recipe_categories,
                recipe_summary: $recipe_summary,
                recipe_content: $recipe_content, 
                recipe_ingradients: $recipe_ingradients, 
            ) 
            {
                message,
                success
            }
        }
`;

// Main Component
const EditRecipe = () => {
    let { uid, rid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const defaultFeImgPath = 'https://placehold.co/600x400?text=Featured+Image.';
    const feImgBasePath = `${import.meta.env.VITE_BACKEND_URI_BASE}/uploads/recipe-featured-images`;
    const fallBackFeImg = 'images/default-feimg.svg';

    const [recipeTitle, setRecipeTitle] = useState<string>('');
    const [recipeSummary, setRecipeSummary] = useState<string>('');
    const [eContent, setEContent] = useState<string>('');
    const [editorContent, setEditorContent] = useState<string>('');
    const [featuredImage, setFeaturedImage] = useState<string>('default');
    interface CategoryType {
        value: string,
        label: string
    }
    const [category, setCategory] = useState<CategoryType[]>([]);
    const [catOpts, setCatOpts] = useState<CategoryType[]>([]);
    const [fileExt, setFileExt] = useState<string>('');
    interface Recing {
        recipe_ingredient: string
    }
    const [recins, setRecins] = useState<Recing[]>([{recipe_ingredient: ''}]);
    const [hasFeImage, setHasFeImage] = useState<boolean>(false);
    const [imgFIle, setImgFile] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dumpImg, setDumpImg] =useState<string>('');
    const [brdRcName, setBrdRcName] =useState<string>('');

    useQuery(GET_RECIPE_CATEGORIES, {
        variables: { id: uid },
        onCompleted: fdata => {
            let ctdata = fdata.getAllRecipeCategories;
            // Set Option to category dropdown.
            let arr:CategoryType[] = [];
            ctdata.map((ctdata:any) => {
                return arr.push({value: ctdata.id, label: ctdata.recipe_category_name});
            });
            setCatOpts(arr);
        }
    });

    useQuery(GET_RECIPE_DETAILS, {
        variables: {
            id: rid,
            user_id: uid
        },
        onCompleted: fdata => {
            // console.log(fdata);
            let mdata = fdata.getSingleRecipe;
            // console.log(mdata[0]);

            // Set Recipe Title.
            let Allrt = mdata[0].recipe_title;
            setRecipeTitle(Allrt);
            setBrdRcName(Allrt);

            // Set Recipe Summary.
            let Allrcsum = mdata[0].recipe_summary;
            setRecipeSummary(Allrcsum);

            // Set Recipe Content.
            let allrcnt = mdata[0].recipe_content;
            setEContent(allrcnt);
            
            // Set Recipe Ingradients.
            let allins = mdata[0].recipe_ingradients;
            let inarr:Recing[] = [];
            if(allins.length > 0) {
                allins.map((item:string) => inarr.push({recipe_ingredient: item}));
            } else {
                inarr = [{recipe_ingredient: ''}];
            }
            setRecins(inarr);

            // Set Featured Image.
            let allfeimg = mdata[0].recipe_featured_image;
            if(allfeimg == 'default') {
                setFeaturedImage('default');
            } else {
                setHasFeImage(true);
                setFeaturedImage(feImgBasePath + '/' + allfeimg);
                setDumpImg(allfeimg);
                let fe = allfeimg.split('.');
                setFileExt(fe[1]);
            }

            // Set Recipe Categories.
            let allcts = mdata[0].recipe_categories;
            let ctarr:CategoryType[] = [];
            if(allcts.length > 0) {
                allcts.map((item:any) => ctarr.push({ value: item.id, label: item.recipe_category_name}));
            } else {
                ctarr = [];
            }
            setCategory(ctarr);
        }
    })

    let [updRec] = useMutation(UPDATE_RECIPE, {
        onCompleted: fdata => {
            // console.log(fdata);
            const toastDefOpts = {
                autoClose: 1000,
                closeOnClick: true,
                theme: `${ThemeMode ? 'dark' : 'light'}`
            };
            if(fdata.updateRecipe.success) {
                toast.success(fdata.updateRecipe.message, toastDefOpts);
                setIsLoading(true);
                if(featuredImage == 'default') {
                    setTimeout(function(){
                        // navigate(`/user-area/profile/${id}`);
                        window.location.href = `/user-area/profile/${uid}`;
                    }, 1500);
                }
            } else {
                toast.error(fdata.updateRecipe.message, toastDefOpts);
            }
        }
    });

    const removeFeImage = () => {
        const toastDefOpts = {
            autoClose: 1000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        };
        if(featuredImage !== 'default') {
            let conf = confirm("If you remove this image then it will also gets removed from server. Are you sure you want remove ?");
            if(conf) {
                axios.post(`${import.meta.env.VITE_BACKEND_URI_BASE}/delete-uploads/recipe-featured-images`, {fileName: dumpImg})
                .then((resp) => {
                    if(resp.status === 200) {
                        setHasFeImage(false);
                        setFeaturedImage('default');
                        toast.success("Image Removed Successfully!", toastDefOpts);
                        setDumpImg('');
                    }
                }).catch(err => console.log(err));
            }
        }
    }

    const handleAddInput = () => {
        setRecins([...recins, {recipe_ingredient: ''}]);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index:number) => {
        let value = event.target.value;
        let onChangeValue = [...recins];
        onChangeValue[index].recipe_ingredient = value;
        setRecins(onChangeValue);
    };

    const handleDeleteInput = (index:number) => {
        const newArray = [...recins];
        newArray.splice(index, 1);
        setRecins(newArray);
    };

    const handleFeImgChange = (e:any) => {
        const file = e.target.files[0];
        if(!file) return

        let gfnext = file.name;
		let fext = gfnext.split('.').pop();
        setImgFile(file);
		setFileExt(fext);
        setFeaturedImage(URL.createObjectURL(file));
    }

    const clearFeImageInput = () => {
        setFeaturedImage('default');
        setImgFile('');
    }

    const handleCategoryChange = (value:any) => {
        setCategory(value);
        // console.log("value:", value);
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const toastDefOpts = {
            autoClose: 3000,
            closeOnClick: true,
            theme: `${ThemeMode ? 'dark' : 'light'}`
        }

        const fnam = featuredImage;
        let newFileName = '';
        if(fnam == 'default') {
            newFileName = 'default';
        } else {
            newFileName = dumpImg ? dumpImg : `${makeid(12)}_${Date.now()}.${fileExt}`;
        }

        type RecData = {
            id: string,
            user_id: string,
            recipe_title: string,
            recipe_summary: string,
            recipe_content: string,
            recipe_ingradients: string[],
            recipe_featured_image: string,
            recipe_categories: string[],
        }

        let data: RecData = {
            id: '',
            user_id: '',
            recipe_title: '',
            recipe_summary: '',
            recipe_content: '',
            recipe_ingradients: [],
            recipe_featured_image: '',
            recipe_categories: [],
        };
        let ingradients: string[] = [];
        recins.map((item) => {
            if(item.recipe_ingredient !== '') {
                return ingradients.push(item.recipe_ingredient)
            } else {
                return [];
            }
        });
        // console.log(ingradients);

        if(recipeTitle == '' || editorContent == '' || recipeSummary == '') {
            toast.error("Required fields is empty.", toastDefOpts);
            data = {
                id: '',
                user_id: '',
                recipe_title: '',
                recipe_summary: '',
                recipe_content: '',
                recipe_ingradients: [],
                recipe_featured_image: '',
                recipe_categories: [],
            };
        } else {
            data = {
                id: rid ? rid : '',
                user_id: uid ? uid : '',
                recipe_title: recipeTitle,
                recipe_summary: recipeSummary,
                recipe_content: editorContent,
                recipe_ingradients: ingradients ? ingradients : [],
                recipe_featured_image: newFileName,
                recipe_categories: category && category.length > 0 ? category.map(item => item.value) : [],
            }
            
            updRec({
                variables: {...data}
            });
        }
        // console.log(data);

        if(fnam !== 'default') {
            const file = new File([imgFIle], newFileName);
            const fData = new FormData();
            fData.append('file', file);
            if(file.name !== dumpImg) {
                axios.post(`${import.meta.env.VITE_BACKEND_URI_BASE}/site-uploads/recipe-featured-images`, fData)
                .then((res) => {
                    // console.log(res);
                    if(res.status === 200) {
                        setTimeout(function(){
                            // navigate(`/user-area/profile/${id}`);
                            window.location.href = `/user-area/profile/${uid}`;
                        }, 1500);
                    }  else {
                        toast.error("Something Is Wrong!", toastDefOpts);
                    }
                })
                .catch(err => toast.error(err.message, toastDefOpts));
            } else {
                setTimeout(function(){
                    // navigate(`/user-area/profile/${id}`);
                    window.location.href = `/user-area/profile/${uid}`;
                }, 1500);
            }
        }
    }

    useEffect(() => {
        const cookies = new Cookies();
        const authUserID = cookies.get("gjtrewcipets_auth_user_id");
        if(uid !== authUserID) {
            dispatch(do_logout());
            navigate("/");
            let ss = setTimeout(function(){
                window.location.reload();
                clearTimeout(ss);
            }, 200);
        }

        if(authUserID !== uid) {
            dispatch(do_logout());
            navigate("/");
            let ss = setTimeout(function(){
                window.location.reload();
                clearTimeout(ss);
            }, 200);
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name={brdRcName} page_title="Edit Recipe" />
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="twgtr-flex twgtr-gap-[20px] twgtr-items-start twgtr-flex-col lg:twgtr-flex-row">
                            <div className="twgtr-transition-all twgtr-w-full lg:twgtr-w-[70%] twgtr-bg-white twgtr-border twgtr-border-solid twgtr-border-slate-200 twgtr-px-4 twgtr-py-6 dark:twgtr-bg-slate-700 dark:twgtr-border-slate-600">
                                <div className="twgtr-pb-4">
                                    <label htmlFor="recttl" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Recipe Title
                                    </label>
                                    <input 
										type="text" 
										name="recipe_title" 
                                        id="recttl"
										className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Eg. Chocolate Cake" 
										autoComplete="off"
                                        onChange={(e) => setRecipeTitle(e.target.value)}
                                        value={recipeTitle}
									/>
                                </div>
                                <div className="twgtr-pb-4">
                                    <label htmlFor="recsum" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Recipe Summary
                                    </label>
                                    {/* <input 
										type="text" 
										name="recipe_summary" 
                                        id="recsum"
										className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										autoComplete="off"
                                        onChange={(e) => setRecipeSummary(e.target.value)}
                                        value={recipeSummary}
									/> */}
                                    <textarea 
                                        name="recipe_summary" 
                                        id="recsum" 
                                        className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                        rows={5} 
                                        value={recipeSummary} 
                                        onChange={(e) => setRecipeSummary(e.target.value)}
                                        autoComplete="off"></textarea>
                                </div>
                                <div className="twgtr-pb-4">
                                    <label className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Recipe Content
                                    </label>
                                    <div className='site-joedit-adj'>
                                        <JoditReact 
                                            onChange={(content) => setEditorContent(content)} 
                                            defaultValue={eContent}
                                            config={config}
                                        />
                                    </div>
                                    {/* {editorContent} */}
                                </div>
                                <div className="twgtr-pb-4">
                                    <label className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Recipe Ingredients.
                                    </label>
                                    {
                                        recins.map((items, index) => (
                                            <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[15px] twgtr-pb-4 last:twgtr-pb-0" key={index}>
                                                <div className="twgtr-flex-1">
                                                    <input 
                                                        type="text" 
                                                        name="recipe_ingredient" 
                                                        className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                                        placeholder="Eg. 1kg of Water" 
                                                        autoComplete="off"
                                                        value={items.recipe_ingredient}
                                                        onChange={(event) => handleChange(event, index)}
                                                    />
                                                </div>
                                                <div className="twgtr-flex twgtr-gap-x-[15px]">
                                                    {index === recins.length - 1 && (
                                                        <button type="button" title="Add Ingredient" onClick={() => handleAddInput()}>
                                                            <HiOutlinePlus size={20} className="twgtr-transition-all twgtr-w-[15px] twgtr-h-[15px] md:twgtr-w-[20px] md:twgtr-h-[20px] twgtr-text-theme-color-1 dark:twgtr-text-theme-color-3" />
                                                        </button>
                                                    )}
                                                    {recins.length > 1 && (
                                                        <button type="button" title="Remove Ingredient" onClick={() => handleDeleteInput(0)}>
                                                            <RiDeleteBin6Line size={20} className="twgtr-transition-all twgtr-w-[15px] twgtr-h-[15px] md:twgtr-w-[20px] md:twgtr-h-[20px] twgtr-text-red-600 dark:twgtr-text-red-400" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="twgtr-transition-all twgtr-w-full lg:twgtr-w-[30%] twgtr-bg-white twgtr-border twgtr-border-solid twgtr-border-slate-200 twgtr-px-4 twgtr-py-6 dark:twgtr-bg-slate-700 dark:twgtr-border-slate-600">
                                <div className="twgtr-pb-4">
                                    <label className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Featured Image
                                    </label>
                                    <img src={featuredImage == 'default' ? defaultFeImgPath : featuredImage} className="twgtr-mb-2 twgtr-block twgtr-w-full" alt="photo" 
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src=fallBackFeImg;
                                      }} />
                                    {
                                        hasFeImage ? 
                                        (
                                            <div className="twgtr-text-right">
                                                <button type="button" title="Remove Image" className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] twgtr-text-theme-color-1 twgtr-underline dark:twgtr-text-slate-200" onClick={removeFeImage}>
                                                    Remove Image
                                                </button>
                                            </div>
                                        ) 
                                        : 
                                        (
                                            <>
                                                <div className="twgtr-flex twgtr-gap-x-[15px] twgtr-items-center twgtr-justify-between">
                                                    <div>
                                                        <label htmlFor="nfimg" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-theme-color-2 twgtr-bg-theme-color-2 twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2-hover-dark hover:twgtr-border-theme-color-2-hover-dark">
                                                            <input type="file" id="nfimg" name="featured_image" className="twgtr-hidden" onChange={handleFeImgChange} />
                                                            Choose Image
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <button type="button" title="Clear" className="twgtr-transition-all twgtr-text-slate-700 hover:twgtr-text-theme-color-4 dark:twgtr-text-slate-300 dark:hover:twgtr-text-theme-color-4" onClick={clearFeImageInput}>
                                                            Clear
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="twgtr-pb-8">
                                    <label className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Select Category
                                    </label>
                                    <Select
                                        primaryColor={"indigo"}
                                        noOptionsMessage="No Categories Added."
                                        value={category}
                                        onChange={handleCategoryChange}
                                        options={catOpts}
                                        isSearchable={true}
                                        isMultiple={true}
                                        isClearable={true}
                                        classNames={{
                                            menuButton: () => (`flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-indigo-500 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200`),
                                            tagItem: () => (`bg-gray-200 border rounded-sm flex space-x-1 pl-1 dark:[&>p.select-none]:!twgtr-text-slate-200 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-700 dark:twgtr-text-slate-200`),
                                        }}
                                    />
                                </div>
                                {
                                    isLoading ? 
                                    (
                                        <div className="twgtr-flex twgtr-gap-x-[10px] twgtr-items-center">
                                            <div>
                                                <div className="site-spinner !twgtr-w-[30px] !twgtr-h-[30px] md:!twgtr-w-[35px] md:!twgtr-h-[35px]"></div>
                                            </div>
                                            <div>
                                                <h6 className="twgtr-text-[16px] md:twgtr-text-[20px] twgtr-text-slate-600">
                                                    Processing...
                                                </h6>
                                            </div>
                                        </div>
                                    ) 
                                    : 
                                    (
                                        <div className="twgtr-text-right">
                                            <button type="submit" title="Update" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-4 twgtr-py-2 md:twgtr-px-5 md:twgtr-py-3 twgtr-border twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-4-hover-dark hover:twgtr-border-theme-color-4-hover-dark">
                                                Update
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditRecipe;