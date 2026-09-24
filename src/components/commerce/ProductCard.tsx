"use client";

import { ArrowRight, Check, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart/cart-context";
import type { FormattedProductItem } from "@/server/catalog/catalog.service";

interface ProductCardProps {
	product: FormattedProductItem;
	priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
	const [isAdded, setIsAdded] = useState(false);
	const { addItem } = useCart();

	// Extract macro highlight from nutrition object
	const proteinHighlight =
		product.nutrition && typeof product.nutrition.protein === "string"
			? product.nutrition.protein
			: null;

	const primaryImageSrc =
		product.primaryImage?.url ||
		product.images[0]?.url ||
		"/assets/card-whey.png";

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!product.inStock) return;

		addItem({
			productId: product.id,
			slug: product.slug,
			name: product.name,
			sku: product.sku,
			imageUrl: primaryImageSrc,
			unitPricePaise: product.pricePaise,
			availableQuantity: product.availableQuantity,
			inStock: product.inStock,
			purchaseType: "ONE_TIME",
		});

		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 2200);
	};

	return (
		<div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl sm:p-5">
			<div>
				{/* Top Badges Row */}
				<div className="flex items-center justify-between gap-2">
					{proteinHighlight ? (
						<span className="rounded-full bg-brand-black px-2.5 py-0.5 font-bold text-[10px] text-white uppercase tracking-wider">
							{proteinHighlight} Protein
						</span>
					) : (
						<span className="rounded-full bg-brand-red/10 px-2.5 py-0.5 font-bold text-[10px] text-brand-red uppercase tracking-wider">
							{product.categoryName}
						</span>
					)}

					{product.isLowStock ? (
						<span className="rounded-full bg-amber-50 px-2 py-0.5 font-bold text-[10px] text-amber-700">
							Only {product.availableQuantity} Left
						</span>
					) : product.inStock ? (
						<span className="rounded-full bg-emerald-50 px-2 py-0.5 font-bold text-[10px] text-emerald-700">
							In Stock
						</span>
					) : (
						<span className="rounded-full bg-gray-100 px-2 py-0.5 font-bold text-[10px] text-gray-500">
							Sold Out
						</span>
					)}
				</div>

				{/* Product Imagery */}
				<Link
					aria-label={`View ${product.name}`}
					className="relative mx-auto mt-3 block h-52 w-full overflow-hidden sm:h-56"
					href={`/products/${product.slug}`}
				>
					<Image
						alt={product.primaryImage?.altText || product.name}
						className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-108"
						fill
						priority={priority}
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						src={primaryImageSrc}
					/>
				</Link>

				{/* Product Info */}
				<div className="mt-3">
					{/* Rating */}
					<div className="flex items-center gap-1.5 text-xs">
						<div className="flex items-center text-amber-400">
							{[1, 2, 3, 4, 5].map((s) => (
								<Star
									className="h-3 w-3 fill-amber-400 text-amber-400"
									key={s}
								/>
							))}
						</div>
						<span className="font-bold text-[11px] text-gray-800">
							{product.rating}
						</span>
						<span className="text-[11px] text-gray-400">
							({product.reviewCount})
						</span>
					</div>

					{/* Title */}
					<Link
						className="mt-1.5 block focus:outline-none"
						href={`/products/${product.slug}`}
					>
						<h3 className="line-clamp-1 font-athletic font-extrabold text-[19px] text-brand-black uppercase leading-tight tracking-tight transition-colors group-hover:text-brand-red">
							{product.name}
						</h3>
					</Link>

					{/* Short Description */}
					<p className="mt-1 line-clamp-2 text-gray-500 text-xs leading-relaxed">
						{product.shortDescription || product.description}
					</p>

					{/* Pricing */}
					<div className="mt-3 flex items-baseline gap-2">
						<span className="font-athletic-black text-[22px] text-brand-red leading-none">
							{product.priceFormatted}
						</span>
						{product.compareAtFormatted && (
							<span className="font-medium text-gray-400 text-xs line-through">
								{product.compareAtFormatted}
							</span>
						)}
						{product.compareAtPaise &&
							product.compareAtPaise > product.pricePaise && (
								<span className="rounded bg-brand-red/10 px-1.5 py-0.5 font-bold text-[10px] text-brand-red">
									SAVE{" "}
									{Math.round(
										((product.compareAtPaise - product.pricePaise) /
											product.compareAtPaise) *
											100,
									)}
									%
								</span>
							)}
					</div>
				</div>
			</div>

			{/* Actions Footer */}
			<div className="mt-4 flex items-center gap-2 border-gray-100 border-t pt-3.5">
				<Link
					className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 font-bold text-[11px] text-gray-800 uppercase tracking-wider transition-colors hover:border-gray-900 hover:bg-gray-50"
					href={`/products/${product.slug}`}
				>
					<span>View Details</span>
					<ArrowRight className="h-3.5 w-3.5" />
				</Link>

				<button
					aria-label={`Add ${product.name} to cart`}
					className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs transition-all active:scale-95 ${
						isAdded
							? "bg-emerald-600 text-white"
							: "bg-brand-red text-white hover:bg-brand-red-hover"
					}`}
					disabled={!product.inStock}
					onClick={handleAddToCart}
					title={product.inStock ? "Add to Cart" : "Out of Stock"}
					type="button"
				>
					{isAdded ? (
						<Check className="h-4 w-4" />
					) : (
						<ShoppingBag className="h-4 w-4" />
					)}
				</button>
			</div>
		</div>
	);
}

export function ProductCardSkeleton() {
	return (
		<div className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
			<div>
				<div className="flex justify-between">
					<div className="h-4 w-20 animate-pulse rounded-full bg-gray-200" />
					<div className="h-4 w-14 animate-pulse rounded-full bg-gray-200" />
				</div>
				<div className="mx-auto mt-4 h-48 w-full animate-pulse rounded-xl bg-gray-100" />
				<div className="mt-4 h-3 w-24 animate-pulse rounded bg-gray-200" />
				<div className="mt-2 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
				<div className="mt-2 h-3 w-full animate-pulse rounded bg-gray-100" />
				<div className="mt-3 h-6 w-28 animate-pulse rounded bg-gray-200" />
			</div>
			<div className="mt-4 flex gap-2 border-gray-100 border-t pt-3">
				<div className="h-10 flex-1 animate-pulse rounded-xl bg-gray-100" />
				<div className="h-10 w-10 animate-pulse rounded-xl bg-gray-100" />
			</div>
		</div>
	);
}
