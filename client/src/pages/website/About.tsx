import SiteBreadcrumb from "../../components/website/SiteBreadcrumb";

function About() {
	return (
		<>
			<SiteBreadcrumb page_name="About Us" />
			<div className="twgtr-transition-all twgtr-bg-slate-100 twgtr-px-4 twgtr-py-6 dark:twgtr-bg-slate-800">
				<div className="site-container">
					<div className="twgtr-py-6">
						<div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-x-8 twgtr-gap-y-4">
							<div className="twgtr-w-full twgtr-flex-none lg:twgtr-flex-1">
								<img src="images/about-us.jpg" alt="photo" className="twgtr-w-full" />
							</div>
							<div className="twgtr-w-full twgtr-flex-none lg:twgtr-flex-1">
								<h2 className="twgtr-transition-all twgtr-font-open_sans twgtr-font-bold twgtr-text-[25px] md:twgtr-text-[35px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
									About Us
								</h2>
								<div className="twgtr-max-w-auto lg:twgtr-max-w-[550px]">
									<p className="twgtr-transition-all last:twgtr-pb-0 twgtr-pb-4 twgtr-text-[16px] md:twgtr-text-[20px] twgtr-font-open_sans twgtr-text-slate-600 dark:twgtr-text-slate-300">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nisi fuga quod dolorem perferendis tempora officia? Molestias, ipsa consequatur laboriosam fugiat nostrum quos iste nemo voluptatum quisquam, mollitia porro facilis nihil incidunt architecto sunt aut veniam aspernatur. Asperiores quisquam aliquid illo neque tenetur harum porro error, dicta ipsum sit repellat?
									</p>
									<p className="twgtr-transition-all last:twgtr-pb-0 twgtr-pb-4 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-open_sans twgtr-text-slate-600 dark:twgtr-text-slate-300">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nisi fuga quod dolorem perferendis tempora officia? Molestias, ipsa consequatur laboriosam fugiat nostrum quos iste nemo voluptatum quisquam, mollitia porro facilis nihil incidunt architecto sunt aut veniam aspernatur. Asperiores quisquam aliquid illo neque tenetur harum porro error, dicta ipsum sit repellat?
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="twgtr-py-6">
						<div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row-reverse twgtr-gap-x-8 twgtr-gap-y-4">
							<div className="twgtr-w-full twgtr-flex-none lg:twgtr-flex-1">
								
								<img src="images/who-we-are.jpg" alt="photo" className="twgtr-w-full" />
							</div>
							<div className="twgtr-w-full twgtr-flex-none lg:twgtr-flex-1">
								<h2 className="twgtr-transition-all twgtr-font-open_sans twgtr-font-bold twgtr-text-[25px] md:twgtr-text-[35px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
									Who We are ?
								</h2>
								<div className="twgtr-max-w-auto lg:twgtr-max-w-[550px]">
									<p className="twgtr-transition-all last:twgtr-pb-0 twgtr-pb-4 twgtr-text-[16px] md:twgtr-text-[20px] twgtr-font-open_sans twgtr-text-slate-600 dark:twgtr-text-slate-300">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ab praesentium nisi consequuntur hic amet magnam natus, voluptate maxime, quibusdam sunt repellat optio quod animi?
									</p>
									<p className="twgtr-transition-all last:twgtr-pb-0 twgtr-pb-4 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-open_sans twgtr-text-slate-600 dark:twgtr-text-slate-300">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit alias consequuntur inventore reiciendis, earum dignissimos ad voluptate totam voluptates aspernatur, quas ea quidem eius neque hic modi nostrum. Corporis perferendis, beatae explicabo qui dolorem, aut eaque quasi laboriosam eius cum illum fuga ipsum placeat hic. Amet repellendus asperiores magni.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="twgtr-py-6">
						<div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-x-8 twgtr-gap-y-4">
							<div className="twgtr-w-full twgtr-flex-none lg:twgtr-flex-1">
								<img src="images/what-we-do.jpg" alt="photo" className="twgtr-w-full" />
							</div>
							<div className="twgtr-w-full twgtr-flex-none lg:twgtr-flex-1">
								<h2 className="twgtr-transition-all twgtr-font-open_sans twgtr-font-bold twgtr-text-[25px] md:twgtr-text-[35px] twgtr-text-slate-700 dark:twgtr-text-slate-200">
									What We Do ?
								</h2>
								<div className="twgtr-max-w-auto lg:twgtr-max-w-[550px]">
									<p className="twgtr-transition-all last:twgtr-pb-0 twgtr-pb-4 twgtr-text-[16px] md:twgtr-text-[20px] twgtr-font-open_sans twgtr-text-slate-600 dark:twgtr-text-slate-300">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id doloribus dicta inventore sed quidem nam ex voluptatibus, vel magni provident vero perferendis quia!
									</p>
									<p className="twgtr-transition-all last:twgtr-pb-0 twgtr-pb-4 twgtr-text-[14px] md:twgtr-text-[16px] twgtr-font-open_sans twgtr-text-slate-600 dark:twgtr-text-slate-300">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nobis sequi vero consequatur autem veritatis esse harum hic facilis dolorem.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default About;