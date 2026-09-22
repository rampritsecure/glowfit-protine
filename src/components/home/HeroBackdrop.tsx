"use client";

export function HeroBackdrop() {
	return (
		<div
			className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 1440 650"
				preserveAspectRatio="none"
				className="w-full h-full"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					{/* Vibrant Primary Athletic Red Gradient */}
					<linearGradient id="glowRedMain" x1="30%" y1="0%" x2="85%" y2="100%">
						<stop offset="0%" stopColor="#E60600" />
						<stop offset="50%" stopColor="#D90500" />
						<stop offset="100%" stopColor="#C20400" />
					</linearGradient>

					{/* Right Column 3D Facet Gradient (Adds realistic depth & energy) */}
					<linearGradient id="glowRedFacet" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#B80400" />
						<stop offset="100%" stopColor="#990200" />
					</linearGradient>

					{/* Front Bevel Highlight */}
					<linearGradient id="glowRedHighlight" x1="0%" y1="30%" x2="100%" y2="70%">
						<stop offset="0%" stopColor="#EF140A" />
						<stop offset="100%" stopColor="#D90500" />
					</linearGradient>
				</defs>

				{/* 1. Main Athletic Red Body */}
				{/* Starts at x=820 (56.9%), perfectly behind search bar, runs to 1290 on top edge */}
				<polygon
					points="820,0 1440,0 1440,650 1140,650 780,510 420,565 670,350 800,215 900,165 740,95 820,0"
					fill="url(#glowRedMain)"
				/>

				{/* 2. Lower Left Dynamic Spear Highlight */}
				<polygon
					points="420,565 670,350 820,440 780,510"
					fill="url(#glowRedHighlight)"
				/>

				{/* 3. Right Feature Column Darker 3D Facet */}
				<polygon
					points="1240,160 1440,210 1440,650 1210,650 1245,400"
					fill="url(#glowRedFacet)"
				/>

				{/* 4. Top White Lightning Notch (cuts into red between boxes) */}
				<polygon
					points="740,95 900,165 800,215"
					fill="#FFFFFF"
				/>

				{/* 5. Center White Lightning Shard (behind 10-pack packaging lid) */}
				<polygon
					points="900,140 940,90 910,210 970,170 920,330 890,260"
					fill="#FFFFFF"
				/>

				{/* 6. Sharp Lightning Accent behind 6-pack box */}
				<polygon
					points="670,350 720,290 690,380"
					fill="#FFFFFF"
				/>

				{/* 7. Top-Right White Angular Shard */}
				{/* Houses Cart button in Header + "NUTRITION FOR A STRONGER INDIA" in Hero */}
				<polygon
					points="1290,0 1440,0 1440,210 1240,160"
					fill="#FFFFFF"
				/>
			</svg>
		</div>
	);
}
