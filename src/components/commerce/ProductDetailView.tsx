"use client";

import {
	ArrowRight,
	Check,
	ChevronDown,
	Minus,
	Plus,
	RotateCw,
	ShieldCheck,
	ShoppingBag,
	Star,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Header } from "@/components/layout/Header";
import { useCart } from "@/lib/cart/cart-context";
import type { FormattedProductItem } from "@/server/catalog/catalog.service";

interface ProductDetailViewProps {
	product: FormattedProductItem;
	relatedProducts: FormattedProductItem[];
}

export function ProductDetailView({
	product,
	relatedProducts,
}: ProductDetailViewProps) {
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [isSubscription, setIsSubscription] = useState(false);
	const [isAdded, setIsAdded] = useState(false);
	const [openAccordion, setOpenAccordion] = useState<string | null>(
		"nutrition",
	);
	const { addItem, openDrawer } = useCart();

	const images =
		product.images.length > 0
			? product.images
			: [
					{
						url: "/assets/card-whey.png",
						altText: product.name,
						position: 1,
						isPrimary: true,
					},
				];

	const activeImage = images[activeImageIndex] ||
		images[0] || {
			url: "/assets/card-whey.png",
			altText: product.name,
			position: 1,
			isPrimary: true,
		};

	// Price calculations
	const unitPricePaise = isSubscription
		? Math.round(product.pricePaise * 0.9)
		: product.pricePaise;

	const totalPricePaise = unitPricePaise * quantity;

	const handleAddToCart = () => {
		if (!product.inStock) return;

		addItem({
			productId: product.id,
			slug: product.slug,
			name: product.name,
			sku: product.sku,
			imageUrl: activeImage.url,
			unitPricePaise: product.pricePaise,
			quantity,
			purchaseType: isSubscription ? "AUTO_DELIVERY" : "ONE_TIME",
			deliveryFrequencyDays: isSubscription ? 30 : 0,
			availableQuantity: product.availableQuantity,
			inStock: product.inStock,
		});

		setIsAdded(true);
		openDrawer();
		setTimeout(() => setIsAdded(false), 2500);
	};

	const toggleAccordion = (section: string) => {
		setOpenAccordion((prev) => (prev === section ? null : section));
	};

	return (
		<div className="flex min-h-screen flex-col bg-[#F9F9FB]">
			{/* Top Header */}
			<div className="sticky top-0 z-30 border-gray-100 border-b bg-white shadow-xs">
				<Header />
			</div>

			<main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav aria-label="Breadcrumb" className="mb-6">
					<ol className="flex items-center gap-2 text-gray-500 text-xs">
						<li>
							<Link className="hover:text-brand-red" href="/">
								Home
							</Link>
						</li>
						<li>/</li>
						<li>
							<Link className="hover:text-brand-red" href="/products">
								Products
							</Link>
						</li>
						<li>/</li>
						<li>
							<Link
								className="hover:text-brand-red"
								href={`/categories/${product.categorySlug}`}
							>
								{product.categoryName}
							</Link>
						</li>
						<li>/</li>
						<li className="line-clamp-1 font-semibold text-gray-900">
							{product.name}
						</li>
					</ol>
				</nav>

				{/* Product Hero Grid (Left: Gallery, Right: Details) */}
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
					{/* ───────── Left: Product Gallery (5 cols) ───────── */}
					<div className="lg:col-span-6">
						<div className="sticky top-24 space-y-4">
							{/* Large Featured Canvas */}
							<div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:h-[480px]">
								{/* Badges Overlay */}
								<div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
									{product.featured && (
										<span className="rounded-full bg-brand-red px-3 py-1 font-bold text-[11px] text-white uppercase tracking-wider shadow-xs">
											Featured
										</span>
									)}
									{product.isLowStock && (
										<span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-[11px] text-amber-800">
											Only {product.availableQuantity} Left
										</span>
									)}
								</div>

								{activeImage && (
									<Image
										alt={activeImage.altText || product.name}
										className="object-contain p-4 transition-transform duration-500 hover:scale-105"
										fill
										priority
										sizes="(max-width: 1024px) 100vw, 50vw"
										src={activeImage.url}
									/>
								)}
							</div>

							{/* Thumbnail Strip */}
							{images.length > 1 && (
								<div className="flex items-center gap-3 overflow-x-auto pb-2">
									{images.map((img, idx) => (
										<button
											aria-label={`View photo ${idx + 1}`}
											className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-white p-1 transition-all ${
												activeImageIndex === idx
													? "border-brand-red ring-2 ring-brand-red/30"
													: "border-gray-200 hover:border-gray-300"
											}`}
											key={img.url}
											onClick={() => setActiveImageIndex(idx)}
											type="button"
										>
											<Image
												alt={img.altText || `View ${idx + 1}`}
												className="object-contain"
												fill
												sizes="80px"
												src={img.url}
											/>
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					{/* ───────── Right: Details & Purchase Panel (6 cols) ───────── */}
					<div className="flex flex-col justify-between lg:col-span-6">
						<div>
							{/* Category & SKU */}
							<div className="flex items-center justify-between">
								<Link
									className="rounded-full bg-red-50 px-3 py-1 font-bold text-[11px] text-brand-red uppercase tracking-wider hover:bg-red-100"
									href={`/categories/${product.categorySlug}`}
								>
									{product.categoryName}
								</Link>
								<span className="font-mono text-gray-400 text-xs">
									SKU: {product.sku}
								</span>
							</div>

							{/* Title */}
							<h1 className="mt-3 font-athletic-black text-[34px] text-brand-black uppercase leading-[0.95] tracking-tight sm:text-[44px]">
								{product.name}
							</h1>

							{/* Rating & Reviews */}
							<div className="mt-3 flex items-center gap-3">
								<div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-amber-500">
									<Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
									<span className="font-bold text-gray-900 text-xs">
										{product.rating}
									</span>
								</div>
								<span className="text-gray-400 text-xs">•</span>
								<span className="font-medium text-gray-600 text-xs">
									{product.reviewCount} Verified Athlete Reviews
								</span>
							</div>

							{/* Short Description */}
							<p className="mt-4 text-gray-600 text-sm leading-relaxed sm:text-base">
								{product.shortDescription || product.description}
							</p>

							{/* Macro Nutrition Pill Strip */}
							{product.nutrition && (
								<div className="mt-5 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/60 via-white to-gray-50 p-4">
									<p className="mb-2 font-bold text-[11px] text-brand-red uppercase tracking-wider">
										Macro Profile (Per Serving)
									</p>
									<div className="grid grid-cols-4 gap-2 text-center">
										{Boolean(product.nutrition.protein) && (
											<div className="rounded-xl border border-gray-100 bg-white p-2">
												<span className="block font-athletic-black text-brand-black text-lg">
													{String(product.nutrition.protein)}
												</span>
												<span className="text-[10px] text-gray-500 uppercase">
													Protein
												</span>
											</div>
										)}
										{Boolean(product.nutrition.bcaa) && (
											<div className="rounded-xl border border-gray-100 bg-white p-2">
												<span className="block font-athletic-black text-brand-black text-lg">
													{String(product.nutrition.bcaa)}
												</span>
												<span className="text-[10px] text-gray-500 uppercase">
													BCAAs
												</span>
											</div>
										)}
										{Boolean(product.nutrition.carbs) && (
											<div className="rounded-xl border border-gray-100 bg-white p-2">
												<span className="block font-athletic-black text-brand-black text-lg">
													{String(product.nutrition.carbs)}
												</span>
												<span className="text-[10px] text-gray-500 uppercase">
													Carbs
												</span>
											</div>
										)}
										{Boolean(product.nutrition.calories) && (
											<div className="rounded-xl border border-gray-100 bg-white p-2">
												<span className="block font-athletic-black text-brand-black text-lg">
													{String(product.nutrition.calories)}
												</span>
												<span className="text-[10px] text-gray-500 uppercase">
													Calories
												</span>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Pricing & Savings */}
							<div className="mt-6 flex items-baseline gap-3 border-gray-200/80 border-t pt-5">
								<span className="font-athletic-black text-[36px] text-brand-red leading-none sm:text-[42px]">
									₹{(unitPricePaise / 100).toLocaleString("en-IN")}
								</span>
								{product.compareAtPaise && (
									<span className="font-medium text-base text-gray-400 line-through">
										₹{(product.compareAtPaise / 100).toLocaleString("en-IN")}
									</span>
								)}
								{product.compareAtPaise &&
									product.compareAtPaise > unitPricePaise && (
										<span className="rounded-full bg-brand-red px-2.5 py-0.5 font-bold text-[11px] text-white">
											SAVE{" "}
											{Math.round(
												((product.compareAtPaise - unitPricePaise) /
													product.compareAtPaise) *
													100,
											)}
											%
										</span>
									)}
							</div>
							<p className="mt-1 text-gray-400 text-xs">
								Inclusive of all taxes. Free express shipping on all orders.
							</p>

							{/* Purchase Type Selector: One-Time vs Auto-Delivery */}
							<div className="mt-5 space-y-2.5">
								{/* One-Time */}
								<label
									className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
										!isSubscription
											? "border-brand-black bg-white ring-1 ring-brand-black"
											: "border-gray-200 bg-gray-50/70 hover:border-gray-300"
									}`}
								>
									<div className="flex items-center gap-3">
										<input
											checked={!isSubscription}
											className="h-4 w-4 accent-brand-red"
											name="purchaseType"
											onChange={() => setIsSubscription(false)}
											type="radio"
										/>
										<div>
											<p className="font-bold text-gray-900 text-xs">
												One-Time Purchase
											</p>
											<p className="text-[11px] text-gray-500">
												Standard single dispatch
											</p>
										</div>
									</div>
									<span className="font-bold text-gray-900 text-xs">
										{product.priceFormatted}
									</span>
								</label>

								{/* Auto-Delivery 10% OFF */}
								<label
									className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
										isSubscription
											? "border-brand-red bg-red-50/20 ring-1 ring-brand-red"
											: "border-gray-200 bg-gray-50/70 hover:border-gray-300"
									}`}
								>
									<div className="flex items-center gap-3">
										<input
											checked={isSubscription}
											className="h-4 w-4 accent-brand-red"
											name="purchaseType"
											onChange={() => setIsSubscription(true)}
											type="radio"
										/>
										<div>
											<div className="flex items-center gap-1.5">
												<p className="font-bold text-gray-900 text-xs">
													Auto-Delivery &amp; Refills
												</p>
												<span className="rounded bg-brand-red px-1.5 py-0.2 font-bold text-[9px] text-white">
													SAVE 10%
												</span>
											</div>
											<p className="text-[11px] text-gray-500">
												Delivered every 30 days • Skip or cancel anytime
											</p>
										</div>
									</div>
									<span className="font-bold text-brand-red text-xs">
										₹
										{(
											Math.round(product.pricePaise * 0.9) / 100
										).toLocaleString("en-IN")}
									</span>
								</label>
							</div>

							{/* Quantity & Add to Cart Controls */}
							<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
								{/* Quantity Adjuster */}
								<div className="flex h-12 items-center justify-between rounded-2xl border border-gray-200 bg-white px-3 sm:w-36">
									<button
										aria-label="Decrease quantity"
										className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
										disabled={quantity <= 1}
										onClick={() => setQuantity((q) => Math.max(1, q - 1))}
										type="button"
									>
										<Minus className="h-4 w-4" />
									</button>
									<span className="font-bold text-gray-900 text-sm">
										{quantity}
									</span>
									<button
										aria-label="Increase quantity"
										className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
										disabled={quantity >= product.availableQuantity}
										onClick={() => setQuantity((q) => q + 1)}
										type="button"
									>
										<Plus className="h-4 w-4" />
									</button>
								</div>

								{/* Primary Athletic CTA Button */}
								<button
									className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl font-bold text-white text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] ${
										isAdded
											? "bg-emerald-600"
											: "bg-brand-red hover:bg-brand-red-hover hover:shadow-lg hover:shadow-red-500/25"
									}`}
									disabled={!product.inStock}
									onClick={handleAddToCart}
									type="button"
								>
									{isAdded ? (
										<>
											<Check className="h-4 w-4" />
											<span>Added to Bag!</span>
										</>
									) : (
										<>
											<ShoppingBag className="h-4 w-4" />
											<span>
												ADD TO CART — ₹
												{(totalPricePaise / 100).toLocaleString("en-IN")}
											</span>
										</>
									)}
								</button>
							</div>

							{/* Trust Chips Row */}
							<div className="mt-5 grid grid-cols-3 gap-2 border-gray-100 border-t pt-4 text-center">
								<div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-600">
									<Truck className="h-3.5 w-3.5 text-brand-red" />
									<span>Free Express Shipping</span>
								</div>
								<div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-600">
									<ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
									<span>100% Authentic / NABL</span>
								</div>
								<div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-600">
									<RotateCw className="h-3.5 w-3.5 text-blue-600" />
									<span>7-Day Easy Returns</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Accordion Detailed Sections */}
				<div className="mt-14 max-w-4xl divide-y divide-gray-200 border-gray-200 border-t border-b">
					{/* Nutrition Facts */}
					<div className="py-4">
						<button
							aria-expanded={openAccordion === "nutrition"}
							className="flex w-full items-center justify-between text-left font-athletic font-bold text-gray-900 text-lg uppercase transition-colors hover:text-brand-red"
							onClick={() => toggleAccordion("nutrition")}
							type="button"
						>
							<span>Nutritional Information &amp; Purity</span>
							<ChevronDown
								className={`h-5 w-5 text-gray-400 transition-transform ${
									openAccordion === "nutrition"
										? "rotate-180 text-brand-red"
										: ""
								}`}
							/>
						</button>
						{openAccordion === "nutrition" && (
							<div className="mt-3 text-gray-600 text-xs leading-relaxed sm:text-sm">
								<p>{product.description}</p>
								<p className="mt-2 text-gray-500 text-xs">
									Manufactured in an FSSAI, US-FDA registered, and GMP-certified
									facility. Cold-filtered without denaturing heat.
								</p>
							</div>
						)}
					</div>

					{/* Suggested Usage */}
					<div className="py-4">
						<button
							aria-expanded={openAccordion === "usage"}
							className="flex w-full items-center justify-between text-left font-athletic font-bold text-gray-900 text-lg uppercase transition-colors hover:text-brand-red"
							onClick={() => toggleAccordion("usage")}
							type="button"
						>
							<span>Suggested Usage &amp; Timing</span>
							<ChevronDown
								className={`h-5 w-5 text-gray-400 transition-transform ${
									openAccordion === "usage" ? "rotate-180 text-brand-red" : ""
								}`}
							/>
						</button>
						{openAccordion === "usage" && (
							<div className="mt-3 text-gray-600 text-xs leading-relaxed sm:text-sm">
								<p>
									Mix 1 scoop with 200–250ml of chilled water or unsweetened
									almond milk in a shaker bottle. Shake vigorously for 20
									seconds until fully dissolved.
								</p>
								<p className="mt-2 text-gray-500 text-xs">
									Best consumed within 30 minutes post-workout, or first thing
									in the morning to stop muscle breakdown.
								</p>
							</div>
						)}
					</div>

					{/* Authenticity Guarantee */}
					<div className="py-4">
						<button
							aria-expanded={openAccordion === "authenticity"}
							className="flex w-full items-center justify-between text-left font-athletic font-bold text-gray-900 text-lg uppercase transition-colors hover:text-brand-red"
							onClick={() => toggleAccordion("authenticity")}
							type="button"
						>
							<span>Authenticity QR Code &amp; Lab Reports</span>
							<ChevronDown
								className={`h-5 w-5 text-gray-400 transition-transform ${
									openAccordion === "authenticity"
										? "rotate-180 text-brand-red"
										: ""
								}`}
							/>
						</button>
						{openAccordion === "authenticity" && (
							<div className="mt-3 text-gray-600 text-xs leading-relaxed sm:text-sm">
								<p>
									Every single Glow &amp; Fit tub features an anti-counterfeit
									QR code under the lid. Scan with your smartphone to inspect
									batch-specific protein assay tests and heavy-metal clearance
									certificates verified by independent NABL accredited labs.
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Complementary & Related Products */}
				{relatedProducts.length > 0 && (
					<div className="mt-16 border-gray-200 border-t pt-10">
						<div className="mb-6 flex items-end justify-between">
							<div>
								<span className="font-bold text-[#E10600] text-xs uppercase tracking-[0.2em]">
									PAIRS WELL WITH
								</span>
								<h2 className="font-athletic-black text-[28px] text-brand-black uppercase leading-tight sm:text-[34px]">
									COMPLETE YOUR STACK
								</h2>
							</div>

							<Link
								className="group hidden items-center gap-1 font-bold text-[#E10600] text-xs uppercase tracking-wider hover:underline sm:flex"
								href={`/categories/${product.categorySlug}`}
							>
								<span>View More In {product.categoryName}</span>
								<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
							</Link>
						</div>

						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
							{relatedProducts.map((p) => (
								<ProductCard key={p.id} product={p} />
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
