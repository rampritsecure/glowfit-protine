import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CatalogService } from "@/server/catalog/catalog.service";

export const categoryRouter = createTRPCRouter({
	/**
	 * Get all active categories with product count
	 */
	getAll: publicProcedure.query(async ({ ctx }) => {
		const service = new CatalogService(ctx.db);
		return service.getCategories();
	}),

	/**
	 * Get featured categories for home screen display
	 */
	getFeatured: publicProcedure.query(async ({ ctx }) => {
		const service = new CatalogService(ctx.db);
		const categories = await service.getCategories();
		return categories.slice(0, 3);
	}),

	/**
	 * Get category by unique slug with its products
	 */
	getBySlug: publicProcedure
		.input(
			z.object({
				slug: z
					.string({ required_error: "Category slug is required" })
					.trim()
					.min(1, "Category slug cannot be empty"),
			}),
		)
		.query(async ({ ctx, input }) => {
			const service = new CatalogService(ctx.db);
			const result = await service.getCategoryBySlug(input.slug);

			if (!result) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `Category '${input.slug}' not found or is currently inactive.`,
				});
			}

			return result;
		}),
});
