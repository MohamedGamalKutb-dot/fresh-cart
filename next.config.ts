import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler - only enable in production to avoid high CPU in dev mode
  reactCompiler: process.env.NODE_ENV === "production",

  // API Proxy — hides backend URL, avoids CORS, reduces overhead
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com'}/api/v1/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
    // Optimized breakpoints for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;

