"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
			className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-gray-200/60 bg-[#F6F6F7] transition-all duration-300 hover:border-gray-300/80 hover:bg-[#F0F0F2] hover:shadow-lg sm:min-h-[280px]"
			initial={{ opacity: 0, y: 25 }}
			transition={{ duration: 0.5, delay, ease: "easeOut" }}
			viewport={{ once: true, margin: "-50px" }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{/* Red angular accent on right half */}
			<div className="pointer-events-none absolute top-0 right-0 z-0 h-full w-[55%] overflow-hidden">
				<svg
					aria-hidden="true"
					className="absolute top-0 right-0 h-full w-full text-[#E10600] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:scale-105"
					fill="currentColor"
					preserveAspectRatio="none"
					viewBox="0 0 200 300"
				>
					<polygon points="80,0 200,0 200,300 130,300 170,160 70,190" />
				</svg>
			</div>

			{/* Content */}
			<div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
				{/* Text + CTA */}
				<div className="max-w-[55%]">
					<h3 className="mb-2 font-athletic-black text-[#0B0B0D] text-[26px] uppercase leading-[0.92] tracking-tight sm:text-[30px] md:text-[28px] lg:text-[32px]">
						{title}
					</h3>
					<p className="mb-6 font-semibold text-[11px] text-gray-500 uppercase leading-snug tracking-wider sm:text-xs">
						{subtitle}
					</p>
				</div>

				<div className="max-w-[55%]">
					<Link
						className="inline-flex items-center gap-2 rounded-full bg-[#0B0B0D] px-5 py-2.5 font-bold text-[11px] text-white uppercase tracking-wider shadow-sm transition-all duration-200 group-hover:bg-[#E10600] group-hover:shadow-md sm:text-xs"
						href={href}
					>
						SHOP NOW
						<ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
					</Link>
				</div>
			</div>

			{/* Product Image */}
			<div className="pointer-events-none absolute right-2 bottom-2 z-10 flex h-[85%] w-[42%] items-end justify-center sm:right-4 sm:bottom-3">
				<div className="relative flex h-full w-full items-end justify-center transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105">
					<Image
						alt={imageAlt}
						className="max-h-full w-auto object-contain drop-shadow-xl"
						height={260}
						src={imageSrc}
						width={280}
					/>
				</div>
			</div>
		</motion.div>
	);
}

export function CategorySection() {
	return (
		<section className="w-full bg-white pt-10 pb-16 sm:pb-24">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
				{/* Kicker */}
				<div className="mb-2 flex items-center gap-3">
					<span className="font-bold text-[#E10600] text-xs uppercase tracking-[0.2em] sm:text-sm">
						SHOP BY CATEGORY
					</span>
					<span className="h-[2px] w-10 bg-[#E10600]" />
				</div>

				{/* Section Header */}
				<div className="mb-8 flex items-end justify-between gap-4">
					<h2 className="font-athletic-black text-[#0B0B0D] text-[30px] uppercase leading-[0.95] tracking-tight sm:text-[40px] md:text-[44px]">
						NUTRITION FOR EVERY GOAL
					</h2>
					<Link
						className="group hidden flex-shrink-0 items-center gap-1.5 pb-1 font-bold text-[#E10600] text-xs uppercase tracking-wider transition-colors hover:text-[#C60500] sm:flex sm:text-sm"
						href="/products"
					>
						<span className="underline underline-offset-4">
							View All Products
						</span>
						<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
					</Link>
				</div>

				{/* 3 Category Cards Grid */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-7">
					<CategoryCard
						delay={0.05}
						href="/categories/whey-protein"
						imageAlt="Glow & Fit Whey Protein Chocolate Jar"
						imageSrc="/assets/whey-jar.png"
						subtitle="CLEAN PROTEIN. REAL RESULTS."
						title="WHEY PROTEIN"
					/>
					<CategoryCard
						delay={0.15}
						href="/categories/ready-to-mix"
						imageAlt="Glow & Fit Ready-to-mix protein bottle"
						imageSrc="/assets/ready-to-mix-bottle.png"
						subtitle="PROTEIN ON THE GO. ANYTIME. ANYWHERE."
						title="READY-TO-MIX PROTEIN"
					/>
					<CategoryCard
						delay={0.25}
						href="/categories/peanut-butter"
						imageAlt="Glow & Fit Creamy Peanut Butter Jar"
						imageSrc="/assets/peanut-butter.png"
						subtitle="GOOD NUTRITION. GREAT TASTE."
						title="PEANUT BUTTER"
					/>
				</div>

				{/* Mobile "View All" Link */}
				<div className="mt-6 flex justify-center sm:hidden">
					<Link
						className="inline-flex items-center gap-2 font-bold text-[#E10600] text-xs uppercase tracking-wider"
						href="/products"
					>
						View All Products
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
