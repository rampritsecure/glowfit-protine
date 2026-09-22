import { CategorySection } from "@/components/home/CategorySection";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { HeroSection } from "@/components/home/HeroSection";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col overflow-x-hidden bg-white selection:bg-[#E10600] selection:text-white">
			{/* Unified Header & Hero Section */}
			<div className="relative w-full overflow-hidden bg-white">
				{/* 1440px Master Container ensuring 1:1 synchronization */}
				<div className="relative mx-auto min-h-[640px] max-w-[1440px] lg:min-h-[680px]">
					<HeroBackdrop />
					<Header />
					<HeroSection />
				</div>
			</div>

			{/* Category Section */}
			<CategorySection />
		</main>
	);
}
