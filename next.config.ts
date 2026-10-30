import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const config: NextConfig = {
  // Preserve the repository's existing operational contract when starting the preview.
  agentRules: false,
  turbopack: { root },
  outputFileTracingRoot: root,
  poweredByHeader: false,
  images: { qualities: [60, 75], formats: ["image/avif", "image/webp"] },
  async headers() {
    // Inline scripts keep pre-rendered HTML, early theme selection and RSC hydration working.
    const development = process.env.NODE_ENV === "development";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      `connect-src 'self'${development ? " ws: wss:" : ""}`,
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'none'",
      ...(process.env.VERCEL === "1" ? ["upgrade-insecure-requests"] : []),
    ].join("; ");
    return [{ source: "/(.*)", headers: [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ...(!development ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
      ...(process.env.VERCEL_ENV === "preview" ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
    ] }];
  },
  async redirects() {
    return [{ source: "/", destination: "/pt", permanent: false }];
  },
};

export default config;
