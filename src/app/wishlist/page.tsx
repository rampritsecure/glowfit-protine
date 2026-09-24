"use client";

import { Check, Heart, ShoppingBag, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { useCart } from "@/lib/cart/cart-context";

interface WishlistItem {
	id: string;
	title: string;
	flavorSize: string;
	pricePaise: number;
	comparePricePaise: number;
	rating: number;
	reviewCount: number;
	inStock: boolean;
	stockNotice?: string;
	imageUrl: string;
}

const INITIAL_WISHLIST: WishlistItem[] = [
	{
		id: "wish-1",
		title: "100% Whey Protein Isolate",
		flavorSize: "Rich Chocolate Silk • 1 kg",
		pricePaise: 329900,
		comparePricePaise: 389900,
		rating: 4.9,
		reviewCount: 428,
		inStock: true,
		imageUrl: "/assets/card-whey.png",
	},
	{
		id: "wish-2",
		title: "All-Natural High Protein Peanut Butter",
		flavorSize: "Crunchy Dark Chocolate • 1 kg",
		pricePaise: 59900,
		comparePricePaise: 74900,
		rating: 4.8,
		reviewCount: 312,
		inStock: true,
		stockNotice: "Only 4 left in stock",
		imageUrl: "/assets/peanut-butter.png",
	},
	{
		id: "wish-3",
		title: "Ready-to-Mix Protein Water Infusion",
		flavorSize: "Zesty Orange Lemonade • Pack of 6",
		pricePaise: 249900,
		comparePricePaise: 299900,
		rating: 4.7,
		reviewCount: 189,
		inStock: true,
		imageUrl: "/assets/ready-to-mix-bottle.png",
	},
];

export default function WishlistPage() {
	const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);
	const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
	const { addItem, openDrawer } = useCart();

	const handleRemove = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const handleAddToCart = (item: WishlistItem) => {
		addItem({
			productId: item.id,
			slug: item.id,
			name: item.title,
			sku: `SKU-${item.id.toUpperCase()}`,
			imageUrl: item.imageUrl,
			unitPricePaise: item.pricePaise,
			quantity: 1,
			purchaseType: "ONE_TIME",
			inStock: item.inStock,
		});

		setAddedIds((prev) => new Set(prev).add(item.id));
		openDrawer();
		setTimeout(() => {
			setAddedIds((prev) => {
				const next = new Set(prev);
				next.delete(item.id);
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
							<Link className="hover:text-brand-red" href="/account/settings">
								Account
							</Link>
						</li>
						<li>/</li>
						<li className="font-semibold text-gray-900">
							Wishlist &amp; Saved
						</li>
					</ol>
				</nav>

				{/* Title & Count */}
				<div className="flex flex-col justify-between gap-4 border-gray-200/80 border-b pb-6 sm:flex-row sm:items-end">
					<div>
						<div className="flex items-center gap-3">
							<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
								WISHLIST &amp; SAVED
							</h1>
							<span className="rounded-full bg-gray-100 px-3 py-1 font-bold text-gray-700 text-xs">
								{items.length} {items.length === 1 ? "Item" : "Items"}
							</span>
						</div>
						<p className="mt-1 text-gray-600 text-sm">
							Saved supplements ready for your next workout cycle.
						</p>
					</div>

					{items.length > 0 && (
						<button
							className="self-start font-semibold text-gray-500 text-xs hover:text-brand-red sm:self-auto"
							onClick={() => setItems([])}
							type="button"
						>
							Clear All Items
						</button>
					)}
				</div>

				{/* Items Grid or Empty State */}
				{items.length === 0 ? (
					/* Empty State */
					<div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-gray-200 border-dashed bg-white p-12 text-center shadow-xs">
						<div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-brand-red">
							<Heart className="h-7 w-7" />
						</div>
						<h3 className="mt-4 font-bold text-base text-gray-900">
							Your wishlist is empty
						</h3>
						<p className="mt-1 max-w-sm text-gray-500 text-xs">
							Save items while you shop so you can easily review them or stock
							up before your next training split.
						</p>
						<Link
							className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 font-bold text-white text-xs shadow-sm transition-transform hover:bg-brand-red-hover active:scale-95"
							href="/"
						>
							<ShoppingBag className="h-4 w-4" />
							<span>Explore Nutrition Catalog</span>
						</Link>
					</div>
				) : (
					/* Wishlist Grid */
					<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((item) => {
							const isAdded = addedIds.has(item.id);

							return (
								<div
									className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs transition-all hover:shadow-md"
									key={item.id}
								>
									{/* Top Bar: Stock + Remove */}
									<div>
										<div className="flex items-center justify-between">
											{item.stockNotice ? (
												<span className="rounded bg-amber-50 px-2 py-0.5 font-bold text-[10px] text-amber-700">
													{item.stockNotice}
												</span>
											) : (
												<span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-[10px] text-emerald-700">
													In Stock
												</span>
											)}

											<button
												aria-label="Remove item"
												className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-brand-red"
												onClick={() => handleRemove(item.id)}
												type="button"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</div>

										{/* Product Thumbnail */}
										<div className="relative mx-auto mt-2 h-44 w-full">
											<Image
												alt={item.title}
												className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
												fill
												sizes="(max-width: 768px) 100vw, 33vw"
												src={item.imageUrl}
											/>
										</div>

										{/* Info */}
										<div className="mt-3">
											<div className="flex items-center gap-1 text-[11px] text-amber-500">
												<Star className="h-3 w-3 fill-amber-500" />
												<span className="font-bold">{item.rating}</span>
												<span className="text-gray-400">
													({item.reviewCount})
												</span>
											</div>

											<h3 className="mt-1 font-bold text-gray-900 text-sm leading-snug">
												{item.title}
											</h3>
											<p className="text-gray-500 text-xs">{item.flavorSize}</p>

											{/* Price */}
											<div className="mt-2.5 flex items-baseline gap-2">
												<span className="font-extrabold text-base text-brand-red">
													₹{(item.pricePaise / 100).toLocaleString("en-IN")}
												</span>
												<span className="text-gray-400 text-xs line-through">
													₹
													{(item.comparePricePaise / 100).toLocaleString(
														"en-IN",
													)}
												</span>
											</div>
										</div>
									</div>

									{/* CTA Action */}
									<div className="mt-4 border-gray-100 border-t pt-3">
										<button
											className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 font-bold text-xs shadow-xs transition-all active:scale-[0.99] ${
												isAdded
													? "bg-emerald-600 text-white"
													: "bg-brand-red text-white hover:bg-brand-red-hover"
											}`}
											onClick={() => handleAddToCart(item)}
											type="button"
										>
											{isAdded ? (
												<>
													<Check className="h-4 w-4" />
													<span>Added to Cart!</span>
												</>
											) : (
												<>
													<ShoppingBag className="h-4 w-4" />
													<span>Move to Cart</span>
												</>
											)}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</main>
		</div>
	);
}
