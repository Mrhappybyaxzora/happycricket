/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // Cache build outputs in development
  staticPageGenerationTimeout: 120,
  // This suppresses the hydration warning in development
  experimental: {
    // This option helps with hydration warnings by making behavior more consistent
    // between client and server
    strictNextHead: true,
    // Add optimistic partial hydration
    optimisticClientCache: true,
    // Server actions configuration (update type)
    serverActions: {
      allowedOrigins: ['localhost:3000']
    },
    // Improve memory usage and performance
    memoryBasedWorkersCount: true,
    // Enable turbopack for faster dev experience
    turbo: {
      rules: {
        // Updated from loaders to rules with glob pattern
        "*.mdx": ["mdx-loader"]
      },
    }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Enable image optimization (compress and resize)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cricketchampion.co.in',
        port: '',
        pathname: '/webroot/img/teams/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  // Optional: Enable gzip compression for faster loading
  compress: true,
  // Increase performance with power by esbuild
  poweredByHeader: false,
  // Add Cache-Control headers to static assets
  headers: async () => {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=60, stale-while-revalidate=300' }
        ],
      }
    ];
  }
};

module.exports = nextConfig; 