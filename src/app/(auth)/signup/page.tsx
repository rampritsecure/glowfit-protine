import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/better-auth";
import { LoginForm } from "../_components/LoginForm";

export const metadata: Metadata = {
	title: "Create Account",
	description:
		"Join Glow & Fit to unlock clean nutrition, track your athlete progress, and earn member rewards.",
};

export default async function SignUpPage() {
	// Senior Next.js practice: Server-side session verification via auth.api
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) {
		redirect("/");
	}

	return <LoginForm initialMode="signup" />;
}
