"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	ChevronDown,
	CreditCard,
	Heart,
	HelpCircle,
	Loader2,
	LogOut,
	MapPin,
	Package,
	RotateCw,
	Settings,
	ShoppingBag,
	Sparkles,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/server/better-auth/client";

interface UserMenuProps {
	className?: string;
}

export function UserMenu({ className = "" }: UserMenuProps) {
	const router = useRouter();
	const { data: session, isPending: isSessionLoading } =
		authClient.useSession();
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close on outside click
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	// Handle Logout
	const handleSignOut = async () => {
		try {
			setIsLoggingOut(true);
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						setIsOpen(false);
						router.push("/login");
						router.refresh();
					},
				},
			});
		} catch (error) {
			console.error("Sign out error:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	// Determine initials
	const userName = session?.user?.name || "Athlete";
	const userEmail = session?.user?.email || "";
	const initials = userName
		.split(" ")
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	// Loading state indicator
	if (isSessionLoading) {
		return (
			<div
				className={`flex h-9 w-9 animate-pulse items-center justify-center rounded-full bg-black/5 ${className}`}
			>
				<User className="h-4 w-4 text-gray-400" />
			</div>
		);
	}

	return (
		<div className={`relative ${className}`} ref={menuRef}>
			{/* Trigger Button */}
			<button
				aria-expanded={isOpen}
				aria-haspopup="menu"
				aria-label={
					session?.user ? `Account menu for ${userName}` : "Account & Sign in"
				}
				className={`group flex h-9 items-center gap-1.5 rounded-full px-2 text-brand-black transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
					isOpen ? "bg-black/5 text-brand-red" : "hover:bg-black/5"
				}`}
				onClick={() => setIsOpen((prev) => !prev)}
				type="button"
			>
				{session?.user ? (
					// Logged in avatar
					<div className="relative flex items-center gap-1.5">
						<div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-brand-red font-bold text-[12px] text-white shadow-xs">
							{session.user.image ? (
								<Image
									alt={userName}
									className="h-full w-full object-cover"
									height={28}
									src={session.user.image}
									unoptimized
									width={28}
								/>
							) : (
								<span>{initials || "U"}</span>
							)}
							<span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
						</div>
						<ChevronDown
							className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 group-hover:text-brand-red ${
								isOpen ? "rotate-180 text-brand-red" : ""
							}`}
						/>
					</div>
				) : (
					// Guest icon
					<div className="flex items-center gap-0.5">
						<div className="flex h-8 w-8 items-center justify-center rounded-full transition-colors group-hover:text-brand-red">
							<User className="h-5 w-5 transition-transform group-hover:scale-105" />
						</div>
					</div>
				)}
			</button>

			{/* Dropdown Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						animate={{ opacity: 1, y: 0, scale: 1 }}
						aria-label="User account dropdown"
						className="absolute top-full right-0 z-50 mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl ring-1 ring-black/5"
						exit={{ opacity: 0, y: -8, scale: 0.98 }}
						initial={{ opacity: 0, y: -8, scale: 0.98 }}
						role="menu"
						transition={{ duration: 0.16, ease: "easeOut" }}
					>
						{session?.user ? (
							/* ──────────────── LOGGED IN USER EXPERIENCE ──────────────── */
							<div>
								{/* Header Card: User Info & Membership Tier */}
								<div className="rounded-xl border border-gray-100/80 bg-gradient-to-br from-gray-50 via-gray-50/80 to-red-50/30 p-3.5">
									<div className="flex items-center gap-3">
										<div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-red font-bold text-[14px] text-white shadow-md shadow-red-500/20">
											{session.user.image ? (
												<Image
													alt={userName}
													className="h-full w-full rounded-full object-cover"
													height={44}
													src={session.user.image}
													unoptimized
													width={44}
												/>
											) : (
												<span>{initials || "U"}</span>
											)}
										</div>
										<div className="min-w-0 flex-1">
											<p className="truncate font-bold text-[14px] text-gray-900 leading-tight">
												{userName}
											</p>
											<p className="truncate text-[12px] text-gray-500">
												{userEmail}
											</p>
										</div>
									</div>

									{/* Loyalty & Tier Status */}
									<div className="mt-3 flex items-center justify-between border-gray-200/60 border-t pt-2.5">
										<div className="flex items-center gap-1.5 font-bold text-[11px] text-brand-red">
											<Sparkles className="h-3.5 w-3.5" />
											<span>Glow Elite Athlete</span>
										</div>
										<span className="rounded-full bg-black/5 px-2 py-0.5 font-semibold text-[10px] text-gray-700">
											250 pts
										</span>
									</div>
								</div>

								{/* E-Commerce Core Actions */}
								<div className="mt-2 space-y-0.5 border-gray-100 border-b pb-2">
									<div className="px-3 pt-1.5 pb-1 font-semibold text-[10.5px] text-gray-400 uppercase tracking-wider">
										Orders &amp; Shopping
									</div>

									<Link
										className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/orders"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<div className="flex items-center gap-2.5">
											<Package className="h-4 w-4 text-gray-500" />
											<div className="text-left">
												<p className="font-semibold text-[13px] leading-tight">
													My Orders
												</p>
												<p className="text-[11px] text-gray-400">
													Track, return &amp; view history
												</p>
											</div>
										</div>
										<ArrowRight className="h-3.5 w-3.5 text-gray-300" />
									</Link>

									<Link
										className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/account/subscriptions"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<div className="flex items-center gap-2.5">
											<RotateCw className="h-4 w-4 text-gray-500" />
											<div className="text-left">
												<div className="flex items-center gap-1.5">
													<p className="font-semibold text-[13px] leading-tight">
														Auto-Delivery &amp; Refills
													</p>
													<span className="rounded bg-brand-red/10 px-1 py-0.2 font-bold text-[9px] text-brand-red">
														SAVE 10%
													</span>
												</div>
												<p className="text-[11px] text-gray-400">
													Recurring nutrition subscriptions
												</p>
											</div>
										</div>
									</Link>

									<Link
										className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/wishlist"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<div className="flex items-center gap-2.5">
											<Heart className="h-4 w-4 text-gray-500" />
											<p className="font-semibold text-[13px]">
												Wishlist &amp; Saved
											</p>
										</div>
									</Link>

									<Link
										className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/orders?tab=reorder"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<div className="flex items-center gap-2.5">
											<ShoppingBag className="h-4 w-4 text-gray-500" />
											<p className="font-semibold text-[13px]">Buy Again</p>
										</div>
									</Link>
								</div>

								{/* Account & Preferences */}
								<div className="mt-1 space-y-0.5 border-gray-100 border-b pb-2">
									<div className="px-3 pt-1.5 pb-1 font-semibold text-[10.5px] text-gray-400 uppercase tracking-wider">
										Account &amp; Settings
									</div>

									<Link
										className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/account/settings"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<Settings className="h-4 w-4 text-gray-500" />
										<span className="font-semibold text-[13px]">
											Account Settings
										</span>
									</Link>

									<Link
										className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/account/addresses"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<MapPin className="h-4 w-4 text-gray-500" />
										<span className="font-semibold text-[13px]">
											Delivery Addresses
										</span>
									</Link>

									<Link
										className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/account/payments"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<CreditCard className="h-4 w-4 text-gray-500" />
										<span className="font-semibold text-[13px]">
											Payment Methods
										</span>
									</Link>

									<Link
										className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/support"
										onClick={() => setIsOpen(false)}
										role="menuitem"
									>
										<HelpCircle className="h-4 w-4 text-gray-500" />
										<span className="font-semibold text-[13px]">
											Help &amp; Support
										</span>
									</Link>
								</div>

								{/* Log Out */}
								<div className="pt-2">
									<button
										className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 font-semibold text-[13px] text-red-600 transition-colors hover:bg-red-50 hover:text-brand-red disabled:opacity-50"
										disabled={isLoggingOut}
										onClick={handleSignOut}
										role="menuitem"
										type="button"
									>
										<div className="flex items-center gap-2.5">
											{isLoggingOut ? (
												<Loader2 className="h-4 w-4 animate-spin text-brand-red" />
											) : (
												<LogOut className="h-4 w-4" />
											)}
											<span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>
										</div>
									</button>
								</div>
							</div>
						) : (
							/* ──────────────── GUEST EXPERIENCE ──────────────── */
							<div className="p-2">
								<div className="mb-3 text-left">
									<h3 className="font-bold text-[15px] text-gray-900">
										Welcome to Glow &amp; Fit
									</h3>
									<p className="mt-0.5 text-[12px] text-gray-500">
										Sign in for saved carts, easy tracking, and athlete rewards.
									</p>
								</div>

								{/* Primary Action Buttons */}
								<div className="flex flex-col gap-2">
									<Link
										className="flex w-full items-center justify-center rounded-xl bg-brand-red py-2.5 font-bold text-[13.5px] text-white shadow-sm transition-all hover:bg-brand-red-hover active:scale-[0.99]"
										href="/login"
										onClick={() => setIsOpen(false)}
									>
										Sign In
									</Link>
									<Link
										className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-2 font-semibold text-[13.5px] text-gray-800 transition-colors hover:bg-gray-50 active:scale-[0.99]"
										href="/signup"
										onClick={() => setIsOpen(false)}
									>
										Create Account
									</Link>
								</div>

								{/* Quick Guest Links */}
								<div className="mt-3 space-y-1 border-gray-100 border-t pt-2 text-left">
									<Link
										className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium text-[12.5px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/orders/track"
										onClick={() => setIsOpen(false)}
									>
										<Package className="h-3.5 w-3.5 text-gray-400" />
										<span>Track an Order</span>
									</Link>
									<Link
										className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium text-[12.5px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-brand-red"
										href="/support"
										onClick={() => setIsOpen(false)}
									>
										<HelpCircle className="h-3.5 w-3.5 text-gray-400" />
										<span>Customer Care &amp; FAQ</span>
									</Link>
								</div>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
