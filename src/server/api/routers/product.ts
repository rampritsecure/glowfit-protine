import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CatalogService } from "@/server/catalog/catalog.service";

export const productRouter = createTRPCRouter({
	/**
	 * List products with multi-criteria filtering, search, sort, and pagination
	 */
	getAll: publicProcedure
		.input(
			z
				.object({
					categoryId: z.string().trim().optional(),
					categorySlug: z.string().trim().optional(),
					brandSlug: z.string().trim().optional(),
					search: z.string().trim().max(100).optional(),
					featured: z.boolean().optional(),
					minPricePaise: z.number().int().nonnegative().optional(),
					maxPricePaise: z.number().int().positive().optional(),
					sortBy: z
						.enum(["featured", "price_asc", "price_desc", "newest", "name_asc"])
						.default("featured"),
					limit: z.number().int().min(1).max(50).default(20),
					cursor: z.string().optional(),
				})
				.optional(),
		)
		.query(async ({ ctx, input = {} }) => {
			// Edge case: ensure minPricePaise is not greater than maxPricePaise
			if (
				input.minPricePaise !== undefined &&
				input.maxPricePaise !== undefined &&
				input.minPricePaise > input.maxPricePaise
			) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "minPricePaise cannot be greater than maxPricePaise",
				});
			}

			const service = new CatalogService(ctx.db);
			return service.getProducts(input);
		}),

	/**
	 * Get featured products for hero and spotlight strips
	 */
	getFeatured: publicProcedure.query(async ({ ctx }) => {
		const service = new CatalogService(ctx.db);
		const result = await service.getProducts({ featured: true, limit: 6 });
		return result.items;
	}),

	/**
	 * Get product by unique slug for product detail view
	 */
	getBySlug: publicProcedure
		.input(
			z.object({
				slug: z
					.string({ required_error: "Product slug is required" })
					.trim()
					.min(1, "Product slug cannot be empty"),
			}),
		)
		.query(async ({ ctx, input }) => {
			const service = new CatalogService(ctx.db);
			const product = await service.getProductBySlug(input.slug);

			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `Product '${input.slug}' was not found or is currently unavailable.`,
				});
			}

			return product;
		}),

	/**
	 * Get product by ID (used for server-side cart & checkout price verification — Rule 1)
	 */
	getById: publicProcedure
		.input(
			z.object({
				id: z
					.string({ required_error: "Product ID is required" })
					.trim()
					.min(1, "Product ID cannot be empty"),
			}),
		)
		.query(async ({ ctx, input }) => {
			const service = new CatalogService(ctx.db);
			const product = await service.getProductById(input.id);

			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `Product with ID '${input.id}' was not found or is inactive.`,
				});
			}

			return product;
		}),

	/**
	 * Autocomplete fast search for the header search bar
	 */
	search: publicProcedure
		.input(
			z.object({
				query: z
					.string({ required_error: "Search query is required" })
					.trim()
					.min(1, "Search query cannot be empty")
					.max(100, "Search query cannot exceed 100 characters"),
				limit: z.number().int().min(1).max(10).default(5),
			}),
		)
		.query(async ({ ctx, input }) => {
			const service = new CatalogService(ctx.db);
			return service.searchProducts(input.query, input.limit);
		}),
});
