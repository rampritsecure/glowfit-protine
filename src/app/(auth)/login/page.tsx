import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/better-auth";
import { LoginForm } from "../_components/LoginForm";

export const metadata: Metadata = {
	title: "Sign In",
	description:
		"Sign in to your Glow & Fit account to track your orders, manage subscriptions, and fuel your fitness goals.",
};

export default async function LoginPage() {
	// Senior Next.js practice: Server-side session verification via auth.api
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) {
		redirect("/");
	}

	return <LoginForm initialMode="signin" />;
}
