"use client";

import Image from "next/image";

export function HeroBackdrop() {
	return (
		<div
			className="hidden lg:block absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
			aria-hidden="true"
		>
			{/* Hero Image background template aligned to top-right */}
			<div className="absolute top-0 right-0 h-full w-full flex justify-end">
				<div className="relative h-full w-full max-w-[1024px] xl:max-w-[1080px] 2xl:max-w-[1140px]">
					<Image
						src="/assets/hero_image.png"
						alt="Glow & Fit Hero"
						fill
						priority
						sizes="(min-width: 1536px) 1140px, (min-width: 1280px) 1080px, 1024px"
						className="object-contain object-right-top"
					/>
				</div>
			</div>
		</div>
	);
}

