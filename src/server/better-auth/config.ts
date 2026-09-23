import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env";
import { db } from "@/server/db";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/server/email";

export const auth = betterAuth({
	baseURL:
		process.env.BETTER_AUTH_URL ||
		(process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: "http://localhost:3000"),
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await sendPasswordResetEmail({
				email: user.email,
				name: user.name,
				url,
			});
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await sendVerificationEmail({
				email: user.email,
				name: user.name,
				url,
			});
		},
	},
	socialProviders: {
		...(env.BETTER_AUTH_GITHUB_CLIENT_ID && env.BETTER_AUTH_GITHUB_CLIENT_SECRET
			? {
					github: {
						clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
						clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
						redirectURI: "http://localhost:3000/api/auth/callback/github",
					},
				}
			: {}),
	},
	plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
