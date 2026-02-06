import { SectionHeader } from '@/components/ui/SectionHeader'
import { MapPinIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline'

export function Location() {
  return (
    <section className="py-20 lg:py-28 bg-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Nous trouver"
          title="Notre Dojo"
          description="Situé au coeur de Marcinelle, notre dojo vous accueille dans un cadre propice à l'apprentissage."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="aspect-video lg:aspect-auto lg:h-full min-h-[400px] bg-dark-600">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.8766!2d4.4407!3d50.4003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c226a6b5a5d5d5%3A0x0!2s4%20Rue%20de%20l&#39;Asie%2C%206001%20Marcinelle!5e0!3m2!1sfr!2sbe!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation du Wa-Jutsu Club l'Asie Marcinelle"
            />
          </div>

          {/* Info */}
          <div className="bg-dark-800 p-8 lg:p-10">
            <h3 className="font-heading font-bold text-2xl uppercase mb-8">Informations pratiques</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-1">Adresse</h4>
                  <p className="text-dark-400">
                    4 Rue de l'Asie<br />
                    6001 Marcinelle, Belgique
                  </p>
                  <a
                    href="https://maps.google.com/?q=4+Rue+de+l'Asie,+6001+Marcinelle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-2 inline-block"
                  >
                    Obtenir l'itinéraire
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-1">Horaires des cours</h4>
                  <div className="text-dark-400 space-y-1">
                    <p><strong className="text-white">Jeudi :</strong> 19h00-20h30 (Enfants/Ados)</p>
                    <p><strong className="text-white">Jeudi :</strong> 20h30-23h00 (Adultes)</p>
                    <p><strong className="text-white">Dimanche :</strong> 9h00-12h00 (Grades avancés)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <PhoneIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-1">Contact</h4>
                  <div className="text-dark-400 space-y-1">
                    <p>
                      <a href="tel:+32476703880" className="hover:text-primary transition-colors">
                        0476 70 38 80
                      </a>
                    </p>
                    <p>
                      <a href="tel:+32478953805" className="hover:text-primary transition-colors">
                        0478 95 38 05
                      </a>
                    </p>
                    <p>
                      <a href="mailto:contact@wa-jutsu-charleroi.be" className="hover:text-primary transition-colors">
                        contact@wa-jutsu-charleroi.be
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking info */}
            <div className="mt-8 pt-6 border-t border-dark-700">
              <p className="text-dark-400 text-sm">
                <strong className="text-white">Accès :</strong> Parking disponible à proximité.
                Le complexe dispose de vestiaires au rez-de-chaussée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
