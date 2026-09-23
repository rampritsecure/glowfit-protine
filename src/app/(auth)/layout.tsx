import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: {
		template: "%s | Glow & Fit Nutrition",
		default: "Account | Glow & Fit Nutrition",
	},
	description: "Authentication and member access for Glow & Fit Nutrition.",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="relative min-h-screen w-full overflow-x-hidden bg-[#fafafa]">
			{/* High-Resolution Template Background */}
			<div className="absolute inset-0 z-0">
				<Image
					alt="Glow & Fit Fuel Your Goals Background"
					className="pointer-events-none select-none object-cover object-right"
					fill
					priority
					quality={95}
					sizes="100vw"
					src="/assets/login_image.png"
				/>
				{/* Mobile & Tablet Soft Overlay to guarantee perfect text contrast on smaller screens */}
				<div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:hidden" />
			</div>

			{/* Foreground Container */}
			<div className="relative z-10 mx-auto flex min-h-screen max-w-[1536px] flex-col justify-between px-4 py-6 sm:px-8 sm:py-8 md:px-12 lg:px-16 xl:px-20">
				{/* Top Header: Back to Store */}
				<div className="w-full">
					<Link
						className="group inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/80 px-3.5 py-1.5 font-semibold text-[13px] text-gray-700 shadow-xs backdrop-blur-xs transition-all hover:border-black/15 hover:bg-white hover:text-brand-red"
						href="/"
					>
						<ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
						<span>Back to store</span>
					</Link>
				</div>

				{/* Center: The Auth Content */}
				<div className="my-auto flex w-full justify-start py-8">
					<div className="w-full max-w-[460px]">{children}</div>
				</div>

				{/* Bottom subtle copyright / links */}
				<div className="flex flex-wrap items-center justify-between gap-3 font-medium text-[11px] text-gray-400">
					<p>
						© {new Date().getFullYear()} Glow &amp; Fit Nutrition. All rights
						reserved.
					</p>
					<div className="flex items-center gap-4">
						<Link
							className="hover:text-gray-600 hover:underline"
							href="/privacy"
						>
							Privacy Policy
						</Link>
						<Link className="hover:text-gray-600 hover:underline" href="/terms">
							Terms of Service
						</Link>
						<Link
							className="hover:text-gray-600 hover:underline"
							href="/contact"
						>
							Need Help?
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
