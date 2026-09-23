"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/better-auth";
import { signInSchema, signUpSchema } from "./schemas";

export type AuthActionResult = {
	success: boolean;
	error?: string;
	fieldErrors?: Record<string, string>;
	user?: unknown;
	emailNotVerified?: boolean;
	emailVerificationSent?: boolean;
};

export async function signInAction(
	_prevState: AuthActionResult | null,
	formData: FormData,
): Promise<AuthActionResult> {
	const rawData = {
		email: formData.get("email")?.toString() ?? "",
		password: formData.get("password")?.toString() ?? "",
	};

	const parsed = signInSchema.safeParse(rawData);
	if (!parsed.success) {
		const fieldErrors: Record<string, string> = {};
		for (const issue of parsed.error.issues) {
			const field = issue.path[0]?.toString();
			if (field && !fieldErrors[field]) {
				fieldErrors[field] = issue.message;
			}
		}
		return {
			success: false,
			error: parsed.error.issues[0]?.message ?? "Invalid credentials",
			fieldErrors,
		};
	}

	try {
		const response = await auth.api.signInEmail({
			body: {
				email: parsed.data.email,
				password: parsed.data.password,
			},
			headers: await headers(),
		});

		revalidatePath("/", "layout");
		return {
			success: true,
			user: response.user,
		};
	} catch (err: unknown) {
		const message =
			err &&
			typeof err === "object" &&
			"body" in err &&
			(err as { body?: { message?: string } }).body?.message
				? (err as { body: { message: string } }).body.message
				: err instanceof Error
					? err.message
					: "Invalid email or password. Please verify your credentials.";

		const isEmailNotVerified =
			message.toLowerCase().includes("email not verified") ||
			message.toLowerCase().includes("verify your email") ||
			(typeof err === "object" &&
				err !== null &&
				"code" in err &&
				(err as { code?: string }).code === "EMAIL_NOT_VERIFIED");

		return {
			success: false,
			error: isEmailNotVerified
				? "Your email is not verified yet. We have sent a verification link to your email."
				: message,
			emailNotVerified: Boolean(isEmailNotVerified),
		};
	}
}

export async function signUpAction(
	_prevState: AuthActionResult | null,
	formData: FormData,
): Promise<AuthActionResult> {
	const rawData = {
		name: formData.get("name")?.toString() ?? "",
		email: formData.get("email")?.toString() ?? "",
		password: formData.get("password")?.toString() ?? "",
		confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
	};

	const parsed = signUpSchema.safeParse(rawData);
	if (!parsed.success) {
		const fieldErrors: Record<string, string> = {};
		for (const issue of parsed.error.issues) {
			const field = issue.path[0]?.toString();
			if (field && !fieldErrors[field]) {
				fieldErrors[field] = issue.message;
			}
		}
		return {
			success: false,
			error:
				parsed.error.issues[0]?.message ??
				"Please resolve the highlighted errors.",
			fieldErrors,
		};
	}

	try {
		const response = await auth.api.signUpEmail({
			body: {
				name: parsed.data.name,
				email: parsed.data.email,
				password: parsed.data.password,
			},
			headers: await headers(),
		});

		revalidatePath("/", "layout");
		return {
			success: true,
			user: response.user,
			emailVerificationSent: true,
		};
	} catch (err: unknown) {
		const message =
			err &&
			typeof err === "object" &&
			"body" in err &&
			(err as { body?: { message?: string } }).body?.message
				? (err as { body: { message: string } }).body.message
				: err instanceof Error
					? err.message
					: "Failed to create account. User may already exist.";

		return {
			success: false,
			error: message,
		};
	}
}

export async function requestPasswordResetAction(
	email: string,
): Promise<{ success: boolean; error?: string; message?: string }> {
	try {
		await auth.api.requestPasswordReset({
			body: {
				email,
				redirectTo: "/login",
			},
			headers: await headers(),
		});
		return {
			success: true,
			message:
				"If an account exists for this email, password reset instructions have been sent.",
		};
	} catch (err: unknown) {
		const message =
			err instanceof Error ? err.message : "Failed to request password reset.";
		return {
			success: false,
			error: message,
		};
	}
}

export async function resendVerificationEmailAction(
	email: string,
): Promise<{ success: boolean; error?: string; message?: string }> {
	try {
		await auth.api.sendVerificationEmail({
			body: {
				email,
			},
			headers: await headers(),
		});
		return {
			success: true,
			message: "Verification email sent. Please check your inbox.",
		};
	} catch (err: unknown) {
		const message =
			err instanceof Error
				? err.message
				: "Failed to resend verification email.";
		return {
			success: false,
			error: message,
		};
	}
}

export async function signOutAction(): Promise<void> {
	try {
		await auth.api.signOut({
			headers: await headers(),
		});
	} catch (err) {
		console.error("Sign out error:", err);
	}
	revalidatePath("/", "layout");
	redirect("/login");
}

export async function getSession() {
	try {
		return await auth.api.getSession({
			headers: await headers(),
		});
	} catch {
		return null;
	}
}
