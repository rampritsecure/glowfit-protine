"use client";

import {
	ArrowRight,
	CheckCircle2,
	Clock,
	Download,
	Eye,
	Package,
	RefreshCw,
	Search,
	ShoppingBag,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

type OrderStatusFilter = "all" | "in_progress" | "delivered" | "cancelled";

interface MockOrderItem {
	id: string;
	name: string;
	flavorOrSize: string;
	quantity: number;
	pricePaise: number;
	imageUrl: string;
}

interface MockOrder {
	id: string;
	orderNumber: string;
	placedAt: string;
	status: "DELIVERED" | "SHIPPED" | "PROCESSING" | "CANCELLED";
	statusLabel: string;
	deliveryDate: string;
	totalPaise: number;
	items: MockOrderItem[];
	trackingNumber?: string;
	courier?: string;
}

const MOCK_ORDERS: MockOrder[] = [
	{
		id: "ord-1",
		orderNumber: "GF-92841",
		placedAt: "Sep 20, 2026",
		status: "SHIPPED",
		statusLabel: "In Transit — Out for Delivery Soon",
		deliveryDate: "Expected by tomorrow, 8:00 PM",
		totalPaise: 449900,
		trackingNumber: "DEL-84920491",
		courier: "Delhivery Express",
		items: [
			{
				id: "item-1",
				name: "100% Whey Protein Isolate",
				flavorOrSize: "Rich Chocolate Silk • 1 kg",
				quantity: 1,
				pricePaise: 329900,
				imageUrl: "/assets/card-whey.png",
			},
			{
				id: "item-2",
				name: "All-Natural High Protein Peanut Butter",
				flavorOrSize: "Crunchy Dark Chocolate • 500g",
				quantity: 2,
				pricePaise: 120000,
				imageUrl: "/assets/peanut-butter.png",
			},
		],
	},
	{
		id: "ord-2",
		orderNumber: "GF-87140",
		placedAt: "Aug 28, 2026",
		status: "DELIVERED",
		statusLabel: "Delivered",
		deliveryDate: "Delivered on Aug 31, 2026",
		totalPaise: 249900,
		trackingNumber: "BLR-9382104",
		courier: "BlueDart",
		items: [
			{
				id: "item-3",
				name: "Ready-to-Mix Protein Water Infusion",
				flavorOrSize: "Zesty Orange Lemonade • Pack of 6",
				quantity: 1,
				pricePaise: 249900,
				imageUrl: "/assets/ready-to-mix-bottle.png",
			},
		],
	},
	{
		id: "ord-3",
		orderNumber: "GF-73120",
		placedAt: "Jul 14, 2026",
		status: "DELIVERED",
		statusLabel: "Delivered",
		deliveryDate: "Delivered on Jul 17, 2026",
		totalPaise: 659800,
		items: [
			{
				id: "item-4",
				name: "100% Whey Protein Isolate",
				flavorOrSize: "Madagascar Vanilla • 2 kg",
				quantity: 2,
				pricePaise: 659800,
				imageUrl: "/assets/art-whey.png",
			},
		],
	},
];

export default function MyOrdersPage() {
	const [activeTab, setActiveTab] = useState<OrderStatusFilter>("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredOrders = MOCK_ORDERS.filter((order) => {
		const matchesTab =
			activeTab === "all"
				? true
				: activeTab === "in_progress"
					? order.status === "PROCESSING" || order.status === "SHIPPED"
					: activeTab === "delivered"
						? order.status === "DELIVERED"
						: order.status === "CANCELLED";

		const matchesSearch =
			searchQuery.trim() === "" ||
			order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.items.some((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);

		return matchesTab && matchesSearch;
	});

	return (
		<div className="flex min-h-screen flex-col bg-[#F9F9FB]">
			{/* Top Header */}
			<div className="sticky top-0 z-30 border-gray-100 border-b bg-white shadow-xs">
				<Header />
			</div>

			{/* Main Content */}
			<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
				{/* Breadcrumb & Navigation */}
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
						<li className="font-semibold text-gray-900">My Orders</li>
					</ol>
				</nav>

				{/* Header title */}
				<div className="flex flex-col justify-between gap-4 border-gray-200/80 border-b pb-6 sm:flex-row sm:items-end">
					<div>
						<h1 className="font-athletic font-extrabold text-3xl text-brand-black tracking-tight sm:text-4xl">
							MY ORDERS
						</h1>
						<p className="mt-1 text-gray-600 text-sm">
							Track, download invoices, and manage returns for your orders.
						</p>
					</div>

					<Link
						className="inline-flex items-center gap-2 self-start rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 text-xs shadow-xs transition-colors hover:border-gray-300 hover:text-brand-red sm:self-auto"
						href="/buy-again"
					>
						<RefreshCw className="h-3.5 w-3.5 text-brand-red" />
						<span>View Buy Again Essentials</span>
					</Link>
				</div>

				{/* Controls: Search + Tabs */}
				<div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					{/* Tabs */}
					<div className="flex flex-wrap gap-2">
						{[
							{ id: "all", label: "All Orders" },
							{ id: "in_progress", label: "In Transit & Active" },
							{ id: "delivered", label: "Delivered" },
							{ id: "cancelled", label: "Cancelled" },
						].map((tab) => (
							<button
								className={`rounded-full px-4 py-1.5 font-semibold text-xs transition-all ${
									activeTab === tab.id
										? "bg-brand-black text-white shadow-xs"
										: "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
								}`}
								key={tab.id}
								onClick={() => setActiveTab(tab.id as OrderStatusFilter)}
								type="button"
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Search */}
					<div className="relative w-full sm:w-64">
						<Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
						<input
							className="w-full rounded-full border border-gray-200 bg-white py-1.5 pr-3 pl-9 text-xs transition-colors placeholder:text-gray-400 focus:border-brand-red focus:outline-none"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search by order # or product"
							type="text"
							value={searchQuery}
						/>
					</div>
				</div>

				{/* Orders List */}
				<div className="mt-6 space-y-4">
					{filteredOrders.length === 0 ? (
						/* Empty State */
						<div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 border-dashed bg-white p-12 text-center shadow-xs">
							<div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-brand-red">
								<Package className="h-7 w-7" />
							</div>
							<h3 className="mt-4 font-bold text-base text-gray-900">
								No orders found
							</h3>
							<p className="mt-1 max-w-sm text-gray-500 text-xs">
								{searchQuery
									? `We couldn't find any orders matching "${searchQuery}". Try a different keyword.`
									: "You haven't placed any orders in this category yet. Explore our supplements to start crushing your goals!"}
							</p>
							<Link
								className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 font-bold text-white text-xs shadow-sm transition-transform hover:bg-brand-red-hover active:scale-95"
								href="/"
							>
								<ShoppingBag className="h-4 w-4" />
								<span>Explore Catalog</span>
							</Link>
						</div>
					) : (
						/* Order Cards */
						filteredOrders.map((order) => {
							const isDelivered = order.status === "DELIVERED";
							const isShipped = order.status === "SHIPPED";

							return (
								<div
									className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs transition-shadow hover:shadow-md"
									key={order.id}
								>
									{/* Order Card Header */}
									<div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b bg-gray-50/70 px-5 py-3.5 text-xs">
										<div className="flex flex-wrap items-center gap-4 sm:gap-6">
											<div>
												<span className="text-gray-400">Order placed:</span>{" "}
												<span className="font-semibold text-gray-900">
													{order.placedAt}
												</span>
											</div>
											<div>
												<span className="text-gray-400">Order ID:</span>{" "}
												<span className="font-bold text-gray-900">
													#{order.orderNumber}
												</span>
											</div>
											<div>
												<span className="text-gray-400">Total:</span>{" "}
												<span className="font-bold text-brand-red">
													₹{(order.totalPaise / 100).toLocaleString("en-IN")}
												</span>
											</div>
										</div>

										<div className="flex items-center gap-2">
											<button
												className="inline-flex items-center gap-1 font-semibold text-gray-600 transition-colors hover:text-brand-red"
												onClick={() =>
													alert(
														`Invoice for #${order.orderNumber} will be generated once payment confirmation is finalized.`,
													)
												}
												type="button"
											>
												<Download className="h-3.5 w-3.5" />
												<span>Invoice</span>
											</button>
										</div>
									</div>

									{/* Status indicator banner */}
									<div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b px-5 py-3 text-xs">
										<div className="flex items-center gap-2">
											{isDelivered && (
												<CheckCircle2 className="h-4 w-4 text-emerald-600" />
											)}
											{isShipped && (
												<Truck className="h-4 w-4 text-amber-500" />
											)}
											{!isDelivered && !isShipped && (
												<Clock className="h-4 w-4 text-blue-500" />
											)}
											<span
												className={`font-bold ${
													isDelivered
														? "text-emerald-700"
														: isShipped
															? "text-amber-700"
															: "text-blue-700"
												}`}
											>
												{order.statusLabel}
											</span>
											<span className="text-gray-400">•</span>
											<span className="text-gray-500">
												{order.deliveryDate}
											</span>
										</div>

										{order.trackingNumber && (
											<span className="rounded bg-gray-100 px-2 py-0.5 font-medium text-[11px] text-gray-600">
												{order.courier}: {order.trackingNumber}
											</span>
										)}
									</div>

									{/* Item rows */}
									<div className="divide-y divide-gray-100 px-5">
										{order.items.map((item) => (
											<div
												className="flex items-center justify-between gap-4 py-4"
												key={item.id}
											>
												<div className="flex items-center gap-4">
													<div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
														<Image
															alt={item.name}
															className="h-full w-full object-contain"
															fill
															sizes="64px"
															src={item.imageUrl}
														/>
													</div>
													<div>
														<h4 className="font-semibold text-gray-900 text-sm">
															{item.name}
														</h4>
														<p className="text-gray-500 text-xs">
															{item.flavorOrSize}
														</p>
														<p className="mt-1 text-gray-500 text-xs">
															Qty: {item.quantity} × ₹
															{(item.pricePaise / 100).toLocaleString("en-IN")}
														</p>
													</div>
												</div>

												<div className="flex shrink-0 flex-col items-end gap-2">
													<span className="font-bold text-gray-900 text-sm">
														₹
														{(
															(item.pricePaise * item.quantity) /
															100
														).toLocaleString("en-IN")}
													</span>
													<Link
														className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 font-semibold text-[11px] text-gray-700 transition-colors hover:border-brand-red hover:text-brand-red"
														href="/buy-again"
													>
														<RefreshCw className="h-3 w-3" />
														<span>Buy Again</span>
													</Link>
												</div>
											</div>
										))}
									</div>

									{/* Order Card Footer */}
									<div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-t bg-gray-50/40 px-5 py-3">
										<Link
											className="font-medium text-gray-500 text-xs hover:text-brand-red"
											href="/support"
										>
											Need help with this order?
										</Link>

										<div className="flex items-center gap-2">
											<Link
												className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 font-semibold text-gray-700 text-xs transition-colors hover:border-gray-300"
												href="/support"
											>
												<Eye className="h-3.5 w-3.5" />
												<span>Track &amp; Details</span>
											</Link>
											<Link
												className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red px-3.5 py-1.5 font-bold text-white text-xs shadow-xs transition-colors hover:bg-brand-red-hover"
												href="/buy-again"
											>
												<span>Reorder All</span>
												<ArrowRight className="h-3.5 w-3.5" />
											</Link>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</main>
		</div>
	);
}
