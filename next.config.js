/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  assetPrefix: isProd ? '/BlockExplorer/' : '',
  images: {
    unoptimized: true,
  },

  /*
    async headers() {
      return [
        {
          // matching all API routes
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
      ];
    },
     */
});

module.exports = nextConfig;
