import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export default function Input({
  invalid = false,
  className = '',
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`h-10 w-full rounded-md bg-input px-4 text-surface-raised placeholder:text-surface-raised/60 focus:outline-2 focus:outline-brand ${
        invalid ? 'outline-2 outline-danger' : ''
      } ${className}`}
      {...props}
    />
  )
}
