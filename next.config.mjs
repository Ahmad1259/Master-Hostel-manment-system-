/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 301 Redirects Engine for legacy paths & SEO hygiene
      {
        source: '/hostel-rooms',
        destination: '/#rooms',
        permanent: true,
      },
      {
        source: '/fees-structure',
        destination: '/#billing',
        permanent: true,
      },
      {
        source: '/student-admission',
        destination: '/#inquire',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#inquire',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
