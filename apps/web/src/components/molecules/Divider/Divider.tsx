import type { ReactNode } from 'react'

const line = 'h-px w-[30.5px] shrink-0 bg-muted sm:w-auto sm:flex-1 lg:w-[55px] lg:flex-none'

export default function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center gap-4 text-sm whitespace-nowrap text-white">
      <span className={line} aria-hidden="true" />
      {children}
      <span className={line} aria-hidden="true" />
    </div>
  )
}
