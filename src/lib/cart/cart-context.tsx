"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type PurchaseType = "ONE_TIME" | "AUTO_DELIVERY";

export interface CartItem {
	id: string; // Composite ID: `${productId}:${purchaseType}`
	productId: string;
	slug: string;
	name: string;
	sku: string;
	imageUrl: string;
	quantity: number;
	purchaseType: PurchaseType;
	deliveryFrequencyDays: number;
	unitPricePaise: number;
	discountedUnitPricePaise: number;
	effectiveUnitPricePaise: number;
	totalPricePaise: number;
	availableQuantity: number;
	inStock: boolean;
}

export interface AddItemInput {
	productId: string;
	slug: string;
	name: string;
	sku: string;
	imageUrl: string;
	unitPricePaise: number;
	quantity?: number;
	purchaseType?: PurchaseType;
	deliveryFrequencyDays?: number;
	availableQuantity?: number;
	inStock?: boolean;
}

interface CartContextValue {
	items: CartItem[];
	totalItems: number;
	subtotalPaise: number;
	autoDeliverySavingsPaise: number;
	totalPaise: number;
	formattedSubtotal: string;
	formattedSavings: string;
	formattedTotal: string;
	isDrawerOpen: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
	addItem: (input: AddItemInput) => void;
	updateQuantity: (id: string, delta: number) => void;
	setQuantity: (id: string, quantity: number) => void;
	togglePurchaseType: (id: string) => void;
	removeItem: (id: string) => void;
	clearCart: () => void;
	isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "glowfit_cart_v1";

function formatPaise(paise: number): string {
	return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

function calculateItemPrices(
	unitPricePaise: number,
	purchaseType: PurchaseType,
	quantity: number,
) {
	const discountedUnitPricePaise = Math.round(unitPricePaise * 0.9);
	const effectiveUnitPricePaise =
		purchaseType === "AUTO_DELIVERY"
			? discountedUnitPricePaise
			: unitPricePaise;
	const totalPricePaise = effectiveUnitPricePaise * quantity;

	return {
		discountedUnitPricePaise,
		effectiveUnitPricePaise,
		totalPricePaise,
	};
}

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isHydrated, setIsHydrated] = useState(false);

	// Load from localStorage on mount
	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) {
					setItems(parsed);
				}
			}
		} catch (error) {
			console.error("Failed to load cart from localStorage", error);
		} finally {
			setIsHydrated(true);
		}
	}, []);

	// Save to localStorage whenever items change
	useEffect(() => {
		if (isHydrated) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
			} catch (error) {
				console.error("Failed to save cart to localStorage", error);
			}
		}
	}, [items, isHydrated]);

	const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
	const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

	const addItem = useCallback((input: AddItemInput) => {
		const purchaseType = input.purchaseType || "ONE_TIME";
		const quantity = input.quantity && input.quantity > 0 ? input.quantity : 1;
		const compositeId = `${input.productId}:${purchaseType}`;
		const deliveryFrequencyDays = input.deliveryFrequencyDays || 30;
		const availableQuantity = input.availableQuantity ?? 50;
		const inStock = input.inStock ?? true;

		setItems((prevItems) => {
			const existingIndex = prevItems.findIndex(
				(item) => item.id === compositeId,
			);

			if (existingIndex > -1) {
				// Item already in cart, increment quantity
				const updated = [...prevItems];
				const existing = updated[existingIndex];
				if (!existing) return prevItems;

				const nextQty = Math.min(
					existing.quantity + quantity,
					existing.availableQuantity || 50,
				);
				const { effectiveUnitPricePaise, totalPricePaise } =
					calculateItemPrices(
						existing.unitPricePaise,
						existing.purchaseType,
						nextQty,
					);

				updated[existingIndex] = {
					...existing,
					quantity: nextQty,
					effectiveUnitPricePaise,
					totalPricePaise,
				};
				return updated;
			}

			// New item
			const {
				discountedUnitPricePaise,
				effectiveUnitPricePaise,
				totalPricePaise,
			} = calculateItemPrices(input.unitPricePaise, purchaseType, quantity);

			const newItem: CartItem = {
				id: compositeId,
				productId: input.productId,
				slug: input.slug,
				name: input.name,
				sku: input.sku,
				imageUrl: input.imageUrl,
				quantity,
				purchaseType,
				deliveryFrequencyDays,
				unitPricePaise: input.unitPricePaise,
				discountedUnitPricePaise,
				effectiveUnitPricePaise,
				totalPricePaise,
				availableQuantity,
				inStock,
			};

			return [...prevItems, newItem];
		});

		// Automatically slide open the drawer to give instant feedback
		setIsDrawerOpen(true);
	}, []);

	const updateQuantity = useCallback((id: string, delta: number) => {
		setItems(
			(prev) =>
				prev
					.map((item) => {
						if (item.id !== id) return item;
						const nextQty = item.quantity + delta;
						if (nextQty <= 0) return null; // remove if qty drops to 0
						const cappedQty = Math.min(nextQty, item.availableQuantity || 50);
						const { effectiveUnitPricePaise, totalPricePaise } =
							calculateItemPrices(
								item.unitPricePaise,
								item.purchaseType,
								cappedQty,
							);

						return {
							...item,
							quantity: cappedQty,
							effectiveUnitPricePaise,
							totalPricePaise,
						};
					})
					.filter(Boolean) as CartItem[],
		);
	}, []);

	const setQuantity = useCallback((id: string, quantity: number) => {
		if (quantity <= 0) {
			setItems((prev) => prev.filter((item) => item.id !== id));
			return;
		}

		setItems((prev) =>
			prev.map((item) => {
				if (item.id !== id) return item;
				const cappedQty = Math.min(quantity, item.availableQuantity || 50);
				const { effectiveUnitPricePaise, totalPricePaise } =
					calculateItemPrices(
						item.unitPricePaise,
						item.purchaseType,
						cappedQty,
					);

				return {
					...item,
					quantity: cappedQty,
					effectiveUnitPricePaise,
					totalPricePaise,
				};
			}),
		);
	}, []);

	const togglePurchaseType = useCallback((id: string) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id !== id) return item;
				const nextType: PurchaseType =
					item.purchaseType === "ONE_TIME" ? "AUTO_DELIVERY" : "ONE_TIME";
				const nextId = `${item.productId}:${nextType}`;
				const { effectiveUnitPricePaise, totalPricePaise } =
					calculateItemPrices(item.unitPricePaise, nextType, item.quantity);

				return {
					...item,
					id: nextId,
					purchaseType: nextType,
					effectiveUnitPricePaise,
					totalPricePaise,
				};
			}),
		);
	}, []);

	const removeItem = useCallback((id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	}, []);

	const clearCart = useCallback(() => {
		setItems([]);
	}, []);

	// Total calculations
	const { totalItems, subtotalPaise, autoDeliverySavingsPaise, totalPaise } =
		useMemo(() => {
			let totalQty = 0;
			let baseSubtotal = 0;
			let savings = 0;

			for (const item of items) {
				totalQty += item.quantity;
				baseSubtotal += item.unitPricePaise * item.quantity;
				if (item.purchaseType === "AUTO_DELIVERY") {
					const standardTotal = item.unitPricePaise * item.quantity;
					const discountedTotal = item.discountedUnitPricePaise * item.quantity;
					savings += standardTotal - discountedTotal;
				}
			}

			const total = baseSubtotal - savings;

			return {
				totalItems: totalQty,
				subtotalPaise: baseSubtotal,
				autoDeliverySavingsPaise: savings,
				totalPaise: total,
			};
		}, [items]);

	const value = useMemo(
		() => ({
			items,
			totalItems,
			subtotalPaise,
			autoDeliverySavingsPaise,
			totalPaise,
			formattedSubtotal: formatPaise(subtotalPaise),
			formattedSavings: formatPaise(autoDeliverySavingsPaise),
			formattedTotal: formatPaise(totalPaise),
			isDrawerOpen,
			openDrawer,
			closeDrawer,
			addItem,
			updateQuantity,
			setQuantity,
			togglePurchaseType,
			removeItem,
			clearCart,
			isHydrated,
		}),
		[
			items,
			totalItems,
			subtotalPaise,
			autoDeliverySavingsPaise,
			totalPaise,
			isDrawerOpen,
			openDrawer,
			closeDrawer,
			addItem,
			updateQuantity,
			setQuantity,
			togglePurchaseType,
			removeItem,
			clearCart,
			isHydrated,
		],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
