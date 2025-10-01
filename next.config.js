/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'operativmedia.az',
        port: '',
        pathname: '/frontend/img/**',
      },
      {
        protocol: 'https',
        hostname: 'operativmedia.az',
        port: '',
        pathname: '/frontend/img/**',
      },
    ],
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  // Enable compression
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // Optimize bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
