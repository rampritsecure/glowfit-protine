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
			err && typeof err === "object" && "body" in err && (err as { body?: { message?: string } }).body?.message
				? (err as { body: { message: string } }).body.message
				: err instanceof Error
					? err.message
					: "Invalid email or password. Please verify your credentials.";

		return {
			success: false,
			error: message,
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
			error: parsed.error.issues[0]?.message ?? "Please resolve the highlighted errors.",
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
		};
	} catch (err: unknown) {
		const message =
			err && typeof err === "object" && "body" in err && (err as { body?: { message?: string } }).body?.message
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
