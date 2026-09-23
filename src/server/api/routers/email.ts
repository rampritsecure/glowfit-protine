import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { auth } from "@/server/better-auth";
import { sendEmail, sendOrderConfirmationEmail } from "@/server/email";

export const emailRouter = createTRPCRouter({
	/**
	 * Request a new email verification link (Public / Rate-friendly)
	 */
	resendVerificationEmail: publicProcedure
		.input(
			z.object({
				email: z.string().email("Invalid email address"),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			try {
				// Call Better Auth to generate token and dispatch verification email
				await auth.api.sendVerificationEmail({
					body: {
						email: input.email,
					},
					headers: ctx.headers,
				});

				return {
					success: true,
					message: "Verification email sent. Please check your inbox.",
				};
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Could not send verification email";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message,
				});
			}
		}),

	/**
	 * Request password reset email (Public)
	 */
	requestPasswordReset: publicProcedure
		.input(
			z.object({
				email: z.string().email("Invalid email address"),
				redirectTo: z.string().optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			try {
				await auth.api.requestPasswordReset({
					body: {
						email: input.email,
						redirectTo: input.redirectTo || "/login",
					},
					headers: ctx.headers,
				});

				return {
					success: true,
					message:
						"If an account exists with this email, password reset instructions have been sent.",
				};
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Could not send password reset email";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message,
				});
			}
		}),

	/**
	 * Send test email (Protected - for authenticated users/admins to test Resend configuration)
	 */
	sendTestEmail: protectedProcedure
		.input(
			z.object({
				recipientEmail: z.string().email().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const targetEmail = input.recipientEmail || ctx.session.user.email;
			const userName = ctx.session.user.name || "Athlete";

			const result = await sendEmail({
				to: targetEmail,
				subject: "⚡ Glow & Fit Nutrition — Test Email Delivery",
				html: `
					<div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
						<h2 style="color: #e10600;">Glow & Fit Nutrition — Email System Test</h2>
						<p>Hi <strong>${userName}</strong>,</p>
						<p>Your Resend integration with Better Auth and tRPC is working perfectly! 🚀</p>
						<p style="color: #666; font-size: 12px; margin-top: 24px;">Sent via Glow & Fit tRPC email service.</p>
					</div>
				`,
				text: `Hi ${userName},\nYour Resend integration with Better Auth and tRPC is working perfectly!`,
			});

			if (!result.success) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: result.error || "Failed to send test email",
				});
			}

			return {
				success: true,
				id: result.id,
				message: `Test email sent successfully to ${targetEmail}`,
			};
		}),

	/**
	 * Send Order Confirmation Email (Protected - triggered upon order placement)
	 */
	sendOrderConfirmation: protectedProcedure
		.input(
			z.object({
				orderId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const order = await ctx.db.order.findUnique({
				where: { id: input.orderId },
				include: {
					items: true,
					user: true,
				},
			});

			if (!order) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Order not found",
				});
			}

			const targetEmail = order.customerEmail || order.user?.email;
			if (!targetEmail) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "No recipient email found for this order",
				});
			}

			const formattedTotal = `₹${(order.totalPaise / 100).toFixed(2)}`;
			const items = order.items.map((item) => ({
				name: item.productName,
				quantity: item.quantity,
				price: `₹${(item.totalPaise / 100).toFixed(2)}`,
			}));

			const result = await sendOrderConfirmationEmail({
				email: targetEmail,
				name: order.user?.name || "Athlete",
				orderId: order.orderNumber,
				totalAmount: formattedTotal,
				items,
			});

			if (!result.success) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: result.error || "Failed to send order confirmation email",
				});
			}

			return {
				success: true,
				message: "Order confirmation email sent successfully",
			};
		}),
});
