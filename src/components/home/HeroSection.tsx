"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className="relative z-10 w-full">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid min-h-[540px] grid-cols-1 items-center gap-6 py-4 pb-8 sm:min-h-[580px] sm:py-6 sm:pb-12 lg:min-h-[620px] lg:grid-cols-12 lg:gap-2 lg:py-4">
					{/* ───────── 1. Left Content Column (White background side) ───────── */}
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						className="z-20 flex flex-col justify-center pt-1 lg:col-span-5 lg:pt-0 xl:col-span-5"
						initial={{ opacity: 0, x: -30 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						{/* Kicker */}
						<div className="mb-2.5 flex items-center gap-3">
							<span className="font-bold text-[#E10600] text-xs uppercase tracking-[0.2em] sm:text-sm">
								CLEAN FUEL
							</span>
							<span className="h-[2px] w-10 bg-[#E10600]" />
						</div>

						{/* Headline */}
						<h1 className="mb-3 font-athletic-black text-[#0B0B0D] text-[38px] uppercase leading-[0.92] tracking-[-0.02em] sm:text-[50px] md:text-[56px] lg:text-[50px] xl:text-[62px]">
							FUEL THAT WAKES <br />
							THE <span className="text-[#E10600]">BEAST IN YOU</span>
						</h1>

						{/* Athletic dynamic brush underline accent */}
						<div className="mb-4 w-full max-w-[280px] sm:max-w-[340px]">
							<svg
								aria-hidden="true"
								className="h-3 w-full text-[#E10600]"
								fill="none"
								viewBox="0 0 400 16"
							>
								<path
									d="M2 12C80 4 240 2 398 8L360 14C230 8 100 10 2 12Z"
									fill="currentColor"
								/>
								<polygon fill="#C60500" points="120,4 280,3 270,12 110,13" />
							</svg>
						</div>

						{/* Description */}
						<p className="mb-6 max-w-md font-normal text-[#4B5563] text-sm leading-relaxed sm:text-[15px]">
							High-quality nutrition for bigger goals. Ready-to-mix whey
							protein, protein water, peanut butter and more — made for your
							everyday grind.
						</p>

						{/* CTA Button */}
						<div className="mb-7">
							<Link
								className="group inline-flex items-center rounded-full bg-[#E10600] px-7 py-3.5 font-bold text-white text-xs uppercase tracking-wider shadow-md transition-all duration-200 hover:bg-[#C60500] hover:shadow-[#E10600]/25 hover:shadow-xl active:scale-95 sm:text-sm"
								href="/products"
							>
								<span>EXPLORE PRODUCTS</span>
								<span className="mx-3.5 h-4 w-[1px] bg-white/40" />
								<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
							</Link>
						</div>

						{/* Benefit Strip */}
						<div className="grid grid-cols-3 gap-3 pt-2 sm:gap-4">
							{/* Item 1: Premium Nutrition */}
							<div className="flex items-start gap-2">
								<svg
									aria-hidden="true"
									className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E10600] sm:h-6 sm:w-6"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.8"
									viewBox="0 0 24 24"
								>
									<path d="M14.5 9.5a3 3 0 0 0-3-3H10a2 2 0 0 0-2 2v1a3 3 0 0 1-3 3H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h3a7 7 0 0 0 7-7v-1.5a2.5 2.5 0 0 0-2.5-2.5z" />
									<path d="M8 14.5a4 4 0 0 0 4 4" />
								</svg>
								<div>
									<h4 className="font-athletic text-[#0B0B0D] text-[11px] leading-tight sm:text-xs">
										PREMIUM NUTRITION
									</h4>
									<p className="mt-0.5 text-[10px] text-gray-500 leading-tight sm:text-[11px]">
										For real progress
									</p>
								</div>
							</div>

							{/* Item 2: Great Taste */}
							<div className="flex items-start gap-2">
								<svg
									aria-hidden="true"
									className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E10600] sm:h-6 sm:w-6"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.8"
									viewBox="0 0 24 24"
								>
									<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
									<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
								</svg>
								<div>
									<h4 className="font-athletic text-[#0B0B0D] text-[11px] leading-tight sm:text-xs">
										GREAT TASTE
									</h4>
									<p className="mt-0.5 text-[10px] text-gray-500 leading-tight sm:text-[11px]">
										Fits your routine
									</p>
								</div>
							</div>

							{/* Item 3: Pan India Delivery */}
							<div className="flex items-start gap-2">
								<svg
									aria-hidden="true"
									className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E10600] sm:h-6 sm:w-6"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.8"
									viewBox="0 0 24 24"
								>
									<rect height="13" width="15" x="1" y="3" />
									<polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
									<circle cx="5.5" cy="18.5" r="2.5" />
									<circle cx="18.5" cy="18.5" r="2.5" />
								</svg>
								<div>
									<h4 className="font-athletic text-[#0B0B0D] text-[11px] leading-tight sm:text-xs">
										PAN INDIA DELIVERY
									</h4>
									<p className="mt-0.5 text-[10px] text-gray-500 leading-tight sm:text-[11px]">
										Nutrition, nationwide
									</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* ───────── 2. Center: Dual Packaging Display (Mobile only, desktop handled by hero_image.png) ───────── */}
					<div className="relative z-20 flex items-center justify-center pt-2 pb-6 lg:hidden">
						<div className="relative w-full max-w-[420px] sm:max-w-[480px]">
							{/* Soft realistic floor shadow */}
							<div className="pointer-events-none absolute -bottom-2 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-full bg-black/20 blur-lg" />

							{/* Hero Packaging Boxes */}
							<Image
								alt="Glow & Fit Ready-to-mix protein bottles 6-pack and 10-pack boxes"
								className="h-auto w-full select-none object-contain drop-shadow-xl"
								height={720}
								priority
								src="/assets/hero-packs-transparent.png"
								width={960}
							/>
						</div>
					</div>

					{/* ───────── 3. Desktop Spacer to preserve layout grid (5 cols left, 7 cols right) ───────── */}
					<div className="pointer-events-none hidden h-full min-h-[520px] lg:col-span-7 lg:block xl:col-span-7" />
				</div>
			</div>
		</section>
	);
}
