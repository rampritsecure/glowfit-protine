import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
	CatalogService,
	formatPrice,
} from "@/server/catalog/catalog.service";

const cartItemInputSchema = z.object({
	productId: z.string().trim().min(1, "Product ID is required"),
	quantity: z.number().int().positive("Quantity must be at least 1"),
	purchaseType: z.enum(["ONE_TIME", "AUTO_DELIVERY"]),
	deliveryFrequencyDays: z.number().int().min(7).max(90).default(30),
});

export const cartRouter = createTRPCRouter({
	/**
	 * Server-Side Cart Validation & Re-Pricing (Rule 1 & Rule 2)
	 * Recalculates exact prices in paise and verifies live stock before checkout.
	 */
	validate: publicProcedure
		.input(
			z.object({
				items: z.array(cartItemInputSchema),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const service = new CatalogService(ctx.db);

			const validatedItems: {
				productId: string;
				name: string;
				slug: string;
				imageUrl: string;
				requestedQuantity: number;
				confirmedQuantity: number;
				purchaseType: "ONE_TIME" | "AUTO_DELIVERY";
				deliveryFrequencyDays: number;
				unitPricePaise: number;
				effectiveUnitPricePaise: number;
				totalPricePaise: number;
				inStock: boolean;
				inventoryAdjusted: boolean;
			}[] = [];

			let subtotalPaise = 0;
			let autoDeliverySavingsPaise = 0;
			const warnings: string[] = [];

			for (const item of input.items) {
				// Query live product by ID (or fallback)
				const product = await service.getProductById(item.productId);

				if (!product) {
					warnings.push(`An item in your cart is no longer available.`);
					continue;
				}

				if (!product.inStock || product.availableQuantity <= 0) {
					warnings.push(
						`"${product.name}" is currently out of stock and was removed from checkout.`,
					);
					continue;
				}

				// Inventory verification
				let confirmedQuantity = item.quantity;
				let inventoryAdjusted = false;

				if (item.quantity > product.availableQuantity) {
					confirmedQuantity = product.availableQuantity;
					inventoryAdjusted = true;
					warnings.push(
						`Only ${product.availableQuantity} units of "${product.name}" are available. Quantity adjusted.`,
					);
				}

				// Exact server price calculation (in paise)
				const basePricePaise = product.pricePaise;
				const discountedPricePaise = Math.round(basePricePaise * 0.9);
				const effectiveUnitPricePaise =
					item.purchaseType === "AUTO_DELIVERY"
						? discountedPricePaise
						: basePricePaise;
				const itemTotalPaise = effectiveUnitPricePaise * confirmedQuantity;

				subtotalPaise += basePricePaise * confirmedQuantity;
				if (item.purchaseType === "AUTO_DELIVERY") {
					autoDeliverySavingsPaise +=
						(basePricePaise - discountedPricePaise) * confirmedQuantity;
				}

				validatedItems.push({
					productId: product.id,
					name: product.name,
					slug: product.slug,
					imageUrl: product.primaryImage.url,
					requestedQuantity: item.quantity,
					confirmedQuantity,
					purchaseType: item.purchaseType,
					deliveryFrequencyDays: item.deliveryFrequencyDays,
					unitPricePaise: basePricePaise,
					effectiveUnitPricePaise,
					totalPricePaise: itemTotalPaise,
					inStock: product.inStock,
					inventoryAdjusted,
				});
			}

			const grandTotalPaise = subtotalPaise - autoDeliverySavingsPaise;
			const shippingPaise = 0; // Free express delivery for GlowFit

			return {
				items: validatedItems,
				summary: {
					itemCount: validatedItems.reduce((acc, i) => acc + i.confirmedQuantity, 0),
					subtotalPaise,
					autoDeliverySavingsPaise,
					shippingPaise,
					grandTotalPaise,
					formattedSubtotal: formatPrice(subtotalPaise),
					formattedSavings: formatPrice(autoDeliverySavingsPaise),
					formattedShipping: "FREE",
					formattedGrandTotal: formatPrice(grandTotalPaise),
				},
				warnings,
			};
		}),
});
