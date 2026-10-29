import type { ReactNode } from 'react'

export default function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-sm whitespace-nowrap text-white">
      <span className="h-px flex-1 bg-muted lg:w-[55px] lg:flex-none" aria-hidden="true" />
      {children}
      <span className="h-px flex-1 bg-muted lg:w-[55px] lg:flex-none" aria-hidden="true" />
    </div>
  )
}
