import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { ForgotPage } from '../features/auth/ForgotPage'
import { LoginPage } from '../features/auth/LoginPage'
import { SignupPage } from '../features/auth/SignupPage'
import { CountriesPage } from '../features/countries/CountriesPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { ChecklistPage } from '../features/plan/ChecklistPage'
import { DocumentsPage } from '../features/plan/DocumentsPage'
import { useSessionState } from './useSession.jsx'

function Loading() {
  return <p className="page">Abrindo seu plano…</p>
}

function Guest({ children }) {
  const { user, ready } = useSessionState()
  if (!ready) return <Loading />
  if (user) return <Navigate to="/plano" replace />
  return children
}

function Private() {
  const { user, ready } = useSessionState()
  if (!ready) return <Loading />
  if (!user) return <Navigate to="/" replace />
  return (
    <AppShell user={user}>
      <Outlet />
    </AppShell>
  )
}

function Planned() {
  const { user } = useSessionState()
  if (!user?.plan?.countryCode) return <Navigate to="/paises" replace />
  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Guest>
            <LoginPage />
          </Guest>
        }
      />
      <Route
        path="/cadastro"
        element={
          <Guest>
            <SignupPage />
          </Guest>
        }
      />
      <Route
        path="/recuperar-senha"
        element={
          <Guest>
            <ForgotPage />
          </Guest>
        }
      />
      <Route element={<Private />}>
        <Route path="/paises" element={<CountriesPage />} />
        <Route path="/paises/:code/sobre" element={<CountriesPage />} />
        <Route path="/paises/:code" element={<CountriesPage />} />
        <Route element={<Planned />}>
          <Route path="/plano" element={<DashboardPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/documentos" element={<DocumentsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
