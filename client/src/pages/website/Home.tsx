// import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
import TestimonialsCard from "../../components/website/TestimonialsCard";
import SiteConstants from "../../constants/SiteConstants";
import { gql, useQuery } from "@apollo/client";

// Import Swiper styles
// import 'swiper-bundle.min.css';
// import 'swiper/css/pagination';
import { useState } from "react";

const GET_HOME_RECIPES = gql`
	query getAggrRecipes {
		getAggrRecipes {
			id,
			recipe_title,
			recipe_featured_image,
			recipe_summary,
			author {
				author_name
			}
		}
	}
`;

function Home() {

	const defaultFeImgPath = 'https://placehold.co/600x400?text=Featured+Image.';
	const fallBackFeImg = 'images/default-feimg.svg';
	// const baseURIFeImg = `${import.meta.env.VITE_BACKEND_URI_BASE}/uploads/recipe-featured-images`;

	interface RecType {
		id: string,
		recipe_title: string,
		recipe_featured_image: string,
		recipe_summary?: string,
		author?: {
			author_name?: string
		}
	}

	const defRec1_data = {
		id: "home_rec_1",
		recipe_title: "How to Make Garlic Bread",
		recipe_featured_image: "/images/featured-rpost.jpg",
		recipe_summary: "Looking to seriously up your garlic bread game? Try this recipe for a classic toasty loaf. It’s golden brown with crusty edges, extra-garlicky, and a little cheesy. What’s not to love?By Heather Baird",
		author: {
			author_name: "Author"
		}
	}

	const defRec2_data = {
		id: "home_rec_2",
		recipe_title: "Coconut Chicken Curry – Kuku Paka",
		recipe_featured_image: "/images/latest-five/1.jpg"
	}

	const defRec3_data = {
		id: "home_rec_3",
		recipe_title: "Garlic Noodles",
		recipe_featured_image: "/images/latest-five/2.jpg"
	}

	const defRec4_data = {
		id: "home_rec_4",
		recipe_title: "Crunchy Baked Prawns / Shrimp in Garlic Butter Sauce",
		recipe_featured_image: "/images/latest-five/3.jpg"
	}

	const defRec5_data = {
		id: "home_rec_5",
		recipe_title: "Acqua Pazza – Italian Fish",
		recipe_featured_image: "/images/latest-five/4.jpg"
	}

	const defRec6_data = {
		id: "home_rec_6",
		recipe_title: "Thai Cashew Chicken",
		recipe_featured_image: "/images/latest-five/5.jpg"
	}

	const [rec1, setRec1] = useState<RecType>(defRec1_data);
	const [rec2, setRec2] = useState<RecType>(defRec2_data);
	const [rec3, setRec3] = useState<RecType>(defRec3_data);
	const [rec4, setRec4] = useState<RecType>(defRec4_data);
	const [rec5, setRec5] = useState<RecType>(defRec5_data);
	const [rec6, setRec6] = useState<RecType>(defRec6_data);

	const { loading, error } = useQuery(GET_HOME_RECIPES, {
		onCompleted: fdata => {
			// console.log(fdata.getAggrRecipes);

			// Set Recipe 1
			const r1 = fdata.getAggrRecipes[fdata.getAggrRecipes.length - 1];
			let obj: RecType = {
				id: '',
				recipe_title: '',
				recipe_featured_image: '',
			};
			const cl = r1.recipe_featured_image;
			const feimg_1 = cl == 'default' ? defaultFeImgPath : cl;
			obj = {
				id: r1.id,
				recipe_title: r1.recipe_title,
				recipe_featured_image: feimg_1,
				recipe_summary: r1.recipe_summary,
				author: {
					author_name: r1.author.author_name
				}
			}
			setRec1(obj);

			// Set Recipe 2
			const r2 = fdata.getAggrRecipes[fdata.getAggrRecipes.length - 2];
			let obj_0: RecType = {
				id: '',
				recipe_title: '',
				recipe_featured_image: '',
			};
			const cl_0 = r2.recipe_featured_image;
			const feimg_2 = cl_0 == 'default' ? defaultFeImgPath : cl_0;
			obj_0 = {
				id: r2.id,
				recipe_title: r2.recipe_title,
				recipe_featured_image: feimg_2,
			}
			setRec2(obj_0);

			// Set Recipe 3
			const r3 = fdata.getAggrRecipes[fdata.getAggrRecipes.length - 3];
			let obj_1: RecType = {
				id: '',
				recipe_title: '',
				recipe_featured_image: '',
			};
			const cl_1 = r3.recipe_featured_image;
			const feimg_3 = cl_1 == 'default' ? defaultFeImgPath : cl_1;
			obj_1 = {
				id: r3.id,
				recipe_title: r3.recipe_title,
				recipe_featured_image: feimg_3,
			}
			setRec3(obj_1);

			// Set Recipe 4
			const r4 = fdata.getAggrRecipes[fdata.getAggrRecipes.length - 4];
			let obj_2: RecType = {
				id: '',
				recipe_title: '',
				recipe_featured_image: '',
			};
			const cl_2 = r4.recipe_featured_image;
			const feimg_4 = cl_2 == 'default' ? defaultFeImgPath : cl_2;
			obj_2 = {
				id: r4.id,
				recipe_title: r4.recipe_title,
				recipe_featured_image: feimg_4,
			}
			setRec4(obj_2);

			// Set Recipe 5
			const r5 = fdata.getAggrRecipes[fdata.getAggrRecipes.length - 5];
			let obj_3: RecType = {
				id: '',
				recipe_title: '',
				recipe_featured_image: '',
			};
			const cl_3 = r5.recipe_featured_image;
			const feimg_5 = cl_3 == 'default' ? defaultFeImgPath : cl_3;
			obj_3 = {
				id: r5.id,
				recipe_title: r5.recipe_title,
				recipe_featured_image: feimg_5,
			}
			setRec5(obj_3);

			// Set Recipe 6
			const r6 = fdata.getAggrRecipes[fdata.getAggrRecipes.length - 6];
			let obj_4: RecType = {
				id: '',
				recipe_title: '',
				recipe_featured_image: '',
			};
			const cl_4 = r6.recipe_featured_image;
			const feimg_6 = cl_4 == 'default' ? defaultFeImgPath : cl_4;
			obj_4 = {
				id: r6.id,
				recipe_title: r6.recipe_title,
				recipe_featured_image: feimg_6,
			}
			setRec6(obj_4);
		}
	})

	return (
		<>
			<div className="twgtr-transition-all twgtr-bg-slate-100 dark:twgtr-bg-slate-700">
				<section className="twgtr-px-4 twgtr-py-[25px] md:twgtr-py-[50px]">
					<div className="site-container">
						<div className="twgtr-relative twgtr-flex twgtr-flex-col twgtr-justify-center twgtr-items-center twgtr-p-[20px] twgtr-min-h-[400px] md:twgtr-min-h-[600px] twgtr-bg-white twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow after:twgtr-opacity-[0.55]" style={{ backgroundImage: `url('/images/home-banner.jpg')` }}>
							<div className="twgtr-text-center twgtr-relative twgtr-z-[5] twgtr-max-w-[700px] twgtr-mx-auto">
								<div className="twgtr-pb-4">
									<h1 className="twgtr-text-white twgtr-text-[25px] md:twgtr-text-[30px] twgtr-font-ubuntu twgtr-font-bold twgtr-inline-block">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									</h1>
								</div>
								<div>
									<a href="/recipes" title="Explore" className="twgtr-transition-all twgtr-cursor-pointer twgtr-inline-block twgtr-px-4 twgtr-py-2 md:twgtr-px-5 md:twgtr-py-3 twgtr-border twgtr-border-solid twgtr-border-theme-color-4 twgtr-bg-theme-color-4 twgtr-text-slate-50 twgtr-font-ubuntu twgtr-font-semibold twgtr-text-[14px] md:twgtr-text-[16px] twgtr-outline-none hover:twgtr-bg-theme-color-4-hover-dark hover:twgtr-border-theme-color-4-hover-dark">
										Explore
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{
					loading ?
						(
							<div className="twgtr-py-[50px] twgtr-text-center twgtr-bg-white dark:twgtr-bg-slate-700">
								<h6 className="twgtr-transition-all twgtr-font-bold twgtr-font-ubuntu twgtr-text-[]">
									Loading ...
								</h6>
							</div>
						)
						:
						(
							<>
								{
									error ?
										(
											<div className="twgtr-py-[50px] twgtr-text-center twgtr-bg-white dark:twgtr-bg-slate-700">
												<h6 className="twgtr-transition-all twgtr-font-bold twgtr-font-ubuntu twgtr-text-[]">
													Something Went Wrong ...
												</h6>
											</div>
										)
										:
										(
											<>
												<section className="twgtr-px-4 twgtr-py-[25px] md:twgtr-py-[50px]">
													<div className="site-container">
														<div className="twgtr-flex twgtr-flex-col lg:twgtr-flex-row twgtr-border twgtr-border-solid twgtr-border-slate-300 dark:twgtr-border-slate-500 recipe-card">
															<a href={`/view-recipe/${rec1.id}`} title={rec1.recipe_title} className="twgtr-w-full lg:twgtr-w-[calc(100%-500px)] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center" style={{ backgroundImage: `url('${rec1.recipe_featured_image}')` }}>
																<div className="lg:twgtr-hidden">
																	<img
																		src={rec1.recipe_featured_image}
																		className="twgtr-w-full"
																		alt="photo"
																		onError={({ currentTarget }) => {
																			currentTarget.onerror = null; // prevents looping
																			currentTarget.src = fallBackFeImg;
																		}}
																	/>
																</div>
															</a>
															<div className="twgtr-min-w-0 lg:twgtr-min-w-[500px] twgtr-max-w-auto lg:twgtr-max-w-[500px] twgtr-flex lg:twgtr-justify-center twgtr-flex-col twgtr-p-[20px] lg:twgtr-p-[50px] twgtr-min-h-0 lg:twgtr-min-h-[400px] twgtr-bg-white dark:twgtr-bg-slate-800">
																<div className="lg:twgtr-hidden">
																	<div className="twgtr-pb-1">
																		<a href={`/view-recipe/${rec1.id}`} title={rec1.recipe_title} className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
																			<h2>
																				{rec1.recipe_title}
																			</h2>
																		</a>
																	</div>
																	<div className="twgtr-pb-3">
																		<p className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-300">
																			{rec1.recipe_summary}
																		</p>
																	</div>
																	<div className="">
																		<h3 className="twgtr-transition-all twgtr-font-ubuntu twgtr-uppercase twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-500 dark:twgtr-text-slate-400">
																			{rec1.author?.author_name}
																		</h3>
																	</div>
																</div>
																<div className="twgtr-hidden lg:twgtr-block">
																	<div className="twgtr-pb-1">
																		<h3 className="twgtr-transition-all twgtr-font-ubuntu twgtr-uppercase twgtr-text-[12px] md:twgtr-text-[14px] twgtr-text-slate-500 dark:twgtr-text-slate-400">
																			{rec1.author?.author_name}
																		</h3>
																	</div>
																	<div className="twgtr-pb-1">
																		<a href={`/view-recipe/${rec1.id}`} title={rec1.recipe_title} className="twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold">
																			<h2 className="twgtr-transition-all twgtr-text-theme-color-4 dark:twgtr-text-slate-200">
																				{rec1.recipe_title}
																			</h2>
																		</a>
																	</div>
																	<div className="">
																		<p className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[14px] md:twgtr-text-[16px] twgtr-text-slate-700 dark:twgtr-text-slate-300">
																			{rec1.recipe_summary}
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
															<a href={`/view-recipe/${rec2.id}`} title={rec2.recipe_title} className="twgtr-relative recipe-card lg:twgtr-flex-1 twgtr-bg-white dark:twgtr-bg-slate-800 lg:twgtr-min-h-[720px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{ backgroundImage: `url('${rec2.recipe_featured_image}')` }}>
																<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[350px] md:twgtr-min-h-[720px] lg:twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
																	<div className="twgtr-mt-auto">
																		<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
																			{rec2.recipe_title}
																		</h2>
																	</div>
																</div>
															</a>
															<div className="twgtr-flex-1">
																<div className="twgtr-grid twgtr-gap-[20px] twgtr-grid-cols-1 md:twgtr-grid-cols-2">
																	<a href={`/view-recipe/${rec3.id}`} title={rec3.recipe_title} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{ backgroundImage: `url('${rec3.recipe_featured_image}')` }}>
																		<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
																			<div className="twgtr-mt-auto">
																				<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
																					{rec3.recipe_title}
																				</h2>
																			</div>
																		</div>
																	</a>
																	<a href={`/view-recipe/${rec4.id}`} title={rec4.recipe_title} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{ backgroundImage: `url('${rec4.recipe_featured_image}')` }}>
																		<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
																			<div className="twgtr-mt-auto">
																				<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
																					{rec4.recipe_title}
																				</h2>
																			</div>
																		</div>
																	</a>
																	<a href={`/view-recipe/${rec5.id}`} title={rec5.recipe_title} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{ backgroundImage: `url('${rec5.recipe_featured_image}')` }}>
																		<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
																			<div className="twgtr-mt-auto">
																				<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
																					{rec5.recipe_title}
																				</h2>
																			</div>
																		</div>
																	</a>
																	<a href={`/view-recipe/${rec6.id}`} title={rec6.recipe_title} className="twgtr-relative recipe-card twgtr-bg-white dark:twgtr-bg-slate-800 twgtr-min-h-[350px] twgtr-bg-no-repeat twgtr-bg-cover twgtr-bg-center home-after-shadow home-after-shadow-hover after:twgtr-opacity-[0.4]" style={{ backgroundImage: `url('${rec6.recipe_featured_image}')` }}>
																		<div className="twgtr-flex twgtr-flex-col twgtr-min-h-[100%] twgtr-p-[20px] twgtr-relative twgtr-z-[5]">
																			<div className="twgtr-mt-auto">
																				<h2 className="twgtr-transition-all twgtr-font-ubuntu twgtr-text-[20px] md:twgtr-text-[25px] twgtr-font-semibold twgtr-text-white">
																					{rec6.recipe_title}
																				</h2>
																			</div>
																		</div>
																	</a>
																</div>
															</div>
														</div>
													</div>
												</section>
											</>
										)
								}
							</>
						)
				}

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