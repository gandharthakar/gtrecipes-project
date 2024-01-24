import { useRef } from "react";
import { PiPlusBold } from "react-icons/pi";
import { PiMinusBold } from "react-icons/pi";

const FAQAccordion = (props:any) => {
	const { ques_text, children, show_icon, is_open, onClick } = props;

	const accRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<div className="site-acc-item twgtr-transition-all twgtr-overflow-hidden twgtr-border-b twgtr-border-solid twgtr-border-slate-500">
				<button type="button" className={`twgtr-transition-all twgtr-block twgtr-w-full twgtr-py-5 twgtr-px-4 hover:twgtr-bg-slate-100 hover:twgtr-text-theme-color-4 dark:hover:twgtr-bg-slate-500 dark:twgtr-text-slate-200 dark:hover:twgtr-text-theme-color-3 ${is_open ? 'active' : ''}`} onClick={onClick}>
					<div className="twgtr-transition-all twgtr-flex twgtr-items-start twgtr-gap-x-4 twgtr-justify-between">
						<h4 className="twgtr-transition-all twgtr-text-[16px] md:twgtr-text-[18px] twgtr-font-open_sans twgtr-font-bold twgtr-text-left">
							{ques_text}
						</h4>
						{
							show_icon == 'true' ? 
							(
								<>
									<div>
										{
											is_open ? 
											(
												<>
													<PiMinusBold size={20} className="twgtr-transition-all twgtr-translate-y-[2px] twgtr-h-auto twgtr-w-[20px] md:twgtr-w-[25px]" />
												</>
											) 
											: 
											(
												<>
													<PiPlusBold size={20} className="twgtr-transition-all twgtr-translate-y-[2px] twgtr-h-auto twgtr-w-[20px] md:twgtr-w-[25px]" />
												</>
											)
										}
										
									</div>
								</>
							) 
							: 
							('')
						}
					</div>
				</button>
				<div className="twgtr-transition-all twgtr-px-4" ref={accRef} style={is_open ? {height: accRef.current !== null ? accRef.current.scrollHeight : ''} : {height: "0px"}}>
					{children}
				</div>
			</div>
		</>
	)
}

export default FAQAccordion;