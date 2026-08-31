'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Le Wa-Jutsu', href: '/le-wa-jutsu' },
  { name: 'Le Club', href: '/le-club' },
  { name: 'Self-défense', href: '/self-defense' },
  { name: 'Horaires & Tarifs', href: '/horaires-tarifs' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Blog', href: '/blog' },
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
              <a href="tel:+32473838075" className="flex items-center gap-2 text-dark-300 hover:text-primary transition-colors">
                <PhoneIcon className="h-4 w-4" />
                <span className="hidden sm:inline">0473 83 80 75</span>
              </a>
              <a href="mailto:contact@wa-jutsu-charleroi.be" className="flex items-center gap-2 text-dark-300 hover:text-primary transition-colors">
                <EnvelopeIcon className="h-4 w-4" />
                <span className="hidden sm:inline">contact@wa-jutsu-charleroi.be</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/espace-membre"
                className="text-dark-300 hover:text-primary transition-colors font-medium"
              >
                Espace Membre
              </Link>
              <ThemeToggle className="!w-7 !h-7 !border-dark-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-dark-800/95 backdrop-blur-sm border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo-sceau-96.png"
                alt=""
                width={96}
                height={96}
                priority
                className="w-12 h-12 rounded-full"
              />
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-lg leading-tight">WA-JUTSU</div>
                <div className="text-xs text-dark-400 uppercase tracking-wider">Charleroi</div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-heading font-medium text-sm uppercase tracking-wide text-dark-200 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/reserver" className="btn-outline text-sm whitespace-nowrap">
                Cours d&apos;essai
              </Link>
              <Link href="/inscription" className="btn-primary text-sm whitespace-nowrap">
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
                href="/reserver"
                className="block w-full btn-outline text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Réserver un cours d&apos;essai
              </Link>
              <Link
                href="/inscription"
                className="block w-full btn-primary text-center"
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
