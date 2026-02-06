'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Le Wa-Jutsu', href: '/le-wa-jutsu' },
  { name: 'Le Club', href: '/le-club' },
  { name: 'Horaires & Tarifs', href: '/horaires-tarifs' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-dark-900 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+32476703880" className="flex items-center gap-2 text-dark-300 hover:text-primary transition-colors">
                <PhoneIcon className="h-4 w-4" />
                <span className="hidden sm:inline">0476 70 38 80</span>
              </a>
              <a href="mailto:contact@wa-jutsu-charleroi.be" className="flex items-center gap-2 text-dark-300 hover:text-primary transition-colors">
                <EnvelopeIcon className="h-4 w-4" />
                <span className="hidden sm:inline">contact@wa-jutsu-charleroi.be</span>
              </a>
            </div>
            <Link
              href="/espace-membre"
              className="text-dark-300 hover:text-primary transition-colors font-medium"
            >
              Espace Membre
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-dark-800/95 backdrop-blur-sm border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-xl">WJ</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-lg leading-tight">WA-JUTSU</div>
                <div className="text-xs text-dark-400 uppercase tracking-wider">Charleroi</div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-heading font-medium text-sm uppercase tracking-wide text-dark-200 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/inscription" className="btn-primary text-sm">
                S'inscrire
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-dark-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-dark-900 border-t border-dark-700">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 font-heading font-medium text-sm uppercase tracking-wide text-dark-200 hover:text-primary hover:bg-dark-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/inscription"
                className="block w-full btn-primary text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
