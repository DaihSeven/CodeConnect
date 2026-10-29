import type { InputHTMLAttributes } from 'react'

export default function Checkbox({
  className = '',
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <span className={`relative inline-flex size-6 shrink-0 ${className}`}>
      <input
        type="checkbox"
        className="peer size-full cursor-pointer appearance-none rounded-md border-2 border-muted bg-surface-raised checked:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        {...props}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden size-full p-1 text-brand peer-checked:block"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  )
}
