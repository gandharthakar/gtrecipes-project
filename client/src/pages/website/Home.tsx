import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
import TestimonialsCard from "../../components/website/TestimonialsCard";
import SiteConstants from "../../constants/SiteConstants";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function Home() {

	return (
		<>
			<div className="twgtr-transition-all twgtr-bg-slate-100 dark:twgtr-bg-slate-700">
				<section className="twgtr-px-4 twgtr-py-[25px] md:twgtr-py-[50px]">
					<div className="site-container">
						<div className="twgtr-relative twgtr-flex twgtr-flex-col twgtr-justify-center twgtr-items-center twgtr-p-[20px] twgtr-min-h-[400px] md:twgtr-min-h-[600px] twgtr-bg-white twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow after:twgtr-opacity-[0.55]" style={{backgroundImage: `url('/images/home-banner.jpg')`}}>
							<div className="twgtr-text-center twgtr-relative twgtr-z-[5] twgtr-max-w-[700px] twgtr-mx-auto">
								<div className="twgtr-pb-4">
									<h1 className="twgtr-text-white twgtr-text-[25px] md:twgtr-text-[30px] twgtr-font-ubuntu twgtr-font-bold twgtr-inline-block">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									</h1>
								</div>
								<div>
									<NavLink to="/recipes" title="Explore" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-4 twgtr-py-2 md:twgtr-px-5 md:twgtr-py-3 twgtr-border twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-4-hover-dark hover:twgtr-border-theme-color-4-hover-dark">
										Explore
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="twgtr-px-4 twgtr-py-[25px] md:twgtr-py-[50px]">
					<div className="site-container">
						<div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-border twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-500 recipe-card">
							<NavLink to={`/view-recipe/1`} title={`How to Make Garlic Bread`} className="twgtr-w-full lg:twgtr-w-[calc(100%-500px)] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center" style={{backgroundImage: `url('/images/featured-rpost.jpg')`}}>
								<div className="lg:twgtr-hidden">
									<img src="/images/featured-rpost.jpg" className="twgtr-w-full" alt="photo" />
								</div>
							</NavLink>
							<div className="twgtr-min-w-0 lg:twgtr-min-w-[500px] twgtr-max-w-auto lg:twgtr-max-w-[500px] twgtr-flex lg:twgtr-justify-center twgtr-flex-col twgtr-p-[20px] lg:twgtr-p-[50px] twgtr-min-h-0 lg:twgtr-min-h-[400px] twgtr-bg-white dark:twgtr-bg-slate-800">
								<div className="lg:twgtr-hidden">
									<div className="twgtr-pb-1">
										<NavLink to={`/view-recipe/1`} title={`How to Make Garlic Bread`} className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
											<h2>How to Make Garlic Bread</h2>
										</NavLink>
									</div>
									<div className="twgtr-pb-3">
										<p className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-300">
											Looking to seriously up your garlic bread game? Try this recipe for a classic toasty loaf. It’s golden brown with crusty edges, extra-garlicky, and a little cheesy. What’s not to love?By Heather Baird
										</p>
									</div>
									<div className="">
										<h3 className="twgtr-transition-all twgtr-font-ubuntu twgtr-uppercase twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-500 dark:twgtr-text-slate-400">
                                			Author Name
                            			</h3>
									</div>
								</div>
								<div className="twgtr-hidden lg:twgtr-block">
									<div className="twgtr-pb-1">
										<h3 className="twgtr-transition-all twgtr-font-ubuntu twgtr-uppercase twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-500 dark:twgtr-text-slate-400">
                                			Author Name
                            			</h3>
									</div>
									<div className="twgtr-pb-1">
										<NavLink to={`/view-recipe/1`} title={`How to Make Garlic Bread`} className="twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold">
											<h2 className="twgtr-transition-all twgtr-text-theme-color-4 dark:twgtr-text-slate-200">How to Make Garlic Bread</h2>
										</NavLink>
									</div>
									<div className="">
										<p className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-300">
											Looking to seriously up your garlic bread game? Try this recipe for a classic toasty loaf. It’s golden brown with crusty edges, extra-garlicky, and a little cheesy. What’s not to love?By Heather Baird
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="twgtr-px-4 twgtr-pt-[25px] twgtr-pb-[50px] md:twgtr-py-[50px]">
					<div className="site-container">
						<div className="twgtr-pb-[15px]">
							<h4 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-bold twgtr-text-theme-color-1 dark:twgtr-text-theme-color-3">
								Latest Recipes
							</h4>
						</div>
						<div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-gap-[20px] twgtr-flex-wrap">
							<NavLink to={`/view-recipe/2`} title={`Coconut Chicken Curry – Kuku Paka`} className="twgtr-relative recipe-card lg:twgtr-flex-1 twgtr-bg-white dark:twgtr-bg-slate-800 lg:twgtr-min-h-[720px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{backgroundImage: `url('/images/latest-five/1.jpg')`}}>
								<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[350px] md:twgtr-min-h-[720px] lg:twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
									<div className="twgtr-mt-auto">
										<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
											Coconut Chicken Curry – Kuku Paka
										</h2>
									</div>
								</div>
							</NavLink>
							<div className="twgtr-flex-1">
								<div className="twgtr-grid twgtr-gap-[20px] twgtr-grid-cols-1 md:twgtr-grid-cols-2">
									<NavLink to={`/view-recipe/3`} title={`Garlic Noodles`} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{backgroundImage: `url('/images/latest-five/2.jpg')`}}>
										<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
											<div className="twgtr-mt-auto">
												<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
													Garlic Noodles
												</h2>
											</div>
										</div>
									</NavLink>
									<NavLink to={`/view-recipe/4`} title={`Crunchy Baked Prawns / Shrimp in Garlic Butter Sauce`} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{backgroundImage: `url('/images/latest-five/3.jpg')`}}>
										<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
											<div className="twgtr-mt-auto">
												<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
													Crunchy Baked Prawns / Shrimp in Garlic Butter Sauce
												</h2>
											</div>
										</div>
									</NavLink>
									<NavLink to={`/view-recipe/5`} title={`Acqua Pazza – Italian Fish`} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{backgroundImage: `url('/images/latest-five/4.jpg')`}}>
										<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
											<div className="twgtr-mt-auto">
												<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
													Acqua Pazza – Italian Fish
												</h2>
											</div>
										</div>
									</NavLink>
									<NavLink to={`/view-recipe/6`} title={`Thai Cashew Chicken`} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{backgroundImage: `url('/images/latest-five/5.jpg')`}}>
										<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
											<div className="twgtr-mt-auto">
												<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
													Thai Cashew Chicken
												</h2>
											</div>
										</div>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="twgtr-px-4 twgtr-py-[50px] twgtr-bg-theme-color-1 dark:twgtr-bg-theme-color-5">
					<div className="site-container">
						<div className="twgtr-flex twgtr-min-h-0 xl:twgtr-min-h-[700px] twgtr-flex-col xl:twgtr-flex-row xl:twgtr-items-center twgtr-gap-[20px]">
							<div className="twgtr-w-full xl:twgtr-w-[calc(25%-15px)]">
								<div className="xl:twgtr-max-w-[280px]">
									<div className="twgtr-pb-[10px] md:twgtr-pb-[15px]">
										<h4 className="twgtr-transition-all twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[20px] md:twgtr-leading-[32px] md:twgtr-text-[25px] twgtr-text-theme-color-3">
											Connect With Other Members
										</h4>
									</div>
									<div>
										<p className="twgtr-transition-all twgtr-font-open_sans twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-white">
											Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, a sint dolor laborum quam praesentium provident voluptas
										</p>
									</div>
								</div>
							</div>
							<div className="twgtr-w-full xl:twgtr-w-[calc(75%-15px)]">
								<Swiper
									slidesPerView={1}
									spaceBetween={20}
									navigation={true}
									breakpoints={{
										640: {
											slidesPerView: 1,
											spaceBetween: 20,
										},
										768: {
											slidesPerView: 2,
											spaceBetween: 20,
										},
										1024: {
											slidesPerView: 3,
											spaceBetween: 20,
										},
									}}
									className="mySwiper"
								>
									{
										SiteConstants[0].static_testimonials.map((item) => (
											<SwiperSlide key={item.id}>
												<TestimonialsCard 
													photo={item.photo} 
													testimonial_content={item.testimonial_content} 
													testimonial_person_name={item.testimonial_person_name} 
													testimonial_person_designation={item.testimonial_person_designation}
												/>
											</SwiperSlide>
										))
									}
									<Swc />
								</Swiper>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

const Swc = () => {
	const mySwipe = useSwiper();
	return (
		<>
			<div className="twgtr-flex twgtr-gap-x-[20px] twgtr-pt-[20px]">
				<button 
					title="Previous Slide" 
					className="twgtr-transition-all twgtr-border-[1px] twgtr-border-solid twgtr-border-white twgtr-p-[8px] twgtr-text-white hover:twgtr-bg-white hover:twgtr-text-theme-color-1 disabled:twgtr-opacity-5 dark:hover:twgtr-text-theme-color-4" 
					onClick={() => mySwipe.slidePrev()}
				>
					<TfiAngleLeft size={20} />
				</button>
				<button 
					title="Next Slide" 
					className="twgtr-transition-all twgtr-border-[1px] twgtr-border-solid twgtr-border-white twgtr-p-[8px] twgtr-text-white hover:twgtr-bg-white hover:twgtr-text-theme-color-1 disabled:twgtr-opacity-5 dark:hover:twgtr-text-theme-color-4" 
					onClick={() => mySwipe.slideNext()}
				>
					<TfiAngleRight size={20} />
				</button>
			</div>
		</>
	)
}

export default Home;