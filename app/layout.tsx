import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import { siteData } from "@/lib/site-data";

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.siteUrl),
  title: {
    default: siteData.translations.uz.layout.defaultTitle,
    template: "%s",
  },
  description: siteData.translations.uz.layout.defaultDescription,
  applicationName: siteData.translations.uz.layout.siteName,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${golos.variable} font-sans text-ink`}>
        {children}
      </body>
    </html>
  );
}
