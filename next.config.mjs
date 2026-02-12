/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Static export for production (GitHub Pages), disabled in dev for rewrites
  ...(isDev ? {} : { output: 'export' }),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  // Proxy API calls to GauzMem backend in dev mode
  async rewrites() {
    return isDev
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:1235/api/:path*',
          },
        ]
      : [];
  },
}

export default nextConfig
