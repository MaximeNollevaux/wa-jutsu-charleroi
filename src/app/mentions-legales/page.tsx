import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Club CCAJT Wa-Jutsu Marcinelle.',
  alternates: {
    canonical: 'https://wa-jutsu-charleroi.be/mentions-legales',
  },
}

export default function MentionsLegalesPage() {
  return (
    <div className="py-20 lg:py-28 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-extrabold text-4xl uppercase mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Éditeur du site
            </h2>
            <p className="text-dark-300">
              {/*
                Les mentions legales portent la denomination TELLE QU'ELLE EST
                INSCRITE au registre (BCE 0441.444.624), pas le sigle d'usage :
                c'est elle qui identifie l'editeur en cas de litige. Le sigle
                officiel suit, puisque c'est sous ce nom que le club se presente.
              */}
              <strong className="text-white">
                Club Charleroi l’Asie de Ju-Jutsu Traditionnel Méthode Wa-Jutsu ASBL
              </strong><br />
              Sigle : CCAJT Wa-Jutsu<br />
              Siège social : Rue des Merles, 32 – 6001 Marcinelle, Belgique<br />
              N° d'entreprise : 0441.444.624<br />
              Email : contact@wa-jutsu-charleroi.be<br />
              Téléphone : 0473 83 80 75
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Responsable de publication
            </h2>
            <p className="text-dark-300">
              Dany Lacroix, Président de l'ASBL
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Hébergement
            </h2>
            <p className="text-dark-300">
              Ce site est hébergé sur des serveurs situés en Europe.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Propriété intellectuelle
            </h2>
            <p className="text-dark-300">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos) est la propriété
              exclusive de l'ASBL CCAJT Wa-Jutsu, sauf mention contraire.
              Toute reproduction, représentation, modification, publication ou adaptation de
              tout ou partie des éléments du site est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Limitation de responsabilité
            </h2>
            <p className="text-dark-300">
              L’ASBL CCAJT Wa-Jutsu s'efforce de fournir des informations
              exactes et à jour sur ce site. Toutefois, elle ne peut garantir l'exactitude,
              la complétude ou l'actualité des informations diffusées. L'utilisateur reconnaît
              utiliser ces informations sous sa responsabilité exclusive.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Liens externes
            </h2>
            <p className="text-dark-300">
              Ce site peut contenir des liens vers des sites externes. L'ASBL Wa-Jutsu Club
              l'Asie Marcinelle n'exerce aucun contrôle sur ces sites et décline toute
              responsabilité quant à leur contenu.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Droit applicable
            </h2>
            <p className="text-dark-300">
              Les présentes mentions légales sont soumises au droit belge.
              En cas de litige, les tribunaux belges seront seuls compétents.
            </p>
          </section>
        </div>

        <p className="text-dark-500 text-sm mt-12">
          Dernière mise à jour : Avril 2026
        </p>
      </div>
    </div>
  )
}
