import { useState } from "react";
import CategoryCard from "../../../components/website/CategoryCard";
import ReactPaginate from "react-paginate";

const RCSpage = (props:any) => {

    let { cdata, itemsPerPage=5 } = props;

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = cdata.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(cdata.length / itemsPerPage);

    const handlePageClick = (event:any) => {
        const newOffset = (event.selected * itemsPerPage) % cdata.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {
                currentItems?.map((item:any) => (
                    <CategoryCard key={item.id} user_id={item.category_auth_id} user_name={item.category_auth_name} category_id={item.id} category_name={item.category_name} category_slug={item.category_slug} />
                ))
            }

            {
                pageCount === 1 ? (<></>) : (
                    <div className='pgn-wrapper'>
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

export default RCSpage;