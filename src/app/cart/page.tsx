"use client";

import {
	ArrowRight,
	CheckCircle,
	Lock,
	Minus,
	Plus,
	RotateCw,
	ShieldCheck,
	ShoppingBag,
	Sparkles,
	Tag,
	Trash2,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { useCart } from "@/lib/cart/cart-context";

export default function CartPage() {
	const {
		items,
		totalItems,
		formattedSubtotal,
		formattedSavings,
		formattedTotal,
		autoDeliverySavingsPaise,
		updateQuantity,
		togglePurchaseType,
		removeItem,
		clearCart,
		isHydrated,
	} = useCart();

	const [couponCode, setCouponCode] = useState("");
	const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
	const [couponError, setCouponError] = useState<string | null>(null);

	const handleApplyCoupon = (e: React.FormEvent) => {
		e.preventDefault();
		const clean = couponCode.trim().toUpperCase();
		if (!clean) return;

		if (clean === "GLOW10" || clean === "ATHLETE") {
			setAppliedCoupon(clean);
			setCouponError(null);
		} else {
			setCouponError("Invalid coupon code. Try 'GLOW10' or 'ATHLETE'.");
		}
	};

	if (!isHydrated) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#F9F9FB]">
				<div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col bg-[#F9F9FB]">
			{/* Top Header */}
			<div className="sticky top-0 z-30 border-gray-100 border-b bg-white shadow-xs">
				<Header />
			</div>

			<main className="mx-auto w-full max-w-[1300px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav aria-label="Breadcrumb" className="mb-4">
					<ol className="flex items-center gap-2 text-gray-500 text-xs">
						<li>
							<Link className="hover:text-brand-red" href="/">
								Home
							</Link>
						</li>
						<li>/</li>
						<li className="font-semibold text-gray-900">Shopping Bag</li>
					</ol>
				</nav>

				{/* Title Header */}
				<div className="flex flex-col justify-between gap-4 border-gray-200/80 border-b pb-6 sm:flex-row sm:items-end">
					<div>
						<div className="flex items-center gap-3">
							<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
								YOUR SHOPPING BAG
							</h1>
							<span className="rounded-full bg-gray-100 px-3 py-1 font-bold text-gray-700 text-xs">
								{totalItems} {totalItems === 1 ? "Item" : "Items"}
							</span>
						</div>
						<p className="mt-1 text-gray-600 text-sm">
							Review your daily nutrition stack before heading to secure
							checkout.
						</p>
					</div>

					{items.length > 0 && (
						<button
							className="self-start font-semibold text-gray-500 text-xs hover:text-brand-red sm:self-auto"
							onClick={clearCart}
							type="button"
						>
							Clear Bag
						</button>
					)}
				</div>

				{/* Cart Body */}
				{items.length === 0 ? (
					/* Empty State */
					<div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-gray-200 border-dashed bg-white p-14 text-center shadow-xs">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-brand-red">
							<ShoppingBag className="h-8 w-8" />
						</div>
						<h2 className="mt-5 font-athletic font-bold text-2xl text-gray-900 uppercase">
							YOUR BAG IS EMPTY
						</h2>
						<p className="mt-1.5 max-w-sm text-gray-500 text-xs sm:text-sm">
							You haven't added any nutrition essentials yet. Fuel up your
							workout with our clean whey isolate and ready-to-mix protein
							water!
						</p>
						<Link
							className="mt-6 rounded-xl bg-brand-red px-7 py-3 font-bold text-white text-xs uppercase tracking-wider shadow-sm transition-transform hover:bg-brand-red-hover active:scale-95"
							href="/products"
						>
							Explore Nutrition Catalog
						</Link>
					</div>
				) : (
					/* Two-Column Layout */
					<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
						{/* ───────── Left: Items List (8 cols) ───────── */}
						<div className="space-y-4 lg:col-span-8">
							{items.map((item) => {
								const isAuto = item.purchaseType === "AUTO_DELIVERY";

								return (
									<div
										className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs transition-shadow hover:shadow-md sm:flex-row sm:items-center"
										key={item.id}
									>
										{/* Product Thumbnail & Meta */}
										<div className="flex items-center gap-4">
											<div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-2">
												<Image
													alt={item.name}
													className="h-full w-full object-contain"
													fill
													sizes="96px"
													src={item.imageUrl}
												/>
											</div>

											<div>
												<Link
													className="font-athletic font-bold text-base text-gray-900 uppercase tracking-tight hover:text-brand-red sm:text-lg"
													href={`/products/${item.slug}`}
												>
													{item.name}
												</Link>

												<div className="mt-1 flex items-center gap-2">
													{/* Mode Switcher */}
													<button
														className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold text-[10.5px] uppercase tracking-wider transition-colors ${
															isAuto
																? "bg-brand-red/10 text-brand-red hover:bg-brand-red/20"
																: "bg-gray-100 text-gray-600 hover:bg-gray-200"
														}`}
														onClick={() => togglePurchaseType(item.id)}
														title="Toggle between One-Time and Auto-Delivery"
														type="button"
													>
														<RotateCw className="h-3 w-3" />
														<span>
															{isAuto ? "Auto-Delivery (10% OFF)" : "One-Time"}
														</span>
													</button>
													<span className="text-[11px] text-gray-400">
														SKU: {item.sku}
													</span>
												</div>

												{isAuto && (
													<p className="mt-1.5 flex items-center gap-1 text-[11px] text-gray-500">
														<Sparkles className="h-3 w-3 text-brand-red" />
														<span>Refills automatically every 30 days</span>
													</p>
												)}
											</div>
										</div>

										{/* Controls: Stepper, Price & Remove */}
										<div className="flex items-center justify-between border-gray-100 border-t pt-3 sm:justify-end sm:gap-6 sm:border-0 sm:pt-0">
											{/* Stepper */}
											<div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
												<button
													aria-label="Decrease quantity"
													className="rounded-lg p-1 text-gray-600 hover:bg-white"
													onClick={() => updateQuantity(item.id, -1)}
													type="button"
												>
													<Minus className="h-3.5 w-3.5" />
												</button>
												<span className="w-8 text-center font-bold text-gray-900 text-xs">
													{item.quantity}
												</span>
												<button
													aria-label="Increase quantity"
													className="rounded-lg p-1 text-gray-600 hover:bg-white"
													onClick={() => updateQuantity(item.id, 1)}
													type="button"
												>
													<Plus className="h-3.5 w-3.5" />
												</button>
											</div>

											{/* Price */}
											<div className="text-right">
												<span className="font-athletic-black text-[22px] text-brand-red leading-none">
													₹
													{(item.totalPricePaise / 100).toLocaleString("en-IN")}
												</span>
												{isAuto && (
													<span className="block text-[11px] text-gray-400 line-through">
														₹
														{(
															(item.unitPricePaise * item.quantity) /
															100
														).toLocaleString("en-IN")}
													</span>
												)}
											</div>

											{/* Delete */}
											<button
												aria-label="Remove item"
												className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-brand-red"
												onClick={() => removeItem(item.id)}
												type="button"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</div>
									</div>
								);
							})}

							{/* Continue Shopping Link */}
							<div className="pt-2">
								<Link
									className="inline-flex items-center gap-1.5 font-bold text-[#E10600] text-xs uppercase tracking-wider hover:underline"
									href="/products"
								>
									<span>&larr; Continue Shopping</span>
								</Link>
							</div>
						</div>

						{/* ───────── Right: Order Summary (4 cols) ───────── */}
						<div className="lg:col-span-4">
							<div className="sticky top-24 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xs">
								<h2 className="font-athletic font-extrabold text-gray-900 text-xl uppercase tracking-tight">
									ORDER SUMMARY
								</h2>

								{/* Coupon Code Section */}
								<form className="mt-4" onSubmit={handleApplyCoupon}>
									<label
										className="block font-semibold text-gray-700 text-xs"
										htmlFor="couponCode"
									>
										Promo Code
									</label>
									<div className="mt-1.5 flex gap-2">
										<div className="relative flex-1">
											<Tag className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
											<input
												className="w-full rounded-xl border border-gray-200 py-2 pr-3 pl-9 text-xs uppercase focus:border-brand-red focus:outline-none"
												id="couponCode"
												onChange={(e) => setCouponCode(e.target.value)}
												placeholder="e.g. GLOW10"
												type="text"
												value={couponCode}
											/>
										</div>
										<button
											className="rounded-xl bg-gray-900 px-4 py-2 font-bold text-white text-xs uppercase hover:bg-black"
											type="submit"
										>
											Apply
										</button>
									</div>

									{appliedCoupon && (
										<p className="mt-1.5 flex items-center gap-1 font-semibold text-emerald-600 text-xs">
											<CheckCircle className="h-3.5 w-3.5" />
											<span>Coupon {appliedCoupon} applied!</span>
										</p>
									)}
									{couponError && (
										<p className="mt-1.5 text-brand-red text-xs">
											{couponError}
										</p>
									)}
								</form>

								{/* Cost Breakdown */}
								<div className="mt-6 space-y-2.5 border-gray-100 border-t pt-4 text-xs">
									<div className="flex justify-between text-gray-600">
										<span>Items Subtotal</span>
										<span className="font-semibold text-gray-900">
											{formattedSubtotal}
										</span>
									</div>

									{autoDeliverySavingsPaise > 0 && (
										<div className="flex justify-between font-bold text-brand-red">
											<span className="flex items-center gap-1">
												<Sparkles className="h-3 w-3" />
												Auto-Delivery Refill Savings (10%)
											</span>
											<span>-{formattedSavings}</span>
										</div>
									)}

									<div className="flex justify-between text-gray-600">
										<span>Express Delivery</span>
										<span className="font-bold text-emerald-600">FREE</span>
									</div>

									<div className="flex items-baseline justify-between border-gray-200 border-t pt-3">
										<div>
											<span className="font-athletic font-extrabold text-base text-gray-900 uppercase">
												Grand Total
											</span>
											<span className="block text-[11px] text-gray-400">
												Inclusive of all GST &amp; Taxes
											</span>
										</div>
										<span className="font-athletic-black text-[28px] text-brand-red leading-none">
											{formattedTotal}
										</span>
									</div>
								</div>

								{/* Primary Checkout CTA */}
								<button
									className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red py-3.5 font-bold text-white text-xs uppercase tracking-wider shadow-md transition-all hover:bg-brand-red-hover hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98]"
									onClick={() =>
										alert(
											"Checkout step is ready. Connecting next with Razorpay payment processing!",
										)
									}
									type="button"
								>
									<Lock className="h-3.5 w-3.5" />
									<span>PROCEED TO SECURE CHECKOUT</span>
									<ArrowRight className="h-3.5 w-3.5" />
								</button>

								{/* Trust Badges */}
								<div className="mt-5 space-y-2 border-gray-100 border-t pt-4 text-[11px] text-gray-500">
									<div className="flex items-center gap-2">
										<Truck className="h-3.5 w-3.5 text-brand-red" />
										<span>Priority dispatch from nearest regional hub</span>
									</div>
									<div className="flex items-center gap-2">
										<ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
										<span>RBI Compliant 256-bit SSL encrypted checkout</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
