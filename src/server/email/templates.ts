/**
 * Glow & Fit Brand Email Templates
 * Responsive, bulletproof HTML email templates matching Glow & Fit visual identity.
 */

interface BaseEmailOptions {
	name?: string;
	title: string;
	previewText: string;
	contentHtml: string;
}

function baseEmailLayout({
	title,
	previewText,
	contentHtml,
}: BaseEmailOptions): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f7f7f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 580px;
      margin: 32px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      border: 1px solid #eaeaea;
    }
    .header {
      background: #0b0b0d;
      padding: 28px 32px;
      text-align: center;
      border-bottom: 3px solid #e10600;
    }
    .logo-text {
      color: #ffffff;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      font-style: italic;
      margin: 0;
    }
    .logo-red {
      color: #e10600;
    }
    .tagline {
      color: #888888;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .body-content {
      padding: 36px 32px;
      font-size: 15px;
      line-height: 1.6;
      color: #333333;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #e10600;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 32px;
      font-size: 15px;
      font-weight: 800;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(225, 6, 0, 0.3);
    }
    .fallback-url {
      background: #f4f4f5;
      padding: 12px 16px;
      border-radius: 8px;
      word-break: break-all;
      font-size: 12px;
      color: #666666;
      margin-top: 16px;
    }
    .footer {
      background: #fbfbfb;
      padding: 24px 32px;
      text-align: center;
      font-size: 12px;
      color: #888888;
      border-top: 1px solid #f0f0f0;
    }
    .footer a {
      color: #e10600;
      text-decoration: none;
    }
    .security-notice {
      margin-top: 24px;
      font-size: 12px;
      color: #71717a;
      border-top: 1px dashed #e4e4e7;
      padding-top: 16px;
    }
  </style>
</head>
<body>
  <!-- Preheader text for inbox preview -->
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0;">
    ${previewText}
  </div>

  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="logo-text">GLOW <span class="logo-red">&amp; FIT</span> ⚡</h1>
      <div class="tagline">CLEAN NUTRITION • BIGGER YOU</div>
    </div>

    <!-- Main Content -->
    <div class="body-content">
      ${contentHtml}
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0 0 8px;"><strong>Glow &amp; Fit Nutrition Pvt. Ltd.</strong></p>
      <p style="margin: 0 0 8px;">Fueling Athletes • High-Performance Clean Nutrition</p>
      <p style="margin: 0;">Questions? Contact us at <a href="mailto:support@glowfit.com">support@glowfit.com</a></p>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * 1. Email Verification Template
 */
export function renderVerificationEmailHtml({
	name = "Athlete",
	url,
}: {
	name?: string;
	url: string;
}): string {
	const content = `
    <h2 style="font-size: 22px; font-weight: 800; color: #0b0b0d; margin-top: 0; margin-bottom: 12px;">
      Verify your email address
    </h2>
    <p>Hey <strong>${name}</strong>,</p>
    <p>
      Welcome to the <strong>Glow &amp; Fit</strong> team! To activate your account, protect your order history, and ensure the highest security for your nutrition purchases, please verify your email address.
    </p>

    <div class="button-container">
      <a href="${url}" class="cta-button" target="_blank">Verify Email Address →</a>
    </div>

    <p style="margin-bottom: 4px; font-size: 13px; color: #666;">Button not working? Copy and paste this link in your browser:</p>
    <div class="fallback-url">${url}</div>

    <div class="security-notice">
      🔒 <strong>Security Notice:</strong> This verification link will expire in 24 hours. If you did not create a Glow &amp; Fit account, you can safely ignore this email.
    </div>
  `;

	return baseEmailLayout({
		title: "Verify your email - Glow & Fit",
		previewText:
			"Confirm your email to complete your Glow & Fit account registration.",
		contentHtml: content,
	});
}

/**
 * 2. Password Reset Email Template
 */
export function renderPasswordResetEmailHtml({
	name = "Athlete",
	url,
}: {
	name?: string;
	url: string;
}): string {
	const content = `
    <h2 style="font-size: 22px; font-weight: 800; color: #0b0b0d; margin-top: 0; margin-bottom: 12px;">
      Reset your Glow &amp; Fit password
    </h2>
    <p>Hey <strong>${name}</strong>,</p>
    <p>
      We received a request to reset the password for your Glow &amp; Fit account. Click the button below to choose a secure new password.
    </p>

    <div class="button-container">
      <a href="${url}" class="cta-button" target="_blank">Reset Password →</a>
    </div>

    <p style="margin-bottom: 4px; font-size: 13px; color: #666;">Or copy and paste this link into your browser:</p>
    <div class="fallback-url">${url}</div>

    <div class="security-notice">
      ⚠️ <strong>Didn't request this?</strong> If you did not request a password reset, your account is still secure — simply ignore this email. This link is single-use and expires in 1 hour.
    </div>
  `;

	return baseEmailLayout({
		title: "Reset your password - Glow & Fit",
		previewText: "Reset instructions for your Glow & Fit account.",
		contentHtml: content,
	});
}

/**
 * 3. E-commerce Order Confirmation Email (Ready for tRPC checkout procedures)
 */
export function renderOrderConfirmationEmailHtml({
	name = "Athlete",
	orderId,
	totalAmount,
	items,
}: {
	name?: string;
	orderId: string;
	totalAmount: string;
	items: Array<{ name: string; quantity: number; price: string }>;
}): string {
	const itemsHtml = items
		.map(
			(item) => `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 0; font-size: 14px;"><strong>${item.name}</strong> × ${item.quantity}</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #0b0b0d;">${item.price}</td>
      </tr>
    `,
		)
		.join("");

	const content = `
    <h2 style="font-size: 22px; font-weight: 800; color: #0b0b0d; margin-top: 0; margin-bottom: 12px;">
      Order Confirmed 📦
    </h2>
    <p>Hey <strong>${name}</strong>,</p>
    <p>
      Thank you for your order! Your clean nutrition fuel is being packed and prepared for dispatch.
    </p>

    <div style="background: #f8f8f9; border-radius: 12px; padding: 18px 20px; margin: 24px 0;">
      <p style="margin: 0 0 6px; font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Order Reference</p>
      <p style="margin: 0; font-size: 18px; font-weight: 900; color: #e10600;">#${orderId}</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      ${itemsHtml}
      <tr>
        <td style="padding: 14px 0; font-size: 16px; font-weight: 800;">Total Amount Paid</td>
        <td style="padding: 14px 0; text-align: right; font-size: 18px; font-weight: 900; color: #e10600;">${totalAmount}</td>
      </tr>
    </table>

    <div class="security-notice">
      🚚 You will receive a tracking link via email as soon as your shipment leaves our warehouse.
    </div>
  `;

	return baseEmailLayout({
		title: `Order Confirmed #${orderId} - Glow & Fit`,
		previewText: `Your Glow & Fit order #${orderId} has been confirmed. Total: ${totalAmount}.`,
		contentHtml: content,
	});
}
