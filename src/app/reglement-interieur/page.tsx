import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Règlement intérieur',
  description: 'Règlement d\'ordre intérieur du Wa-Jutsu Club l\'Asie Marcinelle.',
}

export default function ReglementInterieurPage() {
  return (
    <div className="py-20 lg:py-28 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-extrabold text-4xl uppercase mb-8">
          Règlement d'ordre intérieur
        </h1>

        <div className="bg-dark-700 border border-dark-600 p-6 mb-8">
          <p className="text-dark-300">
            Toute personne qui demande son affiliation à l'association « Wa-Jutsu Club l'Asie »
            s'engage à respecter le présent règlement d'ordre intérieur.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              1. Remarques préalables
            </h2>
            <ul className="text-dark-300 space-y-4">
              <li>
                <strong className="text-white">1.1</strong> Toute personne qui demande son affiliation à l'association
                « Wa-Jutsu Club l'Asie » s'engage à respecter le présent règlement d'ordre intérieur.
              </li>
              <li>
                <strong className="text-white">1.2</strong> Toute personne représentant un enfant et qui demande l'affiliation
                de ce dernier à la présente association s'engage à respecter le règlement intérieur de celle-ci.
              </li>
              <li>
                <strong className="text-white">1.3</strong> Toutes décisions relatives à l'enseignement (passage de grade,
                structure des cours) relèvent de la seule responsabilité des professeurs titulaires.
                Les décisions relatives au domaine administratif relèvent de l'autorité du conseil d'administration.
              </li>
              <li>
                <strong className="text-white">1.4</strong> Le présent règlement d'ordre intérieur pourra être modifié
                et/ou complété que dans le cadre du conseil d'administration de l'ASBL.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              2. Dimension administrative
            </h2>
            <ul className="text-dark-300 space-y-4">
              <li>
                <strong className="text-white">2.1</strong> L'inscription est annuelle et obligatoire avant toute pratique,
                même pour les cours d'essais. La saison sportive s'étend du 1er septembre au 30 juin de l'année suivante.
              </li>
              <li>
                <strong className="text-white">2.2</strong> Les nouveaux membres adhérents disposent d'un mois d'essai gratuit
                (de quantième à quantième). Passé ce délai, le montant de l'affiliation à l'AEJT (licence-assurance annuelle)
                doit être versé. Un certificat médical d'aptitude doit être remis au plus tard au premier cours suivant
                la période d'essai.
              </li>
              <li>
                <strong className="text-white">2.3</strong> Les anciens membres adhérents doivent avoir satisfait aux
                conditions d'affiliation dès la fin du mois de septembre (au plus tard un mois après la reprise des cours).
              </li>
              <li>
                <strong className="text-white">2.4</strong> Les anciens membres adhérents CEINTURES NOIRES doivent avoir
                satisfait aux conditions d'affiliation dès la fin de la saison précédente (au plus tard fin juin).
              </li>
              <li>
                <strong className="text-white">2.5</strong> En cas de réserve à la pratique, le dossier sera transmis
                à la Commission médicale de l'AEJT qui statuera sur l'adhésion.
              </li>
              <li>
                <strong className="text-white">2.6</strong> Les cotisations sont payables anticipativement par mois,
                semestre ou à l'année. Des facilités de règlement peuvent être accordées sur demande.
              </li>
              <li>
                <strong className="text-white">2.7</strong> En cas d'absence de paiement non justifié et répété,
                un rappel écrit sera remis. Faute de règlement dans la quinzaine, l'accès aux cours pourra être refusé.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              3. Dimension humaine et comportementale
            </h2>
            <ul className="text-dark-300 space-y-4">
              <li>
                <strong className="text-white">3.1</strong> Dès l'entrée dans le Dojo, chacun veillera à ne pas troubler
                le cours qui se déroule. Le Dojo est un lieu de transformation humaine profonde. Chacun s'y comportera
                avec respect et politesse selon les principes du BUSHIDO.
              </li>
              <li>
                <strong className="text-white">3.2</strong> Tout pratiquant veillera particulièrement à la propreté
                des mains et des pieds et à l'état du kimono.
              </li>
              <li>
                <strong className="text-white">3.3</strong> Le port du T-shirt est obligatoire pour les pratiquantes
                féminines et autorisé pour tous selon le climat ou la santé.
              </li>
              <li>
                <strong className="text-white">3.4</strong> Les parents sont priés de venir déposer et rechercher leurs
                enfants à la salle de cours. L'assurance AEJT ne s'applique que dans la salle et aux horaires prévus.
              </li>
              <li>
                <strong className="text-white">3.5</strong> Les parents assistant au cours ne s'adresseront pas aux enfants
                pendant l'entraînement. Toute remarque sera faite à l'enseignant après le cours.
              </li>
              <li>
                <strong className="text-white">3.6</strong> Sera exclue de la salle toute personne dont le comportement
                fait obstacle au bon déroulement du cours ou représente un danger.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              4. Dimension philosophique
            </h2>
            <ul className="text-dark-300 space-y-4">
              <li>
                <strong className="text-white">4.1</strong> L'évolution d'un pratiquant s'évalue sur 3 plans :
                Shin (état d'esprit), Ghi (habileté technique) et Taï (vitalité physique).
                Le grade sanctionne ces trois aspects.
              </li>
              <li>
                <strong className="text-white">4.2</strong> Dans un dojo, il n'y a pas de notion d'êtres supérieurs
                ou inférieurs. Chacun est sur une Voie d'évolution. Les Maîtres disent :
                "Un seul ennemi à vaincre… Soi-même !"
              </li>
              <li>
                <strong className="text-white">4.3</strong> Les pratiquants gradés s'efforcent de partager leurs
                connaissances. Le respect du grade et de l'ancienneté est incontournable.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl uppercase mb-4 text-primary">
              5. Sanctions
            </h2>
            <p className="text-dark-300 mb-4">
              Toute personne qui par son langage ou ses attitudes dérogerait aux règles
              de la politesse et de la bienséance s'expose aux sanctions suivantes :
            </p>
            <ol className="text-dark-300 space-y-2 list-decimal list-inside">
              <li>Avertissement</li>
              <li>Blâme</li>
              <li>Exclusion temporaire</li>
              <li>Exclusion définitive</li>
            </ol>
            <p className="text-dark-400 mt-4">
              Le Conseil d'Administration, après audition de l'intéressé, prend la décision qui s'impose.
            </p>
          </section>

          {/* Signatures */}
          <section className="bg-dark-700 border border-dark-600 p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Signataires</h3>
            <div className="text-dark-300 space-y-2">
              <p><strong className="text-white">Le Président :</strong> Yen-Long Hsiao</p>
              <p><strong className="text-white">Les Représentants légaux :</strong> Fabrice Koos et Philippe Dorant</p>
              <p><strong className="text-white">Les Enseignants :</strong> Didier Nollevaux et Abdelmonaïm Magaz</p>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/docs/ROI_wajutsucharleroi.pdf" target="_blank">
            Télécharger le PDF
          </Button>
          <Button href="/inscription" variant="secondary">
            S'inscrire
          </Button>
        </div>
      </div>
    </div>
  )
}
