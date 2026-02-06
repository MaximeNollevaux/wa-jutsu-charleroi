import Link from 'next/link'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const quickLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Le Wa-Jutsu', href: '/le-wa-jutsu' },
  { name: 'Le Club', href: '/le-club' },
  { name: 'Horaires & Tarifs', href: '/horaires-tarifs' },
  { name: 'Contact', href: '/contact' },
  { name: 'Inscription', href: '/inscription' },
]

const legalLinks = [
  { name: 'Mentions légales', href: '/mentions-legales' },
  { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
  { name: 'Règlement intérieur', href: '/reglement-interieur' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Club info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-xl">WJ</span>
              </div>
              <div>
                <div className="font-heading font-bold text-lg leading-tight">WA-JUTSU</div>
                <div className="text-xs text-dark-400 uppercase tracking-wider">Club l'Asie Marcinelle</div>
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              Club de Ju-Jutsu Traditionnel méthode Wa-Jutsu. Art martial non compétitif axé sur la transformation personnelle et la self-défense efficace.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/WajutsuCharleroi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center text-dark-400 hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center text-dark-400 hover:bg-primary hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-bold text-lg uppercase tracking-wide mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg uppercase tracking-wide mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+32476703880" className="flex items-start gap-3 text-dark-400 hover:text-primary transition-colors text-sm">
                  <PhoneIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>0476 70 38 80<br />0478 95 38 05</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@wa-jutsu-charleroi.be" className="flex items-start gap-3 text-dark-400 hover:text-primary transition-colors text-sm">
                  <EnvelopeIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>contact@wa-jutsu-charleroi.be</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=4+Rue+de+l'Asie,+6001+Marcinelle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-dark-400 hover:text-primary transition-colors text-sm"
                >
                  <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>4 Rue de l'Asie<br />6001 Marcinelle</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="font-heading font-bold text-lg uppercase tracking-wide mb-6">Essai gratuit</h3>
            <p className="text-dark-400 text-sm mb-4">
              Découvrez le Wa-Jutsu avec un mois d'essai gratuit (4 cours inclus).
            </p>
            <Link href="/inscription" className="btn-primary inline-block text-sm">
              S'inscrire maintenant
            </Link>
            <div className="mt-6 pt-6 border-t border-dark-700">
              <p className="text-dark-500 text-xs">
                Club affilié à l'AEJT<br />
                Académie Européenne de Ju-Jutsu Traditionnel
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-sm">
              &copy; {currentYear} ASBL Wa-Jutsu Club l'Asie Marcinelle. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-dark-500 hover:text-dark-300 transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
