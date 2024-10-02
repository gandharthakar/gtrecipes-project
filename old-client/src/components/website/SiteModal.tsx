import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface CompProp {
    open_modal_on_page_load?: boolean,
    openState: boolean,
    setOpenState: any,
    modal_heading: string,
    backdrop?: boolean,
    hide_modal_on_backdrop_click?: boolean,
    modal_max_width?: number,
    children: React.ReactNode
}

const SiteModal = (props: CompProp) => {
    const { open_modal_on_page_load=false, openState, setOpenState, modal_heading, backdrop=true, hide_modal_on_backdrop_click, modal_max_width=600, children } = props;

    const handleBackDropClick = () => {
        if(hide_modal_on_backdrop_click) {
            setOpenState(false);
        }
    }
    const calcmaxw = `calc(100% - 40px)`;

    useEffect(() => {
        if(open_modal_on_page_load) {
            setOpenState(true);
        }
    //eslint-disable-next-line
    }, [open_modal_on_page_load]);

    return (
        <>
            {
             openState ? (
                <>
                    {
                        backdrop ? (
                            <>
                                <div className="twgtr-transition-all twgtr-fixed twgtr-top-0 twgtr-left-0 twgtr-w-full twgtr-h-full twgtr-z-[30] twgtr-bg-black/50 twgtr-backdrop-blur-[3px]" onClick={handleBackDropClick}></div>
                            </>
                        ) 
                        : 
                        ('')
                    }
                    <div className="twgtr-transition-all twgtr-fixed twgtr-top-1/2 twgtr-left-1/2 twgtr-translate-x-[calc(-50%-20px)] twgtr-translate-y-[calc(-50%-20px)] twgtr-w-full twgtr-my-[20px] twgtr-mx-[20px] twgtr-z-[32] twgtr-max-h-[calc(100%-40px)] twgtr-overflow-y-auto" style={{width: calcmaxw, maxWidth: modal_max_width+'px'}}>
                        <div className="twgtr-transition-all twgtr-bg-white twgtr-w-full twgtr-mx-auto dark:twgtr-bg-slate-700 twgtr-border twgtr-border-slate-300 twgtr-border-solid dark:twgtr-border-slate-500" style={{maxWidth: modal_max_width+'px'}}>
                            {modal_heading && (
                                <header className="twgtr-flex twgtr-items-center twgtr-gap-x-4 twgtr-justify-between twgtr-p-[20px] twgtr-border-b twgtr-border-slate-300 twgtr-border-solid dark:twgtr-border-slate-500">
                                    <h1 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[18px] md:twgtr-text-[22px] twgtr-font-medium twgtr-text-theme-color-1 dark:twgtr-text-slate-200">
                                        {modal_heading}
                                    </h1>
                                    <div>
                                        <IoCloseSharp size={20} className="twgtr-transition-all twgtr-cursor-pointer twgtr-w-[25px] twgtr-h-[25px] md:twgtr-w-[30px] md:twgtr-h-[30px] twgtr-text-slate-700 dark:twgtr-text-slate-200" onClick={handleBackDropClick} />
                                    </div>
                                </header>
                            )}
                            <div>
                                {children}
                            </div>
                        </div>
                    </div>
                </>
                ) : ('')
            }
        </>
    )
};

export default SiteModal;