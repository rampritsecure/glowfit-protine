import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Header } from "@/components/layout/Header";
import { CatalogService } from "@/server/catalog/catalog.service";
import { db } from "@/server/db";

interface CategoryPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: CategoryPageProps): Promise<Metadata> {
	const { slug } = await params;
	const service = new CatalogService(db);
	const data = await service.getCategoryBySlug(slug);

	if (!data) {
		return {
			title: "Category Not Found — Glow & Fit",
			description: "The requested sports nutrition category was not found.",
		};
	}

	const title =
		data.category.seoTitle ||
		`${data.category.name} Supplements & Formulations — Glow & Fit`;
	const description =
		data.category.seoDescription ||
		data.category.description ||
		"Explore premium athletic nutrition formulated for maximum performance.";

	return {
		title,
		description,
		alternates: {
			canonical: `/categories/${data.category.slug}`,
		},
		openGraph: {
			title,
			description,
			url: `/categories/${data.category.slug}`,
			siteName: "Glow & Fit",
			images: [
				{
					url: data.category.imageUrl,
					width: 800,
					height: 600,
					alt: data.category.name,
				},
			],
			type: "website",
		},
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = await params;
	const service = new CatalogService(db);
	const data = await service.getCategoryBySlug(slug);

	if (!data) {
		notFound();
	}

	const allCategories = await service.getCategories();
	const otherCategories = allCategories.filter((c) => c.slug !== slug);

	return (
		<div className="flex min-h-screen flex-col bg-[#F9F9FB]">
			{/* Top Header */}
			<div className="sticky top-0 z-30 border-gray-100 border-b bg-white shadow-xs">
				<Header />
			</div>

			<main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav aria-label="Breadcrumb" className="mb-6">
					<ol className="flex items-center gap-2 text-gray-500 text-xs">
						<li>
							<Link className="hover:text-brand-red" href="/">
								Home
							</Link>
						</li>
						<li>/</li>
						<li>
							<Link className="hover:text-brand-red" href="/products">
								Categories
							</Link>
						</li>
						<li>/</li>
						<li className="font-semibold text-gray-900">
							{data.category.name}
						</li>
					</ol>
				</nav>

				{/* Athletic Category Hero Banner */}
				<div className="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-r from-red-50/80 via-white to-gray-50 p-6 shadow-xs sm:p-10">
					<div className="relative z-10 max-w-2xl">
						<span className="rounded-full bg-brand-red px-3 py-1 font-bold text-[11px] text-white uppercase tracking-wider">
							Category Spotlight
						</span>
						<h1 className="mt-3 font-athletic-black text-[36px] text-brand-black uppercase leading-[0.95] tracking-tight sm:text-[48px]">
							{data.category.name}
						</h1>
						<p className="mt-3 text-gray-600 text-xs leading-relaxed sm:text-sm">
							{data.category.description}
						</p>

						<div className="mt-4 flex items-center gap-3 text-xs">
							<span className="rounded-full bg-black/5 px-3 py-1 font-bold text-gray-800">
								{data.products.length}{" "}
								{data.products.length === 1 ? "Product" : "Products"} Available
							</span>
							<span className="text-gray-400">•</span>
							<span className="font-medium text-emerald-700">
								100% Authentic &amp; NABL Tested
							</span>
						</div>
					</div>
				</div>

				{/* Products In Category Grid */}
				<div className="mt-10">
					{data.products.length === 0 ? (
						<div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 border-dashed bg-white p-12 text-center shadow-xs">
							<h3 className="font-athletic font-bold text-gray-900 text-xl uppercase">
								No Products Currently In This Category
							</h3>
							<p className="mt-1 max-w-sm text-gray-500 text-xs sm:text-sm">
								Our team is preparing new formulations for this category. In the
								meantime, browse our other products.
							</p>
							<Link
								className="mt-6 rounded-xl bg-brand-red px-6 py-2.5 font-bold text-white text-xs uppercase tracking-wider shadow-sm transition-transform hover:bg-brand-red-hover active:scale-95"
								href="/products"
							>
								Explore All Products
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{data.products.map((product, idx) => (
								<ProductCard
									key={product.id}
									priority={idx < 4}
									product={product}
								/>
							))}
						</div>
					)}
				</div>

				{/* Other Categories Links Strip */}
				{otherCategories.length > 0 && (
					<div className="mt-16 border-gray-200 border-t pt-10">
						<h2 className="font-athletic-black text-[22px] text-gray-900 uppercase tracking-tight">
							EXPLORE OTHER CATEGORIES
						</h2>
						<div className="mt-4 flex flex-wrap gap-2.5">
							{otherCategories.map((c) => (
								<Link
									className="rounded-full border border-gray-200 bg-white px-4 py-2 font-bold text-gray-700 text-xs uppercase tracking-wider transition-colors hover:border-brand-red hover:text-brand-red"
									href={`/categories/${c.slug}`}
									key={c.id}
								>
									{c.name} ({c.productCount})
								</Link>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
