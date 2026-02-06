import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données du Wa-Jutsu Club l\'Asie Marcinelle.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="py-20 lg:py-28 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-extrabold text-4xl uppercase mb-8">
          Politique de confidentialité
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Introduction
            </h2>
            <p className="text-dark-300">
              L'ASBL Wa-Jutsu Club l'Asie Marcinelle s'engage à protéger la vie privée
              de ses membres et visiteurs. Cette politique de confidentialité explique
              comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Responsable du traitement
            </h2>
            <p className="text-dark-300">
              <strong className="text-white">ASBL Wa-Jutsu Club l'Asie Marcinelle</strong><br />
              Rue des Merles, 32 – 6001 Marcinelle, Belgique<br />
              N° d'entreprise : 441444624<br />
              Contact : contact@wa-jutsu-charleroi.be
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Données collectées
            </h2>
            <p className="text-dark-300 mb-4">
              Dans le cadre de nos activités, nous collectons les données suivantes :
            </p>
            <ul className="text-dark-400 space-y-2">
              <li>• Nom, prénom, date et lieu de naissance</li>
              <li>• Adresse postale, email, numéro de téléphone</li>
              <li>• Informations relatives aux mineurs (pour les enfants pratiquants)</li>
              <li>• Contact d'urgence</li>
              <li>• Certificat médical de non contre-indication</li>
              <li>• Informations de paiement</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Finalités du traitement
            </h2>
            <p className="text-dark-300 mb-4">
              Vos données sont utilisées pour :
            </p>
            <ul className="text-dark-400 space-y-2">
              <li>• Gérer votre inscription et adhésion au club</li>
              <li>• Procéder à votre affiliation à l'AEJT</li>
              <li>• Souscrire l'assurance sportive obligatoire</li>
              <li>• Vous contacter concernant les activités du club</li>
              <li>• Gérer les cotisations et paiements</li>
              <li>• Assurer votre sécurité (contact d'urgence)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Base légale
            </h2>
            <p className="text-dark-300">
              Le traitement de vos données repose sur votre consentement explicite
              (formulaire d'inscription) et sur l'exécution du contrat d'adhésion
              (gestion de votre membership).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Destinataires des données
            </h2>
            <p className="text-dark-300 mb-4">
              Vos données peuvent être transmises à :
            </p>
            <ul className="text-dark-400 space-y-2">
              <li>• L'Académie Européenne de Ju-Jutsu Traditionnel (AEJT) pour votre affiliation</li>
              <li>• Notre assureur pour la couverture sportive</li>
              <li>• La Commission médicale de l'AEJT (en cas de réserve médicale)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Durée de conservation
            </h2>
            <p className="text-dark-300">
              Vos données sont conservées pendant toute la durée de votre adhésion
              et pendant une période de 3 ans après votre départ du club, sauf
              obligation légale de conservation plus longue.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Vos droits
            </h2>
            <p className="text-dark-300 mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="text-dark-400 space-y-2">
              <li>• <strong className="text-white">Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li>• <strong className="text-white">Droit de rectification :</strong> corriger vos données inexactes</li>
              <li>• <strong className="text-white">Droit d'effacement :</strong> demander la suppression de vos données</li>
              <li>• <strong className="text-white">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li>• <strong className="text-white">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li>• <strong className="text-white">Droit de limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="text-dark-300 mt-4">
              Pour exercer ces droits, contactez le président de l'association à l'adresse
              contact@wa-jutsu-charleroi.be.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Sécurité des données
            </h2>
            <p className="text-dark-300">
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non autorisé,
              modification, divulgation ou destruction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Cookies
            </h2>
            <p className="text-dark-300">
              Ce site utilise des cookies techniques nécessaires à son fonctionnement.
              Aucun cookie de tracking ou publicitaire n'est utilisé.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              Réclamation
            </h2>
            <p className="text-dark-300">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez
              introduire une réclamation auprès de l'Autorité de protection des
              données (APD) : <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.autoriteprotectiondonnees.be</a>
            </p>
          </section>
        </div>

        <p className="text-dark-500 text-sm mt-12">
          Dernière mise à jour : Février 2024
        </p>
      </div>
    </div>
  )
}
