import type { ButtonHTMLAttributes } from 'react'

type SocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string
  children: string
}

export default function SocialButton({
  icon,
  children,
  type = 'button',
  className = '',
  ...props
}: SocialButtonProps) {
  return (
    <button
      type={type}
      className={`flex cursor-pointer flex-col items-center gap-1 text-xs text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${className}`}
      {...props}
    >
      <img src={icon} alt="" width={32} height={32} className="size-8" />
      {children}
    </button>
  )
}
