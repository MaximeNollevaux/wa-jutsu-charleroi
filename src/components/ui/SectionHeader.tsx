interface SectionHeaderProps {
  subtitle?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

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
        <p className={`section-subtitle mb-2 ${light ? 'text-primary-400' : 'text-primary'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`section-title ${light ? 'text-dark-800' : 'text-white'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg max-w-3xl ${centered ? 'mx-auto' : ''} ${light ? 'text-dark-600' : 'text-dark-400'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
