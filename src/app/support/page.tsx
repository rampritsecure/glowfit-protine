"use client";

import {
	ChevronDown,
	Mail,
	MessageSquare,
	Package,
	Phone,
	RotateCw,
	Search,
	Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

const FAQS: FaqItem[] = [
	{
		id: "faq-1",
		question: "How long does delivery take across India?",
		answer:
			"Metro orders (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) are typically delivered within 24 to 48 hours. Non-metro cities and tier-2 locations take 3 to 4 business days via Delhivery Express or BlueDart.",
	},
	{
		id: "faq-2",
		question: "How does the 10% Auto-Delivery & Refills program work?",
		answer:
			"When you select recurring delivery on any supplement, you automatically receive a lifetime 10% discount on every replenishment cycle. There are no fees or lock-ins: you can skip shipments, adjust delivery intervals (30, 45, or 60 days), or pause anytime in your account settings.",
	},
	{
		id: "faq-3",
		question: "How do I verify the authenticity of my Glow & Fit supplements?",
		answer:
			"Every bottle and tub of Glow & Fit contains a unique scratch-off authenticity QR code under the cap. Scanning it provides batch-level NABL lab test results, protein assay verification, and heavy metal clearance certificates.",
	},
	{
		id: "faq-4",
		question: "What is your return or replacement policy?",
		answer:
			"We offer a 7-day hassle-free replacement or return window if your package arrives damaged, unsealed, or incorrect. Reach out through WhatsApp or email with photos of the outer box and invoice for instant dispatch of a replacement.",
	},
	{
		id: "faq-5",
		question: "Which payment options are accepted?",
		answer:
			"We accept UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit cards (Visa, MasterCard, RuPay), Netbanking, and Cash on Delivery (COD) for orders up to ₹5,000.",
	},
];

export default function HelpAndSupportPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [expandedFaq, setExpandedFaq] = useState<string | null>("faq-1");

	const filteredFaqs = FAQS.filter(
		(faq) =>
			searchQuery.trim() === "" ||
			faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const toggleFaq = (id: string) => {
		setExpandedFaq((prev) => (prev === id ? null : id));
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
						<li className="font-semibold text-gray-900">Help &amp; Support</li>
					</ol>
				</nav>

				{/* Header Banner */}
				<div className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50/70 via-white to-gray-50 p-6 text-center shadow-xs sm:p-10">
					<span className="rounded-full bg-brand-red/10 px-3 py-1 font-bold text-[11px] text-brand-red uppercase tracking-wider">
						Athlete Support Center
					</span>
					<h1 className="mt-2 font-athletic font-black text-3xl text-brand-black tracking-tight sm:text-4xl">
						HOW CAN WE HELP YOU TODAY?
					</h1>
					<p className="mx-auto mt-2 max-w-lg text-gray-600 text-xs sm:text-sm">
						Quick answers, shipment tracking, product questions, and direct
						support lines.
					</p>

					{/* Search */}
					<div className="relative mx-auto mt-6 max-w-md">
						<Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
						<input
							className="w-full rounded-full border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-xs shadow-xs transition-colors placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-red-500/10"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search questions (e.g. shipping time, returns, authenticity)..."
							type="text"
							value={searchQuery}
						/>
					</div>
				</div>

				{/* Quick Actions Grid */}
				<div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
					<Link
						className="group flex items-center gap-3.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs transition-all hover:border-brand-red/40 hover:shadow-md"
						href="/orders"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-brand-red transition-transform group-hover:scale-105">
							<Truck className="h-5 w-5" />
						</div>
						<div>
							<h3 className="font-bold text-gray-900 text-xs">Track Orders</h3>
							<p className="text-[11px] text-gray-500">
								Live status of active dispatches
							</p>
						</div>
					</Link>

					<Link
						className="group flex items-center gap-3.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs transition-all hover:border-brand-red/40 hover:shadow-md"
						href="/account/subscriptions"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-transform group-hover:scale-105">
							<RotateCw className="h-5 w-5" />
						</div>
						<div>
							<h3 className="font-bold text-gray-900 text-xs">
								Manage Refills
							</h3>
							<p className="text-[11px] text-gray-500">
								Skip or pause auto-delivery
							</p>
						</div>
					</Link>

					<Link
						className="group flex items-center gap-3.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs transition-all hover:border-brand-red/40 hover:shadow-md"
						href="/orders"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-transform group-hover:scale-105">
							<Package className="h-5 w-5" />
						</div>
						<div>
							<h3 className="font-bold text-gray-900 text-xs">
								Returns &amp; Refunds
							</h3>
							<p className="text-[11px] text-gray-500">
								File a replacement ticket
							</p>
						</div>
					</Link>
				</div>

				{/* Contact Channels */}
				<div className="mt-8 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
					<h2 className="font-bold text-gray-900 text-sm">
						Direct Support Lines
					</h2>
					<p className="mt-0.5 text-gray-500 text-xs">
						Our athlete support specialists are available Monday to Saturday, 9
						AM – 8 PM IST.
					</p>

					<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
						{/* WhatsApp */}
						<a
							className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 text-emerald-900 transition-colors hover:bg-emerald-100/60"
							href="https://wa.me/919876543210?text=Hi%20GlowFit%20Team%2C%20I%20need%20help%20with%20my%20order"
							rel="noreferrer"
							target="_blank"
						>
							<MessageSquare className="h-5 w-5 shrink-0 text-emerald-600" />
							<div>
								<p className="font-bold text-xs">WhatsApp Chat</p>
								<p className="text-[11px] text-emerald-700">
									Fastest reply under 10 mins
								</p>
							</div>
						</a>

						{/* Email */}
						<a
							className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-3.5 text-gray-900 transition-colors hover:bg-gray-100"
							href="mailto:support@glowfit.in"
						>
							<Mail className="h-5 w-5 shrink-0 text-brand-red" />
							<div>
								<p className="font-bold text-xs">Email Desk</p>
								<p className="text-[11px] text-gray-500">support@glowfit.in</p>
							</div>
						</a>

						{/* Phone */}
						<a
							className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-3.5 text-gray-900 transition-colors hover:bg-gray-100"
							href="tel:18001234567"
						>
							<Phone className="h-5 w-5 shrink-0 text-gray-700" />
							<div>
								<p className="font-bold text-xs">Toll-Free Helpline</p>
								<p className="text-[11px] text-gray-500">1800-123-4567</p>
							</div>
						</a>
					</div>
				</div>

				{/* Frequently Asked Questions */}
				<div className="mt-8 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
					<h2 className="font-bold text-gray-900 text-sm">
						Frequently Asked Questions
					</h2>

					<div className="mt-4 divide-y divide-gray-100">
						{filteredFaqs.length === 0 ? (
							<p className="py-4 text-center text-gray-500 text-xs">
								No answers found for "{searchQuery}". Please try another search
								or contact support directly.
							</p>
						) : (
							filteredFaqs.map((faq) => {
								const isOpen = expandedFaq === faq.id;

								return (
									<div className="py-3.5" key={faq.id}>
										<button
											aria-expanded={isOpen}
											className="flex w-full items-center justify-between text-left font-bold text-gray-900 text-xs transition-colors hover:text-brand-red"
											onClick={() => toggleFaq(faq.id)}
											type="button"
										>
											<span>{faq.question}</span>
											<ChevronDown
												className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
													isOpen ? "rotate-180 text-brand-red" : ""
												}`}
											/>
										</button>

										{isOpen && (
											<p className="mt-2 text-gray-600 text-xs leading-relaxed">
												{faq.answer}
											</p>
										)}
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
