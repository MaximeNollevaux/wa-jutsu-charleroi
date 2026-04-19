import { Metadata } from 'next'
import { PrintButton } from '@/components/ui/PrintButton'

export const metadata: Metadata = {
  title: 'Formulaire d\'inscription',
  description: 'Formulaire d\'inscription imprimable du Wa-Jutsu Club l\'Asie Marcinelle.',
  robots: { index: false },
}

export default function FormulaireInscriptionPage() {
  return (
    <div className="bg-white text-black min-h-screen print:bg-white">
      <style>{`
        @media print {
          header, footer, nav, .no-print,
          .synara-loader-container,
          iframe, [data-website-id] { display: none !important; visibility: hidden !important; }
          body { background: white !important; color: black !important; }
          main { padding: 0 !important; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-8 py-12 print:px-4 print:py-2">
        {/* En-tête */}
        <div className="text-center mb-8 border-b-2 border-black pb-6">
          <h1 className="text-2xl font-bold uppercase mb-2">
            Wa-Jutsu Club l'Asie - Marcinelle
          </h1>
          <p className="text-sm">ASBL N° 441444624</p>
          <p className="text-sm">4 Rue de l'Asie, 6001 Marcinelle</p>
          <h2 className="text-xl font-bold uppercase mt-4">
            Formulaire d'inscription — Saison {new Date().getFullYear()}-{new Date().getFullYear() + 1}
          </h2>
        </div>

        {/* Informations pratiquant */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-gray-400 pb-1">
            Informations du pratiquant
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Nom :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Prénom :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Date de naissance :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Sexe :</label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-gray-400 inline-block" /> Masculin
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-gray-400 inline-block" /> Féminin
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Adresse :</label>
              <div className="border-b border-gray-400 h-8" />
            </div>
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="block text-sm font-semibold mb-1">Code postal :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Localité :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Téléphone :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Email :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Représentant légal (mineurs) */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-gray-400 pb-1">
            Représentant légal (pour les mineurs)
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Nom :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Prénom :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Téléphone :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Email :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Cotisations */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-gray-400 pb-1">
            Catégorie et cotisation
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              <span>Enfants (moins de 13 ans) — <strong>10€/mois</strong></span>
            </label>
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              <span>Jeunes (13 à 18 ans) — <strong>10€/mois</strong></span>
            </label>
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              <span>Adultes (plus de 18 ans) — <strong>20€/mois</strong></span>
            </label>
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              <span>Couple (2 adultes) — <strong>30€/mois</strong></span>
            </label>
          </div>
          <p className="text-sm mt-4">
            <strong>Licence annuelle obligatoire : 60€</strong> (droit d'entrée, assurance RC, carte AEJT)
          </p>
          <p className="text-sm mt-1">
            IBAN : <strong>BE22 0012 7040 4047</strong> — Communication : Nom + "cotisation" ou "licence"
          </p>
        </section>

        {/* Documents requis */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-gray-400 pb-1">
            Documents à fournir
          </h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              Certificat médical de non contre-indication à la pratique sportive
            </label>
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              Copie de la pièce d'identité (du représentant légal pour les mineurs)
            </label>
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              Photo d'identité
            </label>
          </div>
        </section>

        {/* Engagement */}
        <section className="mb-8 border border-gray-400 p-4">
          <p className="text-sm mb-4">
            Je soussigné(e) déclare avoir pris connaissance du règlement d'ordre intérieur du
            Wa-Jutsu Club l'Asie et m'engage à le respecter. J'autorise l'utilisation de mon image
            (ou celle de mon enfant) dans le cadre des activités du club (site web, réseaux sociaux).
          </p>
          <div className="flex gap-8 mt-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Date :</label>
              <div className="border-b border-gray-400 h-8" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Signature :</label>
              <div className="border-b border-gray-400 h-16" />
            </div>
          </div>
        </section>

        {/* Bouton imprimer */}
        <div className="text-center mt-8">
          <PrintButton label="Imprimer ce formulaire" />
        </div>
      </div>
    </div>
  )
}
