"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import {
	ProductCard,
	ProductCardSkeleton,
} from "@/components/commerce/ProductCard";
import { api } from "@/trpc/react";

export function FeaturedProductsSection() {
	const { data: products, isLoading } = api.product.getFeatured.useQuery();

	return (
		<section className="w-full bg-[#FBFBFC] py-14 sm:py-20">
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
				{/* Header */}
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<div className="mb-2 flex items-center gap-2">
							<span className="flex items-center gap-1.5 font-bold text-[#E10600] text-xs uppercase tracking-[0.2em] sm:text-sm">
								<Sparkles className="h-4 w-4" />
								ATHLETE FAVORITES
							</span>
							<span className="h-[2px] w-10 bg-[#E10600]" />
						</div>
						<h2 className="font-athletic-black text-[#0B0B0D] text-[32px] uppercase leading-[0.95] tracking-tight sm:text-[42px]">
							FEATURED FORMULATIONS
						</h2>
						<p className="mt-1 max-w-xl text-gray-500 text-xs sm:text-sm">
							Ultra-pure whey isolate, slow-roasted protein butter, and clear
							water infusions. Made for daily athletic recovery.
						</p>
					</div>

					<Link
						className="group inline-flex items-center gap-2 self-start rounded-full border border-gray-300 bg-white px-5 py-2.5 font-bold text-gray-900 text-xs uppercase tracking-wider shadow-xs transition-colors hover:border-black hover:bg-black hover:text-white sm:self-auto"
						href="/products"
					>
						<span>View Full Catalog</span>
						<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				{/* Products Grid */}
				<div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
					{isLoading ? (
						[1, 2, 3].map((n) => <ProductCardSkeleton key={n} />)
					) : (products || []).length === 0 ? (
						<div className="col-span-full py-12 text-center text-gray-500 text-sm">
							No featured products found.
						</div>
					) : (
						(products || []).map((product, idx) => (
							<ProductCard
								key={product.id}
								priority={idx === 0}
								product={product}
							/>
						))
					)}
				</div>
			</div>
		</section>
	);
}
