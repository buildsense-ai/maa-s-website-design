/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/maa-s-website-design',
  assetPrefix: '/maa-s-website-design/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
}

export default nextConfig
