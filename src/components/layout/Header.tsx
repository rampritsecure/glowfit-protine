"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Menu, X, ArrowRight } from "lucide-react";

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
			if (
				shopRef.current &&
				!shopRef.current.contains(event.target as Node)
			) {
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
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="relative z-30 w-full py-4 select-none">
			<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
				{/* Left: Logo + Nav */}
				<div className="flex items-center gap-7 md:gap-10 lg:gap-12">
					{/* Logo */}
					<Link
						href="/"
						className="flex-shrink-0 focus:outline-none"
						aria-label="Glow & Fit Home"
					>
						<div className="relative h-10 sm:h-12 w-[100px] sm:w-[120px]">
							<Image
								src="/assets/glow-fit-logo.png"
								alt="Glow & Fit"
								fill
								sizes="120px"
								priority
								className="object-contain object-left"
							/>
						</div>
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[15px] font-semibold text-[#111111]">
						{/* Shop */}
						<div
							ref={shopRef}
							className="relative"
							onMouseEnter={() => setIsShopOpen(true)}
							onMouseLeave={() => setIsShopOpen(false)}
						>
							<button
								type="button"
								onClick={() => setIsShopOpen((p) => !p)}
								className="flex items-center gap-1 py-2 hover:text-[#E10600] transition-colors cursor-pointer focus:outline-none"
								aria-expanded={isShopOpen}
							>
								Shop
								<ChevronDown
									className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isShopOpen ? "rotate-180 text-[#E10600]" : ""}`}
								/>
							</button>
							{isShopOpen && (
								<div className="absolute top-full left-0 pt-2 w-56 z-50">
									<div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 px-1.5">
										<Link
											href="/products"
											className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E10600] rounded-lg transition-colors"
										>
											All Products
											<ArrowRight className="w-3.5 h-3.5 text-gray-400" />
										</Link>
										<Link
											href="/products#ready-to-mix"
											className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E10600] rounded-lg transition-colors"
										>
											Ready-to-Mix Bottles
											<span className="text-[10px] bg-[#E10600]/10 text-[#E10600] font-bold px-1.5 py-0.5 rounded">
												NEW
											</span>
										</Link>
										<Link
											href="/products#whey-protein"
											className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E10600] rounded-lg transition-colors"
										>
											100% Whey Protein
										</Link>
										<Link
											href="/products#peanut-butter"
											className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E10600] rounded-lg transition-colors"
										>
											Peanut Butter
										</Link>
									</div>
								</div>
							)}
						</div>

						{/* Categories */}
						<div
							ref={categoriesRef}
							className="relative"
							onMouseEnter={() => setIsCategoriesOpen(true)}
							onMouseLeave={() => setIsCategoriesOpen(false)}
						>
							<button
								type="button"
								onClick={() => setIsCategoriesOpen((p) => !p)}
								className="flex items-center gap-1 py-2 hover:text-[#E10600] transition-colors cursor-pointer focus:outline-none"
								aria-expanded={isCategoriesOpen}
							>
								Categories
								<ChevronDown
									className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180 text-[#E10600]" : ""}`}
								/>
							</button>
							{isCategoriesOpen && (
								<div className="absolute top-full left-0 pt-2 w-52 z-50">
									<div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 px-1.5">
										<Link
											href="/categories/muscle-building"
											className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E10600] rounded-lg transition-colors"
										>
											Muscle Building
										</Link>
										<Link
											href="/categories/energy-endurance"
											className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E10600] rounded-lg transition-colors"
										>
											Energy &amp; Endurance
										</Link>
										<Link
											href="/categories/daily-wellness"
											className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E10600] rounded-lg transition-colors"
										>
											Daily Wellness
										</Link>
									</div>
								</div>
							)}
						</div>

						{/* About */}
						<Link
							href="/about"
							className="py-2 hover:text-[#E10600] transition-colors"
						>
							About
						</Link>
					</nav>
				</div>

				{/* Right: Search + Cart + Mobile Menu */}
				<div className="flex items-center gap-4 sm:gap-6">
					{/* Search Bar */}
					<div className="relative hidden sm:block w-[220px] md:w-[280px] lg:w-[340px] xl:w-[400px]">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Search
								className="h-[18px] w-[18px] text-gray-500"
								strokeWidth={2}
							/>
						</div>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products, flavours or goals..."
							className="w-full pl-11 pr-4 py-2.5 text-[13px] bg-white text-gray-900 placeholder-gray-400 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
						/>
					</div>

					{/* Cart */}
					<Link
						href="/cart"
						className="relative p-1 text-[#0B0B0D] hover:text-[#E10600] transition-colors group focus:outline-none flex-shrink-0"
						aria-label="Shopping Cart"
					>
						<svg
							viewBox="0 0 28 28"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 transition-transform"
						>
							<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
							<circle
								cx="10"
								cy="23"
								r="2"
								fill="currentColor"
								stroke="none"
							/>
							<circle
								cx="21"
								cy="23"
								r="2"
								fill="currentColor"
								stroke="none"
							/>
						</svg>
						<span className="absolute -top-1 -right-1.5 min-w-[20px] h-[20px] px-1 bg-[#E10600] text-white text-[11px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white">
							{cartCount}
						</span>
					</Link>

					{/* Mobile Menu */}
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen((p) => !p)}
						className="md:hidden p-1.5 text-gray-800 hover:text-[#E10600] focus:outline-none"
						aria-label="Toggle Menu"
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Nav Drawer */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-5 py-4 mt-1 space-y-1">
					{/* Mobile Search */}
					<div className="relative mb-3 sm:hidden">
						<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
							<Search className="h-4 w-4 text-gray-400" />
						</div>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products..."
							className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 text-gray-900 placeholder-gray-400 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E10600]/20"
						/>
					</div>
					<Link
						href="/products"
						onClick={() => setIsMobileMenuOpen(false)}
						className="block py-2.5 text-base font-bold text-gray-900 hover:text-[#E10600]"
					>
						Shop All Products
					</Link>
					<Link
						href="/categories/muscle-building"
						onClick={() => setIsMobileMenuOpen(false)}
						className="block py-2.5 text-base font-bold text-gray-900 hover:text-[#E10600]"
					>
						Muscle Building
					</Link>
					<Link
						href="/categories/energy-endurance"
						onClick={() => setIsMobileMenuOpen(false)}
						className="block py-2.5 text-base font-bold text-gray-900 hover:text-[#E10600]"
					>
						Energy &amp; Endurance
					</Link>
					<Link
						href="/about"
						onClick={() => setIsMobileMenuOpen(false)}
						className="block py-2.5 text-base font-bold text-gray-900 hover:text-[#E10600]"
					>
						About
					</Link>
				</div>
			)}
		</header>
	);
}
