import type { NextConfig } from "next";

const rawBasePath = process.env.BASE_PATH?.trim() ?? "";
const basePath =
  rawBasePath && rawBasePath !== "/"
    ? (rawBasePath.startsWith("/") ? rawBasePath : `/${rawBasePath}`).replace(/\/+$/, "")
    : "";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  basePath: basePath || undefined,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/:lang(ru|en)/privacy",
        destination: "/:lang/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
