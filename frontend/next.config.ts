import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dzn9bpr2h/image/upload/**',
      },
    ],
  },
  async rewrites() {
    return [
      // ProfitMill OS pages
      {
        source: '/os/:path*',
        destination: 'https://profitmill-os.vercel.app/os/:path*',
      },
      // NextAuth API routes (login, session, CSRF, callbacks)
      {
        source: '/api/auth/:path*',
        destination: 'https://profitmill-os.vercel.app/api/auth/:path*',
      },
      // Registration API
      {
        source: '/api/register',
        destination: 'https://profitmill-os.vercel.app/api/register',
      },
      // 2FA setup & verify API
      {
        source: '/api/2fa/:path*',
        destination: 'https://profitmill-os.vercel.app/api/2fa/:path*',
      },
      // Budget data API
      {
        source: '/api/budget-data',
        destination: 'https://profitmill-os.vercel.app/api/budget-data',
      },
      // Sync API (for Tasklet daily trigger)
      {
        source: '/api/sync',
        destination: 'https://profitmill-os.vercel.app/api/sync',
      },
      // Static assets from profitmill-os
      {
        source: '/main-icon.png',
        destination: 'https://profitmill-os.vercel.app/main-icon.png',
      },
    ]
  },
}

export default nextConfig
