"use client";

import {
	ArrowRight,
	Calendar,
	CheckCircle,
	Clock,
	PauseCircle,
	RotateCw,
	ShieldCheck,
	Sparkles,
	Trash2,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

interface SubscriptionItem {
	id: string;
	title: string;
	flavorSize: string;
	originalPricePaise: number;
	discountedPricePaise: number;
	frequencyDays: number;
	nextDeliveryDate: string;
	status: "ACTIVE" | "PAUSED";
	imageUrl: string;
}

const INITIAL_SUBSCRIPTIONS: SubscriptionItem[] = [
	{
		id: "sub-1",
		title: "100% Whey Protein Isolate",
		flavorSize: "Rich Chocolate Silk • 1 kg",
		originalPricePaise: 369900,
		discountedPricePaise: 332900, // 10% discount
		frequencyDays: 30,
		nextDeliveryDate: "October 18, 2026",
		status: "ACTIVE",
		imageUrl: "/assets/card-whey.png",
	},
	{
		id: "sub-2",
		title: "All-Natural High Protein Peanut Butter",
		flavorSize: "Crunchy Dark Chocolate • 1 kg",
		originalPricePaise: 64900,
		discountedPricePaise: 58400,
		frequencyDays: 45,
		nextDeliveryDate: "November 2, 2026",
		status: "ACTIVE",
		imageUrl: "/assets/peanut-butter.png",
	},
];

export default function SubscriptionsPage() {
	const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(
		INITIAL_SUBSCRIPTIONS,
	);
	const [actionMessage, setActionMessage] = useState<string | null>(null);

	const handleTogglePause = (id: string) => {
		setSubscriptions((prev) =>
			prev.map((sub) => {
				if (sub.id === id) {
					const nextStatus = sub.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
					setActionMessage(
						nextStatus === "PAUSED"
							? `Paused auto-delivery for ${sub.title}. You can resume anytime.`
							: `Resumed auto-delivery for ${sub.title}!`,
					);
					return { ...sub, status: nextStatus };
				}
				return sub;
			}),
		);
		setTimeout(() => setActionMessage(null), 4000);
	};

	const handleSkip = (id: string) => {
		setSubscriptions((prev) =>
			prev.map((sub) => {
				if (sub.id === id) {
					setActionMessage(
						`Skipped next shipment for ${sub.title}. Delivery postponed by ${sub.frequencyDays} days.`,
					);
					return {
						...sub,
						nextDeliveryDate: "November 18, 2026",
					};
				}
				return sub;
			}),
		);
		setTimeout(() => setActionMessage(null), 4000);
	};

	const handleCancel = (id: string) => {
		const target = subscriptions.find((s) => s.id === id);
		if (
			confirm(
				`Are you sure you want to cancel recurring refill for ${target?.title}? You will lose your 10% recurring discount.`,
			)
		) {
			setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
			setActionMessage(`Auto-delivery subscription cancelled.`);
			setTimeout(() => setActionMessage(null), 4000);
		}
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
							Auto-Delivery &amp; Refills
						</li>
					</ol>
				</nav>

				{/* Title & Badge */}
				<div className="flex flex-col justify-between gap-4 border-gray-200/80 border-b pb-6 sm:flex-row sm:items-end">
					<div>
						<div className="flex items-center gap-2.5">
							<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
								AUTO-DELIVERY &amp; REFILLS
							</h1>
							<span className="rounded-full bg-brand-red px-2.5 py-0.5 font-bold text-[11px] text-white">
								SAVE 10%
							</span>
						</div>
						<p className="mt-1 text-gray-600 text-sm">
							Automated supplement refills shipped right to your door. Never run
							out of protein.
						</p>
					</div>

					<Link
						className="inline-flex items-center gap-2 self-start rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 text-xs shadow-xs transition-colors hover:border-gray-300 hover:text-brand-red sm:self-auto"
						href="/orders"
					>
						<span>View Past Orders</span>
						<ArrowRight className="h-3.5 w-3.5" />
					</Link>
				</div>

				{/* Toast Banner */}
				{actionMessage && (
					<div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 text-xs shadow-xs">
						<CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
						<span>{actionMessage}</span>
					</div>
				)}

				{/* Value Proposition Highlights */}
				<div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
					<div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50/50 to-white p-4 shadow-xs">
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
							<Sparkles className="h-4 w-4" />
						</div>
						<div>
							<h4 className="font-bold text-gray-900 text-xs">
								Guaranteed 10% Discount
							</h4>
							<p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">
								You lock in 10% off the lowest retail price on every single
								refill.
							</p>
						</div>
					</div>

					<div className="flex items-start gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs">
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
							<Truck className="h-4 w-4" />
						</div>
						<div>
							<h4 className="font-bold text-gray-900 text-xs">
								Free Priority Shipping
							</h4>
							<p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">
								Never pay for delivery. Dispatched on priority schedule from the
								nearest warehouse.
							</p>
						</div>
					</div>

					<div className="flex items-start gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs">
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
							<ShieldCheck className="h-4 w-4" />
						</div>
						<div>
							<h4 className="font-bold text-gray-900 text-xs">
								Zero Commitment
							</h4>
							<p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">
								Skip an upcoming cycle, adjust delivery intervals, or pause in 1
								tap.
							</p>
						</div>
					</div>
				</div>

				{/* Active Subscriptions */}
				<div className="mt-8">
					<h2 className="font-bold text-base text-gray-900">
						Active Refill Schedules ({subscriptions.length})
					</h2>

					<div className="mt-4 space-y-4">
						{subscriptions.length === 0 ? (
							<div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 border-dashed bg-white p-12 text-center shadow-xs">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-brand-red">
									<RotateCw className="h-7 w-7" />
								</div>
								<h3 className="mt-4 font-bold text-base text-gray-900">
									No active auto-deliveries
								</h3>
								<p className="mt-1 max-w-sm text-gray-500 text-xs">
									Subscribe to your workout staples and save 10% on every order.
									You can subscribe directly from any product page.
								</p>
								<Link
									className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 font-bold text-white text-xs shadow-sm transition-transform hover:bg-brand-red-hover active:scale-95"
									href="/"
								>
									<span>Browse Products</span>
									<ArrowRight className="h-4 w-4" />
								</Link>
							</div>
						) : (
							subscriptions.map((sub) => {
								const isPaused = sub.status === "PAUSED";

								return (
									<div
										className={`overflow-hidden rounded-2xl border bg-white shadow-xs transition-all ${
											isPaused
												? "border-amber-200/80 bg-amber-50/20"
												: "border-gray-200/80"
										}`}
										key={sub.id}
									>
										{/* Card Header / Status */}
										<div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b bg-gray-50/60 px-5 py-3 text-xs">
											<div className="flex items-center gap-2">
												<span
													className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold text-[10px] ${
														isPaused
															? "bg-amber-100 text-amber-800"
															: "bg-emerald-100 text-emerald-800"
													}`}
												>
													<span
														className={`h-1.5 w-1.5 rounded-full ${
															isPaused ? "bg-amber-500" : "bg-emerald-500"
														}`}
													/>
													{isPaused ? "PAUSED" : "ACTIVE SUBSCRIPTION"}
												</span>
												<span className="text-gray-400">•</span>
												<span className="text-gray-600">
													Ships every {sub.frequencyDays} days
												</span>
											</div>

											<div className="flex items-center gap-1.5 font-semibold text-gray-700">
												<Calendar className="h-3.5 w-3.5 text-gray-400" />
												<span>
													Next Shipment:{" "}
													<strong className="text-gray-900">
														{isPaused ? "Paused" : sub.nextDeliveryDate}
													</strong>
												</span>
											</div>
										</div>

										{/* Card Body */}
										<div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
											{/* Product Image & Details */}
											<div className="flex items-center gap-4">
												<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1.5">
													<Image
														alt={sub.title}
														className="h-full w-full object-contain"
														fill
														sizes="80px"
														src={sub.imageUrl}
													/>
												</div>

												<div>
													<h3 className="font-bold text-base text-gray-900">
														{sub.title}
													</h3>
													<p className="text-gray-500 text-xs">
														{sub.flavorSize}
													</p>

													<div className="mt-2 flex items-baseline gap-2">
														<span className="font-extrabold text-base text-brand-red">
															₹
															{(sub.discountedPricePaise / 100).toLocaleString(
																"en-IN",
															)}
														</span>
														<span className="text-gray-400 text-xs line-through">
															₹
															{(sub.originalPricePaise / 100).toLocaleString(
																"en-IN",
															)}
														</span>
														<span className="rounded bg-brand-red/10 px-1.5 py-0.5 font-bold text-[10px] text-brand-red">
															10% OFF
														</span>
													</div>
												</div>
											</div>

											{/* Action Buttons */}
											<div className="flex flex-wrap items-center gap-2 border-gray-100 border-t pt-3 sm:border-0 sm:pt-0">
												<button
													className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 font-semibold text-gray-700 text-xs transition-colors hover:border-gray-300"
													disabled={isPaused}
													onClick={() => handleSkip(sub.id)}
													title="Postpone delivery by one interval"
													type="button"
												>
													<Clock className="h-3.5 w-3.5 text-gray-400" />
													<span>Skip Next</span>
												</button>

												<button
													className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 font-semibold text-xs transition-colors ${
														isPaused
															? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
															: "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
													}`}
													onClick={() => handleTogglePause(sub.id)}
													type="button"
												>
													<PauseCircle className="h-3.5 w-3.5" />
													<span>{isPaused ? "Resume Refill" : "Pause"}</span>
												</button>

												<button
													className="inline-flex items-center gap-1 rounded-xl p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-brand-red"
													onClick={() => handleCancel(sub.id)}
													title="Cancel subscription"
													type="button"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
