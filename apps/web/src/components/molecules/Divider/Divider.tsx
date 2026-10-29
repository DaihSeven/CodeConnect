import type { ReactNode } from 'react'

export default function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-sm text-white">
      <span className="h-px flex-1 bg-muted" aria-hidden="true" />
      {children}
      <span className="h-px flex-1 bg-muted" aria-hidden="true" />
    </div>
  )
}
