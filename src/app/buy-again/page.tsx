"use client";

import {
	ArrowRight,
	Check,
	Clock,
	Minus,
	Plus,
	RefreshCw,
	Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { useCart } from "@/lib/cart/cart-context";

interface BuyAgainProduct {
	id: string;
	title: string;
	flavorSize: string;
	pricePaise: number;
	lastOrderedText: string;
	timesOrdered: number;
	imageUrl: string;
	isRefillDue?: boolean;
}

const INITIAL_BUY_AGAIN_PRODUCTS: BuyAgainProduct[] = [
	{
		id: "ba-1",
		title: "100% Whey Protein Isolate",
		flavorSize: "Rich Chocolate Silk • 1 kg",
		pricePaise: 329900,
		timesOrdered: 3,
		lastOrderedText: "Last ordered 22 days ago",
		isRefillDue: true,
		imageUrl: "/assets/card-whey.png",
	},
	{
		id: "ba-2",
		title: "All-Natural High Protein Peanut Butter",
		flavorSize: "Crunchy Dark Chocolate • 500g",
		pricePaise: 60000,
		timesOrdered: 2,
		lastOrderedText: "Last ordered 35 days ago",
		imageUrl: "/assets/peanut-butter.png",
	},
	{
		id: "ba-3",
		title: "Ready-to-Mix Protein Water Infusion",
		flavorSize: "Zesty Orange Lemonade • Pack of 6",
		pricePaise: 249900,
		timesOrdered: 1,
		lastOrderedText: "Last ordered 50 days ago",
		imageUrl: "/assets/ready-to-mix-bottle.png",
	},
];

export default function BuyAgainPage() {
	const [quantities, setQuantities] = useState<Record<string, number>>({
		"ba-1": 1,
		"ba-2": 1,
		"ba-3": 1,
	});
	const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
	const { addItem, openDrawer } = useCart();

	const updateQty = (id: string, delta: number) => {
		setQuantities((prev) => {
			const current = prev[id] ?? 1;
			const next = Math.max(1, Math.min(10, current + delta));
			return { ...prev, [id]: next };
		});
	};

	const handleAddToCart = (product: BuyAgainProduct) => {
		const qty = quantities[product.id] ?? 1;
		addItem({
			productId: product.id,
			slug: product.id,
			name: product.title,
			sku: `SKU-${product.id.toUpperCase()}`,
			imageUrl: product.imageUrl,
			unitPricePaise: product.pricePaise,
			quantity: qty,
			purchaseType: "ONE_TIME",
			inStock: true,
		});

		setAddedIds((prev) => new Set(prev).add(product.id));
		openDrawer();
		setTimeout(() => {
			setAddedIds((prev) => {
				const next = new Set(prev);
				next.delete(product.id);
				return next;
			});
		}, 2500);
	};

	return (
		<div className="flex min-h-screen flex-col bg-[#F9F9FB]">
			{/* Top Header */}
			<div className="sticky top-0 z-30 border-gray-100 border-b bg-white shadow-xs">
				<Header />
			</div>

			{/* Main Content */}
			<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav aria-label="Breadcrumb" className="mb-4">
					<ol className="flex items-center gap-2 text-gray-500 text-xs">
						<li>
							<Link className="hover:text-brand-red" href="/">
								Home
							</Link>
						</li>
						<li>/</li>
						<li>
							<Link className="hover:text-brand-red" href="/orders">
								Orders
							</Link>
						</li>
						<li>/</li>
						<li className="font-semibold text-gray-900">Buy Again</li>
					</ol>
				</nav>

				{/* Title Header */}
				<div className="flex flex-col justify-between gap-4 border-gray-200/80 border-b pb-6 sm:flex-row sm:items-end">
					<div>
						<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
							BUY AGAIN
						</h1>
						<p className="mt-1 text-gray-600 text-sm">
							Fast 1-click replenishment of your frequently purchased nutrition
							essentials.
						</p>
					</div>

					<Link
						className="inline-flex items-center gap-2 self-start rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 text-xs shadow-xs transition-colors hover:border-gray-300 hover:text-brand-red sm:self-auto"
						href="/orders"
					>
						<span>View Full Order History</span>
						<ArrowRight className="h-3.5 w-3.5" />
					</Link>
				</div>

				{/* Products Grid */}
				<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{INITIAL_BUY_AGAIN_PRODUCTS.map((product) => {
						const qty = quantities[product.id] ?? 1;
						const isAdded = addedIds.has(product.id);

						return (
							<div
								className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
								key={product.id}
							>
								<div>
									{/* Top Indicators */}
									<div className="flex items-center justify-between">
										<span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-bold text-[10.5px] text-gray-700">
											Ordered {product.timesOrdered}x
										</span>

										{product.isRefillDue && (
											<span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 font-bold text-[10px] text-brand-red">
												<Sparkles className="h-3 w-3" />
												Time to Refill
											</span>
										)}
									</div>

									{/* Product Thumbnail */}
									<div className="relative mx-auto mt-3 h-40 w-full">
										<Image
											alt={product.title}
											className="object-contain p-2"
											fill
											sizes="(max-width: 768px) 100vw, 33vw"
											src={product.imageUrl}
										/>
									</div>

									{/* Title & Timing */}
									<div className="mt-2">
										<h3 className="font-bold text-gray-900 text-sm">
											{product.title}
										</h3>
										<p className="text-gray-500 text-xs">
											{product.flavorSize}
										</p>

										<div className="mt-2 flex items-center gap-1.5 text-gray-400 text-xs">
											<Clock className="h-3.5 w-3.5" />
											<span>{product.lastOrderedText}</span>
										</div>

										<div className="mt-3 font-extrabold text-brand-red text-lg">
											₹{(product.pricePaise / 100).toLocaleString("en-IN")}
										</div>
									</div>
								</div>

								{/* Controls & Add to cart */}
								<div className="mt-4 border-gray-100 border-t pt-3">
									<div className="mb-2.5 flex items-center justify-between">
										<span className="font-semibold text-gray-500 text-xs">
											Quantity
										</span>
										<div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
											<button
												aria-label="Decrease quantity"
												className="rounded p-1 text-gray-600 hover:bg-white"
												onClick={() => updateQty(product.id, -1)}
												type="button"
											>
												<Minus className="h-3 w-3" />
											</button>
											<span className="w-7 text-center font-bold text-gray-900 text-xs">
												{qty}
											</span>
											<button
												aria-label="Increase quantity"
												className="rounded p-1 text-gray-600 hover:bg-white"
												onClick={() => updateQty(product.id, 1)}
												type="button"
											>
												<Plus className="h-3 w-3" />
											</button>
										</div>
									</div>

									<button
										className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 font-bold text-xs shadow-xs transition-all active:scale-[0.99] ${
											isAdded
												? "bg-emerald-600 text-white"
												: "bg-brand-red text-white hover:bg-brand-red-hover"
										}`}
										onClick={() => handleAddToCart(product)}
										type="button"
									>
										{isAdded ? (
											<>
												<Check className="h-4 w-4" />
												<span>Added to Cart!</span>
											</>
										) : (
											<>
												<RefreshCw className="h-3.5 w-3.5" />
												<span>
													Reorder Now (₹
													{((product.pricePaise * qty) / 100).toLocaleString(
														"en-IN",
													)}
													)
												</span>
											</>
										)}
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</main>
		</div>
	);
}
