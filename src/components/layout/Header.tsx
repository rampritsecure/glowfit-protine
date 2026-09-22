"use client";

import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
	cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [isShopOpen, setIsShopOpen] = useState(false);
	const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const shopRef = useRef<HTMLDivElement>(null);
	const categoriesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
				setIsShopOpen(false);
			}
			if (
				categoriesRef.current &&
				!categoriesRef.current.contains(event.target as Node)
			) {
				setIsCategoriesOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="relative z-30 w-full select-none py-4">
			<div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
				{/* Left: Logo + Nav */}
				<div className="flex items-center gap-7 md:gap-10 lg:gap-12">
					{/* Logo */}
					<Link
						aria-label="Glow & Fit Home"
						className="flex-shrink-0 focus:outline-none"
						href="/"
					>
						<div className="relative h-10 w-[100px] sm:h-12 sm:w-[120px]">
							<Image
								alt="Glow & Fit"
								className="object-contain object-left"
								fill
								priority
								sizes="120px"
								src="/assets/glow-fit-logo.png"
							/>
						</div>
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden items-center gap-7 font-semibold text-[#111111] text-[15px] md:flex lg:gap-9">
						{/* Shop */}
						<div
							className="relative"
							onMouseEnter={() => setIsShopOpen(true)}
							onMouseLeave={() => setIsShopOpen(false)}
							ref={shopRef}
						>
							<button
								aria-expanded={isShopOpen}
								className="flex cursor-pointer items-center gap-1 py-2 transition-colors hover:text-[#E10600] focus:outline-none"
								onClick={() => setIsShopOpen((p) => !p)}
								type="button"
							>
								Shop
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isShopOpen ? "rotate-180 text-[#E10600]" : ""}`}
								/>
							</button>
							{isShopOpen && (
								<div className="absolute top-full left-0 z-50 w-56 pt-2">
									<div className="rounded-xl border border-gray-100 bg-white px-1.5 py-2 shadow-xl">
										<Link
											className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-[#E10600]"
											href="/products"
										>
											All Products
											<ArrowRight className="h-3.5 w-3.5 text-gray-400" />
										</Link>
										<Link
											className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-[#E10600]"
											href="/products#ready-to-mix"
										>
											Ready-to-Mix Bottles
											<span className="rounded bg-[#E10600]/10 px-1.5 py-0.5 font-bold text-[#E10600] text-[10px]">
												NEW
											</span>
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-[#E10600]"
											href="/products#whey-protein"
										>
											100% Whey Protein
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-[#E10600]"
											href="/products#peanut-butter"
										>
											Peanut Butter
										</Link>
									</div>
								</div>
							)}
						</div>

						{/* Categories */}
						<div
							className="relative"
							onMouseEnter={() => setIsCategoriesOpen(true)}
							onMouseLeave={() => setIsCategoriesOpen(false)}
							ref={categoriesRef}
						>
							<button
								aria-expanded={isCategoriesOpen}
								className="flex cursor-pointer items-center gap-1 py-2 transition-colors hover:text-[#E10600] focus:outline-none"
								onClick={() => setIsCategoriesOpen((p) => !p)}
								type="button"
							>
								Categories
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180 text-[#E10600]" : ""}`}
								/>
							</button>
							{isCategoriesOpen && (
								<div className="absolute top-full left-0 z-50 w-52 pt-2">
									<div className="rounded-xl border border-gray-100 bg-white px-1.5 py-2 shadow-xl">
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-[#E10600]"
											href="/categories/muscle-building"
										>
											Muscle Building
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-[#E10600]"
											href="/categories/energy-endurance"
										>
											Energy &amp; Endurance
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-[#E10600]"
											href="/categories/daily-wellness"
										>
											Daily Wellness
										</Link>
									</div>
								</div>
							)}
						</div>

						{/* About */}
						<Link
							className="py-2 transition-colors hover:text-brand-red"
							href="/about"
						>
							About
						</Link>
					</nav>
				</div>

				{/* Right: Search + Cart + Mobile Menu */}
				<div className="flex items-center gap-4 sm:gap-24">
					{/* Search Bar */}
					<div className="relative hidden w-[190px] sm:block md:w-[220px] lg:w-[245px] xl:w-[260px]">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
							<Search className="h-4 w-4 text-gray-500" strokeWidth={2} />
						</div>
						<input
							className="w-full rounded-full border border-gray-200 bg-white py-2 pr-3.5 pl-9 text-[12px] text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black/10"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products, flavours or goals..."
							type="text"
							value={searchQuery}
						/>
					</div>

					{/* Cart */}
					<Link
						aria-label="Shopping Cart"
						className="group relative shrink-0 p-1 text-brand-black transition-colors hover:text-brand-red focus:outline-none"
						href="/cart"
					>
						<svg
							className="h-7 w-7 transition-transform group-hover:scale-105 sm:h-8 sm:w-8"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 28 28"
						>
							<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
							<circle cx="10" cy="23" fill="currentColor" r="2" stroke="none" />
							<circle cx="21" cy="23" fill="currentColor" r="2" stroke="none" />
						</svg>
						<span className="absolute -top-1 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 font-bold text-[11px] text-white leading-none ring-2 ring-white">
							{cartCount}
						</span>
					</Link>

					{/* Mobile Menu */}
					<button
						aria-label="Toggle Menu"
						className="p-1.5 text-gray-800 hover:text-brand-red focus:outline-none md:hidden"
						onClick={() => setIsMobileMenuOpen((p) => !p)}
						type="button"
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Nav Drawer */}
			{isMobileMenuOpen && (
				<div className="mt-1 space-y-1 border-gray-100 border-t bg-white px-5 py-4 shadow-xl md:hidden">
					{/* Mobile Search */}
					<div className="relative mb-3 sm:hidden">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
							<Search className="h-4 w-4 text-gray-400" />
						</div>
						<input
							className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-10 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E10600]/20"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products..."
							type="text"
							value={searchQuery}
						/>
					</div>
					<Link
						className="block py-2.5 font-bold text-base text-gray-900 hover:text-[#E10600]"
						href="/products"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Shop All Products
					</Link>
					<Link
						className="block py-2.5 font-bold text-base text-gray-900 hover:text-[#E10600]"
						href="/categories/muscle-building"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Muscle Building
					</Link>
					<Link
						className="block py-2.5 font-bold text-base text-gray-900 hover:text-[#E10600]"
						href="/categories/energy-endurance"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Energy &amp; Endurance
					</Link>
					<Link
						className="block py-2.5 font-bold text-base text-gray-900 hover:text-[#E10600]"
						href="/about"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						About
					</Link>
				</div>
			)}
		</header>
	);
}
