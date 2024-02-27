import { BiSolidQuoteAltLeft } from "react-icons/bi";

interface CompProp {
    photo: string,
    testimonial_content: string,
    testimonial_person_name: string,
    testimonial_person_designation: string
}

const TestimonialsCard = (props: CompProp) => {
    let { photo, testimonial_content, testimonial_person_name, testimonial_person_designation } = props;
    return (
        <>
            <div className="twgtr-bg-white">
                <div className="">
                    <img src={photo} alt="photo" />
                </div>
                <div className="twgtr-bg-slate-200 twgtr-relative twgtr-h-[1px]">
                    <div className="twgtr-absolute twgtr-left-[15px] md:twgtr-left-[30px] twgtr-top-1/2 twgtr-z-[5] twgtr-translate-y-[-50%]">
                        <div className="twgtr-flex twgtr-justify-center twgtr-items-center twgtr-w-[50px] twgtr-h-[50px] twgtr-bg-theme-color-2 twgtr-text-white twgtr-rounded-full dark:twgtr-bg-theme-color-5">
                            <BiSolidQuoteAltLeft size={25} />
                        </div>
                    </div>
                </div>
                <div className="twgtr-pt-[30px] twgtr-pb-[30px] twgtr-px-[15px] md:twgtr-px-[30px]">
                    <div className="twgtr-pb-[25px]">
                        <p className="twgtr-font-open_sans twgtr-text-black twgtr-text-[14px] md:twgtr-text-[16px]">
                            {testimonial_content}
                        </p>
                    </div>
                    <div>
                        <h5 className="twgtr-font-ubuntu twgtr-text-slate-800 dark:twgtr-text-slate-800 twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px]">
                            {testimonial_person_name}
                        </h5>
                        <h6 className="twgtr-font-ubuntu twgtr-text-slate-400 dark:twgtr-text-slate-400 twgtr-text-[14px] md:twgtr-text-[16px]">
                            {testimonial_person_designation}
                        </h6>
                    </div>
                </div>
            </div>
        </>
    )
};

export default TestimonialsCard;