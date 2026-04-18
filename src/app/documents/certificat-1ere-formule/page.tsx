import { Metadata } from 'next'
import { PrintButton } from '@/components/ui/PrintButton'

export const metadata: Metadata = {
  title: 'Certificat médical - 1ère formule',
  description: 'Certificat médical 1ère formule pour la pratique du Wa-Jutsu.',
  robots: { index: false },
}

export default function Certificat1ereFormulePage() {
  return (
    <div className="bg-white text-black min-h-screen print:bg-white">
      <style>{`
        @media print {
          header, footer, nav, .no-print,
          iframe, [data-website-id],
          div[style*="position: fixed"], div[style*="position:fixed"],
          script { display: none !important; visibility: hidden !important; }
          body { background: white !important; color: black !important; }
          main { padding: 0 !important; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-8 py-12 print:px-4 print:py-2">
        {/* En-tête */}
        <div className="text-center mb-10 border-b-2 border-black pb-6">
          <h1 className="text-2xl font-bold uppercase mb-2">
            Certificat médical
          </h1>
          <h2 className="text-xl font-bold uppercase text-gray-700">
            1ère formule — Aptitude à la pratique sportive
          </h2>
          <p className="text-sm mt-2 italic">
            Wa-Jutsu Club l'Asie — ASBL N° 441444624
          </p>
        </div>

        {/* Médecin */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-gray-400 pb-1">
            Médecin
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Je soussigné(e), Docteur :
              </label>
              <div className="border-b border-gray-400 h-8" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Adresse du cabinet :</label>
              <div className="border-b border-gray-400 h-8" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">N° INAMI :</label>
              <div className="border-b border-gray-400 h-8" />
            </div>
          </div>
        </section>

        {/* Patient */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase mb-4 border-b border-gray-400 pb-1">
            Patient
          </h3>
          <div className="space-y-4">
            <p className="text-sm">Certifie que :</p>
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
                <label className="block text-sm font-semibold mb-1">Adresse :</label>
                <div className="border-b border-gray-400 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Attestation */}
        <section className="mb-8 border border-gray-400 p-6">
          <p className="text-sm mb-4">
            Après examen clinique effectué ce jour, <strong>ne présente pas de contre-indication
            apparente</strong> à la pratique du <strong>Ju-Jutsu Traditionnel (méthode Wa-Jutsu)</strong> :
          </p>
          <div className="space-y-3 ml-4">
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              <span>en compétition</span>
            </label>
            <label className="flex items-center gap-3">
              <span className="w-4 h-4 border border-gray-400 inline-block flex-shrink-0" />
              <span>hors compétition (loisir)</span>
            </label>
          </div>
          <p className="text-xs mt-4 italic text-gray-600">
            Ce certificat est valable pour une durée d'un an à compter de la date de l'examen.
          </p>
        </section>

        {/* Signature */}
        <section className="mb-8">
          <div className="flex gap-8">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Fait à :</label>
              <div className="border-b border-gray-400 h-8" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Le :</label>
              <div className="border-b border-gray-400 h-8" />
            </div>
          </div>
          <div className="mt-8">
            <label className="block text-sm font-semibold mb-1">
              Signature et cachet du médecin :
            </label>
            <div className="border border-gray-400 h-32" />
          </div>
        </section>

        {/* Bouton imprimer */}
        <div className="text-center mt-8">
          <PrintButton label="Imprimer ce certificat" />
        </div>
      </div>
    </div>
  )
}
