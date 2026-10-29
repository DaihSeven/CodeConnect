import type { ReactNode } from 'react'

type AuthTemplateProps = {
  /** Banner shown beside (desktop) or above (tablet/mobile) the form. */
  banner: ReactNode
  /** Page-specific content, e.g. the login or sign-up form. */
  children: ReactNode
}

function BackgroundSymbol({ className }: { className: string }) {
  return (
    <img
      src="/imagens-gerais/simbolo.svg"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute opacity-15 ${className}`}
    />
  )
}

/** Shared layout for the authentication pages (login, sign-up, ...). */
export default function AuthTemplate({ banner, children }: AuthTemplateProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-10 text-white">
      <BackgroundSymbol className="-top-16 -left-24 w-72 lg:top-0 lg:left-24 lg:w-[420px]" />
      <BackgroundSymbol className="-right-20 -bottom-24 w-72 lg:right-24 lg:-bottom-10 lg:w-[420px]" />

      <div className="relative flex w-full max-w-[646px] flex-col gap-8 rounded-3xl bg-surface-raised p-4 sm:p-[82px] lg:max-w-[994px] lg:flex-row lg:items-stretch lg:gap-[69px] lg:px-[77px] lg:py-14">
        <aside className="h-[360px] shrink-0 sm:h-[415px] lg:h-auto lg:w-[407px]">
          {banner}
        </aside>
        <main className="flex flex-1 items-center">{children}</main>
      </div>
    </div>
  )
}
