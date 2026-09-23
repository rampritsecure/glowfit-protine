import { z } from "zod";

export const signInSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.trim()
		.email("Please enter a valid email address (e.g. name@example.com)")
		.max(100, "Email must not exceed 100 characters"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters")
		.max(72, "Password must not exceed 72 characters"),
});

export const signUpBaseSchema = z.object({
	name: z
		.string({ required_error: "Full name is required" })
		.min(1, "Full name is required")
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must not exceed 50 characters")
		.regex(
			/^[a-zA-Z\s'-]+$/,
			"Name can only contain letters, spaces, hyphens, and apostrophes",
		),
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.trim()
		.email("Please enter a valid email address (e.g. name@example.com)")
		.max(100, "Email must not exceed 100 characters"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters")
		.max(72, "Password must not exceed 72 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
		.regex(/[0-9]/, "Password must contain at least one number (0-9)"),
	confirmPassword: z
		.string({ required_error: "Please confirm your password" })
		.min(1, "Please confirm your password"),
});

export const signUpSchema = signUpBaseSchema.refine(
	(data) => data.password === data.confirmPassword,
	{
		message: "Passwords do not match",
		path: ["confirmPassword"],
	},
);

export const forgotPasswordSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.trim()
		.email("Please enter a valid email address")
		.max(100, "Email must not exceed 100 characters"),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
