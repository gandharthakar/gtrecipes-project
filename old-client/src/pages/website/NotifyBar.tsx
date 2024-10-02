
import { GoInfo } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoCheckCircle } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { useEffect } from "react";

interface CompProp {
    notify_title: string,
    message: string,
    view_notify_icon?: boolean,
    notify_type?: string,
    notify_closable?: boolean,
    show_bar?: boolean,
    set_show_bar?: any,
    open_on_page_load?: boolean
}

const NotifyBar = (props: CompProp) => {

    const { notify_title, message, notify_type="default", view_notify_icon=false, notify_closable=false, show_bar=false, set_show_bar, open_on_page_load=false } = props;
    const AllowedTypes: string[] = ["info", "error", "warning", "success", "default"];

    const handleCloseClick = () => {
        set_show_bar(false);
    }

    useEffect(() => {
        if(open_on_page_load) {
            if(set_show_bar) {
                set_show_bar(true);
            }
        }
    //eslint-disable-next-line
    }, []);

    return (
        <>
            {
                show_bar ? 
                (
                    <div className={`twgtr-border-t-4 twgtr-rounded-b twgtr-px-4 twgtr-py-3 twgtr-shadow-md notify-bar ${AllowedTypes.includes(notify_type) ? notify_type : 'default'}`} role="alert">
                        <div className="twgtr-flex twgtr-gap-x-[15px] twgtr-items-start">
                            {
                                view_notify_icon ? 
                                (
                                    <div className="twgtr-py-1">
                                        <IoImageOutline className="icon icon-default" />
                                        <GoInfo size={20} className="icon icon-info" />
                                        <IoWarningOutline size={20} className="icon icon-warning" />
                                        <IoIosCloseCircleOutline size={20} className="icon icon-error" />
                                        <GoCheckCircle size={20} className="icon icon-success" />
                                    </div>
                                ) 
                                : 
                                ("")
                            }
                            <div className="twgtr-mr-auto">
                                <p className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[18px] md:twgtr-text-[20px] title">
                                    {notify_title}
                                </p>
                                <p className="twgtr-transition-all twgtr-text-[16px] md:twgtr-text-[18px] message">
                                    {message}
                                </p>
                            </div>
                            {
                                notify_closable ? 
                                (
                                    <button type="button" title="Close" onClick={handleCloseClick}>
                                        <MdOutlineClose size={22} className="twgtr-w-[20px] twgtr-h-[20px] md:twgtr-w-[25px] md:twgtr-h-[25px] twgtr-text-slate-900 close-x" />
                                    </button>
                                ) 
                                : 
                                ("")
                            }
                        </div>
                    </div>
                ) 
                : 
                ("")
            }
            
        </>
    )
};

export default NotifyBar;