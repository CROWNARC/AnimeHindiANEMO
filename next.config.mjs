/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize for Netlify deployment
  output: 'standalone',
  images: {
    unoptimized: false, // Enable image optimization
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
    ],
  },
  // Performance optimizations
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console in production
  },
  experimental: {
    optimizeCss: true, // Optimize CSS
    scrollRestoration: true, // Restore scroll position on navigation
  }
}

export default nextConfig
