"use client";

import {
	Bell,
	Check,
	CreditCard,
	Lock,
	MapPin,
	RotateCw,
	Save,
	Settings,
	ShieldCheck,
	User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

export default function AccountSettingsPage() {
	const [fullName, setFullName] = useState("Ramprit Sahani");
	const [email] = useState("ramprit.secure@gmail.com");
	const [phone, setPhone] = useState("+91 98765 43210");
	const [fitnessGoal, setFitnessGoal] = useState("muscle_building");
	const [_gender, _setGender] = useState("male");

	// Notifications
	const [whatsappUpdates, setWhatsappUpdates] = useState(true);
	const [smsAlerts, setSmsAlerts] = useState(true);
	const [marketingEmails, setMarketingEmails] = useState(false);

	// Feedback
	const [isSaved, setIsSaved] = useState(false);

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSaved(true);
		setTimeout(() => setIsSaved(false), 3000);
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
						<li className="font-semibold text-gray-900">Account Settings</li>
					</ol>
				</nav>

				{/* Title Header */}
				<div className="border-gray-200/80 border-b pb-6">
					<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
						ACCOUNT SETTINGS
					</h1>
					<p className="mt-1 text-gray-600 text-sm">
						Manage your personal profile, security credentials, and
						communication preferences.
					</p>

					{/* Quick Account Navigation Pills */}
					<div className="mt-5 flex flex-wrap gap-2">
						<Link
							className="inline-flex items-center gap-1.5 rounded-full bg-brand-black px-4 py-1.5 font-semibold text-white text-xs shadow-xs"
							href="/account/settings"
						>
							<Settings className="h-3.5 w-3.5" />
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
							className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-semibold text-gray-700 text-xs transition-colors hover:border-gray-300 hover:text-brand-red"
							href="/account/payments"
						>
							<CreditCard className="h-3.5 w-3.5 text-gray-400" />
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

				{/* Settings Form */}
				<form className="mt-6 space-y-6" onSubmit={handleSave}>
					{/* Section 1: Profile Information */}
					<div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
						<div className="flex items-center gap-2.5 border-gray-100 border-b pb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-brand-red">
								<User className="h-4 w-4" />
							</div>
							<div>
								<h2 className="font-bold text-gray-900 text-sm">
									Profile Information
								</h2>
								<p className="text-gray-500 text-xs">
									Your identity and fitness preferences for personalized orders.
								</p>
							</div>
						</div>

						<div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
							{/* Full Name */}
							<div>
								<label
									className="block font-semibold text-gray-700 text-xs"
									htmlFor="fullName"
								>
									Full Name
								</label>
								<input
									className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2 text-gray-900 text-xs transition-colors focus:border-brand-red focus:outline-none"
									id="fullName"
									onChange={(e) => setFullName(e.target.value)}
									required
									type="text"
									value={fullName}
								/>
							</div>

							{/* Email Address */}
							<div>
								<label
									className="block font-semibold text-gray-700 text-xs"
									htmlFor="email"
								>
									Email Address
								</label>
								<div className="relative mt-1.5">
									<input
										className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-gray-600 text-xs focus:outline-none"
										disabled
										id="email"
										type="email"
										value={email}
									/>
									<span className="absolute top-1/2 right-3 -translate-y-1/2 rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-[10px] text-emerald-800">
										Verified
									</span>
								</div>
								<p className="mt-1 text-[11px] text-gray-400">
									Linked to your Glow &amp; Fit athlete account
								</p>
							</div>

							{/* Phone Number */}
							<div>
								<label
									className="block font-semibold text-gray-700 text-xs"
									htmlFor="phone"
								>
									Phone Number
								</label>
								<input
									className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2 text-gray-900 text-xs transition-colors focus:border-brand-red focus:outline-none"
									id="phone"
									onChange={(e) => setPhone(e.target.value)}
									placeholder="+91 98765 43210"
									type="tel"
									value={phone}
								/>
							</div>

							{/* Fitness Goal */}
							<div>
								<label
									className="block font-semibold text-gray-700 text-xs"
									htmlFor="fitnessGoal"
								>
									Primary Fitness Goal
								</label>
								<select
									className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-gray-900 text-xs transition-colors focus:border-brand-red focus:outline-none"
									id="fitnessGoal"
									onChange={(e) => setFitnessGoal(e.target.value)}
									value={fitnessGoal}
								>
									<option value="muscle_building">
										Muscle Building &amp; Hypertrophy
									</option>
									<option value="endurance">Endurance &amp; Stamina</option>
									<option value="weight_loss">
										Fat Loss &amp; Lean Definition
									</option>
									<option value="daily_wellness">
										Daily Performance &amp; Recovery
									</option>
								</select>
							</div>
						</div>
					</div>

					{/* Section 2: Security & Credentials */}
					<div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
						<div className="flex items-center gap-2.5 border-gray-100 border-b pb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
								<Lock className="h-4 w-4" />
							</div>
							<div>
								<h2 className="font-bold text-gray-900 text-sm">
									Security &amp; Password
								</h2>
								<p className="text-gray-500 text-xs">
									Keep your credentials secure.
								</p>
							</div>
						</div>

						<div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label
									className="block font-semibold text-gray-700 text-xs"
									htmlFor="currentPassword"
								>
									Current Password
								</label>
								<input
									className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs focus:border-brand-red focus:outline-none"
									id="currentPassword"
									placeholder="••••••••••••"
									type="password"
								/>
							</div>

							<div>
								<label
									className="block font-semibold text-gray-700 text-xs"
									htmlFor="newPassword"
								>
									New Password
								</label>
								<input
									className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs focus:border-brand-red focus:outline-none"
									id="newPassword"
									placeholder="Minimum 8 characters"
									type="password"
								/>
							</div>
						</div>

						<div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 p-3.5">
							<div className="flex items-center gap-2">
								<ShieldCheck className="h-4 w-4 text-emerald-600" />
								<div>
									<p className="font-semibold text-gray-900 text-xs">
										Two-Factor Authentication (2FA)
									</p>
									<p className="text-[11px] text-gray-500">
										Protects your saved addresses and payment cards via OTP.
									</p>
								</div>
							</div>
							<span className="rounded bg-emerald-100 px-2 py-0.5 font-bold text-[10px] text-emerald-800">
								Active
							</span>
						</div>
					</div>

					{/* Section 3: Notification Preferences */}
					<div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
						<div className="flex items-center gap-2.5 border-gray-100 border-b pb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
								<Bell className="h-4 w-4" />
							</div>
							<div>
								<h2 className="font-bold text-gray-900 text-sm">
									Notifications &amp; Updates
								</h2>
								<p className="text-gray-500 text-xs">
									Choose where you receive tracking and order details.
								</p>
							</div>
						</div>

						<div className="mt-4 divide-y divide-gray-100">
							<label className="flex cursor-pointer items-center justify-between py-3">
								<div>
									<p className="font-semibold text-gray-900 text-xs">
										WhatsApp Order Tracking
									</p>
									<p className="text-[11px] text-gray-500">
										Instant dispatch, out-for-delivery, and delivery alerts on
										WhatsApp.
									</p>
								</div>
								<input
									checked={whatsappUpdates}
									className="h-4 w-4 accent-brand-red"
									onChange={(e) => setWhatsappUpdates(e.target.checked)}
									type="checkbox"
								/>
							</label>

							<label className="flex cursor-pointer items-center justify-between py-3">
								<div>
									<p className="font-semibold text-gray-900 text-xs">
										SMS Delivery Notifications
									</p>
									<p className="text-[11px] text-gray-500">
										Courier OTP and critical delivery notifications.
									</p>
								</div>
								<input
									checked={smsAlerts}
									className="h-4 w-4 accent-brand-red"
									onChange={(e) => setSmsAlerts(e.target.checked)}
									type="checkbox"
								/>
							</label>

							<label className="flex cursor-pointer items-center justify-between py-3">
								<div>
									<p className="font-semibold text-gray-900 text-xs">
										Exclusive Product Drops &amp; Offers
									</p>
									<p className="text-[11px] text-gray-500">
										Be the first to know about restocks, new flavors, and
										athlete discounts.
									</p>
								</div>
								<input
									checked={marketingEmails}
									className="h-4 w-4 accent-brand-red"
									onChange={(e) => setMarketingEmails(e.target.checked)}
									type="checkbox"
								/>
							</label>
						</div>
					</div>

					{/* Save CTA */}
					<div className="flex items-center justify-end gap-3 pt-2">
						{isSaved && (
							<span className="flex items-center gap-1 font-semibold text-emerald-600 text-xs">
								<Check className="h-4 w-4" />
								<span>Settings saved successfully!</span>
							</span>
						)}

						<button
							className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-2.5 font-bold text-white text-xs shadow-xs transition-colors hover:bg-brand-red-hover active:scale-98"
							type="submit"
						>
							<Save className="h-4 w-4" />
							<span>Save Changes</span>
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}
