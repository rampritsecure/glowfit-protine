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
						<h1 className="font-athletic-black text-[40px] sm:text-[54px] md:text-[60px] lg:text-[54px] xl:text-[66px] leading-[0.92] text-[#0B0B0D] uppercase mb-3 tracking-[-0.02em]">
							FUEL THAT WAKES <br />
							THE <span className="text-[#E10600]">BEAST</span> IN YOU
						</h1>

						{/* Athletic dynamic brush underline accent */}
						<div className="w-full max-w-[300px] sm:max-w-[360px] mb-4">
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
						<div className="mb-8">
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
						<div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-200/80">
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
									<path d="M18.5 7.5a4.5 4.5 0 0 0-6.36 0L12 7.64l-.14-.14a4.5 4.5 0 0 0-6.36 6.36l.14.14L12 20.36l6.36-6.36.14-.14a4.5 4.5 0 0 0 0-6.36z" />
									<path d="M12 4v4m-4-2h8" />
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

					{/* ───────── 2. Center: Dual Packaging Display (Across White/Red border) ───────── */}
					<motion.div
						initial={{ opacity: 0, scale: 0.96, y: 15 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
						className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center -ml-2 lg:-ml-4 z-20"
					>
						<div className="relative w-full max-w-[560px] lg:max-w-[620px] xl:max-w-[670px] group cursor-pointer">
							{/* Soft realistic floor shadow */}
							<div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/25 blur-xl rounded-full pointer-events-none" />

							{/* Hero Packaging Boxes */}
							<div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
								<Image
									src="/assets/hero-packs-transparent.png"
									alt="Glow & Fit Ready-to-mix protein bottles 6-pack and 10-pack boxes"
									width={960}
									height={720}
									priority
									className="w-full h-auto object-contain drop-shadow-2xl select-none"
								/>
							</div>
						</div>
					</motion.div>

					{/* ───────── 3. Right: "NUTRITION FOR A STRONGER INDIA" + 3 Feature Badges ───────── */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
						className="hidden lg:flex lg:col-span-1 xl:col-span-1 flex-col items-center justify-between h-full min-h-[480px] pt-1 pb-4 z-20 select-none"
					>
						{/* Top: Sits inside the White Angular Shard */}
						<div className="w-full text-left pl-1">
							<h3 className="font-athletic-black text-[17px] xl:text-[19px] text-[#0B0B0D] uppercase leading-[0.98] tracking-tight">
								NUTRITION <br />
								FOR A <br />
								STRONGER <br />
								INDIA
							</h3>
							{/* Red accent line */}
							<div className="w-9 h-[2.5px] bg-[#E10600] mt-2" />
						</div>

						{/* Bottom: 3 Feature Badges on Red 3D Panel */}
						<div className="flex flex-col items-center gap-6 xl:gap-7 pt-10 xl:pt-14">
							{/* Feature 1: More Energy */}
							<div className="flex flex-col items-center text-center gap-1 group cursor-pointer">
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6 text-white group-hover:scale-115 transition-transform duration-200"
									aria-hidden="true"
								>
									<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
								</svg>
								<span className="font-athletic text-[11px] xl:text-xs font-black tracking-wider uppercase text-white leading-tight">
									MORE <br /> ENERGY
								</span>
							</div>

							{/* Feature 2: Better Performance */}
							<div className="flex flex-col items-center text-center gap-1 group cursor-pointer">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-6 h-6 text-white group-hover:scale-115 transition-transform duration-200"
									aria-hidden="true"
								>
									<path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
								</svg>
								<span className="font-athletic text-[11px] xl:text-xs font-black tracking-wider uppercase text-white leading-tight">
									BETTER <br /> PERFORMANCE
								</span>
							</div>

							{/* Feature 3: A Healthier You */}
							<div className="flex flex-col items-center text-center gap-1 group cursor-pointer">
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6 text-white group-hover:scale-115 transition-transform duration-200"
									aria-hidden="true"
								>
									<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
								</svg>
								<span className="font-athletic text-[11px] xl:text-xs font-black tracking-wider uppercase text-white leading-tight">
									A HEALTHIER <br /> YOU
								</span>
							</div>
						</div>
					</motion.div>

				</div>
			</div>
		</section>
	);
}
