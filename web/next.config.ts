import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop advertising the framework (fixes "X-Powered-By: Next.js")
  poweredByHeader: false,
  // Allow the Arena/E2B sandbox preview host during development
  allowedDevOrigins: ["*.e2b.app"],
};

export default nextConfig;
