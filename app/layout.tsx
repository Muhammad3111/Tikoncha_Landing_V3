import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { siteData } from "@/lib/site-data";
import { MetaPixelPageView } from "@/components/common/MetaPixelPageView";

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
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
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2320283435165290');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2320283435165290&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body suppressHydrationWarning className={`${golos.variable} font-sans text-mist`}>
        <Suspense fallback={null}>
          <MetaPixelPageView />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
