"use client";

import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	Dumbbell,
	Eye,
	EyeOff,
	Heart,
	Leaf,
	Loader2,
	Lock,
	Mail,
	User,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "@/server/better-auth/client";
import { signInAction, signOutAction, signUpAction } from "../actions";

function GoogleIcon({ className }: { className?: string }) {
	return (
		<svg aria-hidden="true" className={className} viewBox="0 0 24 24">
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
				fill="#EA4335"
			/>
		</svg>
	);
}

export function LoginForm({
	initialMode = "signin",
}: {
	initialMode?: "signin" | "signup";
}) {
	const router = useRouter();
	const { data: session, isPending: isSessionLoading } =
		authClient.useSession();
	const [isPending, startTransition] = useTransition();

	const [mode, setMode] = useState<"signin" | "signup">(initialMode);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	// Forgot Password state
	const [showForgotModal, setShowForgotModal] = useState(false);
	const [forgotEmail, setForgotEmail] = useState("");
	const [isForgotLoading, setIsForgotLoading] = useState(false);
	const [forgotMessage, setForgotMessage] = useState<string | null>(null);
	const [forgotError, setForgotError] = useState<string | null>(null);

	// Senior Next.js practice: Dispatch to Server Actions powered by auth.api
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		const formData = new FormData(e.currentTarget);

		startTransition(async () => {
			if (mode === "signin") {
				const result = await signInAction(null, formData);
				if (!result.success) {
					setError(result.error ?? "Failed to sign in.");
				} else {
					setSuccessMessage("Signed in successfully! Redirecting...");
					setTimeout(() => {
						router.push("/");
						router.refresh();
					}, 700);
				}
			} else {
				const result = await signUpAction(null, formData);
				if (!result.success) {
					setError(result.error ?? "Failed to create account.");
				} else {
					setSuccessMessage("Account created successfully! Redirecting...");
					setTimeout(() => {
						router.push("/");
						router.refresh();
					}, 700);
				}
			}
		});
	};

	// Handle Google OAuth
	const handleGoogleSignIn = async () => {
		setError(null);
		setIsGoogleLoading(true);
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/",
			});
		} catch (err: unknown) {
			const message =
				err instanceof Error
					? err.message
					: "Google OAuth is not configured yet. Please sign in with email & password.";
			setError(message);
			setIsGoogleLoading(false);
		}
	};

	// Handle Forgot Password
	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setForgotError(null);
		setForgotMessage(null);

		if (!forgotEmail?.includes("@")) {
			setForgotError("Please enter a valid email address");
			return;
		}

		setIsForgotLoading(true);
		try {
			setForgotMessage(
				`If an account exists for ${forgotEmail}, password reset instructions have been sent.`,
			);
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Could not process request";
			setForgotError(message);
		} finally {
			setIsForgotLoading(false);
		}
	};

	// Already Authenticated View
	if (!isSessionLoading && session?.user) {
		return (
			<div className="w-full max-w-[460px] rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] sm:rounded-[32px] sm:p-9 md:p-10">
				<div className="flex flex-col items-start">
					<div className="relative h-10 w-28 sm:h-11 sm:w-32">
						<Image
							alt="Glow & Fit"
							className="object-contain object-left"
							fill
							priority
							sizes="128px"
							src="/assets/glow-fit-logo.png"
						/>
					</div>
					<div className="mt-1 flex flex-col font-bold text-[10px] text-gray-500 uppercase tracking-[0.22em]">
						<span>CLEAN NUTRITION</span>
						<span className="-mt-0.5">BIGGER YOU</span>
					</div>
				</div>

				<div className="mt-7 rounded-2xl bg-gray-50 p-5 text-left">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/10 font-bold text-brand-red text-lg">
							{session.user.name ? session.user.name[0]?.toUpperCase() : "U"}
						</div>
						<div className="overflow-hidden">
							<p className="truncate font-bold text-gray-950 text-sm">
								{session.user.name || "Athlete"}
							</p>
							<p className="truncate text-gray-500 text-xs">
								{session.user.email}
							</p>
						</div>
					</div>
					<p className="mt-3 font-medium text-gray-600 text-xs">
						You are currently signed in. Ready to reach your fitness goals?
					</p>
				</div>

				<div className="mt-6 flex flex-col gap-2.5">
					<Link
						className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 font-bold text-[14.5px] text-white shadow-lg shadow-red-500/25 transition-all hover:bg-brand-red-hover active:scale-[0.99]"
						href="/"
					>
						<span>Continue Shopping</span>
						<ArrowRight className="h-4 w-4" />
					</Link>
					<button
						className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-semibold text-[13.5px] text-gray-700 transition-colors hover:bg-gray-50 active:scale-[0.99]"
						onClick={async () => {
							await signOutAction();
						}}
						type="button"
					>
						Sign Out
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="relative w-full max-w-[460px] rounded-[28px] border border-black/[0.05] bg-white p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] sm:rounded-[32px] sm:p-9 md:p-10">
			{/* Top: Brand Logo + Subtitle */}
			<div className="flex flex-col items-start">
				<div className="relative h-10 w-28 sm:h-11 sm:w-32">
					<Image
						alt="Glow & Fit"
						className="object-contain object-left"
						fill
						priority
						sizes="128px"
						src="/assets/glow-fit-logo.png"
					/>
				</div>
				<div className="mt-1 flex flex-col font-bold text-[10px] text-gray-500 uppercase tracking-[0.22em]">
					<span>CLEAN NUTRITION</span>
					<span className="-mt-0.5">BIGGER YOU</span>
				</div>
			</div>

			{/* Welcome back Header */}
			<div className="mt-5 text-left">
				<h1 className="font-black text-[27px] text-gray-950 tracking-tight sm:text-[31px]">
					{mode === "signin" ? "Welcome back" : "Create account"}
				</h1>
				<p className="mt-1 font-medium text-[13px] text-gray-500 sm:text-[14px]">
					{mode === "signin"
						? "Sign in to continue your nutrition journey."
						: "Join Glow & Fit for premium clean nutrition."}
				</p>
			</div>

			{/* Error Alert */}
			{error && (
				<div className="fade-in mt-4 flex animate-in items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3 text-left text-red-800 text-xs leading-relaxed">
					<AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
					<div className="flex-1 font-medium">{error}</div>
					<button
						aria-label="Dismiss error"
						className="text-red-500 hover:text-red-800"
						onClick={() => setError(null)}
						type="button"
					>
						<X className="h-3.5 w-3.5" />
					</button>
				</div>
			)}

			{/* Success Alert */}
			{successMessage && (
				<div className="fade-in mt-4 flex animate-in items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-left font-medium text-green-800 text-xs">
					<CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
					<span>{successMessage}</span>
				</div>
			)}

			{/* Form */}
			<form className="mt-5 space-y-3.5 text-left" onSubmit={handleSubmit}>
				{/* Full Name (Sign Up only) */}
				{mode === "signup" && (
					<div>
						<label
							className="mb-1.5 block font-semibold text-[12px] text-gray-800"
							htmlFor="name"
						>
							Full name
						</label>
						<div className="relative flex items-center rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-black/5">
							<div className="pointer-events-none pl-3.5 text-gray-400">
								<User className="h-[18px] w-[18px]" />
							</div>
							<input
								autoComplete="name"
								className="w-full bg-transparent py-2.5 pr-3.5 pl-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
								id="name"
								name="name"
								onChange={(e) => setName(e.target.value)}
								placeholder="Alex Morgan"
								required
								type="text"
								value={name}
							/>
						</div>
					</div>
				)}

				{/* Email Address */}
				<div>
					<label
						className="mb-1.5 block font-semibold text-[12px] text-gray-800"
						htmlFor="email"
					>
						Email address
					</label>
					<div className="relative flex items-center rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-black/5">
						<div className="pointer-events-none pl-3.5 text-gray-400">
							<Mail className="h-[18px] w-[18px]" />
						</div>
						<input
							autoComplete="email"
							className="w-full bg-transparent py-2.5 pr-3.5 pl-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
							id="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							required
							type="email"
							value={email}
						/>
					</div>
				</div>

				{/* Password */}
				<div>
					<label
						className="mb-1.5 block font-semibold text-[12px] text-gray-800"
						htmlFor="password"
					>
						Password
					</label>
					<div className="relative flex items-center rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-black/5">
						<div className="pointer-events-none pl-3.5 text-gray-400">
							<Lock className="h-[18px] w-[18px]" />
						</div>
						<input
							autoComplete={
								mode === "signin" ? "current-password" : "new-password"
							}
							className="w-full bg-transparent py-2.5 pr-10 pl-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							required
							type={showPassword ? "text" : "password"}
							value={password}
						/>
						<button
							aria-label={showPassword ? "Hide password" : "Show password"}
							className="absolute right-3 p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none"
							onClick={() => setShowPassword((p) => !p)}
							type="button"
						>
							{showPassword ? (
								<EyeOff className="h-[18px] w-[18px]" />
							) : (
								<Eye className="h-[18px] w-[18px]" />
							)}
						</button>
					</div>
				</div>

				{/* Confirm Password (Sign Up only) */}
				{mode === "signup" && (
					<div>
						<label
							className="mb-1.5 block font-semibold text-[12px] text-gray-800"
							htmlFor="confirmPassword"
						>
							Confirm password
						</label>
						<div className="relative flex items-center rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-black/5">
							<div className="pointer-events-none pl-3.5 text-gray-400">
								<Lock className="h-[18px] w-[18px]" />
							</div>
							<input
								autoComplete="new-password"
								className="w-full bg-transparent py-2.5 pr-10 pl-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
								id="confirmPassword"
								name="confirmPassword"
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm your password"
								required
								type={showConfirmPassword ? "text" : "password"}
								value={confirmPassword}
							/>
							<button
								aria-label={
									showConfirmPassword ? "Hide password" : "Show password"
								}
								className="absolute right-3 p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none"
								onClick={() => setShowConfirmPassword((p) => !p)}
								type="button"
							>
								{showConfirmPassword ? (
									<EyeOff className="h-[18px] w-[18px]" />
								) : (
									<Eye className="h-[18px] w-[18px]" />
								)}
							</button>
						</div>
					</div>
				)}

				{/* Forgot password link */}
				{mode === "signin" && (
					<div className="flex justify-end pt-0.5">
						<button
							className="cursor-pointer font-semibold text-[12px] text-brand-red transition-colors hover:text-brand-red-hover hover:underline"
							onClick={() => {
								setShowForgotModal(true);
								setForgotEmail(email);
								setForgotError(null);
								setForgotMessage(null);
							}}
							type="button"
						>
							Forgot password?
						</button>
					</div>
				)}

				{/* Submit Button */}
				<button
					className="mt-3.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 font-bold text-[15px] text-white shadow-lg shadow-red-500/25 transition-all hover:bg-brand-red-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
					disabled={isPending}
					type="submit"
				>
					{isPending ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<>
							<span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
							<ArrowRight className="h-4 w-4 stroke-[2.5]" />
						</>
					)}
				</button>
			</form>

			{/* OR Divider */}
			<div className="relative my-4 flex items-center justify-center">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-gray-200 border-t" />
				</div>
				<div className="relative bg-white px-3 font-bold text-[11px] text-gray-400 uppercase tracking-wider">
					OR
				</div>
			</div>

			{/* Google OAuth Button */}
			<button
				className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-semibold text-[13.5px] text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.99] disabled:opacity-60"
				disabled={isGoogleLoading}
				onClick={handleGoogleSignIn}
				type="button"
			>
				{isGoogleLoading ? (
					<Loader2 className="h-4 w-4 animate-spin text-gray-500" />
				) : (
					<>
						<GoogleIcon className="h-4 w-4" />
						<span>Continue with Google</span>
					</>
				)}
			</button>

			{/* Switch Mode Prompt */}
			<p className="mt-4 text-center text-[13px] text-gray-600">
				{mode === "signin" ? (
					<>
						Don&apos;t have an account?{" "}
						<button
							className="cursor-pointer font-bold text-brand-red underline hover:text-brand-red-hover"
							onClick={() => {
								setMode("signup");
								setError(null);
								setSuccessMessage(null);
							}}
							type="button"
						>
							Create one
						</button>
					</>
				) : (
					<>
						Already have an account?{" "}
						<button
							className="cursor-pointer font-bold text-brand-red underline hover:text-brand-red-hover"
							onClick={() => {
								setMode("signin");
								setError(null);
								setSuccessMessage(null);
							}}
							type="button"
						>
							Sign in
						</button>
					</>
				)}
			</p>

			{/* Trust Badges Row */}
			<div className="mt-7 border-gray-100 border-t pt-5">
				<div className="grid grid-cols-3 gap-2 text-left">
					{/* Badge 1: Premium Nutrition */}
					<div className="flex items-center gap-2">
						<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red">
							<Leaf className="h-3.5 w-3.5 stroke-[2.2]" />
						</div>
						<div className="flex flex-col font-black text-[9.5px] text-gray-800 uppercase leading-[1.15] tracking-tight sm:text-[10px]">
							<span>PREMIUM</span>
							<span>NUTRITION</span>
						</div>
					</div>

					{/* Badge 2: Better Performance */}
					<div className="flex items-center gap-2">
						<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red">
							<Dumbbell className="h-3.5 w-3.5 stroke-[2.2]" />
						</div>
						<div className="flex flex-col font-black text-[9.5px] text-gray-800 uppercase leading-[1.15] tracking-tight sm:text-[10px]">
							<span>BETTER</span>
							<span>PERFORMANCE</span>
						</div>
					</div>

					{/* Badge 3: A Healthier You */}
					<div className="flex items-center gap-2">
						<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red">
							<Heart className="h-3.5 w-3.5 fill-brand-red stroke-[2.2]" />
						</div>
						<div className="flex flex-col font-black text-[9.5px] text-gray-800 uppercase leading-[1.15] tracking-tight sm:text-[10px]">
							<span>A HEALTHIER</span>
							<span>YOU</span>
						</div>
					</div>
				</div>
			</div>

			{/* Forgot Password Modal */}
			{showForgotModal && (
				<div className="fade-in fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
					<div className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-2xl">
						<div className="flex items-center justify-between">
							<h3 className="font-bold text-gray-900 text-lg">
								Reset password
							</h3>
							<button
								className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
								onClick={() => setShowForgotModal(false)}
								type="button"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<p className="mt-2 text-gray-500 text-xs leading-relaxed">
							Enter the email associated with your Glow &amp; Fit account and
							we&apos;ll send you a link to reset your password.
						</p>

						{forgotError && (
							<div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-brand-red text-xs">
								<AlertCircle className="h-4 w-4 shrink-0" />
								<span>{forgotError}</span>
							</div>
						)}

						{forgotMessage ? (
							<div className="mt-4 rounded-xl bg-green-50 p-4 text-green-800 text-xs">
								<p className="font-semibold text-green-900">Email sent</p>
								<p className="mt-1">{forgotMessage}</p>
								<button
									className="mt-4 w-full cursor-pointer rounded-xl bg-brand-red py-2.5 font-bold text-white text-xs hover:bg-brand-red-hover"
									onClick={() => setShowForgotModal(false)}
									type="button"
								>
									Done
								</button>
							</div>
						) : (
							<form className="mt-4 space-y-3" onSubmit={handleForgotPassword}>
								<div>
									<label
										className="mb-1 block font-semibold text-[11px] text-gray-700"
										htmlFor="forgot-email"
									>
										Email address
									</label>
									<input
										className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5"
										id="forgot-email"
										onChange={(e) => setForgotEmail(e.target.value)}
										placeholder="you@example.com"
										required
										type="email"
										value={forgotEmail}
									/>
								</div>
								<div className="flex gap-2 pt-2">
									<button
										className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-2.5 font-semibold text-gray-700 text-xs hover:bg-gray-50"
										onClick={() => setShowForgotModal(false)}
										type="button"
									>
										Cancel
									</button>
									<button
										className="flex-1 cursor-pointer rounded-xl bg-brand-red py-2.5 font-bold text-white text-xs shadow-md shadow-red-500/20 hover:bg-brand-red-hover disabled:opacity-60"
										disabled={isForgotLoading}
										type="submit"
									>
										{isForgotLoading ? (
											<Loader2 className="mx-auto h-4 w-4 animate-spin" />
										) : (
											"Send link"
										)}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
