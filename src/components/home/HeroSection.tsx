"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
	return (
		<section className="relative w-full z-10">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-2 items-center min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] py-4 sm:py-6 lg:py-4 pb-8 sm:pb-12">
					
					{/* ───────── 1. Left Content Column (White background side) ───────── */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center z-20 pt-1 lg:pt-0"
					>
						{/* Kicker */}
						<div className="flex items-center gap-3 mb-2.5">
							<span className="text-[#E10600] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
								CLEAN FUEL
							</span>
							<span className="w-10 h-[2px] bg-[#E10600]" />
						</div>

						{/* Headline */}
						<h1 className="font-athletic-black text-[38px] sm:text-[50px] md:text-[56px] lg:text-[50px] xl:text-[62px] leading-[0.92] text-[#0B0B0D] uppercase mb-3 tracking-[-0.02em]">
							FUEL THAT WAKES <br />
							THE <span className="text-[#E10600]">BEAST IN YOU</span>
						</h1>

						{/* Athletic dynamic brush underline accent */}
						<div className="w-full max-w-[280px] sm:max-w-[340px] mb-4">
							<svg
								viewBox="0 0 400 16"
								fill="none"
								className="w-full h-3 text-[#E10600]"
								aria-hidden="true"
							>
								<path
									d="M2 12C80 4 240 2 398 8L360 14C230 8 100 10 2 12Z"
									fill="currentColor"
								/>
								<polygon
									points="120,4 280,3 270,12 110,13"
									fill="#C60500"
								/>
							</svg>
						</div>

						{/* Description */}
						<p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed max-w-md mb-6 font-normal">
							High-quality nutrition for bigger goals. Ready-to-mix
							whey protein, protein water, peanut butter and more —
							made for your everyday grind.
						</p>

						{/* CTA Button */}
						<div className="mb-7">
							<Link
								href="/products"
								className="group inline-flex items-center bg-[#E10600] hover:bg-[#C60500] text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-[#E10600]/25 active:scale-95"
							>
								<span>EXPLORE PRODUCTS</span>
								<span className="mx-3.5 w-[1px] h-4 bg-white/40" />
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
							</Link>
						</div>

						{/* Benefit Strip */}
						<div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
							{/* Item 1: Premium Nutrition */}
							<div className="flex items-start gap-2">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-5 h-5 sm:w-6 sm:h-6 text-[#E10600] flex-shrink-0 mt-0.5"
									aria-hidden="true"
								>
									<path d="M14.5 9.5a3 3 0 0 0-3-3H10a2 2 0 0 0-2 2v1a3 3 0 0 1-3 3H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h3a7 7 0 0 0 7-7v-1.5a2.5 2.5 0 0 0-2.5-2.5z" />
									<path d="M8 14.5a4 4 0 0 0 4 4" />
								</svg>
								<div>
									<h4 className="font-athletic text-[11px] sm:text-xs text-[#0B0B0D] leading-tight">
										PREMIUM NUTRITION
									</h4>
									<p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight mt-0.5">
										For real progress
									</p>
								</div>
							</div>

							{/* Item 2: Great Taste */}
							<div className="flex items-start gap-2">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-5 h-5 sm:w-6 sm:h-6 text-[#E10600] flex-shrink-0 mt-0.5"
									aria-hidden="true"
								>
									<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
									<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
								</svg>
								<div>
									<h4 className="font-athletic text-[11px] sm:text-xs text-[#0B0B0D] leading-tight">
										GREAT TASTE
									</h4>
									<p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight mt-0.5">
										Fits your routine
									</p>
								</div>
							</div>

							{/* Item 3: Pan India Delivery */}
							<div className="flex items-start gap-2">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-5 h-5 sm:w-6 sm:h-6 text-[#E10600] flex-shrink-0 mt-0.5"
									aria-hidden="true"
								>
									<rect x="1" y="3" width="15" height="13" />
									<polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
									<circle cx="5.5" cy="18.5" r="2.5" />
									<circle cx="18.5" cy="18.5" r="2.5" />
								</svg>
								<div>
									<h4 className="font-athletic text-[11px] sm:text-xs text-[#0B0B0D] leading-tight">
										PAN INDIA DELIVERY
									</h4>
									<p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight mt-0.5">
										Nutrition, nationwide
									</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* ───────── 2. Center: Dual Packaging Display (Mobile only, desktop handled by hero_image.png) ───────── */}
					<div className="lg:hidden relative flex items-center justify-center pt-2 pb-6 z-20">
						<div className="relative w-full max-w-[420px] sm:max-w-[480px]">
							{/* Soft realistic floor shadow */}
							<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/20 blur-lg rounded-full pointer-events-none" />

							{/* Hero Packaging Boxes */}
							<Image
								src="/assets/hero-packs-transparent.png"
								alt="Glow & Fit Ready-to-mix protein bottles 6-pack and 10-pack boxes"
								width={960}
								height={720}
								priority
								className="w-full h-auto object-contain drop-shadow-xl select-none"
							/>
						</div>
					</div>

					{/* ───────── 3. Desktop Spacer to preserve layout grid (5 cols left, 7 cols right) ───────── */}
					<div className="hidden lg:block lg:col-span-7 xl:col-span-7 h-full min-h-[520px] pointer-events-none" />
				</div>
			</div>
		</section>
	);
}

