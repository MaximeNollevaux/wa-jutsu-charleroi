'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

const pathLabels: Record<string, string> = {
  'le-wa-jutsu': 'Le Wa-Jutsu',
  'le-club': 'Le Club',
  'horaires-tarifs': 'Horaires & Tarifs',
  'contact': 'Contact',
  'inscription': 'Inscription',
  'galerie': 'Galerie',
  'mentions-legales': 'Mentions Legales',
  'politique-confidentialite': 'Politique de Confidentialite',
  'reglement-interieur': 'Reglement Interieur',
}

export function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show on homepage or espace-membre
  if (pathname === '/' || pathname.startsWith('/espace-membre')) return null

  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Accueil', href: '/' }]

  let currentPath = ''
  segments.forEach((segment) => {
    currentPath += `/${segment}`
    const label = pathLabels[segment] || segment.replace(/-/g, ' ')
    breadcrumbs.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href: currentPath,
    })
  })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://wa-jutsu-charleroi.be${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className="bg-dark-800 border-b border-dark-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 py-3 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRightIcon className="w-4 h-4 text-dark-500" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-dark-300 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : index === 0 ? (
                  <Link
                    href={item.href}
                    className="text-dark-400 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <HomeIcon className="w-4 h-4" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="text-dark-400 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}
