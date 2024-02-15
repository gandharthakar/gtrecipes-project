import { MdOutlineCategory } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
// import { RootState } from "../../redux-service/ReduxStore";
// import { useSelector } from "react-redux";
import SiteModal from "./SiteModal";
import { gql, useMutation } from "@apollo/client";
// import { toast, ToastContainer } from 'react-toastify';

const UPDATE_CATEGORY = gql`
    mutation updateRecipeCategories($category_name: String!, $category_name_old: String!, $category_slug: String!, $category_auth_id: String!) {
        updateRecipeCategories(category_name: $category_name, category_name_old: $category_name_old, category_slug: $category_slug, category_auth_id: $category_auth_id) {
            message,
            success
        }
    }
`;

const DELETE_CATEGORY = gql`
    mutation deleteRecipeCategory($id: ID!) {
        deleteRecipeCategory(id: $id) {
            message,
            success
        }
    }
`;

/* Encode string to slug */
function convertToSlug( str:string ) {
    
    //replace all special characters | symbols with a space
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
             .toLowerCase();
      
    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm,'');
      
    // replace space with dash/hyphen
    str = str.replace(/\s+/g, '-');   
    return str;
}

const CategoryCard = (props:any) => {
    // const ThemeMode = useSelector((state: RootState) => state.site_theme_mode.dark_theme_mode);
    const [showModal, setShowModal] = useState(false);
    let { user_id, user_name, category_id, category_name, category_slug } = props;
    const [createCat, setCreateCat] = useState(category_name);
    const [createCatSlug, setCreateCatSlug] = useState(category_slug);

    // Update Category.
    let [updCat] = useMutation(UPDATE_CATEGORY, {
        onCompleted: fdata => {
            // console.log(fdata);
            alert(fdata.updateRecipeCategories.message);
            if(fdata.updateRecipeCategories.success) {
                window.location.reload();
            }
        }
    });

    // Delete Category.
    let [delCat] = useMutation(DELETE_CATEGORY, {
        onCompleted: fdata => {
            // console.log(fdata);
            alert(fdata.deleteRecipeCategory.message);
            if(fdata.deleteRecipeCategory.success) {
                window.location.reload();
            }
        }
    });

    const handleCreateCatModalInputChange = (e:any) => {
        const value = e.target.value;
        setCreateCat(value);
        setCreateCatSlug(convertToSlug(value));
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        // const toastDefOpts = {
        //     autoClose: 3000,
        //     closeOnClick: true,
        //     theme: `${ThemeMode ? 'dark' : 'light'}`
        // }

        let ct_data = {
            category_name: '',
            category_slug: ''
        };
        if(createCat == '') {
            // toast.error("Required fields is empty.", toastDefOpts);
            alert("Required fields is empty.");
            ct_data = {
                category_name: '',
                category_slug: ''
            };
        } else {
            ct_data = {
                category_name: createCat,
                category_slug: createCatSlug
            }
            updCat({
                variables: {
                    category_auth_id: user_id,
                    category_name_old: category_name,
                    category_name: ct_data.category_name,
                    category_slug: ct_data.category_slug
                }
            });
            setShowModal(!showModal);
        }
        // console.log(ct_data);
    }

    const handleDelete = () => {
        const conf = confirm("Are you sure want to delete this category ?");
        if(conf) {
            delCat({
                variables: {
                    id: category_id
                }
            });
        }
    }

    return (
        <>
            {/* <ToastContainer /> */}
            <div style={{display: 'none'}}>
                {user_id} {category_id}
            </div>
            <div className="twgtr-transition-all twgtr-py-[10px] twgtr-px-[15px] twgtr-border twgtr-border-solid last:twgtr-mb-0 twgtr-mb-4 twgtr-border-slate-300 twgtr-bg-slate-100 dark:twgtr-bg-slate-600 dark:twgtr-border-slate-500">
                <div className="twgtr-flex twgtr-flex-col md:twgtr-flex-row md:twgtr-items-center md:twgtr-justify-between twgtr-gap-x-[20px] twgtr-gap-y-[15px]">
                    <div className="twgtr-flex twgtr-items-start twgtr-gap-x-[10px]">
                        <MdOutlineCategory size={30} className="twgtr-transition-all twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[30px] md:twgtr-h-[30px] twgtr-text-theme-color-1 dark:twgtr-text-slate-200" />
                        <div>
                            <h3 className="twgtr-transition-all twgtr-block twgtr-font-open_sans twgtr-font-bold twgtr-text-theme-color-4 dark:twgtr-text-slate-200 twgtr-break-all twgtr-text-[16px] md:twgtr-text-[18px]">
                                {category_name}
                            </h3>
                            <h4 className="twgtr-transition-all twgtr-block twgtr-font-open_sans twgtr-text-slate-700 dark:twgtr-text-slate-300 twgtr-break-all twgtr-text-[14px] md:twgtr-text-[16px]">
                                {category_slug}
                                <div style={{display: 'none'}}>{user_name}</div>
                            </h4>
                        </div>
                    </div>
                    <div className="twgtr-flex twgtr-items-center twgtr-gap-x-[20px] twgtr-pl-[35px] md:twgtr-pl-0">
                        <button type="button" title="Edit Category" className="" onClick={() => setShowModal(true)}>
                            <MdEdit size={20} className="twgtr-transition-all twgtr-w-[15px] twgtr-h-[15px] md:twgtr-w-[20px] md:twgtr-h-[20px] twgtr-text-sky-600 dark:twgtr-text-sky-300" />
                        </button>
                        <button type="button" title="Delete Category" className="" onClick={handleDelete}>
                            <FaRegTrashAlt size={20} className="twgtr-transition-all twgtr-w-[15px] twgtr-h-[15px] md:twgtr-w-[20px] md:twgtr-h-[20px] twgtr-text-red-600 dark:twgtr-text-red-300" />
                        </button>
                    </div>
                </div>
            </div>

            <SiteModal 
                modal_heading="Edit Category" 
                backdrop={true} 
                hide_modal_on_backdrop_click={true}
                openState={showModal}
                setOpenState={setShowModal}
            >
                <form onSubmit={handleSubmit}>
                    <div className="twgtr-transition-all twgtr-bg-white dark:twgtr-bg-slate-700">
                        <div className="twgtr-p-[20px]">
                            <div className="twgtr-pb-4">
                                <label htmlFor="catnam" className="twgtr-transition-all twgtr-inline-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-theme-color-4 twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                    Category Name
                                </label>
                                <input 
                                    type="text" 
                                    name="category_name" 
                                    id="catnam"
                                    className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 dark:focus:twgtr-border-theme-color-4" 
                                    placeholder="Eg. Cakes And Pastries" 
                                    autoComplete="off"
                                    onChange={handleCreateCatModalInputChange}
                                    value={createCat}
                                />
                            </div>
                            <div>
                                <label htmlFor="catslg" className="twgtr-transition-all twgtr-inline-block twgtr-pb-2 twgtr-font-ubuntu twgtr-font-medium twgtr-text-[14px] md:twgtr-text-[18px] twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                    Category Slug
                                </label>
                                <input 
                                    type="text" 
                                    name="category_slug" 
                                    id="catslg"
                                    className="twgtr-transition-all twgtr-w-full twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border twgtr-border-solid twgtr-border-slate-400 twgtr-bg-white twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] focus:twgtr-outline-0 focus:twgtr-ring-0 focus:twgtr-border-theme-color-4 dark:twgtr-border-slate-500 dark:twgtr-bg-slate-600 dark:twgtr-text-slate-200 read-only:twgtr-bg-slate-100 read-only:focus:twgtr-border-slate-400 dark:read-only:twgtr-bg-slate-500" 
                                    placeholder="Eg. cakes-and-pastries" 
                                    autoComplete="off"
                                    readOnly
                                    value={createCatSlug}
                                />
                            </div>
                        </div>
                        <div className="twgtr-transition-all twgtr-border-t twgtr-border-slate-300 twgtr-border-solid dark:twgtr-border-slate-500">
                            <div className="twgtr-px-[20px] twgtr-py-[10px] twgtr-flex twgtr-gap-x-4 twgtr-gap-y-3 twgtr-flex-wrap twgtr-items-center twgtr-justify-end">
                                <button type="button" title="Close" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-2 twgtr-text-theme-color-2 hover:twgtr-text-slate-200 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-2 hover:twgtr-border-theme-color-2 dark:twgtr-border-slate-300 dark:twgtr-text-slate-300 dark:hover:twgtr-bg-slate-300 dark:hover:twgtr-text-slate-700" onClick={() => setShowModal(!showModal)}>
                                    Close
                                </button>
                                <button type="submit" title="Update" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-2 twgtr-py-1 md:twgtr-px-4 md:twgtr-py-2 twgtr-border-2 twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 hover:twgtr-bg-theme-color-4-hover-dark twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-border-theme-color-4-hover-dark">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </SiteModal>
        </>
    )
};

export default CategoryCard;