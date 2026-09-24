"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/trpc/react";

const BG_GRADIENTS: Record<string, string> = {
	"whey-protein": "bg-gradient-to-r from-[#F8F8FA] via-[#F8F8FA] to-[#F1F1F4]",
	"ready-to-mix": "bg-gradient-to-r from-[#F6F3ED] via-[#F6F3ED] to-[#EFEAE0]",
	"peanut-butter": "bg-gradient-to-r from-[#FAF6EF] via-[#FAF6EF] to-[#F2EDE1]",
	"energy-endurance":
		"bg-gradient-to-r from-[#F5F5FA] via-[#F5F5FA] to-[#ECECF6]",
	"daily-wellness":
		"bg-gradient-to-r from-[#F4F8F6] via-[#F4F8F6] to-[#E8F1EC]",
};

export function CategorySection() {
	const { data: categories, isLoading } = api.category.getAll.useQuery();

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

				{/* Dynamic Category Cards Grid */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
					{isLoading
						? // Skeletons
							[1, 2, 3].map((n) => (
								<div
									className="flex min-h-[220px] animate-pulse flex-col justify-between rounded-2xl border border-gray-200/60 bg-gray-50 p-6 sm:min-h-[240px]"
									key={n}
								>
									<div>
										<div className="h-7 w-28 rounded bg-gray-200" />
										<div className="mt-2 h-7 w-36 rounded bg-gray-200" />
										<div className="mt-3 h-3 w-40 rounded bg-gray-100" />
									</div>
									<div className="h-4 w-24 rounded bg-gray-200" />
								</div>
							))
						: (categories || []).slice(0, 3).map((cat, idx) => {
								const nameParts = cat.name.split(" ");
								const titleLine1 = nameParts[0]?.toUpperCase() ?? cat.name;
								const titleLine2 = nameParts.slice(1).join(" ").toUpperCase();
								const bgClass =
									BG_GRADIENTS[cat.slug] ??
									"bg-gradient-to-r from-[#F8F8FA] to-[#F1F1F4]";

								return (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										key={cat.id}
										transition={{
											duration: 0.45,
											delay: idx * 0.1,
											ease: "easeOut",
										}}
										viewport={{ once: true, margin: "-40px" }}
										whileInView={{ opacity: 1, y: 0 }}
									>
										<Link
											aria-label={`Shop ${cat.name}`}
											className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 sm:min-h-[240px] lg:min-h-[250px] ${bgClass} p-5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] active:scale-[0.99] sm:p-6`}
											href={`/categories/${cat.slug}`}
										>
											{/* Content Left */}
											<div className="relative z-10 max-w-[62%] sm:max-w-[60%]">
												{/* Big Title */}
												<h3 className="font-athletic-black text-[#0B0B0D] text-[28px] uppercase leading-[0.9] tracking-tight sm:text-[34px] lg:text-[38px]">
													<span className="block">{titleLine1}</span>
													{titleLine2 && (
														<span className="block">{titleLine2}</span>
													)}
												</h3>

												{/* Description Subline */}
												<p className="mt-2 line-clamp-2 font-bold text-[#6B7280] text-[11px] uppercase tracking-wide">
													{cat.description}
												</p>

												{/* Product count badge */}
												<span className="mt-3 inline-block rounded-full bg-black/5 px-2.5 py-0.5 font-bold text-[10px] text-gray-700">
													{cat.productCount} Products
												</span>
											</div>

											{/* Bottom Action Link */}
											<div className="relative z-10 flex items-center gap-1.5 pt-4">
												<span className="font-bold text-[#0B0B0D] text-xs uppercase tracking-wider transition-colors duration-200 group-hover:text-[#E10600]">
													EXPLORE
												</span>
												<ArrowRight className="h-3.5 w-3.5 text-[#0B0B0D] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#E10600]" />
											</div>

											{/* Category Artwork on the Right */}
											<div className="pointer-events-none absolute right-1 bottom-1 h-[78%] w-[48%] select-none sm:right-2 sm:bottom-2 sm:h-[84%] sm:w-[48%]">
												<Image
													alt={cat.name}
													className="object-contain object-right-bottom transition-transform duration-500 ease-out group-hover:scale-108"
													fill
													sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
													src={cat.imageUrl}
												/>
											</div>
										</Link>
									</motion.div>
								);
							})}
				</div>
			</div>
		</section>
	);
}
