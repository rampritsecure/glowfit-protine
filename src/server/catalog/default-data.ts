export interface CatalogCategory {
	id: string;
	name: string;
	slug: string;
	description: string;
	imageUrl: string;
	position: number;
	isActive: boolean;
	seoTitle?: string;
	seoDescription?: string;
}

export interface CatalogNutrition {
	protein: string;
	bcaa?: string;
	carbs: string;
	fat: string;
	calories: string;
	servings: number;
	servingSize: string;
	electrolytes?: string;
	sodium?: string;
	potassium?: string;
}

export interface CatalogProduct {
	id: string;
	name: string;
	slug: string;
	sku: string;
	shortDescription: string;
	description: string;
	categorySlug: string;
	categoryName: string;
	status: "ACTIVE" | "DRAFT" | "ARCHIVED";
	featured: boolean;
	pricePaise: number;
	compareAtPaise: number;
	costPaise: number;
	weightGrams: number;
	inventoryPolicy: "DENY" | "ALLOW_BACKORDER";
	trackInventory: boolean;
	availableQuantity: number;
	reservedQuantity: number;
	reorderLevel: number;
	rating: number;
	reviewCount: number;
	images: {
		url: string;
		altText: string;
		position: number;
		isPrimary: boolean;
	}[];
	nutrition: CatalogNutrition;
	metaTitle: string;
	metaDescription: string;
}

export const CANONICAL_CATEGORIES: CatalogCategory[] = [
	{
		id: "cat-whey",
		name: "Whey Protein",
		slug: "whey-protein",
		description:
			"Clean Protein. Real Results. Cold-microfiltered 100% isolate and concentrated whey formulations for muscle growth and fast recovery.",
		imageUrl: "/assets/art-whey.png",
		position: 1,
		isActive: true,
		seoTitle: "Whey Protein Supplements — Glow & Fit",
		seoDescription:
			"Discover 100% Whey Protein Isolate and premium protein formulations engineered for elite athletic performance.",
	},
	{
		id: "cat-rtm",
		name: "Ready-to-Mix Protein",
		slug: "ready-to-mix",
		description:
			"Protein On The Go. Anytime. Anywhere. Refreshing clear protein water infusions and instant shaker-ready formulas.",
		imageUrl: "/assets/art-rtm.png",
		position: 2,
		isActive: true,
		seoTitle: "Ready-to-Mix Protein Drinks & Water — Glow & Fit",
		seoDescription:
			"Instant ready-to-mix protein water and portable hydration packed with 20g pure isolate.",
	},
	{
		id: "cat-pb",
		name: "Peanut Butter",
		slug: "peanut-butter",
		description:
			"Good Nutrition. Great Taste. Slow-roasted peanuts infused with pure whey protein and zero added palm oil.",
		imageUrl: "/assets/art-pb.png",
		position: 3,
		isActive: true,
		seoTitle: "High Protein Peanut Butter — Glow & Fit",
		seoDescription:
			"All-natural crunchy and creamy high-protein peanut butter with 32g protein per 100g.",
	},
	{
		id: "cat-energy",
		name: "Energy & Endurance",
		slug: "energy-endurance",
		description:
			"Intra-workout hydration, electrolyte replenishment, and sustained stamina blends for demanding workouts.",
		imageUrl: "/assets/energy.png",
		position: 4,
		isActive: true,
		seoTitle: "Energy & Endurance Supplements — Glow & Fit",
		seoDescription:
			"Formulas with BCAAs, Himalayan pink salt, and clean electrolytes to power your intense training sessions.",
	},
	{
		id: "cat-wellness",
		name: "Daily Wellness",
		slug: "daily-wellness",
		description:
			"Essential vitamins, minerals, and joint health supplements designed for everyday athletic recovery.",
		imageUrl: "/assets/art-rtm.png",
		position: 5,
		isActive: true,
		seoTitle: "Daily Wellness & Recovery — Glow & Fit",
		seoDescription:
			"Support your longevity and overall performance with athlete-grade micronutrients.",
	},
];

export const CANONICAL_PRODUCTS: CatalogProduct[] = [
	{
		id: "prod-whey-isolate",
		name: "100% Whey Protein Isolate",
		slug: "100-whey-protein-isolate",
		sku: "GF-WPI-001",
		shortDescription:
			"Ultra-filtered whey protein isolate delivering 27g protein per scoop with zero added sugar.",
		description:
			"Engineered for rapid recovery and clean lean muscle growth. Glow & Fit 100% Whey Protein Isolate is cross-flow cold microfiltered to strip away excess lactose, fats, and carbs. Each scoop delivers 27g of pure, fast-absorbing protein and 6.2g of naturally occurring BCAAs.",
		categorySlug: "whey-protein",
		categoryName: "Whey Protein",
		status: "ACTIVE",
		featured: true,
		pricePaise: 329900, // ₹3,299.00
		compareAtPaise: 389900, // ₹3,899.00
		costPaise: 180000,
		weightGrams: 1000,
		inventoryPolicy: "DENY",
		trackInventory: true,
		availableQuantity: 45,
		reservedQuantity: 2,
		reorderLevel: 10,
		rating: 4.9,
		reviewCount: 428,
		images: [
			{
				url: "/assets/card-whey.png",
				altText: "100% Whey Protein Isolate Front Tub",
				position: 1,
				isPrimary: true,
			},
			{
				url: "/assets/art-whey.png",
				altText: "100% Whey Protein Isolate Athletic Display",
				position: 2,
				isPrimary: false,
			},
			{
				url: "/assets/whey-jar.png",
				altText: "100% Whey Protein Jar Close-up",
				position: 3,
				isPrimary: false,
			},
		],
		nutrition: {
			protein: "27g",
			bcaa: "6.2g",
			carbs: "1.2g",
			fat: "0.5g",
			calories: "120 kcal",
			servings: 30,
			servingSize: "33g scoop",
		},
		metaTitle: "100% Whey Protein Isolate (27g Protein) — Glow & Fit",
		metaDescription:
			"Fuel muscle synthesis with cold microfiltered Whey Protein Isolate. 27g protein, 6.2g BCAAs, lab-tested purity.",
	},
	{
		id: "prod-rtm-water",
		name: "Ready-to-Mix Protein Water Infusion",
		slug: "ready-to-mix-protein-water",
		sku: "GF-RTM-001",
		shortDescription:
			"Light, crisp, and thirst-quenching protein water packed with 20g clear whey isolate.",
		description:
			"Ditch heavy milky shakes on hot training days. Glow & Fit Ready-to-Mix Protein Water dissolves completely translucent with crisp fruit refreshment, zero chalkiness, and zero bloat. Perfect for intra-workout or post-workout hydration.",
		categorySlug: "ready-to-mix",
		categoryName: "Ready-to-Mix Protein",
		status: "ACTIVE",
		featured: true,
		pricePaise: 249900, // ₹2,499.00
		compareAtPaise: 299900, // ₹2,999.00
		costPaise: 130000,
		weightGrams: 600,
		inventoryPolicy: "DENY",
		trackInventory: true,
		availableQuantity: 28,
		reservedQuantity: 1,
		reorderLevel: 5,
		rating: 4.8,
		reviewCount: 189,
		images: [
			{
				url: "/assets/ready-to-mix-bottle.png",
				altText: "Ready-to-Mix Protein Water Bottle",
				position: 1,
				isPrimary: true,
			},
			{
				url: "/assets/card-rtm.png",
				altText: "Ready-to-Mix Protein Water Pack",
				position: 2,
				isPrimary: false,
			},
			{
				url: "/assets/art-rtm.png",
				altText: "Ready-to-Mix Protein Lifestyle Shot",
				position: 3,
				isPrimary: false,
			},
		],
		nutrition: {
			protein: "20g",
			bcaa: "4.8g",
			carbs: "0g",
			fat: "0g",
			calories: "85 kcal",
			servings: 12,
			servingSize: "50g pack",
		},
		metaTitle: "Clear Whey Ready-to-Mix Protein Water — Glow & Fit",
		metaDescription:
			"Zero carbs, zero fat, 20g clear protein water infusion. Refreshing fruit hydration for athletes.",
	},
	{
		id: "prod-peanut-butter",
		name: "All-Natural High Protein Peanut Butter",
		slug: "all-natural-high-protein-peanut-butter",
		sku: "GF-PB-001",
		shortDescription:
			"Slow-roasted premium peanuts infused with whey protein for 32g protein per 100g.",
		description:
			"Rich, decadent, and 100% natural. Made without hydrogenated oils, palm oil, or added preservatives. Slow-roasted peanuts whipped with high-grade whey protein provide clean sustained energy and healthy monounsaturated fats.",
		categorySlug: "peanut-butter",
		categoryName: "Peanut Butter",
		status: "ACTIVE",
		featured: true,
		pricePaise: 59900, // ₹599.00
		compareAtPaise: 74900, // ₹749.00
		costPaise: 28000,
		weightGrams: 1000,
		inventoryPolicy: "DENY",
		trackInventory: true,
		availableQuantity: 72,
		reservedQuantity: 4,
		reorderLevel: 15,
		rating: 4.8,
		reviewCount: 312,
		images: [
			{
				url: "/assets/peanut-butter.png",
				altText: "All-Natural High Protein Peanut Butter Jar",
				position: 1,
				isPrimary: true,
			},
			{
				url: "/assets/card-pb.png",
				altText: "High Protein Peanut Butter Card",
				position: 2,
				isPrimary: false,
			},
			{
				url: "/assets/art-pb.png",
				altText: "Peanut Butter Product Display",
				position: 3,
				isPrimary: false,
			},
		],
		nutrition: {
			protein: "32g",
			carbs: "18g",
			fat: "48g",
			calories: "610 kcal",
			servings: 31,
			servingSize: "32g (2 tbsp)",
		},
		metaTitle: "All-Natural High Protein Peanut Butter (32g) — Glow & Fit",
		metaDescription:
			"Made with slow-roasted peanuts and pure whey protein. Zero palm oil, zero trans-fat, 100% clean fuel.",
	},
	{
		id: "prod-micellar-casein",
		name: "Micellar Casein Night Fuel",
		slug: "micellar-casein-night-fuel",
		sku: "GF-CAS-001",
		shortDescription:
			"Slow-release bedtime protein matrix ensuring sustained 8-hour muscle recovery while you sleep.",
		description:
			"Engineered specifically for nighttime recovery. Micellar casein digests slowly over 7 to 8 hours, steadily releasing branch-chain amino acids into your bloodstream to prevent muscle breakdown during deep sleep.",
		categorySlug: "whey-protein",
		categoryName: "Whey Protein",
		status: "ACTIVE",
		featured: false,
		pricePaise: 359900, // ₹3,599.00
		compareAtPaise: 419900, // ₹4,199.00
		costPaise: 200000,
		weightGrams: 1000,
		inventoryPolicy: "DENY",
		trackInventory: true,
		availableQuantity: 18,
		reservedQuantity: 0,
		reorderLevel: 5,
		rating: 4.7,
		reviewCount: 94,
		images: [
			{
				url: "/assets/whey-jar.png",
				altText: "Micellar Casein Night Fuel Tub",
				position: 1,
				isPrimary: true,
			},
			{
				url: "/assets/card-whey.png",
				altText: "Micellar Casein Packaging",
				position: 2,
				isPrimary: false,
			},
		],
		nutrition: {
			protein: "25g",
			bcaa: "5.4g",
			carbs: "2g",
			fat: "1g",
			calories: "118 kcal",
			servings: 30,
			servingSize: "33g scoop",
		},
		metaTitle: "Micellar Casein Night Fuel (8-Hour Release) — Glow & Fit",
		metaDescription:
			"Sustained 8-hour amino acid release to stop overnight muscle breakdown. Dutch cocoa flavor with zero sugar.",
	},
	{
		id: "prod-electrolyte-fuel",
		name: "Electrolyte Intra-Workout Endurance Fuel",
		slug: "electrolyte-endurance-fuel",
		sku: "GF-ENG-001",
		shortDescription:
			"Advanced isotonic electrolyte matrix with pink Himalayan salt and rapid endurance carbs.",
		description:
			"Never hit the wall mid-session. Glow & Fit Electrolyte Fuel restores critical sodium, potassium, and magnesium lost through intense sweat. Enhanced with cluster dextrin for sustained intra-workout stamina without sugar crashes.",
		categorySlug: "energy-endurance",
		categoryName: "Energy & Endurance",
		status: "ACTIVE",
		featured: false,
		pricePaise: 149900, // ₹1,499.00
		compareAtPaise: 179900, // ₹1,799.00
		costPaise: 75000,
		weightGrams: 500,
		inventoryPolicy: "DENY",
		trackInventory: true,
		availableQuantity: 35,
		reservedQuantity: 2,
		reorderLevel: 8,
		rating: 4.9,
		reviewCount: 142,
		images: [
			{
				url: "/assets/energy.png",
				altText: "Electrolyte Intra-Workout Fuel Powder",
				position: 1,
				isPrimary: true,
			},
			{
				url: "/assets/ready-to-mix-bottle.png",
				altText: "Electrolyte Fuel Shaker Bottle",
				position: 2,
				isPrimary: false,
			},
		],
		nutrition: {
			protein: "0g",
			carbs: "10g",
			fat: "0g",
			calories: "45 kcal",
			servings: 30,
			servingSize: "16g scoop",
			electrolytes: "1,200mg",
			sodium: "480mg",
			potassium: "210mg",
		},
		metaTitle: "Electrolyte Intra-Workout Endurance Fuel — Glow & Fit",
		metaDescription:
			"Isotonic intra-workout fuel with Himalayan salt, magnesium, potassium, and cluster dextrin.",
	},
];
