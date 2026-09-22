"use client";

import Image from "next/image";

export function HeroBackdrop() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute top-0 right-0 z-0 hidden h-full w-full select-none overflow-hidden lg:block"
		>
			{/* Hero Image background template aligned to top-right */}
			<div className="absolute top-0 right-0 flex h-full w-full justify-end">
				<div className="relative h-full w-full max-w-[1024px] xl:max-w-[1080px] 2xl:max-w-[1140px]">
					<Image
						alt="Glow & Fit Hero"
						className="object-contain object-right-top"
						fill
						priority
						sizes="(min-width: 1536px) 1140px, (min-width: 1280px) 1080px, 1024px"
						src="/assets/hero_image.png"
					/>
				</div>
			</div>
		</div>
	);
}
