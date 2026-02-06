import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(255,24,0,0.9), rgba(200,19,0,0.95)), url('/images/cta-bg.jpg')`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase mb-6">
          Prêt à commencer<br />votre transformation ?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Rejoignez-nous et découvrez le Wa-Jutsu avec un mois d'essai gratuit.
          Aucun engagement, juste la passion des arts martiaux.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/inscription" variant="outline" size="lg">
            Commencer l'essai gratuit
          </Button>
          <Button
            href="/contact"
            size="lg"
            className="bg-white text-primary hover:bg-dark-100"
          >
            Nous contacter
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <a href="tel:+32476703880" className="hover:text-white transition-colors">
              0476 70 38 80
            </a>
            <a href="mailto:contact@wa-jutsu-charleroi.be" className="hover:text-white transition-colors">
              contact@wa-jutsu-charleroi.be
            </a>
            <span>4 Rue de l'Asie, 6001 Marcinelle</span>
          </div>
        </div>
      </div>
    </section>
  )
}
