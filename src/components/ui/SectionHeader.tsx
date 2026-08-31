interface SectionHeaderProps {
  subtitle?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

/**
 * L'en-tete de section, commun a toutes les pages.
 *
 * Le filet sous le sur-titre vient de la : un site de club d'arts martiaux
 * japonais ne disait rien du Japon ni du dojo — la direction visuelle etait
 * celle de n'importe quel club de sport. Un trait court, epais d'un pixel et
 * qui s'estompe vers la droite, evoque le trait d'encre sans le pastiche : pas
 * de kanji decoratif, pas de vagues, pas de branche de cerisier.
 *
 * C'est le seul endroit ou il est pose. Repete a chaque section, il devient une
 * signature ; ajoute partout, il redeviendrait de la decoration.
 */
export function SectionHeader({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <div className={centered ? 'flex flex-col items-center' : ''}>
          <p className={`section-subtitle mb-2 ${light ? 'text-primary-400' : 'text-primary'}`}>
            {subtitle}
          </p>
          <span
            aria-hidden
            className={`block h-px w-12 mb-4 ${
              light
                ? 'bg-gradient-to-r from-primary to-transparent'
                : 'bg-gradient-to-r from-primary to-transparent'
            }`}
          />
        </div>
      )}
      <h2 className={`section-title ${light ? 'text-dark-800' : 'text-white'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg max-w-3xl ${centered ? 'mx-auto' : ''} ${light ? 'text-dark-600' : 'text-dark-300'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
