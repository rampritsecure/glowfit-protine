"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoryData {
	id: string;
	titleLine1: string;
	titleLine2: string;
	subLine1: string;
	subLine2: string;
	href: string;
	artSrc: string;
	bgClass: string;
	delay: number;
}

const CATEGORIES: CategoryData[] = [
	{
		id: "whey",
		titleLine1: "WHEY",
		titleLine2: "PROTEIN",
		subLine1: "CLEAN PROTEIN.",
		subLine2: "REAL RESULTS.",
		href: "/categories/whey-protein",
		artSrc: "/assets/art-whey.png",
		bgClass: "bg-gradient-to-r from-[#F8F8FA] via-[#F8F8FA] to-[#F1F1F4]",
		delay: 0.05,
	},
	{
		id: "rtm",
		titleLine1: "READY-TO-MIX",
		titleLine2: "PROTEIN",
		subLine1: "PROTEIN ON THE GO.",
		subLine2: "ANYTIME. ANYWHERE.",
		href: "/categories/ready-to-mix",
		artSrc: "/assets/art-rtm.png",
		bgClass: "bg-gradient-to-r from-[#F6F3ED] via-[#F6F3ED] to-[#EFEAE0]",
		delay: 0.15,
	},
	{
		id: "pb",
		titleLine1: "PEANUT",
		titleLine2: "BUTTER",
		subLine1: "GOOD NUTRITION.",
		subLine2: "GREAT TASTE.",
		href: "/categories/peanut-butter",
		artSrc: "/assets/art-pb.png",
		bgClass: "bg-gradient-to-r from-[#FAF6EF] via-[#FAF6EF] to-[#F2EDE1]",
		delay: 0.25,
	},
];

export function CategorySection() {
	return (
		<section className="w-full bg-white pt-8 pb-16 sm:pb-24">
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

				{/* 3 Real Category Cards Grid */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
					{CATEGORIES.map((card) => (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							key={card.id}
							transition={{
								duration: 0.45,
								delay: card.delay,
								ease: "easeOut",
							}}
							viewport={{ once: true, margin: "-40px" }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							<Link
								aria-label={`Shop ${card.titleLine1} ${card.titleLine2} - ${card.subLine1} ${card.subLine2}`}
								className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 sm:min-h-[240px] lg:min-h-[250px] ${card.bgClass} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] active:scale-[0.99] sm:p-6`}
								href={card.href}
							>
								{/* Left Real Content: Headline, Subtitle, and Button */}
								<div className="relative z-10 flex h-full max-w-[50%] flex-col justify-between">
									<div>
										<h3 className="font-athletic-black text-[24px] text-brand-black uppercase leading-[0.88] tracking-[-0.02em] sm:text-[28px] lg:text-[30px] xl:text-[32px]">
											{card.titleLine1} <br />
											{card.titleLine2}
										</h3>
										<p className="mt-2 font-bold text-[#4B5563] text-[10px] uppercase leading-tight tracking-[0.14em] sm:text-[11px]">
											{card.subLine1} <br />
											{card.subLine2}
										</p>
									</div>

									<div className="pt-6 sm:pt-7">
										<span className="inline-flex items-center gap-2 rounded-lg bg-[#0B0B0D] px-4 py-2 font-bold text-[10.5px] text-white uppercase tracking-wider shadow-sm transition-all duration-200 group-hover:bg-[#E10600] group-hover:shadow-md sm:px-4.5 sm:py-2.5 sm:text-[11.5px]">
											SHOP NOW
											<ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
										</span>
									</div>
								</div>

								{/* Right Side Visual Artwork (Product, ground shadow, chocolate/peanuts/powder, red lightning) */}
								<div className="pointer-events-none absolute top-0 right-0 bottom-0 w-[58%] select-none overflow-hidden">
									<Image
										alt={`${card.titleLine1} ${card.titleLine2}`}
										className="object-cover object-right transition-transform duration-500 ease-out group-hover:scale-[1.03]"
										fill
										priority
										sizes="(min-width: 1024px) 25vw, (min-width: 768px) 35vw, 55vw"
										src={card.artSrc}
									/>
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* Mobile "View All" Link */}
				<div className="mt-8 flex justify-center sm:hidden">
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
