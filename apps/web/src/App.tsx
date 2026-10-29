import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage/LoginPage'
import SignUpPage from './components/pages/SignUpPage/SignUpPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
