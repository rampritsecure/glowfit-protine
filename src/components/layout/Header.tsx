"use client";

import {
	ArrowRight,
	ChevronDown,
	Heart,
	LogOut,
	Menu,
	Package,
	RotateCw,
	Search,
	Settings,
	User,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/server/better-auth/client";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
	cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	const [searchQuery, setSearchQuery] = useState("");
	const [isShopOpen, setIsShopOpen] = useState(false);
	const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMobileLoggingOut, setIsMobileLoggingOut] = useState(false);

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
						{/* biome-ignore lint/a11y/noStaticElementInteractions: Navigation dropdown menu hover container */}
						<div
							className="relative"
							onMouseEnter={() => setIsShopOpen(true)}
							onMouseLeave={() => setIsShopOpen(false)}
							ref={shopRef}
						>
							<button
								aria-expanded={isShopOpen}
								className="flex cursor-pointer items-center gap-1 py-2 transition-colors hover:text-brand-red focus:outline-none"
								onClick={() => setIsShopOpen((p) => !p)}
								type="button"
							>
								Shop
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isShopOpen ? "rotate-180 text-brand-red" : ""}`}
								/>
							</button>
							{isShopOpen && (
								<div className="absolute top-full left-0 z-50 w-56 pt-2">
									<div className="rounded-xl border border-gray-100 bg-white px-1.5 py-2 shadow-xl">
										<Link
											className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red"
											href="/products"
										>
											All Products
											<ArrowRight className="h-3.5 w-3.5 text-gray-400" />
										</Link>
										<Link
											className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red"
											href="/products#ready-to-mix"
										>
											Ready-to-Mix Bottles
											<span className="rounded bg-brand-red/10 px-1.5 py-0.5 font-bold text-[10px] text-brand-red">
												NEW
											</span>
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red"
											href="/products#whey-protein"
										>
											100% Whey Protein
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red"
											href="/products#peanut-butter"
										>
											Peanut Butter
										</Link>
									</div>
								</div>
							)}
						</div>

						{/* Categories */}
						{/* biome-ignore lint/a11y/noStaticElementInteractions: Navigation dropdown menu hover container */}
						<div
							className="relative"
							onMouseEnter={() => setIsCategoriesOpen(true)}
							onMouseLeave={() => setIsCategoriesOpen(false)}
							ref={categoriesRef}
						>
							<button
								aria-expanded={isCategoriesOpen}
								className="flex cursor-pointer items-center gap-1 py-2 transition-colors hover:text-brand-red focus:outline-none"
								onClick={() => setIsCategoriesOpen((p) => !p)}
								type="button"
							>
								Categories
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180 text-brand-red" : ""}`}
								/>
							</button>
							{isCategoriesOpen && (
								<div className="absolute top-full left-0 z-50 w-52 pt-2">
									<div className="rounded-xl border border-gray-100 bg-white px-1.5 py-2 shadow-xl">
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red"
											href="/categories/muscle-building"
										>
											Muscle Building
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red"
											href="/categories/energy-endurance"
										>
											Energy &amp; Endurance
										</Link>
										<Link
											className="block rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red"
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

				{/* Right: Search + (Avatar + Cart) + Mobile Menu */}
				<div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
					{/* Search Bar (within the template/gray design area) */}
					<div className="relative hidden w-47.5 sm:block md:w-55 lg:w-61.25 xl:w-65">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
							<Search className="h-4 w-4 text-gray-500" strokeWidth={2} />
						</div>
						<input
							className="w-full rounded-full border border-gray-200 bg-white/95 py-2 pr-3.5 pl-9 text-[12px] placeholder-gray-400 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-black/10"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products, flavours or goals..."
							type="text"
							value={searchQuery}
						/>
					</div>

					{/* Avatar and Shopping Cart grouped nearby with 2-4px space on white background */}
					<div className="flex items-center gap-1 sm:gap-1.5">
						{/* Account / Avatar Dropdown */}
						<UserMenu />

						{/* Cart */}
						<Link
							aria-label="Shopping Cart"
							className="group relative flex h-9 w-9 items-center justify-center rounded-full text-brand-black transition-colors hover:bg-black/5 hover:text-brand-red focus:outline-none"
							href="/cart"
						>
							<svg
								aria-label="Shopping cart"
								className="h-6 w-6 transition-transform group-hover:scale-105"
								fill="none"
								role="img"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 28 28"
							>
								<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
								<circle
									cx="10"
									cy="23"
									fill="currentColor"
									r="2"
									stroke="none"
								/>
								<circle
									cx="21"
									cy="23"
									fill="currentColor"
									r="2"
									stroke="none"
								/>
							</svg>
							<span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 font-bold text-[10px] text-white leading-none ring-2 ring-white">
								{cartCount}
							</span>
						</Link>
					</div>

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
					<div className="border-gray-100 border-t pt-2">
						{session?.user ? (
							<div className="space-y-2.5 py-1">
								<div className="flex items-center gap-3 rounded-xl bg-gray-50 p-2.5 text-left">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-red font-bold text-sm text-white">
										{session.user.image ? (
											<Image
												alt={session.user.name || "User"}
												className="h-full w-full rounded-full object-cover"
												height={40}
												src={session.user.image}
												unoptimized
												width={40}
											/>
										) : (
											<span>
												{(session.user.name || "U")[0]?.toUpperCase()}
											</span>
										)}
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate font-bold text-gray-900 text-sm">
											{session.user.name || "Athlete"}
										</p>
										<p className="truncate text-gray-500 text-xs">
											{session.user.email}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-2 pt-1 text-left">
									<Link
										className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 font-semibold text-gray-700 text-xs hover:text-brand-red"
										href="/orders"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<Package className="h-4 w-4 text-gray-500" />
										<span>My Orders</span>
									</Link>
									<Link
										className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 font-semibold text-gray-700 text-xs hover:text-brand-red"
										href="/account/subscriptions"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<RotateCw className="h-4 w-4 text-gray-500" />
										<span>Refills</span>
									</Link>
									<Link
										className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 font-semibold text-gray-700 text-xs hover:text-brand-red"
										href="/wishlist"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<Heart className="h-4 w-4 text-gray-500" />
										<span>Wishlist</span>
									</Link>
									<Link
										className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 font-semibold text-gray-700 text-xs hover:text-brand-red"
										href="/account/settings"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<Settings className="h-4 w-4 text-gray-500" />
										<span>Settings</span>
									</Link>
								</div>

								<button
									className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/70 py-2.5 font-bold text-brand-red text-sm transition-colors hover:bg-red-50 disabled:opacity-50"
									disabled={isMobileLoggingOut}
									onClick={async () => {
										setIsMobileLoggingOut(true);
										try {
											await authClient.signOut({
												fetchOptions: {
													onSuccess: () => {
														setIsMobileMenuOpen(false);
														router.push("/login");
														router.refresh();
													},
												},
											});
										} finally {
											setIsMobileLoggingOut(false);
										}
									}}
									type="button"
								>
									<LogOut className="h-4 w-4" />
									<span>
										{isMobileLoggingOut ? "Signing out..." : "Log Out"}
									</span>
								</button>
							</div>
						) : (
							<Link
								className="flex items-center gap-2 py-2.5 font-bold text-base text-brand-red hover:text-brand-red-hover"
								href="/login"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<User className="h-5 w-5" />
								<span>Sign In / Register</span>
							</Link>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
