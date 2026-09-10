import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.0.102',
    '192.168.0.102:3000',
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '192.168.0.*',
  ],
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: '/gallery',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
