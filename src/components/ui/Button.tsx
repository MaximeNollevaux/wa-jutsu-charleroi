import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

interface ButtonAsButton extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never
}

interface ButtonAsLink extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-600',
  secondary: 'bg-dark-900 text-white border border-white/20 hover:bg-dark-700',
  outline: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-dark-900',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-heading font-bold uppercase tracking-wide
    transition-colors duration-300
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-800
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props
    return (
      <Link href={href} className={baseClasses} {...linkProps}>
        {children}
      </Link>
    )
  }

  return (
    <button className={baseClasses} {...(props as ButtonAsButton)}>
      {children}
    </button>
  )
}
