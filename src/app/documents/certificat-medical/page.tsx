import { Metadata } from 'next'
import { PrintButton } from '@/components/ui/PrintButton'

export const metadata: Metadata = {
  title: 'Certificat médical de non contre-indication',
  description: 'Certificat de non contre-indication médicale à faire remplir par votre médecin pour la pratique du Wa-Jutsu.',
  robots: { index: false },
}

export default function CertificatMedicalPage() {
  return (
    <div className="bg-white text-black min-h-screen print:bg-white">
      <style>{`
        @media print {
          header, footer, nav, .no-print,
          .synara-loader-container,
          #synara-consent-manage, #synara-consent-panel,
          iframe, [data-website-id] { display: none !important; visibility: hidden !important; }
          body { background: white !important; color: black !important; }
          main { padding: 0 !important; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-8 py-12 print:px-4 print:py-2">
        {/* En-tête club */}
        <div className="flex items-center justify-between gap-6 mb-6 print:mb-3 border-b-2 border-black pb-4 print:pb-2">
          <img
            src="/images/logo-club-asie.png"
            alt="Wa-Jutsu Club l'Asie - Marcinelle"
            className="w-40 print:w-32 h-auto"
          />
          <div className="text-center text-sm print:text-xs leading-snug">
            <p className="text-xl print:text-base font-bold">Wa-Jutsu Club l'Asie - Marcinelle</p>
            <p>De Ju-Jutsu Traditionnel Méthode Wa-Jutsu</p>
            <p>Association sans but lucratif</p>
            <p className="mt-1">Rue des Merles, 32 — 6001 Marcinelle</p>
            <p>Tél. : (+32) 0473/83.80.75</p>
            <p className="mt-1">Membre de L'AEJT</p>
            <p className="italic">(Académie Européenne de Ju-Jutsu Traditionnel)</p>
          </div>
        </div>

        {/* Titre */}
        <div className="text-center mb-6 print:mb-3">
          <p className="text-base print:text-sm font-semibold">
            Ju-Jutsu Traditionnel Méthode «&nbsp;Wa-Jutsu&nbsp;»
          </p>
          <h1 className="text-xl print:text-base font-bold uppercase mt-2 print:mt-1 underline">
            Certificat de non contre-indication médicale
          </h1>
          <p className="text-sm print:text-xs italic mt-2 print:mt-1">
            À faire remplir par votre médecin référent pour solliciter l'inscription
            dans un club reconnu par l'A.E.J.T.
          </p>
        </div>

        {/* Adresse au médecin */}
        <section className="mb-6 print:mb-3 text-sm print:text-xs space-y-2 print:space-y-1 text-justify">
          <p className="font-semibold">Docteur,</p>
          <p>
            Vous suivez régulièrement votre patient et vous le connaissez dans sa globalité.
            Vous êtes en conséquence le mieux placé pour déterminer, s'il existe pour lui des
            incompatibilités ou des réserves dans ses aptitudes à la pratique sportive.
          </p>
          <p>
            Nous vous demandons de remplir ce certificat médical qui lui est demandé, dans le
            cadre de la pratique du Ju-Jitsu traditionnel, méthode «&nbsp;Wa-Jutsu&nbsp;»
            (Art martial non compétitif à but non violent).
          </p>
        </section>

        {/* Identité du patient */}
        <section className="mb-6 print:mb-3">
          <div className="space-y-4 print:space-y-2">
            <div className="flex gap-4">
              <div className="flex-[2]">
                <label className="block text-sm print:text-xs font-semibold mb-1">Nom :</label>
                <div className="border-b border-gray-400 h-8 print:h-6" />
              </div>
              <div className="flex-[2]">
                <label className="block text-sm print:text-xs font-semibold mb-1">Prénom :</label>
                <div className="border-b border-gray-400 h-8 print:h-6" />
              </div>
              <div className="flex-[2]">
                <label className="block text-sm print:text-xs font-semibold mb-1">Né(e) le :</label>
                <div className="border-b border-gray-400 h-8 print:h-6" />
              </div>
            </div>
            <div>
              <label className="block text-sm print:text-xs font-semibold mb-1">Adresse :</label>
              <div className="border-b border-gray-400 h-8 print:h-6" />
              <div className="border-b border-gray-400 h-8 print:h-6 mt-4 print:mt-2" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm print:text-xs font-semibold mb-1">Tél. :</label>
                <div className="border-b border-gray-400 h-8 print:h-6" />
              </div>
              <div className="flex-1">
                <label className="block text-sm print:text-xs font-semibold mb-1">GSM :</label>
                <div className="border-b border-gray-400 h-8 print:h-6" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-[2]">
                <label className="block text-sm print:text-xs font-semibold mb-1">Club :</label>
                <div className="border-b border-gray-400 h-8 print:h-6" />
              </div>
              <div className="flex-1">
                <label className="block text-sm print:text-xs font-semibold mb-1">Stade des valeurs :</label>
                <div className="border-b border-gray-400 h-8 print:h-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion du médecin */}
        <section className="mb-6 print:mb-3 border border-gray-400 p-6 print:p-3">
          <div className="space-y-4 print:space-y-2">
            <div className="flex items-start gap-4">
              <p className="flex-1 text-sm print:text-xs font-bold uppercase">
                Activité sportive non contre indiquée
              </p>
              <span className="w-5 h-5 print:w-4 print:h-4 border border-gray-400 inline-block flex-shrink-0" />
            </div>
            <div className="flex items-start gap-4">
              <p className="flex-1 text-sm print:text-xs">
                Activité sportive non contre indiquée, mais avec des réserves médicales
                à la pratique d'un sport.
              </p>
              <span className="w-5 h-5 print:w-4 print:h-4 border border-gray-400 inline-block flex-shrink-0" />
            </div>
            <div className="flex items-start gap-4">
              <p className="flex-1 text-sm print:text-xs">
                Je vous signale, avec l'accord de mon patient, la présence d'un traitement
                au long cours et/ou le patient est porteur d'une maladie chronique.
              </p>
              <span className="w-5 h-5 print:w-4 print:h-4 border border-gray-400 inline-block flex-shrink-0" />
            </div>
            <div className="flex items-start gap-4">
              <p className="flex-1 text-sm print:text-xs font-bold uppercase">
                Activité sportive contre indiquée
              </p>
              <span className="w-5 h-5 print:w-4 print:h-4 border border-gray-400 inline-block flex-shrink-0" />
            </div>
          </div>
        </section>

        {/* Mention obligatoire */}
        <p className="text-sm print:text-xs font-semibold text-center mb-6 print:mb-3">
          Ce certificat doit être remis à votre club, obligatoirement avant la première
          séance de pratique (hors séance d'essai).
        </p>

        {/* Signature */}
        <section className="mb-8 print:mb-2">
          <div className="flex gap-8 items-start">
            <div className="flex-1">
              <label className="block text-sm print:text-xs font-semibold mb-1">
                Date obligatoire d'établissement du certificat :
              </label>
              <div className="flex items-end gap-2">
                <span className="text-sm print:text-xs">Le</span>
                <div className="flex-1 border-b border-gray-400 h-8 print:h-6" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm print:text-xs font-semibold mb-1">
                Nom, cachet et signature du médecin :
              </label>
              <div className="border border-gray-400 h-32 print:h-24" />
            </div>
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
