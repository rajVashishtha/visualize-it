import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/visualize-it' : '',
  assetPrefix: isProd ? '/visualize-it/' : '',
};

export default nextConfig;
