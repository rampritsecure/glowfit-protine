"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/server/better-auth";

const signInSchema = z.object({
	email: z.string().trim().email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z
	.object({
		name: z.string().trim().min(2, "Name must be at least 2 characters"),
		email: z.string().trim().email("Please enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type AuthActionResult = {
	success: boolean;
	error?: string;
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
		return {
			success: false,
			error: parsed.error.issues[0]?.message ?? "Invalid credentials",
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
					: "Invalid email or password";

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
		return {
			success: false,
			error: parsed.error.issues[0]?.message ?? "Invalid form input",
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
