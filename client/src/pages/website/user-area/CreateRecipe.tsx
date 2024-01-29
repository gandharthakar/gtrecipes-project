import { useState } from 'react';
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

function getDateTimeString() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'short' })[0].toUpperCase() // Extract first letter and capitalize with [0]
        + now.toLocaleString('default', { month: 'short' }).slice(1); // Append remaining lowercase letters with slice(1)
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return `${day} ${month} ${year}, ${hour}:${minute}:${second}`;
}

const CreateRecipe = () => {
    const navigate = useNavigate();
    const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const defaultFeImgPath = 'https://placehold.co/600x400?text=Featured+Image.';

    const [recipeTitle, setRecipeTitle] = useState<string>('');
    const [editorContent, setEditorContent] = useState<string>();
    const [featuredImage, setFeaturedImage] = useState<string>(defaultFeImgPath);
    const [category, setCategory] = useState([
        {
            value: 'uncategorized',
            label: "Uncategorized"
        }
    ]);
    const [catOpts, setCatOpts] = useState([
        {
            value: 'uncategorized',
            label: "Uncategorized"
        },
        {
            value: 'category-1',
            label: "Category-1"
        },
        {
            value: 'category-2',
            label: "Category-2"
        }
    ]);
    const [fileExt, setFileExt] = useState('');

    const handleFeImgChange = (e:any) => {
        const file = e.target.files[0];
        if(!file) return

        let gfnext = file.name;
		let fext = gfnext.split('.').pop();
		setFileExt(fext);
        setFeaturedImage(URL.createObjectURL(file));
    }

    const clearFeImageInput = () => {
        setFeaturedImage(defaultFeImgPath);
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
        if(fnam == defaultFeImgPath) {
            newFileName = 'default';
        } else {
            newFileName = `${makeid(12)}_${Date.now()}.${fileExt}`;
        }

        let data = {};

        if(recipeTitle == '' || editorContent == undefined) {
            toast.error("Required fields is empty.", toastDefOpts);
            data = {};
        } else {
            data = {
                recipe_title: recipeTitle,
                recipe_content: editorContent,
                recipe_featured_image: newFileName,
                recipe_categories: category && category.length > 0 ? category.map(item => item.value) : ['uncategorized'],
                recipe_author: "Author Name",
                recipe_author_id: 1,
                recipe_created_at: getDateTimeString()
            }
            navigate('/user-area/profile/1');
        }

        console.log(data);

        if(fnam !== defaultFeImgPath) {
            // const file = new File([fnam], newFileName);
            // const fData = new FormData();
            // fData.append('file', file);
            // axios.post('http://localhost:48256/site-uploads', fData)
            // .then((res) => {
            //     console.log(res);
            // })
            // .catch(err => console.log(err));
            // let ss = setTimeout(()=> {
            //     // Clear Stuff
            //     clearTimeout(ss);
            // }, 200);
        }

    }

    return (
        <>
            <ToastContainer />
            <SiteBreadcrumb page_name="New Recipe" page_title="Create New Recipe" />
            <div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-py-10 twgtr-px-4 dark:twgtr-bg-slate-800">
                <div className="site-container">
                    <form onSubmit={handleSubmit}>
                        <div className="twgtr-flex twgtr-gap-[20px] twgtr-items-start twgtr-flex-col lg:twgtr-flex-row">
                            <div className="twgtr-transition-all twgtr-w-full lg:twgtr-w-[70%] twgtr-bg-white twgtr-border twgtr-border-solid twgtr-border-slate-200 twgtr-px-4 twgtr-py-6 dark:twgtr-bg-slate-700 dark:twgtr-border-slate-600">
                                <div className="twgtr-pb-4">
                                    <label htmlFor="recttl" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[16px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Recipe Title
                                    </label>
                                    <input 
										type="text" 
										name="recipe_title" 
                                        id="recttl"
										className="twgtr-transition-all twgtr-w-full twgtr-px-4 twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[18px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
										placeholder="Eg. Chocolate Cake" 
										autoComplete="off"
                                        onChange={(e) => setRecipeTitle(e.target.value)}
                                        value={recipeTitle}
									/>
                                </div>
                                <div className="twgtr-pb-4">
                                    <label className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[16px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Recipe Description
                                    </label>
                                    <div className='site-joedit-adj'>
                                        <JoditReact 
                                            onChange={(content) => setEditorContent(content)} 
                                            defaultValue="" 
                                            config={config}
                                        />
                                    </div>
                                    {/* {editorContent} */}
                                </div>
                            </div>
                            <div className="twgtr-transition-all twgtr-w-full lg:twgtr-w-[30%] twgtr-bg-white twgtr-border twgtr-border-solid twgtr-border-slate-200 twgtr-px-4 twgtr-py-6 dark:twgtr-bg-slate-700 dark:twgtr-border-slate-600">
                                <div className="twgtr-pb-4">
                                    <label className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[16px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
                                        Featured Image
                                    </label>
                                    <img src={featuredImage} className="twgtr-mb-2 twgtr-block twgtr-w-full" alt="photo" />
                                    <div className="twgtr-flex twgtr-gap-x-[15px] twgtr-items-center twgtr-justify-between">
                                        <div>
                                            <label htmlFor="nfimg" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-4 twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-theme-color-2 twgtr-bg-theme-color-2 twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[18px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2-hover-dark hover:twgtr-border-theme-color-2-hover-dark">
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
                                </div>
                                <div className="twgtr-pb-8">
                                    <label className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[16px] md:twgtr-text-[18px] twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
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
                                <div className="twgtr-text-right">
                                    <button type="submit" title="Publish" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-5 twgtr-py-3 twgtr-border twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[18px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-4-hover-dark hover:twgtr-border-theme-color-4-hover-dark">
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateRecipe;