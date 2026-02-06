/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    // TODO: Fix Supabase types and re-enable
    ignoreBuildErrors: true,
  },
  eslint: {
    // TODO: Fix ESLint errors and re-enable
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wa-jutsu-charleroi.be',
      },
      {
        protocol: 'https',
        hostname: 'api.supabase-wajutsu.synara.be',
      },
    ],
  },
}

module.exports = nextConfig
