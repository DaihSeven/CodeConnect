import Banner from '../../molecules/Banner/Banner'
import SignUpForm, { type SignUpValues } from '../../organisms/SignUpForm/SignUpForm'
import AuthTemplate from '../../templates/AuthTemplate/AuthTemplate'

type SignUpPageProps = {
  onSubmit?: (values: SignUpValues) => void
}

export default function SignUpPage({ onSubmit }: SignUpPageProps) {
  return (
    <AuthTemplate banner={<Banner name="img2" />}>
      <SignUpForm onSubmit={onSubmit} />
    </AuthTemplate>
  )
}
