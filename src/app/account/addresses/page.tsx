"use client";

import {
	Building2,
	Check,
	CreditCard,
	Home,
	MapPin,
	Plus,
	RotateCw,
	Settings,
	Trash2,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

interface AddressItem {
	id: string;
	type: "HOME" | "WORK" | "OTHER";
	fullName: string;
	phone: string;
	addressLine1: string;
	addressLine2?: string;
	landmark?: string;
	city: string;
	state: string;
	postalCode: string;
	isDefault: boolean;
}

const INITIAL_ADDRESSES: AddressItem[] = [
	{
		id: "addr-1",
		type: "HOME",
		fullName: "Ramprit Sahani",
		phone: "+91 98765 43210",
		addressLine1: "Flat 402, Sunrise Residency, Sector 18",
		addressLine2: "Palm Beach Road",
		landmark: "Near Central Gym & Sports Club",
		city: "Navi Mumbai",
		state: "Maharashtra",
		postalCode: "400705",
		isDefault: true,
	},
	{
		id: "addr-2",
		type: "WORK",
		fullName: "Ramprit Sahani",
		phone: "+91 98765 43210",
		addressLine1: "Glow & Fit Fitness Headquarters, Floor 6",
		addressLine2: "Mindspace IT Park, Airoli",
		landmark: "Opposite Fitness First",
		city: "Navi Mumbai",
		state: "Maharashtra",
		postalCode: "400708",
		isDefault: false,
	},
];

export default function DeliveryAddressesPage() {
	const [addresses, setAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// New Address Form State
	const [formData, setFormData] = useState({
		fullName: "",
		phone: "",
		addressLine1: "",
		addressLine2: "",
		landmark: "",
		city: "",
		state: "",
		postalCode: "",
		type: "HOME" as "HOME" | "WORK" | "OTHER",
		isDefault: false,
	});

	const handleSetDefault = (id: string) => {
		setAddresses((prev) =>
			prev.map((addr) => ({
				...addr,
				isDefault: addr.id === id,
			})),
		);
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to remove this delivery address?")) {
			setAddresses((prev) => prev.filter((addr) => addr.id !== id));
		}
	};

	const handleCreateAddress = (e: React.FormEvent) => {
		e.preventDefault();
		const newAddress: AddressItem = {
			id: `addr-${Date.now()}`,
			...formData,
		};

		if (newAddress.isDefault || addresses.length === 0) {
			setAddresses((prev) => [
				...prev.map((a) => ({ ...a, isDefault: false })),
				{ ...newAddress, isDefault: true },
			]);
		} else {
			setAddresses((prev) => [...prev, newAddress]);
		}

		setIsModalOpen(false);
		setFormData({
			fullName: "",
			phone: "",
			addressLine1: "",
			addressLine2: "",
			landmark: "",
			city: "",
			state: "",
			postalCode: "",
			type: "HOME",
			isDefault: false,
		});
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
						<li className="font-semibold text-gray-900">Delivery Addresses</li>
					</ol>
				</nav>

				{/* Title Header */}
				<div className="border-gray-200/80 border-b pb-6">
					<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
						<div>
							<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
								DELIVERY ADDRESSES
							</h1>
							<p className="mt-1 text-gray-600 text-sm">
								Manage your delivery destinations for quick 1-tap checkout.
							</p>
						</div>

						<button
							className="inline-flex items-center gap-2 self-start rounded-xl bg-brand-red px-4 py-2 font-bold text-white text-xs shadow-xs transition-colors hover:bg-brand-red-hover active:scale-98 sm:self-auto"
							onClick={() => setIsModalOpen(true)}
							type="button"
						>
							<Plus className="h-4 w-4" />
							<span>Add New Address</span>
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
							className="inline-flex items-center gap-1.5 rounded-full bg-brand-black px-4 py-1.5 font-semibold text-white text-xs shadow-xs"
							href="/account/addresses"
						>
							<MapPin className="h-3.5 w-3.5" />
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

				{/* Address Cards Grid */}
				<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
					{addresses.map((address) => (
						<div
							className={`relative flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all ${
								address.isDefault
									? "border-brand-red/60 bg-red-50/10 ring-1 ring-brand-red/20"
									: "border-gray-200/80 bg-white"
							}`}
							key={address.id}
						>
							<div>
								{/* Type & Default Badges */}
								<div className="flex items-center justify-between">
									<span className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 font-bold text-[10px] text-gray-700 uppercase">
										{address.type === "HOME" ? (
											<Home className="h-3 w-3" />
										) : (
											<Building2 className="h-3 w-3" />
										)}
										<span>{address.type}</span>
									</span>

									{address.isDefault && (
										<span className="rounded-full bg-brand-red/10 px-2 py-0.5 font-bold text-[10.5px] text-brand-red">
											Default Delivery
										</span>
									)}
								</div>

								{/* Details */}
								<div className="mt-3">
									<h3 className="font-bold text-gray-900 text-sm">
										{address.fullName}
									</h3>
									<p className="mt-0.5 text-gray-500 text-xs">
										{address.phone}
									</p>

									<p className="mt-2 text-gray-700 text-xs leading-relaxed">
										{address.addressLine1}
										{address.addressLine2 && `, ${address.addressLine2}`}
									</p>
									{address.landmark && (
										<p className="text-gray-500 text-xs">
											Landmark: {address.landmark}
										</p>
									)}
									<p className="font-semibold text-gray-800 text-xs">
										{address.city}, {address.state} — {address.postalCode}
									</p>
								</div>
							</div>

							{/* Actions Footer */}
							<div className="mt-4 flex items-center justify-between border-gray-100 border-t pt-3 text-xs">
								{!address.isDefault ? (
									<button
										className="font-semibold text-brand-red transition-colors hover:text-brand-red-hover"
										onClick={() => handleSetDefault(address.id)}
										type="button"
									>
										Set as Default
									</button>
								) : (
									<span className="flex items-center gap-1 font-semibold text-[11px] text-emerald-600">
										<Check className="h-3.5 w-3.5" />
										Primary Address
									</span>
								)}

								<button
									aria-label="Delete address"
									className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-brand-red"
									onClick={() => handleDelete(address.id)}
									type="button"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Add Address Modal */}
				{isModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
						<div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">
							<div className="flex items-center justify-between border-gray-100 border-b pb-3">
								<h3 className="font-bold text-base text-gray-900">
									Add Delivery Address
								</h3>
								<button
									className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
									onClick={() => setIsModalOpen(false)}
									type="button"
								>
									<X className="h-5 w-5" />
								</button>
							</div>

							<form className="mt-4 space-y-3.5" onSubmit={handleCreateAddress}>
								<div className="grid grid-cols-2 gap-3">
									<div>
										<label
											className="block font-semibold text-gray-700 text-xs"
											htmlFor="newFullName"
										>
											Full Name *
										</label>
										<input
											className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
											id="newFullName"
											onChange={(e) =>
												setFormData({ ...formData, fullName: e.target.value })
											}
											required
											type="text"
											value={formData.fullName}
										/>
									</div>
									<div>
										<label
											className="block font-semibold text-gray-700 text-xs"
											htmlFor="newPhone"
										>
											Phone Number *
										</label>
										<input
											className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
											id="newPhone"
											onChange={(e) =>
												setFormData({ ...formData, phone: e.target.value })
											}
											placeholder="+91 98765 43210"
											required
											type="tel"
											value={formData.phone}
										/>
									</div>
								</div>

								<div>
									<label
										className="block font-semibold text-gray-700 text-xs"
										htmlFor="newAddressLine1"
									>
										Address Line 1 (Flat, House, Building) *
									</label>
									<input
										className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
										id="newAddressLine1"
										onChange={(e) =>
											setFormData({ ...formData, addressLine1: e.target.value })
										}
										required
										type="text"
										value={formData.addressLine1}
									/>
								</div>

								<div>
									<label
										className="block font-semibold text-gray-700 text-xs"
										htmlFor="newAddressLine2"
									>
										Address Line 2 (Area, Street, Sector)
									</label>
									<input
										className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
										id="newAddressLine2"
										onChange={(e) =>
											setFormData({ ...formData, addressLine2: e.target.value })
										}
										type="text"
										value={formData.addressLine2}
									/>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div>
										<label
											className="block font-semibold text-gray-700 text-xs"
											htmlFor="newLandmark"
										>
											Landmark
										</label>
										<input
											className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
											id="newLandmark"
											onChange={(e) =>
												setFormData({ ...formData, landmark: e.target.value })
											}
											placeholder="Near Gold's Gym"
											type="text"
											value={formData.landmark}
										/>
									</div>
									<div>
										<label
											className="block font-semibold text-gray-700 text-xs"
											htmlFor="newPostalCode"
										>
											PIN Code *
										</label>
										<input
											className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
											id="newPostalCode"
											maxLength={6}
											onChange={(e) =>
												setFormData({ ...formData, postalCode: e.target.value })
											}
											placeholder="400001"
											required
											type="text"
											value={formData.postalCode}
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div>
										<label
											className="block font-semibold text-gray-700 text-xs"
											htmlFor="newCity"
										>
											City *
										</label>
										<input
											className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
											id="newCity"
											onChange={(e) =>
												setFormData({ ...formData, city: e.target.value })
											}
											required
											type="text"
											value={formData.city}
										/>
									</div>
									<div>
										<label
											className="block font-semibold text-gray-700 text-xs"
											htmlFor="newState"
										>
											State *
										</label>
										<input
											className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:border-brand-red focus:outline-none"
											id="newState"
											onChange={(e) =>
												setFormData({ ...formData, state: e.target.value })
											}
											required
											type="text"
											value={formData.state}
										/>
									</div>
								</div>

								<div className="flex items-center gap-4 pt-1">
									<span className="font-semibold text-gray-700 text-xs">
										Address Type:
									</span>
									<div className="flex gap-2">
										{(["HOME", "WORK", "OTHER"] as const).map((t) => (
											<button
												className={`rounded-lg px-3 py-1 font-semibold text-xs transition-colors ${
													formData.type === t
														? "bg-brand-black text-white"
														: "bg-gray-100 text-gray-600 hover:bg-gray-200"
												}`}
												key={t}
												onClick={() => setFormData({ ...formData, type: t })}
												type="button"
											>
												{t}
											</button>
										))}
									</div>
								</div>

								<label className="flex cursor-pointer items-center gap-2 pt-1">
									<input
										checked={formData.isDefault}
										className="h-4 w-4 accent-brand-red"
										onChange={(e) =>
											setFormData({ ...formData, isDefault: e.target.checked })
										}
										type="checkbox"
									/>
									<span className="text-gray-700 text-xs">
										Make this my default delivery address
									</span>
								</label>

								<div className="flex items-center justify-end gap-2 pt-3">
									<button
										className="rounded-xl px-4 py-2 font-semibold text-gray-600 text-xs hover:bg-gray-100"
										onClick={() => setIsModalOpen(false)}
										type="button"
									>
										Cancel
									</button>
									<button
										className="rounded-xl bg-brand-red px-5 py-2 font-bold text-white text-xs shadow-xs transition-colors hover:bg-brand-red-hover"
										type="submit"
									>
										Save Address
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
