import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/commerce/ProductDetailView";
import { CatalogService } from "@/server/catalog/catalog.service";
import { db } from "@/server/db";

interface ProductPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const { slug } = await params;
	const service = new CatalogService(db);
	const product = await service.getProductBySlug(slug);

	if (!product) {
		return {
			title: "Product Not Found — Glow & Fit",
			description: "The requested sports nutrition product is unavailable.",
		};
	}

	const title =
		product.metaTitle ||
		`${product.name} — High Performance Nutrition | Glow & Fit`;
	const description =
		product.metaDescription ||
		product.shortDescription ||
		"High-quality sports nutrition engineered for everyday athletes.";
	const primaryImg =
		product.primaryImage?.url ||
		product.images[0]?.url ||
		"/assets/card-whey.png";

	return {
		title,
		description,
		alternates: {
			canonical: `/products/${product.slug}`,
		},
		openGraph: {
			title,
			description,
			url: `/products/${product.slug}`,
			siteName: "Glow & Fit",
			images: [
				{
					url: primaryImg,
					width: 800,
					height: 800,
					alt: product.name,
				},
			],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [primaryImg],
		},
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { slug } = await params;
	const service = new CatalogService(db);
	const product = await service.getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	// Fetch related products from same category
	const related = await service.getProducts({
		categorySlug: product.categorySlug,
		limit: 4,
	});

	const relatedProducts = related.items
		.filter((p) => p.slug !== product.slug)
		.slice(0, 3);

	// JSON-LD Structured Data for Google Rich Snippets
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		image: product.images.map((img) => img.url),
		description: product.shortDescription || product.description,
		sku: product.sku,
		brand: {
			"@type": "Brand",
			name: "Glow & Fit",
		},
		offers: {
			"@type": "Offer",
			url: `https://glowfit.in/products/${product.slug}`,
			priceCurrency: "INR",
			price: (product.pricePaise / 100).toFixed(2),
			priceValidUntil: "2027-12-31",
			availability: product.inStock
				? "https://schema.org/InStock"
				: "https://schema.org/OutOfStock",
			itemCondition: "https://schema.org/NewCondition",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: product.rating,
			reviewCount: product.reviewCount,
			bestRating: "5",
			worstRating: "1",
		},
	};

	return (
		<>
			{/* JSON-LD Rich Snippet Script */}
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Valid JSON-LD structured schema for Google search rich snippets
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>

			{/* Main Product Interface */}
			<ProductDetailView product={product} relatedProducts={relatedProducts} />
		</>
	);
}
