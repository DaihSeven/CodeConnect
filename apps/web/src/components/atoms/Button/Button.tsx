import type { ButtonHTMLAttributes } from 'react'

export default function Button({
  type = 'button',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`flex h-[51px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-brand font-semibold text-on-brand transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  )
}
