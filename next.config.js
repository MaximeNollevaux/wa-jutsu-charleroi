/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
