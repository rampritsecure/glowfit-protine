import { Header } from "@/components/layout/Header";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-white flex flex-col overflow-x-hidden selection:bg-[#E10600] selection:text-white">
			{/* Unified Header & Hero Section */}
			<div className="relative w-full bg-white overflow-hidden">
				{/* Seamless right red panel extension for ultra-wide displays (>1440px) */}
				<div
					className="hidden 2xl:block absolute top-[210px] right-0 bottom-0 pointer-events-none z-0 bg-[#990200]"
					style={{ width: "calc(50% - 720px)" }}
				/>

				{/* 1440px Master Container ensuring 1:1 synchronization */}
				<div className="relative max-w-[1440px] mx-auto min-h-[640px] lg:min-h-[680px]">
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