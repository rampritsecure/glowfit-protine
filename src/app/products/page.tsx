"use client";

import { ArrowUpDown, PackageSearch, Search, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
	ProductCard,
	ProductCardSkeleton,
} from "@/components/commerce/ProductCard";
import { Header } from "@/components/layout/Header";
import { api } from "@/trpc/react";

function ProductsContent() {
	const searchParams = useSearchParams();
	const initialCategory = searchParams.get("category") || "";

	const [selectedCategory, setSelectedCategory] =
		useState<string>(initialCategory);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<
		"featured" | "price_asc" | "price_desc" | "name_asc"
	>("featured");

	// Queries
	const { data: categories } = api.category.getAll.useQuery();
	const { data: productsData, isLoading } = api.product.getAll.useQuery({
		categorySlug: selectedCategory || undefined,
		search: searchQuery.trim() || undefined,
		sortBy,
		limit: 30,
	});

	const products = productsData?.items || [];
	const totalCount = productsData?.totalCount ?? products.length;

	const handleResetFilters = () => {
		setSelectedCategory("");
		setSearchQuery("");
		setSortBy("featured");
	};

	return (
		<div className="flex min-h-screen flex-col bg-[#F9F9FB]">
			{/* Top Header */}
			<div className="sticky top-0 z-30 border-gray-100 border-b bg-white shadow-xs">
				<Header />
			</div>

			{/* Main Catalog Shell */}
			<main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav aria-label="Breadcrumb" className="mb-4">
					<ol className="flex items-center gap-2 text-gray-500 text-xs">
						<li>
							<Link className="hover:text-brand-red" href="/">
								Home
							</Link>
						</li>
						<li>/</li>
						<li className="font-semibold text-gray-900">Products</li>
						{selectedCategory && (
							<>
								<li>/</li>
								<li className="font-bold text-brand-red uppercase">
									{categories?.find((c) => c.slug === selectedCategory)?.name ||
										selectedCategory}
								</li>
							</>
						)}
					</ol>
				</nav>

				{/* Header Banner */}
				<div className="flex flex-col justify-between gap-4 border-gray-200/80 border-b pb-6 sm:flex-row sm:items-end">
					<div>
						<div className="flex items-center gap-3">
							<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
								ALL PRODUCTS
							</h1>
							<span className="rounded-full bg-gray-100 px-3 py-1 font-bold text-gray-700 text-xs">
								{totalCount} {totalCount === 1 ? "Item" : "Items"}
							</span>
						</div>
						<p className="mt-1 text-gray-600 text-sm">
							Clean nutrition engineered for athletes, gym-goers, and high
							achievers.
						</p>
					</div>
				</div>

				{/* Filter & Search Bar */}
				<div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					{/* Category Filter Pills */}
					<div className="flex flex-wrap items-center gap-2">
						<button
							className={`rounded-full px-4 py-2 font-bold text-xs uppercase tracking-wider transition-all ${
								selectedCategory === ""
									? "bg-brand-black text-white shadow-xs"
									: "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:text-brand-red"
							}`}
							onClick={() => setSelectedCategory("")}
							type="button"
						>
							All Products
						</button>

						{(categories || []).map((cat) => (
							<button
								className={`rounded-full px-4 py-2 font-bold text-xs uppercase tracking-wider transition-all ${
									selectedCategory === cat.slug
										? "bg-brand-red text-white shadow-xs"
										: "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:text-brand-red"
								}`}
								key={cat.id}
								onClick={() => setSelectedCategory(cat.slug)}
								type="button"
							>
								{cat.name}
							</button>
						))}
					</div>

					{/* Controls: Search + Sort */}
					<div className="flex flex-wrap items-center gap-3">
						{/* Search Bar */}
						<div className="relative min-w-[240px] flex-1 sm:w-64 sm:flex-initial">
							<Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
							<input
								className="w-full rounded-full border border-gray-200 bg-white py-2 pr-8 pl-9 text-xs transition-colors placeholder:text-gray-400 focus:border-brand-red focus:outline-none"
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search products, flavours..."
								type="text"
								value={searchQuery}
							/>
							{searchQuery && (
								<button
									className="absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									onClick={() => setSearchQuery("")}
									type="button"
								>
									<X className="h-3.5 w-3.5" />
								</button>
							)}
						</div>

						{/* Sort Dropdown */}
						<div className="relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 shadow-xs">
							<ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
							<select
								aria-label="Sort products"
								className="cursor-pointer bg-transparent font-semibold text-gray-700 text-xs focus:outline-none"
								onChange={(e) =>
									setSortBy(
										e.target.value as
											| "featured"
											| "price_asc"
											| "price_desc"
											| "name_asc",
									)
								}
								value={sortBy}
							>
								<option value="featured">Featured First</option>
								<option value="price_asc">Price: Low to High</option>
								<option value="price_desc">Price: High to Low</option>
								<option value="name_asc">Name: A to Z</option>
							</select>
						</div>
					</div>
				</div>

				{/* Active Filter Badges */}
				{(selectedCategory || searchQuery) && (
					<div className="mt-4 flex flex-wrap items-center gap-2">
						<span className="font-semibold text-gray-400 text-xs">
							Active Filters:
						</span>
						{selectedCategory && (
							<span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 font-bold text-[11px] text-brand-red">
								Category:{" "}
								{categories?.find((c) => c.slug === selectedCategory)?.name ||
									selectedCategory}
								<button onClick={() => setSelectedCategory("")} type="button">
									<X className="h-3 w-3" />
								</button>
							</span>
						)}
						{searchQuery && (
							<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-semibold text-[11px] text-gray-700">
								Query: "{searchQuery}"
								<button onClick={() => setSearchQuery("")} type="button">
									<X className="h-3 w-3" />
								</button>
							</span>
						)}
						<button
							className="font-semibold text-brand-red text-xs underline hover:text-brand-red-hover"
							onClick={handleResetFilters}
							type="button"
						>
							Clear All
						</button>
					</div>
				)}

				{/* Product Catalog Grid */}
				<div className="mt-8">
					{isLoading ? (
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{[1, 2, 3, 4, 5, 6].map((n) => (
								<ProductCardSkeleton key={n} />
							))}
						</div>
					) : products.length === 0 ? (
						/* Empty State */
						<div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 border-dashed bg-white p-12 text-center shadow-xs">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-brand-red">
								<PackageSearch className="h-8 w-8" />
							</div>
							<h3 className="mt-4 font-athletic font-bold text-2xl text-gray-900 uppercase">
								No Products Found
							</h3>
							<p className="mt-1 max-w-sm text-gray-500 text-xs sm:text-sm">
								We couldn't find any supplements matching your criteria. Try
								adjusting your category filter or search keywords.
							</p>
							<button
								className="mt-6 rounded-xl bg-brand-red px-6 py-2.5 font-bold text-white text-xs uppercase tracking-wider shadow-sm transition-transform hover:bg-brand-red-hover active:scale-95"
								onClick={handleResetFilters}
								type="button"
							>
								Reset All Filters
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{products.map((product, idx) => (
								<ProductCard
									key={product.id}
									priority={idx < 4}
									product={product}
								/>
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default function ProductsPage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-[#F9F9FB]">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
				</div>
			}
		>
			<ProductsContent />
		</Suspense>
	);
}
