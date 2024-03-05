import { useState } from "react";
import ReactPaginate from "react-paginate";
import RecipeCard from "../../../components/website/RecipeCard";

const URSSVpage = (props:any) => {

    let { cdata, itemsPerPage=5 } = props;

    const [itemOffset, setItemOffset] = useState<number>(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = cdata.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(cdata.length / itemsPerPage);
    // const baseURIFeImg = `${import.meta.env.VITE_BACKEND_URI_BASE}/uploads/recipe-featured-images`;

    const handlePageClick = (event:any) => {
        const newOffset = (event.selected * itemsPerPage) % cdata.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="twgtr-grid twgtr-grid-cols-1 md:twgtr-grid-cols-2 twgtr-gap-[20px]">
                {
                    currentItems?.map((item:any) => (
                        <RecipeCard key={item.id} recipe_id={item.id} recipe_type={item.recipe_type} recipe_featured_image={item.recipe_featured_image} categories={item.recipe_categories} recipe_title={item.recipe_title} recipe_summary={item.recipe_summary} recipe_author_id={item.author.author_id} recipe_author_name={item.author.author_name} page_reload_on_unsave={true} />
                    ))
                }
            </div>

            {
                pageCount === 1 ? (<></>) : (
                    <div className='pgn-wrapper-rec'>
                        <ReactPaginate
                            className="pagination-list"
                            activeLinkClassName="active"
                            previousClassName="pg-btns prev-pg-btns"
                            nextClassName="pg-btns next-pg-btns"
                            pageLinkClassName="nav-link"
                            breakLabel="..."
                            breakClassName="dot-break"
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            previousLabel="Prev"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                )
            }
        </>
    )
};

export default URSSVpage;