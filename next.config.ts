import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/nextJS-photostudio',
  assetPrefix: '/nextJS-photostudio'
};

export default nextConfig;
