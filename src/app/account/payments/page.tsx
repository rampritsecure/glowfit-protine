"use client";

import {
	Banknote,
	Check,
	CreditCard,
	MapPin,
	Plus,
	RotateCw,
	Settings,
	ShieldCheck,
	Trash2,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

interface SavedUpi {
	id: string;
	vpa: string;
	provider: "Google Pay" | "PhonePe" | "Paytm" | "BHIM";
	isDefault: boolean;
}

interface SavedCard {
	id: string;
	cardBrand: "VISA" | "MASTERCARD" | "RUPAY";
	last4: string;
	expiryMonth: string;
	expiryYear: string;
	cardHolder: string;
	isDefault: boolean;
}

const INITIAL_UPIS: SavedUpi[] = [
	{
		id: "upi-1",
		vpa: "ramprit.secure@okhdfcbank",
		provider: "Google Pay",
		isDefault: true,
	},
	{
		id: "upi-2",
		vpa: "9876543210@paytm",
		provider: "Paytm",
		isDefault: false,
	},
];

const INITIAL_CARDS: SavedCard[] = [
	{
		id: "card-1",
		cardBrand: "VISA",
		last4: "4092",
		expiryMonth: "09",
		expiryYear: "28",
		cardHolder: "RAMPRIT SAHANI",
		isDefault: false,
	},
];

export default function PaymentMethodsPage() {
	const [upis, setUpis] = useState<SavedUpi[]>(INITIAL_UPIS);
	const [cards, setCards] = useState<SavedCard[]>(INITIAL_CARDS);
	const [actionMessage, setActionMessage] = useState<string | null>(null);

	const handleSetDefaultUpi = (id: string) => {
		setUpis((prev) =>
			prev.map((u) => ({
				...u,
				isDefault: u.id === id,
			})),
		);
		setCards((prev) => prev.map((c) => ({ ...c, isDefault: false })));
		setActionMessage("Default payment method updated to UPI.");
		setTimeout(() => setActionMessage(null), 3000);
	};

	const handleSetDefaultCard = (id: string) => {
		setCards((prev) =>
			prev.map((c) => ({
				...c,
				isDefault: c.id === id,
			})),
		);
		setUpis((prev) => prev.map((u) => ({ ...u, isDefault: false })));
		setActionMessage("Default payment method updated to Card.");
		setTimeout(() => setActionMessage(null), 3000);
	};

	const handleDeleteUpi = (id: string) => {
		if (confirm("Remove this UPI handle?")) {
			setUpis((prev) => prev.filter((u) => u.id !== id));
		}
	};

	const handleDeleteCard = (id: string) => {
		if (confirm("Remove this saved card?")) {
			setCards((prev) => prev.filter((c) => c.id !== id));
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-[#F9F9FB]">
			{/* Top Header */}
			<div className="sticky top-0 z-30 border-gray-100 border-b bg-white shadow-xs">
				<Header />
			</div>

			{/* Main Content */}
			<main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
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
						<li className="font-semibold text-gray-900">Payment Methods</li>
					</ol>
				</nav>

				{/* Title Header */}
				<div className="border-gray-200/80 border-b pb-6">
					<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
						<div>
							<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
								PAYMENT METHODS
							</h1>
							<p className="mt-1 text-gray-600 text-sm">
								Manage tokenized payment instruments and 1-tap checkout
								preferences.
							</p>
						</div>

						<button
							className="inline-flex items-center gap-2 self-start rounded-xl bg-brand-red px-4 py-2 font-bold text-white text-xs shadow-xs transition-colors hover:bg-brand-red-hover active:scale-98 sm:self-auto"
							onClick={() =>
								alert(
									"Payment instruments can be securely added during your next checkout via Razorpay tokenized vault.",
								)
							}
							type="button"
						>
							<Plus className="h-4 w-4" />
							<span>Add Payment Method</span>
						</button>
					</div>

					{/* Quick Account Navigation Pills */}
					<div className="mt-5 flex flex-wrap gap-2">
						<Link
							className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-semibold text-gray-700 text-xs transition-colors hover:border-gray-300 hover:text-brand-red"
							href="/account/settings"
						>
							<Settings className="h-3.5 w-3.5 text-gray-400" />
							<span>Settings</span>
						</Link>

						<Link
							className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-semibold text-gray-700 text-xs transition-colors hover:border-gray-300 hover:text-brand-red"
							href="/account/addresses"
						>
							<MapPin className="h-3.5 w-3.5 text-gray-400" />
							<span>Delivery Addresses</span>
						</Link>

						<Link
							className="inline-flex items-center gap-1.5 rounded-full bg-brand-black px-4 py-1.5 font-semibold text-white text-xs shadow-xs"
							href="/account/payments"
						>
							<CreditCard className="h-3.5 w-3.5" />
							<span>Payment Methods</span>
						</Link>

						<Link
							className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-semibold text-gray-700 text-xs transition-colors hover:border-gray-300 hover:text-brand-red"
							href="/account/subscriptions"
						>
							<RotateCw className="h-3.5 w-3.5 text-gray-400" />
							<span>Auto-Delivery &amp; Refills</span>
						</Link>
					</div>
				</div>

				{/* Toast Banner */}
				{actionMessage && (
					<div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 text-xs shadow-xs">
						<Check className="h-4 w-4 text-emerald-600" />
						<span>{actionMessage}</span>
					</div>
				)}

				{/* Security Trust Banner */}
				<div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
						<ShieldCheck className="h-5 w-5" />
					</div>
					<div>
						<h3 className="font-bold text-gray-900 text-xs">
							RBI Compliant Tokenization &amp; 256-Bit Encryption
						</h3>
						<p className="mt-0.5 text-[11px] text-gray-600 leading-relaxed">
							Card and UPI data is never stored on our servers. Tokens are
							securely processed via Razorpay’s PCI-DSS Level 1 certified vault.
						</p>
					</div>
				</div>

				{/* Section 1: Saved UPI Handles */}
				<div className="mt-6">
					<div className="flex items-center gap-2">
						<Zap className="h-4 w-4 text-brand-red" />
						<h2 className="font-bold text-gray-900 text-sm">Saved UPI IDs</h2>
					</div>

					<div className="mt-3 space-y-3">
						{upis.map((upi) => (
							<div
								className={`flex items-center justify-between rounded-2xl border p-4 shadow-xs transition-all ${
									upi.isDefault
										? "border-brand-red/60 bg-red-50/10 ring-1 ring-brand-red/20"
										: "border-gray-200/80 bg-white"
								}`}
								key={upi.id}
							>
								<div className="flex items-center gap-3.5">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 font-bold text-gray-700 text-xs">
										UPI
									</div>
									<div>
										<div className="flex items-center gap-2">
											<p className="font-bold text-gray-900 text-xs">
												{upi.vpa}
											</p>
											{upi.isDefault && (
												<span className="rounded bg-brand-red/10 px-1.5 py-0.2 font-bold text-[9px] text-brand-red">
													DEFAULT
												</span>
											)}
										</div>
										<p className="text-[11px] text-gray-500">{upi.provider}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 text-xs">
									{!upi.isDefault && (
										<button
											className="font-semibold text-brand-red hover:underline"
											onClick={() => handleSetDefaultUpi(upi.id)}
											type="button"
										>
											Make Default
										</button>
									)}
									<button
										aria-label="Remove UPI"
										className="rounded p-1 text-gray-400 hover:text-brand-red"
										onClick={() => handleDeleteUpi(upi.id)}
										type="button"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Section 2: Saved Cards */}
				<div className="mt-8">
					<div className="flex items-center gap-2">
						<CreditCard className="h-4 w-4 text-brand-red" />
						<h2 className="font-bold text-gray-900 text-sm">
							Saved Credit &amp; Debit Cards
						</h2>
					</div>

					<div className="mt-3 space-y-3">
						{cards.map((card) => (
							<div
								className={`flex items-center justify-between rounded-2xl border p-4 shadow-xs transition-all ${
									card.isDefault
										? "border-brand-red/60 bg-red-50/10 ring-1 ring-brand-red/20"
										: "border-gray-200/80 bg-white"
								}`}
								key={card.id}
							>
								<div className="flex items-center gap-3.5">
									<div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 font-extrabold text-[10px] text-white tracking-wider">
										{card.cardBrand}
									</div>
									<div>
										<div className="flex items-center gap-2">
											<p className="font-bold text-gray-900 text-xs">
												•••• •••• •••• {card.last4}
											</p>
											{card.isDefault && (
												<span className="rounded bg-brand-red/10 px-1.5 py-0.2 font-bold text-[9px] text-brand-red">
													DEFAULT
												</span>
											)}
										</div>
										<p className="text-[11px] text-gray-500">
											Expires {card.expiryMonth}/{card.expiryYear} •{" "}
											{card.cardHolder}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3 text-xs">
									{!card.isDefault && (
										<button
											className="font-semibold text-brand-red hover:underline"
											onClick={() => handleSetDefaultCard(card.id)}
											type="button"
										>
											Make Default
										</button>
									)}
									<button
										aria-label="Remove card"
										className="rounded p-1 text-gray-400 hover:text-brand-red"
										onClick={() => handleDeleteCard(card.id)}
										type="button"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Section 3: Cash on Delivery (COD) */}
				<div className="mt-8 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
								<Banknote className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-bold text-gray-900 text-xs">
									Cash on Delivery (COD)
								</h3>
								<p className="text-[11px] text-gray-500">
									Available on orders up to ₹5,000 across serviceable pin codes.
								</p>
							</div>
						</div>

						<span className="rounded bg-emerald-100 px-2 py-0.5 font-bold text-[10px] text-emerald-800">
							Eligible
						</span>
					</div>
				</div>
			</main>
		</div>
	);
}
