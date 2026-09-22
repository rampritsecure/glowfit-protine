"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className="relative z-10 w-full">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid min-h-[560px] grid-cols-1 items-center gap-6 py-4 pb-10 sm:min-h-[600px] sm:py-6 sm:pb-14 lg:min-h-[640px] lg:grid-cols-12 lg:gap-3 lg:py-5">
					{/* ───────── 1. Left Content Column (White background side) ───────── */}
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						className="z-20 flex flex-col justify-center pt-2 lg:col-span-5 lg:pt-0 xl:col-span-5"
						initial={{ opacity: 0, x: -30 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						{/* Social Proof Trust Badge */}
						<div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3 py-1 backdrop-blur-sm">
							<div className="flex items-center text-amber-500">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										className="h-3 w-3 fill-amber-400 text-amber-400"
										key={star}
									/>
								))}
							</div>
							<span className="font-semibold text-[11px] text-gray-700 tracking-tight">
								<strong className="font-bold text-gray-900">4.9/5</strong> ·
								Rated by 25,000+ Athletes
							</span>
						</div>

						{/* Kicker */}
						<div className="mb-2 flex items-center gap-3">
							<span className="font-bold text-[#E10600] text-xs uppercase tracking-[0.2em] sm:text-sm">
								CLEAN FUEL
							</span>
							<span className="h-[2px] w-10 bg-[#E10600]" />
						</div>

						{/* Headline */}
						<h1 className="mb-1 font-athletic-black text-[#0B0B0D] text-[38px] uppercase leading-[0.92] tracking-[-0.02em] sm:mb-1.5 sm:text-[50px] md:text-[56px] lg:text-[50px] xl:text-[62px]">
							FUEL THAT WAKES <br />
							THE <span className="text-[#E10600]">BEAST IN YOU</span>
						</h1>

						{/* Energy lightning streak accent */}
						<div className="mt-1 mb-3.5 w-full max-w-[280px] sm:max-w-[340px]">
							<Image
								alt="Energy lightning streak"
								className="pointer-events-none h-auto w-full select-none object-contain object-left"
								height={41}
								priority
								src="/assets/energy.png"
								width={340}
							/>
						</div>

						{/* Description */}
						<p className="mb-6 max-w-lg font-normal text-[#374151] text-sm leading-relaxed sm:text-[15px]">
							High-quality nutrition for bigger goals. Ready-to-mix whey
							protein, protein water, peanut butter and more — made for your
							everyday grind.
						</p>

						{/* CTA Button & Guarantee Row */}
						<div className="mb-8 flex flex-wrap items-center gap-4">
							<Link
								className="group inline-flex items-center rounded-full bg-[#E10600] px-8 py-3.5 font-bold text-white text-xs uppercase tracking-wider shadow-md transition-all duration-200 hover:bg-[#C60500] hover:shadow-[#E10600]/30 hover:shadow-xl active:scale-95 sm:text-sm"
								href="/products"
							>
								<span>EXPLORE PRODUCTS</span>
								<span className="mx-3.5 h-4 w-[1px] bg-white/40" />
								<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
							</Link>
						</div>

						{/* Benefit Micro-Cards Strip */}
						<div className="grid grid-cols-3 gap-2.5 sm:gap-3">
							{/* Item 1: Premium Nutrition */}
							<div className="group flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/90 p-2.5 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100/70 sm:p-3">
								<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#E10600]/10 text-[#E10600] transition-all duration-200 group-hover:bg-[#E10600] group-hover:text-white sm:h-9 sm:w-9">
									<svg
										aria-hidden="true"
										className="h-4 w-4 sm:h-5 sm:w-5"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path d="M14.5 9.5a3 3 0 0 0-3-3H10a2 2 0 0 0-2 2v1a3 3 0 0 1-3 3H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h3a7 7 0 0 0 7-7v-1.5a2.5 2.5 0 0 0-2.5-2.5z" />
										<path d="M8 14.5a4 4 0 0 0 4 4" />
									</svg>
								</div>
								<div className="min-w-0">
									<h4 className="truncate font-athletic text-[#0B0B0D] text-[10.5px] leading-tight sm:text-[11.5px]">
										PREMIUM NUTRITION
									</h4>
									<p className="mt-0.5 truncate text-[9.5px] text-gray-500 leading-tight sm:text-[10.5px]">
										For real progress
									</p>
								</div>
							</div>

							{/* Item 2: Great Taste */}
							<div className="group flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/90 p-2.5 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100/70 sm:p-3">
								<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#E10600]/10 text-[#E10600] transition-all duration-200 group-hover:bg-[#E10600] group-hover:text-white sm:h-9 sm:w-9">
									<svg
										aria-hidden="true"
										className="h-4 w-4 sm:h-5 sm:w-5"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
										<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
									</svg>
								</div>
								<div className="min-w-0">
									<h4 className="truncate font-athletic text-[#0B0B0D] text-[10.5px] leading-tight sm:text-[11.5px]">
										GREAT TASTE
									</h4>
									<p className="mt-0.5 truncate text-[9.5px] text-gray-500 leading-tight sm:text-[10.5px]">
										Fits your routine
									</p>
								</div>
							</div>

							{/* Item 3: Pan India Delivery */}
							<div className="group flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/90 p-2.5 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100/70 sm:p-3">
								<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#E10600]/10 text-[#E10600] transition-all duration-200 group-hover:bg-[#E10600] group-hover:text-white sm:h-9 sm:w-9">
									<svg
										aria-hidden="true"
										className="h-4 w-4 sm:h-5 sm:w-5"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<rect height="13" width="15" x="1" y="3" />
										<polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
										<circle cx="5.5" cy="18.5" r="2.5" />
										<circle cx="18.5" cy="18.5" r="2.5" />
									</svg>
								</div>
								<div className="min-w-0">
									<h4 className="truncate font-athletic text-[#0B0B0D] text-[10.5px] leading-tight sm:text-[11.5px]">
										PAN INDIA DELIVERY
									</h4>
									<p className="mt-0.5 truncate text-[9.5px] text-gray-500 leading-tight sm:text-[10.5px]">
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
