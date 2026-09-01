import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wa-Jutsu Charleroi — Club de ju-jutsu traditionnel',
    short_name: 'Wa-Jutsu',
    description: 'Club de ju-jutsu traditionnel, méthode Wa-Jutsu, à Marcinelle (Charleroi). Art martial non compétitif, self-défense efficace.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0C0B0F',
    theme_color: '#9333EA',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
