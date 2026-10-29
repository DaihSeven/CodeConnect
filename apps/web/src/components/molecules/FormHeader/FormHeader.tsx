type FormHeaderProps = {
  title: string
  subtitle: string
}

export default function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[26px] leading-normal font-semibold lg:text-[31px]">{title}</h1>
      <p className="text-[22px] leading-normal">{subtitle}</p>
    </div>
  )
}
