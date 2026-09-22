"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
	title: string;
	subtitle: string;
	imageSrc: string;
	imageAlt: string;
	href: string;
	delay?: number;
}

function CategoryCard({
	title,
	subtitle,
	imageSrc,
	imageAlt,
	href,
	delay = 0,
}: CategoryCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 25 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5, delay, ease: "easeOut" }}
			className="group relative bg-[#F6F6F7] hover:bg-[#F0F0F2] rounded-2xl overflow-hidden border border-gray-200/60 transition-all duration-300 hover:shadow-lg hover:border-gray-300/80 min-h-[260px] sm:min-h-[280px]"
		>
			{/* Red angular accent on right half */}
			<div className="absolute right-0 top-0 w-[55%] h-full pointer-events-none overflow-hidden z-0">
				<svg
					viewBox="0 0 200 300"
					preserveAspectRatio="none"
					className="absolute top-0 right-0 w-full h-full text-[#E10600] group-hover:scale-105 group-hover:translate-x-1 transition-transform duration-500 ease-out"
					fill="currentColor"
					aria-hidden="true"
				>
					<polygon points="80,0 200,0 200,300 130,300 170,160 70,190" />
				</svg>
			</div>

			{/* Content */}
			<div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full">
				{/* Text + CTA */}
				<div className="max-w-[55%]">
					<h3 className="font-athletic-black text-[26px] sm:text-[30px] md:text-[28px] lg:text-[32px] leading-[0.92] text-[#0B0B0D] uppercase mb-2 tracking-tight">
						{title}
					</h3>
					<p className="text-[11px] sm:text-xs font-semibold text-gray-500 tracking-wider uppercase leading-snug mb-6">
						{subtitle}
					</p>
				</div>

				<div className="max-w-[55%]">
					<Link
						href={href}
						className="inline-flex items-center gap-2 bg-[#0B0B0D] group-hover:bg-[#E10600] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm group-hover:shadow-md"
					>
						SHOP NOW
						<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
					</Link>
				</div>
			</div>

			{/* Product Image */}
			<div className="absolute right-2 sm:right-4 bottom-2 sm:bottom-3 w-[42%] h-[85%] flex items-end justify-center z-10 pointer-events-none">
				<div className="relative w-full h-full flex items-end justify-center transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1">
					<Image
						src={imageSrc}
						alt={imageAlt}
						width={280}
						height={260}
						className="max-h-full w-auto object-contain drop-shadow-xl"
					/>
				</div>
			</div>
		</motion.div>
	);
}

export function CategorySection() {
	return (
		<section className="w-full bg-white pt-10 pb-16 sm:pb-24">
			<div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">
				{/* Kicker */}
				<div className="flex items-center gap-3 mb-2">
					<span className="text-[#E10600] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
						SHOP BY CATEGORY
					</span>
					<span className="w-10 h-[2px] bg-[#E10600]" />
				</div>

				{/* Section Header */}
				<div className="flex items-end justify-between gap-4 mb-8">
					<h2 className="font-athletic-black text-[30px] sm:text-[40px] md:text-[44px] leading-[0.95] text-[#0B0B0D] uppercase tracking-tight">
						NUTRITION FOR EVERY GOAL
					</h2>
					<Link
						href="/products"
						className="group hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E10600] uppercase tracking-wider hover:text-[#C60500] transition-colors pb-1 flex-shrink-0"
					>
						<span className="underline underline-offset-4">
							View All Products
						</span>
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
					</Link>
				</div>

				{/* 3 Category Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
					<CategoryCard
						title="WHEY PROTEIN"
						subtitle="CLEAN PROTEIN. REAL RESULTS."
						imageSrc="/assets/whey-jar.png"
						imageAlt="Glow & Fit Whey Protein Chocolate Jar"
						href="/categories/whey-protein"
						delay={0.05}
					/>
					<CategoryCard
						title="READY-TO-MIX PROTEIN"
						subtitle="PROTEIN ON THE GO. ANYTIME. ANYWHERE."
						imageSrc="/assets/ready-to-mix-bottle.png"
						imageAlt="Glow & Fit Ready-to-mix protein bottle"
						href="/categories/ready-to-mix"
						delay={0.15}
					/>
					<CategoryCard
						title="PEANUT BUTTER"
						subtitle="GOOD NUTRITION. GREAT TASTE."
						imageSrc="/assets/peanut-butter.png"
						imageAlt="Glow & Fit Creamy Peanut Butter Jar"
						href="/categories/peanut-butter"
						delay={0.25}
					/>
				</div>

				{/* Mobile "View All" Link */}
				<div className="mt-6 flex sm:hidden justify-center">
					<Link
						href="/products"
						className="inline-flex items-center gap-2 text-xs font-bold text-[#E10600] uppercase tracking-wider"
					>
						View All Products
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
