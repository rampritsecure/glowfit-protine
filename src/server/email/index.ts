import { Resend } from "resend";
import { env } from "@/env";
import {
	renderOrderConfirmationEmailHtml,
	renderPasswordResetEmailHtml,
	renderVerificationEmailHtml,
} from "./templates";

/**
 * Resend Client Instance
 * Only instantiated if RESEND_API_KEY is present in environment.
 */
export const resend = env.RESEND_API_KEY
	? new Resend(env.RESEND_API_KEY)
	: null;

export interface SendEmailOptions {
	to: string;
	subject: string;
	html: string;
	text?: string;
	from?: string;
}

export interface SendEmailResult {
	success: boolean;
	id?: string;
	error?: string;
}

/**
 * Generic email dispatcher with graceful developer fallback.
 * If RESEND_API_KEY is not configured, logs to stdout so local testing never blocks.
 */
export async function sendEmail({
	to,
	subject,
	html,
	text,
	from = env.EMAIL_FROM,
}: SendEmailOptions): Promise<SendEmailResult> {
	if (!resend) {
		console.log("\n=======================================================");
		console.log("📧 [RESEND DEV FALLBACK - RESEND_API_KEY NOT CONFIGURED]");
		console.log(`To: ${to}`);
		console.log(`From: ${from}`);
		console.log(`Subject: ${subject}`);
		if (text) console.log(`Text preview: ${text}`);
		console.log("Set RESEND_API_KEY in .env to send real emails.");
		console.log("=======================================================\n");
		return { success: true, id: "dev-fallback-id" };
	}

	try {
		const { data, error } = await resend.emails.send({
			from,
			to: [to],
			subject,
			html,
			text,
		});

		if (error) {
			console.error("[Resend Error]:", error);
			return { success: false, error: error.message };
		}

		return { success: true, id: data?.id };
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Unknown error sending email";
		console.error("[Resend Exception]:", message);
		return { success: false, error: message };
	}
}

/**
 * Send Brand Verification Email for Better Auth
 */
export async function sendVerificationEmail({
	email,
	name,
	url,
}: {
	email: string;
	name?: string;
	url: string;
}): Promise<SendEmailResult> {
	const html = renderVerificationEmailHtml({ name, url });
	const text = `Hey ${name || "Athlete"},\n\nPlease verify your email for Glow & Fit:\n${url}\n\nThis link expires in 24 hours.`;

	return sendEmail({
		to: email,
		subject: "Verify your email address — Glow & Fit Nutrition ⚡",
		html,
		text,
	});
}

/**
 * Send Brand Password Reset Email for Better Auth
 */
export async function sendPasswordResetEmail({
	email,
	name,
	url,
}: {
	email: string;
	name?: string;
	url: string;
}): Promise<SendEmailResult> {
	const html = renderPasswordResetEmailHtml({ name, url });
	const text = `Hey ${name || "Athlete"},\n\nReset your Glow & Fit password:\n${url}\n\nThis link is single-use and expires in 1 hour.`;

	return sendEmail({
		to: email,
		subject: "Reset your password — Glow & Fit Nutrition ⚡",
		html,
		text,
	});
}

/**
 * Send E-Commerce Order Confirmation Email (Used by tRPC checkout/order procedures)
 */
export async function sendOrderConfirmationEmail({
	email,
	name,
	orderId,
	totalAmount,
	items,
}: {
	email: string;
	name?: string;
	orderId: string;
	totalAmount: string;
	items: Array<{ name: string; quantity: number; price: string }>;
}): Promise<SendEmailResult> {
	const html = renderOrderConfirmationEmailHtml({
		name,
		orderId,
		totalAmount,
		items,
	});
	const text = `Hey ${name || "Athlete"},\n\nYour Glow & Fit order #${orderId} is confirmed! Total: ${totalAmount}.\nWe will notify you when it ships.`;

	return sendEmail({
		to: email,
		subject: `Order Confirmed #${orderId} — Glow & Fit Nutrition 📦`,
		html,
		text,
	});
}
