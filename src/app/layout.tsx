import "@/styles/globals.css";

import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/lib/cart/cart-context";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "GLOW & FIT — Fuel That Wakes The Beast In You",
	description:
		"High-quality nutrition for bigger goals. Ready-to-mix whey protein, protein water, peanut butter and more — made for your everyday grind.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const barlowCondensed = Barlow_Condensed({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	variable: "--font-display",
	display: "swap",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={`${barlowCondensed.variable} ${inter.variable} scroll-smooth antialiased`}
			lang="en"
		>
			<body className="min-h-screen overflow-x-hidden bg-white font-sans text-[#111111] selection:bg-[#E10600] selection:text-white">
				<TRPCReactProvider>
					<CartProvider>
						{children}
						<CartDrawer />
					</CartProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
