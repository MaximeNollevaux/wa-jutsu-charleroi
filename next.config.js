/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: false,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
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
  // Redirections des anciennes URLs PHP vers les nouvelles pages
  async redirects() {
    return [
      // Pages principales
      {
        source: '/acces.php',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/methodewajutsu.php',
        destination: '/la-methode-wa-jutsu',
        permanent: true,
      },
      {
        source: '/horairetarifs.php',
        destination: '/horaires-tarifs',
        permanent: true,
      },
      {
        source: '/contact.php',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/progressiontechnique.php',
        destination: '/la-methode-wa-jutsu',
        permanent: true,
      },
      {
        source: '/bushido.php',
        destination: '/la-methode-wa-jutsu',
        permanent: true,
      },
      {
        source: '/equipement.php',
        destination: '/inscription',
        permanent: true,
      },
      {
        source: '/biendebuter.php',
        destination: '/inscription',
        permanent: true,
      },
      {
        source: '/videos.php',
        destination: '/galerie',
        permanent: true,
      },
      {
        source: '/kagamibiraki.php',
        destination: '/le-club',
        permanent: true,
      },
      {
        source: '/calendrier.php',
        destination: '/horaires-tarifs',
        permanent: true,
      },
      {
        source: '/faq.php',
        destination: '/horaires-tarifs',
        permanent: true,
      },
      {
        source: '/presses.php',
        destination: '/le-club',
        permanent: true,
      },
      {
        source: '/plandusite.php',
        destination: '/',
        permanent: true,
      },
      // « Wa-Jutsu » ne s'ecrit plus jamais seul : la page pilier est devenue
      // /la-methode-wa-jutsu (2026-11-03). L'ancienne adresse garde son referencement.
      {
        source: '/le-wa-jutsu',
        destination: '/la-methode-wa-jutsu',
        permanent: true,
      },
      // Anciennes pages de formulaire
      {
        source: '/ajax-load/:path*',
        destination: '/contact',
        permanent: true,
      },
      // Anciennes URLs de video
      {
        source: '/video/:path*',
        destination: '/galerie',
        permanent: true,
      },
      // Ancien certificat medical en 2 formules -> modele officiel unique (2026)
      {
        source: '/documents/certificat-1ere-formule',
        destination: '/documents/certificat-medical',
        permanent: true,
      },
      {
        source: '/documents/certificat-2eme-formule',
        destination: '/documents/certificat-medical',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
