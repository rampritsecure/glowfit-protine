"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	Minus,
	Plus,
	RotateCw,
	ShoppingBag,
	Sparkles,
	Trash2,
	Truck,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart/cart-context";

export function CartDrawer() {
	const {
		items,
		totalItems,
		formattedSubtotal,
		formattedSavings,
		formattedTotal,
		autoDeliverySavingsPaise,
		isDrawerOpen,
		closeDrawer,
		updateQuantity,
		togglePurchaseType,
		removeItem,
	} = useCart();

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeDrawer();
		};
		if (isDrawerOpen) {
			window.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		};
	}, [isDrawerOpen, closeDrawer]);

	return (
		<AnimatePresence>
			{isDrawerOpen && (
				<div className="fixed inset-0 z-50 overflow-hidden">
					{/* Backdrop */}
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={closeDrawer}
					/>

					{/* Drawer Panel */}
					<div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
						<motion.div
							animate={{ x: 0 }}
							className="flex w-screen max-w-md flex-col bg-white shadow-2xl"
							exit={{ x: "100%" }}
							initial={{ x: "100%" }}
							transition={{ type: "spring", damping: 28, stiffness: 300 }}
						>
							{/* Drawer Header */}
							<div className="flex items-center justify-between border-gray-100 border-b px-5 py-4">
								<div className="flex items-center gap-2.5">
									<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-brand-red">
										<ShoppingBag className="h-5 w-5" />
									</div>
									<div>
										<h2 className="font-athletic font-extrabold text-gray-900 text-lg uppercase tracking-tight">
											YOUR SHOPPING BAG
										</h2>
										<p className="text-[11px] text-gray-500">
											{totalItems} {totalItems === 1 ? "item" : "items"} ready
											for dispatch
										</p>
									</div>
								</div>

								<button
									aria-label="Close cart drawer"
									className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
									onClick={closeDrawer}
									type="button"
								>
									<X className="h-5 w-5" />
								</button>
							</div>

							{/* Free Shipping Banner */}
							<div className="flex items-center gap-2 border-emerald-100 border-b bg-emerald-50/50 px-5 py-2.5 text-[11.5px] text-emerald-800">
								<Truck className="h-4 w-4 shrink-0 text-emerald-600" />
								<span>
									You've qualified for <strong>FREE Express Delivery</strong>{" "}
									across India!
								</span>
							</div>

							{/* Drawer Body: Cart Items List */}
							<div className="flex-1 overflow-y-auto p-5">
								{items.length === 0 ? (
									/* Empty Bag */
									<div className="flex h-full flex-col items-center justify-center text-center">
										<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-brand-red">
											<ShoppingBag className="h-8 w-8" />
										</div>
										<h3 className="mt-4 font-athletic font-bold text-gray-900 text-xl uppercase">
											YOUR BAG IS EMPTY
										</h3>
										<p className="mt-1 max-w-xs text-gray-500 text-xs">
											Fuel up your athletic goals. Explore our lab-tested whey
											protein and workout essentials.
										</p>
										<Link
											className="mt-6 rounded-xl bg-brand-red px-6 py-2.5 font-bold text-white text-xs uppercase tracking-wider shadow-sm transition-transform hover:bg-brand-red-hover active:scale-95"
											href="/products"
											onClick={closeDrawer}
										>
											Start Shopping
										</Link>
									</div>
								) : (
									/* Items List */
									<div className="space-y-4 divide-y divide-gray-100">
										{items.map((item) => {
											const isAuto = item.purchaseType === "AUTO_DELIVERY";

											return (
												<div
													className="flex gap-4 pt-4 first:pt-0"
													key={item.id}
												>
													{/* Product Image */}
													<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-1">
														<Image
															alt={item.name}
															className="h-full w-full object-contain"
															fill
															sizes="80px"
															src={item.imageUrl}
														/>
													</div>

													{/* Details */}
													<div className="min-w-0 flex-1">
														<div className="flex items-start justify-between gap-2">
															<Link
																className="line-clamp-1 font-bold text-gray-900 text-xs hover:text-brand-red"
																href={`/products/${item.slug}`}
																onClick={closeDrawer}
															>
																{item.name}
															</Link>
															<button
																aria-label="Remove item"
																className="text-gray-400 hover:text-brand-red"
																onClick={() => removeItem(item.id)}
																type="button"
															>
																<Trash2 className="h-3.5 w-3.5" />
															</button>
														</div>

														{/* One-Time vs Auto-Delivery Pill */}
														<div className="mt-1.5 flex items-center gap-1.5">
															<button
																className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-bold text-[9.5px] uppercase tracking-wider transition-colors ${
																	isAuto
																		? "bg-brand-red/10 text-brand-red hover:bg-brand-red/20"
																		: "bg-gray-100 text-gray-600 hover:bg-gray-200"
																}`}
																onClick={() => togglePurchaseType(item.id)}
																title="Click to toggle between One-Time and Auto-Delivery"
																type="button"
															>
																<RotateCw className="h-2.5 w-2.5" />
																<span>
																	{isAuto
																		? "Auto-Delivery (10% OFF)"
																		: "One-Time"}
																</span>
															</button>
														</div>

														{/* Price & Quantity Adjuster */}
														<div className="mt-3 flex items-center justify-between">
															{/* Stepper */}
															<div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
																<button
																	aria-label="Decrease quantity"
																	className="rounded p-1 text-gray-600 hover:bg-white"
																	onClick={() => updateQuantity(item.id, -1)}
																	type="button"
																>
																	<Minus className="h-3 w-3" />
																</button>
																<span className="w-6 text-center font-bold text-gray-900 text-xs">
																	{item.quantity}
																</span>
																<button
																	aria-label="Increase quantity"
																	className="rounded p-1 text-gray-600 hover:bg-white"
																	onClick={() => updateQuantity(item.id, 1)}
																	type="button"
																>
																	<Plus className="h-3 w-3" />
																</button>
															</div>

															{/* Price */}
															<div className="text-right">
																<span className="font-extrabold text-brand-red text-sm">
																	₹
																	{(item.totalPricePaise / 100).toLocaleString(
																		"en-IN",
																	)}
																</span>
																{isAuto && (
																	<span className="block text-[10px] text-gray-400 line-through">
																		₹
																		{(
																			(item.unitPricePaise * item.quantity) /
																			100
																		).toLocaleString("en-IN")}
																	</span>
																)}
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								)}
							</div>

							{/* Drawer Footer: Order Summary & Checkout CTA */}
							{items.length > 0 && (
								<div className="border-gray-100 border-t bg-gray-50/70 p-5">
									{/* Savings Highlight */}
									{autoDeliverySavingsPaise > 0 && (
										<div className="mb-3 flex items-center justify-between rounded-xl bg-red-50 px-3 py-1.5 font-bold text-[11px] text-brand-red">
											<span className="flex items-center gap-1">
												<Sparkles className="h-3 w-3" />
												Auto-Delivery Refill Savings
											</span>
											<span>-{formattedSavings}</span>
										</div>
									)}

									{/* Subtotal & Delivery */}
									<div className="space-y-1.5 text-xs">
										<div className="flex justify-between text-gray-500">
											<span>Subtotal</span>
											<span className="font-semibold text-gray-900">
												{formattedSubtotal}
											</span>
										</div>
										<div className="flex justify-between text-gray-500">
											<span>Express Delivery</span>
											<span className="font-bold text-emerald-600">FREE</span>
										</div>
										<div className="flex items-baseline justify-between border-gray-200 border-t pt-2">
											<span className="font-bold text-gray-900 text-sm">
												Total (Incl. Taxes)
											</span>
											<span className="font-athletic-black text-[24px] text-brand-red">
												{formattedTotal}
											</span>
										</div>
									</div>

									{/* Action Buttons */}
									<div className="mt-4 flex flex-col gap-2">
										<Link
											className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-3 font-bold text-white text-xs uppercase tracking-wider shadow-sm transition-all hover:bg-brand-red-hover active:scale-[0.99]"
											href="/cart"
											onClick={closeDrawer}
										>
											<span>Proceed to Checkout</span>
											<ArrowRight className="h-3.5 w-3.5" />
										</Link>

										<Link
											className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-2.5 font-bold text-gray-700 text-xs uppercase tracking-wider transition-colors hover:bg-gray-100"
											href="/cart"
											onClick={closeDrawer}
										>
											View Full Shopping Bag
										</Link>
									</div>
								</div>
							)}
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
}
