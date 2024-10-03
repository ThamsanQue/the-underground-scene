import React from "react";

interface EmailTemplateProps {
  host: string;
  url: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
}

export function html({ host, url, theme = {} }: EmailTemplateProps) {
  const colors = {
    primary: theme.primaryColor || "hsl(39, 100%, 55%)",
    secondary: theme.secondaryColor || "#1a1a1a",
    accent: theme.accentColor || "#ff6b6b",
    text: "#ffffff",
    subtext: "#a0a0a0",
  };

  // We need to use a string template for the HTML to ensure it's compatible with email clients
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Access to The Underground Scene Awaits🔥🔥</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${colors.secondary}; font-family: Arial, sans-serif;">
      <table cellpadding="0" cellspacing="0" role="presentation" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="padding: 40px 20px;">
            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tr>
                <td style="text-align: center; padding: 0 0 30px;">
                  <img src="https://storage.streetcrisis.online/theundergroundscene/tus2.png" alt="${host}" style="width: 80px; height: auto; margin: 0 auto; display: block;">
                </td>
              </tr>
              <tr>
                <td style="background-color: ${colors.primary}; border-radius: 8px; padding: 40px 20px; text-align: center;">
                  <h1 style="color: ${colors.secondary}; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 20px;">Welcome to The Underground Scene!</h1>
                  <p style="color: ${colors.secondary}; font-size: 16px; line-height: 1.5; margin: 0 0 30px;">We&apos;re excited to have you as part of our community of emerging artists. Remember you are the key to your success.</p>
                  <a href="${url}" style="background-color: ${colors.secondary}; color: ${colors.primary}; font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; padding: 12px 30px; border-radius: 4px; text-decoration: none; display: inline-block;">Pull Up</a>
                </td>
              </tr>
              <tr>
                <td style="text-align: center; padding: 30px 0 0;">
                  <p style="color: ${colors.subtext}; font-size: 14px; margin: 0 0 10px;">If you didn't request this email, you can safely ignore it.</p>
                  <p style="color: ${colors.primary}; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Stay Fresh. Stay Authentic.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
