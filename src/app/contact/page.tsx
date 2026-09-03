import { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

// Le titre et la description vivent ICI, pas dans layout.tsx : en App Router,
// les metadonnees de la page ecrasent celles du layout. Les layouts en
// declaraient aussi, et personne ne les a jamais vues.
export const metadata: Metadata = {
  title: 'Contact & accès — 4 Rue de l\'Asie, Marcinelle',
  description: 'Le dojo se trouve au 4 Rue de l\'Asie, 6001 Marcinelle. Téléphone, email et formulaire pour joindre le club. Cours le jeudi soir et le dimanche matin.',
}

const contactInfo: Array<{
  icon: typeof PhoneIcon
  title: string
  content: Array<{ label: string; href?: string }>
  href?: string
}> = [
  {
    icon: PhoneIcon,
    title: 'Téléphone',
    content: [
      { label: '0473 83 80 75', href: 'tel:+32473838075' },
      { label: '0478 95 38 05', href: 'tel:+32478953805' },
    ],
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    content: [{ label: 'contact@wa-jutsu-charleroi.be' }],
    href: 'mailto:contact@wa-jutsu-charleroi.be',
  },
  {
    icon: MapPinIcon,
    title: 'Adresse',
    content: [{ label: '4 Rue de l\'Asie' }, { label: '6001 Marcinelle' }],
    href: 'https://maps.google.com/?q=4+Rue+de+l\'Asie,+6001+Marcinelle',
  },
  {
    icon: ClockIcon,
    title: 'Horaires',
    content: [{ label: 'Jeudi 19h-23h' }, { label: 'Dimanche 9h-12h' }],
    href: '/horaires-tarifs',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-dark-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Nous contacter
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl uppercase mb-6">
            Contact
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Une question ? N'hésitez pas à nous contacter par téléphone, email
            ou via le formulaire ci-dessous.
          </p>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-heading font-bold text-2xl uppercase mb-8">
                Informations
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const cardClass =
                    'flex gap-4 p-4 bg-dark-800 border border-dark-600 hover:border-primary transition-colors group'
                  const body = (
                    <>
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold mb-1">{info.title}</h3>
                        {/*
                          Empile les lignes au lieu de compter sur `block` : la
                          regle tactile de `globals.css` pose
                          `a[href^='tel:'] { display: inline-flex }` pour garantir
                          44 px de hauteur au doigt, et un selecteur d'attribut
                          (0,1,1) l'emporte sur la classe `.block` (0,1,0). Les
                          deux numeros du club se retrouvaient donc cote a cote
                          des que la colonne etait assez large — « 0473 83 80
                          750478 95 38 05 » sur un ecran de 1600 px, et empiles
                          sur un ecran etroit, ce qui rendait le defaut
                          intermittent. `items-start` evite que les liens
                          s'etirent sur toute la largeur de la carte.
                        */}
                        <div className="flex flex-col items-start">
                          {info.content.map((line) =>
                            line.href ? (
                              <a
                                key={line.label}
                                href={line.href}
                                className="text-dark-400 text-sm hover:text-primary transition-colors"
                              >
                                {line.label}
                              </a>
                            ) : (
                              <p key={line.label} className="text-dark-400 text-sm">{line.label}</p>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )
                  return info.href ? (
                    <a key={info.title} href={info.href} className={cardClass}>
                      {body}
                    </a>
                  ) : (
                    <div key={info.title} className={cardClass}>
                      {body}
                    </div>
                  )
                })}
              </div>

              {/* Social */}
              <div className="mt-8">
                <h3 className="font-heading font-bold text-lg mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/WajutsuCharleroi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-dark-800 border border-dark-600 flex items-center justify-center text-dark-400 hover:bg-primary hover:text-on-primary hover:border-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-dark-800 border border-dark-600 p-8">
                <h2 className="font-heading font-bold text-2xl uppercase mb-6">
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Localisation"
            title="Venez nous rendre visite"
          />

          <div className="aspect-video max-w-5xl mx-auto bg-dark-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.8766!2d4.4407!3d50.4003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c226a6b5a5d5d5%3A0x0!2s4%20Rue%20de%20l&#39;Asie%2C%206001%20Marcinelle!5e0!3m2!1sfr!2sbe!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localisation du club"
            />
          </div>

          <div className="text-center mt-8">
            <a
              href="https://maps.google.com/?q=4+Rue+de+l'Asie,+6001+Marcinelle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
