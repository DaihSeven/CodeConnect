type BannerProps = {
  /** Base name of the banner in /imagens-gerais, e.g. "img-1" → img-1-desktop.png */
  name: string
  className?: string
}

/** Decorative responsive banner: picks the mobile, tablet or desktop image. */
export default function Banner({ name, className = '' }: BannerProps) {
  const base = `/imagens-gerais/${name}`

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={`${base}-desktop.png`} />
      <source media="(min-width: 640px)" srcSet={`${base}-tablet.png`} />
      <img
        src={`${base}-mobile.png`}
        alt=""
        className={`size-full object-cover ${className}`}
      />
    </picture>
  )
}
