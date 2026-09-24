import type { PrismaClient } from "../../../generated/prisma";
import {
	CANONICAL_CATEGORIES,
	CANONICAL_PRODUCTS,
	type CatalogCategory,
	type CatalogProduct,
} from "./default-data";

export interface FormattedProductItem {
	id: string;
	name: string;
	slug: string;
	sku: string;
	shortDescription: string | null;
	description: string | null;
	categorySlug: string;
	categoryName: string;
	status: string;
	featured: boolean;
	pricePaise: number;
	compareAtPaise: number | null;
	priceFormatted: string;
	compareAtFormatted: string | null;
	weightGrams: number | null;
	inStock: boolean;
	isLowStock: boolean;
	availableQuantity: number;
	rating: number;
	reviewCount: number;
	primaryImage: {
		url: string;
		altText: string;
	};
	images: {
		url: string;
		altText: string;
		position: number;
		isPrimary: boolean;
	}[];
	nutrition: Record<string, unknown> | null;
	metaTitle: string | null;
	metaDescription: string | null;
}

export interface ProductFilterParams {
	categoryId?: string;
	categorySlug?: string;
	brandSlug?: string;
	search?: string;
	featured?: boolean;
	minPricePaise?: number;
	maxPricePaise?: number;
	sortBy?: "featured" | "price_asc" | "price_desc" | "newest" | "name_asc";
	limit?: number;
	cursor?: string;
}

export function formatPrice(paise: number): string {
	return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export function transformCanonicalToItem(
	p: CatalogProduct,
): FormattedProductItem {
	const primaryImg = p.images.find((img) => img.isPrimary) ??
		p.images[0] ?? {
			url: "/assets/card-whey.png",
			altText: p.name,
			position: 1,
			isPrimary: true,
		};

	const inStock = p.trackInventory
		? p.availableQuantity > 0 || p.inventoryPolicy === "ALLOW_BACKORDER"
		: true;
	const isLowStock =
		p.trackInventory &&
		p.availableQuantity > 0 &&
		p.availableQuantity <= p.reorderLevel;

	return {
		id: p.id,
		name: p.name,
		slug: p.slug,
		sku: p.sku,
		shortDescription: p.shortDescription,
		description: p.description,
		categorySlug: p.categorySlug,
		categoryName: p.categoryName,
		status: p.status,
		featured: p.featured,
		pricePaise: p.pricePaise,
		compareAtPaise: p.compareAtPaise,
		priceFormatted: formatPrice(p.pricePaise),
		compareAtFormatted: p.compareAtPaise ? formatPrice(p.compareAtPaise) : null,
		weightGrams: p.weightGrams,
		inStock,
		isLowStock,
		availableQuantity: p.availableQuantity,
		rating: p.rating,
		reviewCount: p.reviewCount,
		primaryImage: {
			url: primaryImg.url,
			altText: primaryImg.altText,
		},
		images: p.images,
		nutrition: p.nutrition as unknown as Record<string, unknown>,
		metaTitle: p.metaTitle,
		metaDescription: p.metaDescription,
	};
}

export class CatalogService {
	constructor(private readonly db: PrismaClient) {}

	/**
	 * Fetch all active categories with product counts
	 */
	async getCategories(): Promise<
		(CatalogCategory & { productCount: number })[]
	> {
		try {
			const dbCategories = await this.db.category.findMany({
				where: { isActive: true },
				orderBy: { position: "asc" },
				include: {
					products: {
						where: {
							product: {
								status: "ACTIVE",
								deletedAt: null,
							},
						},
					},
				},
			});

			if (dbCategories.length > 0) {
				return dbCategories.map((c) => ({
					id: c.id,
					name: c.name,
					slug: c.slug,
					description: c.description ?? "",
					imageUrl: c.imageUrl ?? "/assets/art-whey.png",
					position: c.position,
					isActive: c.isActive,
					productCount: c.products.length,
				}));
			}
		} catch (error) {
			console.warn(
				"[CatalogService] DB not ready or empty for categories, using canonical fallback:",
				(error as Error).message,
			);
		}

		// Fallback to canonical data
		return CANONICAL_CATEGORIES.map((cat) => ({
			...cat,
			productCount: CANONICAL_PRODUCTS.filter(
				(p) => p.categorySlug === cat.slug && p.status === "ACTIVE",
			).length,
		}));
	}

	/**
	 * Get category by slug with its active products
	 */
	async getCategoryBySlug(slug: string): Promise<{
		category: CatalogCategory & { productCount: number };
		products: FormattedProductItem[];
	} | null> {
		const cleanSlug = slug.trim().toLowerCase();

		try {
			const dbCategory = await this.db.category.findFirst({
				where: {
					slug: cleanSlug,
					isActive: true,
				},
				include: {
					products: {
						where: {
							product: {
								status: "ACTIVE",
								deletedAt: null,
							},
						},
						include: {
							product: {
								include: {
									images: { orderBy: { position: "asc" } },
									inventory: true,
								},
							},
						},
					},
					seo: true,
				},
			});

			if (dbCategory) {
				const products: FormattedProductItem[] = dbCategory.products.map(
					({ product: p }) => {
						const primaryImg = p.images.find((img) => img.isPrimary) ??
							p.images[0] ?? {
								url: "/assets/card-whey.png",
								altText: p.name,
							};

						const inStock = p.trackInventory
							? (p.inventory?.availableQuantity ?? 0) > 0 ||
								p.inventoryPolicy === "ALLOW_BACKORDER"
							: true;
						const isLowStock =
							p.trackInventory &&
							(p.inventory?.availableQuantity ?? 0) > 0 &&
							(p.inventory?.availableQuantity ?? 0) <=
								(p.inventory?.reorderLevel ?? 5);

						let nutrition: Record<string, unknown> | null = null;
						if (p.nutritionJson) {
							try {
								nutrition = JSON.parse(p.nutritionJson);
							} catch {
								nutrition = null;
							}
						}

						return {
							id: p.id,
							name: p.name,
							slug: p.slug,
							sku: p.sku,
							shortDescription: p.shortDescription,
							description: p.description,
							categorySlug: dbCategory.slug,
							categoryName: dbCategory.name,
							status: p.status,
							featured: p.featured,
							pricePaise: p.pricePaise,
							compareAtPaise: p.compareAtPaise,
							priceFormatted: formatPrice(p.pricePaise),
							compareAtFormatted: p.compareAtPaise
								? formatPrice(p.compareAtPaise)
								: null,
							weightGrams: p.weightGrams,
							inStock,
							isLowStock,
							availableQuantity: p.inventory?.availableQuantity ?? 0,
							rating: 4.8,
							reviewCount: 150,
							primaryImage: {
								url: primaryImg.url,
								altText: primaryImg.altText,
							},
							images: p.images.map((img) => ({
								url: img.url,
								altText: img.altText,
								position: img.position,
								isPrimary: img.isPrimary,
							})),
							nutrition,
							metaTitle: p.metaTitle,
							metaDescription: p.metaDescription,
						};
					},
				);

				return {
					category: {
						id: dbCategory.id,
						name: dbCategory.name,
						slug: dbCategory.slug,
						description: dbCategory.description ?? "",
						imageUrl: dbCategory.imageUrl ?? "/assets/art-whey.png",
						position: dbCategory.position,
						isActive: dbCategory.isActive,
						seoTitle: dbCategory.seo?.title,
						seoDescription: dbCategory.seo?.description,
						productCount: products.length,
					},
					products,
				};
			}
		} catch (error) {
			console.warn(
				"[CatalogService] DB query failed in getCategoryBySlug, checking fallback:",
				(error as Error).message,
			);
		}

		// Fallback lookup
		const canonicalCat = CANONICAL_CATEGORIES.find(
			(c) => c.slug === cleanSlug && c.isActive,
		);
		if (!canonicalCat) return null;

		const canonicalProds = CANONICAL_PRODUCTS.filter(
			(p) => p.categorySlug === cleanSlug && p.status === "ACTIVE",
		).map(transformCanonicalToItem);

		return {
			category: {
				...canonicalCat,
				productCount: canonicalProds.length,
			},
			products: canonicalProds,
		};
	}

	/**
	 * Get products with filter, search, sort, and pagination
	 */
	async getProducts(params: ProductFilterParams = {}): Promise<{
		items: FormattedProductItem[];
		nextCursor?: string;
		totalCount: number;
	}> {
		const {
			categorySlug,
			search,
			featured,
			minPricePaise,
			maxPricePaise,
			sortBy = "featured",
			limit = 20,
			cursor,
		} = params;

		try {
			const whereClause: Record<string, unknown> = {
				status: "ACTIVE",
				deletedAt: null,
			};

			if (categorySlug) {
				whereClause.categories = {
					some: {
						category: {
							slug: categorySlug.trim().toLowerCase(),
							isActive: true,
						},
					},
				};
			}

			if (featured !== undefined) {
				whereClause.featured = featured;
			}

			if (minPricePaise !== undefined || maxPricePaise !== undefined) {
				whereClause.pricePaise = {
					...(minPricePaise !== undefined ? { gte: minPricePaise } : {}),
					...(maxPricePaise !== undefined ? { lte: maxPricePaise } : {}),
				};
			}

			if (search && search.trim().length > 0) {
				const term = search.trim();
				whereClause.OR = [
					{ name: { contains: term, mode: "insensitive" } },
					{ shortDescription: { contains: term, mode: "insensitive" } },
					{ description: { contains: term, mode: "insensitive" } },
				];
			}

			// Sort order mapping
			let orderBy: Record<string, string> = { featured: "desc" };
			if (sortBy === "price_asc") orderBy = { pricePaise: "asc" };
			else if (sortBy === "price_desc") orderBy = { pricePaise: "desc" };
			else if (sortBy === "newest") orderBy = { createdAt: "desc" };
			else if (sortBy === "name_asc") orderBy = { name: "asc" };

			const totalCount = await this.db.product.count({
				where: whereClause,
			});

			const dbProducts = await this.db.product.findMany({
				take: limit + 1,
				cursor: cursor ? { id: cursor } : undefined,
				where: whereClause,
				orderBy,
				include: {
					images: { orderBy: { position: "asc" } },
					inventory: true,
					categories: {
						include: { category: true },
					},
				},
			});

			if (dbProducts.length > 0) {
				let nextCursor: string | undefined;
				let itemsToReturn = dbProducts;

				if (dbProducts.length > limit) {
					const nextItem = dbProducts.pop();
					nextCursor = nextItem?.id;
					itemsToReturn = dbProducts;
				}

				const items: FormattedProductItem[] = itemsToReturn.map((p) => {
					const primaryImg = p.images.find((img) => img.isPrimary) ??
						p.images[0] ?? {
							url: "/assets/card-whey.png",
							altText: p.name,
						};

					const inStock = p.trackInventory
						? (p.inventory?.availableQuantity ?? 0) > 0 ||
							p.inventoryPolicy === "ALLOW_BACKORDER"
						: true;
					const isLowStock =
						p.trackInventory &&
						(p.inventory?.availableQuantity ?? 0) > 0 &&
						(p.inventory?.availableQuantity ?? 0) <=
							(p.inventory?.reorderLevel ?? 5);

					const cat = p.categories[0]?.category;

					let nutrition: Record<string, unknown> | null = null;
					if (p.nutritionJson) {
						try {
							nutrition = JSON.parse(p.nutritionJson);
						} catch {
							nutrition = null;
						}
					}

					return {
						id: p.id,
						name: p.name,
						slug: p.slug,
						sku: p.sku,
						shortDescription: p.shortDescription,
						description: p.description,
						categorySlug: cat?.slug ?? "supplements",
						categoryName: cat?.name ?? "Supplements",
						status: p.status,
						featured: p.featured,
						pricePaise: p.pricePaise,
						compareAtPaise: p.compareAtPaise,
						priceFormatted: formatPrice(p.pricePaise),
						compareAtFormatted: p.compareAtPaise
							? formatPrice(p.compareAtPaise)
							: null,
						weightGrams: p.weightGrams,
						inStock,
						isLowStock,
						availableQuantity: p.inventory?.availableQuantity ?? 0,
						rating: 4.8,
						reviewCount: 180,
						primaryImage: {
							url: primaryImg.url,
							altText: primaryImg.altText,
						},
						images: p.images.map((img) => ({
							url: img.url,
							altText: img.altText,
							position: img.position,
							isPrimary: img.isPrimary,
						})),
						nutrition,
						metaTitle: p.metaTitle,
						metaDescription: p.metaDescription,
					};
				});

				return {
					items,
					nextCursor,
					totalCount,
				};
			}
		} catch (error) {
			console.warn(
				"[CatalogService] DB query failed in getProducts, using fallback:",
				(error as Error).message,
			);
		}

		// Fallback in-memory filtering
		let filtered = CANONICAL_PRODUCTS.filter((p) => p.status === "ACTIVE");

		if (categorySlug) {
			filtered = filtered.filter(
				(p) => p.categorySlug === categorySlug.trim().toLowerCase(),
			);
		}

		if (featured !== undefined) {
			filtered = filtered.filter((p) => p.featured === featured);
		}

		if (minPricePaise !== undefined) {
			filtered = filtered.filter((p) => p.pricePaise >= minPricePaise);
		}

		if (maxPricePaise !== undefined) {
			filtered = filtered.filter((p) => p.pricePaise <= maxPricePaise);
		}

		if (search && search.trim().length > 0) {
			const q = search.trim().toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(q) ||
					p.shortDescription.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q) ||
					p.categoryName.toLowerCase().includes(q),
			);
		}

		// Sort
		if (sortBy === "price_asc") {
			filtered.sort((a, b) => a.pricePaise - b.pricePaise);
		} else if (sortBy === "price_desc") {
			filtered.sort((a, b) => b.pricePaise - a.pricePaise);
		} else if (sortBy === "name_asc") {
			filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else {
			filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
		}

		const totalCount = filtered.length;
		const paginated = filtered.slice(0, limit);
		const items = paginated.map(transformCanonicalToItem);

		return {
			items,
			nextCursor: undefined,
			totalCount,
		};
	}

	/**
	 * Get product by slug for product detail page
	 */
	async getProductBySlug(slug: string): Promise<FormattedProductItem | null> {
		const cleanSlug = slug.trim().toLowerCase();

		try {
			const dbProduct = await this.db.product.findFirst({
				where: {
					slug: cleanSlug,
					status: "ACTIVE",
					deletedAt: null,
				},
				include: {
					images: { orderBy: { position: "asc" } },
					inventory: true,
					categories: {
						include: { category: true },
					},
					attributes: {
						include: { attribute: true },
					},
					brand: true,
				},
			});

			if (dbProduct) {
				const primaryImg = dbProduct.images.find((img) => img.isPrimary) ??
					dbProduct.images[0] ?? {
						url: "/assets/card-whey.png",
						altText: dbProduct.name,
					};

				const inStock = dbProduct.trackInventory
					? (dbProduct.inventory?.availableQuantity ?? 0) > 0 ||
						dbProduct.inventoryPolicy === "ALLOW_BACKORDER"
					: true;
				const isLowStock =
					dbProduct.trackInventory &&
					(dbProduct.inventory?.availableQuantity ?? 0) > 0 &&
					(dbProduct.inventory?.availableQuantity ?? 0) <=
						(dbProduct.inventory?.reorderLevel ?? 5);

				const cat = dbProduct.categories[0]?.category;

				let nutrition: Record<string, unknown> | null = null;
				if (dbProduct.nutritionJson) {
					try {
						nutrition = JSON.parse(dbProduct.nutritionJson);
					} catch {
						nutrition = null;
					}
				}

				return {
					id: dbProduct.id,
					name: dbProduct.name,
					slug: dbProduct.slug,
					sku: dbProduct.sku,
					shortDescription: dbProduct.shortDescription,
					description: dbProduct.description,
					categorySlug: cat?.slug ?? "supplements",
					categoryName: cat?.name ?? "Supplements",
					status: dbProduct.status,
					featured: dbProduct.featured,
					pricePaise: dbProduct.pricePaise,
					compareAtPaise: dbProduct.compareAtPaise,
					priceFormatted: formatPrice(dbProduct.pricePaise),
					compareAtFormatted: dbProduct.compareAtPaise
						? formatPrice(dbProduct.compareAtPaise)
						: null,
					weightGrams: dbProduct.weightGrams,
					inStock,
					isLowStock,
					availableQuantity: dbProduct.inventory?.availableQuantity ?? 0,
					rating: 4.9,
					reviewCount: 240,
					primaryImage: {
						url: primaryImg.url,
						altText: primaryImg.altText,
					},
					images: dbProduct.images.map((img) => ({
						url: img.url,
						altText: img.altText,
						position: img.position,
						isPrimary: img.isPrimary,
					})),
					nutrition,
					metaTitle: dbProduct.metaTitle,
					metaDescription: dbProduct.metaDescription,
				};
			}
		} catch (error) {
			console.warn(
				"[CatalogService] DB query failed in getProductBySlug, checking fallback:",
				(error as Error).message,
			);
		}

		// Fallback lookup
		const canonicalProd = CANONICAL_PRODUCTS.find(
			(p) => p.slug === cleanSlug && p.status === "ACTIVE",
		);

		return canonicalProd ? transformCanonicalToItem(canonicalProd) : null;
	}

	/**
	 * Get product by ID (for cart/checkout server verification - Rule 1: Never trust client-side prices)
	 */
	async getProductById(id: string): Promise<FormattedProductItem | null> {
		try {
			const dbProduct = await this.db.product.findFirst({
				where: {
					id,
					status: "ACTIVE",
					deletedAt: null,
				},
				include: {
					images: { orderBy: { position: "asc" } },
					inventory: true,
					categories: { include: { category: true } },
				},
			});

			if (dbProduct) {
				const primaryImg = dbProduct.images.find((img) => img.isPrimary) ??
					dbProduct.images[0] ?? {
						url: "/assets/card-whey.png",
						altText: dbProduct.name,
					};

				const inStock = dbProduct.trackInventory
					? (dbProduct.inventory?.availableQuantity ?? 0) > 0 ||
						dbProduct.inventoryPolicy === "ALLOW_BACKORDER"
					: true;

				return {
					id: dbProduct.id,
					name: dbProduct.name,
					slug: dbProduct.slug,
					sku: dbProduct.sku,
					shortDescription: dbProduct.shortDescription,
					description: dbProduct.description,
					categorySlug: dbProduct.categories[0]?.category.slug ?? "supplements",
					categoryName: dbProduct.categories[0]?.category.name ?? "Supplements",
					status: dbProduct.status,
					featured: dbProduct.featured,
					pricePaise: dbProduct.pricePaise,
					compareAtPaise: dbProduct.compareAtPaise,
					priceFormatted: formatPrice(dbProduct.pricePaise),
					compareAtFormatted: dbProduct.compareAtPaise
						? formatPrice(dbProduct.compareAtPaise)
						: null,
					weightGrams: dbProduct.weightGrams,
					inStock,
					isLowStock: false,
					availableQuantity: dbProduct.inventory?.availableQuantity ?? 0,
					rating: 4.8,
					reviewCount: 100,
					primaryImage: {
						url: primaryImg.url,
						altText: primaryImg.altText,
					},
					images: dbProduct.images.map((img) => ({
						url: img.url,
						altText: img.altText,
						position: img.position,
						isPrimary: img.isPrimary,
					})),
					nutrition: null,
					metaTitle: dbProduct.metaTitle,
					metaDescription: dbProduct.metaDescription,
				};
			}
		} catch (error) {
			console.warn(
				"[CatalogService] DB query failed in getProductById, checking fallback:",
				(error as Error).message,
			);
		}

		const canonicalProd = CANONICAL_PRODUCTS.find(
			(p) => p.id === id && p.status === "ACTIVE",
		);

		return canonicalProd ? transformCanonicalToItem(canonicalProd) : null;
	}

	/**
	 * Fast autocomplete search
	 */
	async searchProducts(
		query: string,
		limit = 5,
	): Promise<
		{
			id: string;
			name: string;
			slug: string;
			pricePaise: number;
			priceFormatted: string;
			imageUrl: string;
			categoryName: string;
		}[]
	> {
		const cleanQuery = query.trim().toLowerCase();
		if (!cleanQuery) return [];

		try {
			const dbMatches = await this.db.product.findMany({
				take: limit,
				where: {
					status: "ACTIVE",
					deletedAt: null,
					OR: [
						{ name: { contains: cleanQuery, mode: "insensitive" } },
						{ shortDescription: { contains: cleanQuery, mode: "insensitive" } },
						{ slug: { contains: cleanQuery, mode: "insensitive" } },
					],
				},
				include: {
					images: { where: { isPrimary: true }, take: 1 },
					categories: { include: { category: true }, take: 1 },
				},
			});

			if (dbMatches.length > 0) {
				return dbMatches.map((p) => ({
					id: p.id,
					name: p.name,
					slug: p.slug,
					pricePaise: p.pricePaise,
					priceFormatted: formatPrice(p.pricePaise),
					imageUrl: p.images[0]?.url ?? "/assets/card-whey.png",
					categoryName: p.categories[0]?.category.name ?? "Supplements",
				}));
			}
		} catch {
			// Fallback
		}

		return CANONICAL_PRODUCTS.filter(
			(p) =>
				p.status === "ACTIVE" &&
				(p.name.toLowerCase().includes(cleanQuery) ||
					p.shortDescription.toLowerCase().includes(cleanQuery) ||
					p.categoryName.toLowerCase().includes(cleanQuery)),
		)
			.slice(0, limit)
			.map((p) => ({
				id: p.id,
				name: p.name,
				slug: p.slug,
				pricePaise: p.pricePaise,
				priceFormatted: formatPrice(p.pricePaise),
				imageUrl: p.images[0]?.url ?? "/assets/card-whey.png",
				categoryName: p.categoryName,
			}));
	}
}
