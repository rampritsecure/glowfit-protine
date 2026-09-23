"use client";

import Image from "next/image";

export function HeroBackdrop() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute top-0 right-0 z-0 hidden h-full w-full select-none overflow-hidden lg:block"
		>
			{/* Hero Image background template shifted slightly left so right header icons sit on clean white space */}
			<div className="absolute top-0 right-6 flex h-full w-full justify-end sm:right-10 lg:right-16 xl:right-0">
				<div className="relative h-full w-full max-w-5xl xl:max-w-270 2xl:max-w-285">
					<Image
						alt="Glow & Fit Hero"
						className="top-0 object-cover object-right"
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
