import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../atoms/Button/Button'
import Checkbox from '../../atoms/Checkbox/Checkbox'
import Divider from '../../molecules/Divider/Divider'
import FormField from '../../molecules/FormField/FormField'
import SocialButton from '../../molecules/SocialButton/SocialButton'

export type SignUpValues = {
  name: string
  email: string
  password: string
  remember: boolean
}

type SignUpFormProps = {
  onSubmit?: (values: SignUpValues) => void
  onSocialLogin?: (provider: 'github' | 'gmail') => void
}

type Errors = Partial<Record<'name' | 'email' | 'password', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, password }: SignUpValues): Errors {
  const errors: Errors = {}
  if (!name) errors.name = 'Informe seu nome'
  if (!email) errors.email = 'Informe seu email'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Informe um email válido'
  if (!password) errors.password = 'Informe sua senha'
  return errors
}

export default function SignUpForm({ onSubmit, onSocialLogin }: SignUpFormProps) {
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: SignUpValues = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      password: String(data.get('password') ?? ''),
      remember: data.get('remember') === 'on',
    }
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) onSubmit?.(values)
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:max-w-[346px]">
      <div className="flex flex-col gap-6">
        <h1 className="text-[26px] leading-normal font-semibold lg:text-[31px]">Cadastro</h1>
        <p className="text-[22px] leading-normal">Olá! Preencha seus dados.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="Nome"
          name="name"
          autoComplete="name"
          placeholder="Nome completo"
          error={errors.name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Digite seu email"
          error={errors.email}
        />
        <div className="flex flex-col gap-2">
          <FormField
            label="Senha"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="******"
            error={errors.password}
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <Checkbox name="remember" />
            Lembrar-me
          </label>
        </div>
        <Button type="submit" className="mt-4">
          Cadastrar
          <img src="/icones/svg/arrow-right.svg" alt="" width={13} height={13} />
        </Button>
      </form>

      <div className="flex flex-col items-center gap-3">
        <Divider>ou entre com outras contas</Divider>
        <div className="flex gap-6">
          <SocialButton icon="/icones/svg/github.svg" onClick={() => onSocialLogin?.('github')}>
            Github
          </SocialButton>
          <SocialButton icon="/icones/svg/google.svg" onClick={() => onSocialLogin?.('gmail')}>
            Gmail
          </SocialButton>
        </div>
      </div>

      <p className="flex flex-col gap-2 text-lg sm:flex-row sm:items-center">
        Já tem conta?
        <Link to="/login" className="flex items-center gap-3 text-brand hover:underline">
          Faça seu login!
          <img src="/icones/svg/login.svg" alt="" width={20} height={18} />
        </Link>
      </p>
    </div>
  )
}
