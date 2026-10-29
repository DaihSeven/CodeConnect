import Banner from '../../molecules/Banner/Banner'
import LoginForm, { type LoginValues } from '../../organisms/LoginForm/LoginForm'
import AuthTemplate from '../../templates/AuthTemplate/AuthTemplate'

type LoginPageProps = {
  onSubmit?: (values: LoginValues) => void
}

export default function LoginPage({ onSubmit }: LoginPageProps) {
  return (
    <AuthTemplate banner={<Banner name="img-1" />}>
      <LoginForm onSubmit={onSubmit} />
    </AuthTemplate>
  )
}
