import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../atoms/Button/Button'
import Checkbox from '../../atoms/Checkbox/Checkbox'
import Divider from '../../molecules/Divider/Divider'
import FormHeader from '../../molecules/FormHeader/FormHeader'
import FormField from '../../molecules/FormField/FormField'
import SocialButton from '../../molecules/SocialButton/SocialButton'

export type LoginValues = {
  identifier: string
  password: string
  remember: boolean
}

type LoginFormProps = {
  onSubmit?: (values: LoginValues) => void
  onSocialLogin?: (provider: 'github' | 'gmail') => void
}

type Errors = Partial<Record<'identifier' | 'password', string>>

function validate({ identifier, password }: LoginValues): Errors {
  const errors: Errors = {}
  if (!identifier) errors.identifier = 'Informe seu email ou usuário'
  if (!password) errors.password = 'Informe sua senha'
  return errors
}

export default function LoginForm({ onSubmit, onSocialLogin }: LoginFormProps) {
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: LoginValues = {
      identifier: String(data.get('identifier') ?? '').trim(),
      password: String(data.get('password') ?? ''),
      remember: data.get('remember') === 'on',
    }
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) onSubmit?.(values)
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:max-w-[318px]">
      <FormHeader title="Login" subtitle="Boas-vindas! Faça seu login." />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="Email ou usuário"
          name="identifier"
          autoComplete="username"
          placeholder="usuario123"
          error={errors.identifier}
        />
        <div className="flex flex-col gap-2">
          <FormField
            label="Senha"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="******"
            error={errors.password}
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted">
              <Checkbox name="remember" />
              Lembrar-me
            </label>
            <a href="#" className="underline">
              Esqueci a senha
            </a>
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Login
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

      <p className="flex flex-col items-center gap-3 text-center text-sm">
        Ainda não tem conta?
        <Link to="/cadastro" className="flex items-center gap-2 text-base text-brand hover:underline">
          Crie seu cadastro!
          <img src="/icones/svg/clipboard.svg" alt="" width={18} height={21} />
        </Link>
      </p>
    </div>
  )
}
