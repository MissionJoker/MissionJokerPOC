import { useState } from 'react'
import './App.css'
import { AuthModal } from './components/AuthModal'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProfileModal } from './components/ProfileModal'
import { mockAccounts, teams } from './data/mockData'
import { AppRoutes } from './routes/AppRoutes'
import type { AuthMode, Role } from './types'

const CURRENT_USER_ALREADY_HAS_TEAM = true

function App() {
  const [role, setRole] = useState<Role>('visiteur')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [playerTeamId, setPlayerTeamId] = useState<number | null>(
    CURRENT_USER_ALREADY_HAS_TEAM ? 1 : null,
  )
  const [isTeamPickerOpen, setIsTeamPickerOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const openLogin = () => {
    setAuthMode('login')
    setIsAuthOpen(true)
    setAuthError('')
  }

  const closeAuth = () => {
    setIsAuthOpen(false)
    setAuthError('')
  }

  const handleLogin = () => {
    if (login === mockAccounts.joueur.login && password === mockAccounts.joueur.password) {
      setRole('joueur')
      setIsAuthOpen(false)
      if (playerTeamId === null) {
        setIsTeamPickerOpen(true)
      }
      return
    }
    if (login === mockAccounts.inscrit.login && password === mockAccounts.inscrit.password) {
      setRole('inscrit')
      setIsAuthOpen(false)
      return
    }
    if (login === mockAccounts.admin.login && password === mockAccounts.admin.password) {
      setRole('admin')
      setIsAuthOpen(false)
      return
    }
    setAuthError('Identifiants mock invalides.')
  }

  const handleLogout = () => {
    setRole('visiteur')
    setLogin('')
    setPassword('')
    setAuthError('')
    setIsProfileOpen(false)
  }

  const selectedTeamName = teams.find((team) => team.id === playerTeamId)?.name ?? null

  return (
    <div className="app-shell">
      <Header
        role={role}
        onOpenLogin={openLogin}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
      />

      <main>
        <AppRoutes role={role} playerTeamName={selectedTeamName} onOpenLogin={openLogin} />
      </main>

      <Footer />

      {isAuthOpen && (
        <AuthModal
          authMode={authMode}
          login={login}
          password={password}
          authError={authError}
          onClose={closeAuth}
          onSetAuthMode={setAuthMode}
          onLoginChange={setLogin}
          onPasswordChange={setPassword}
          onLoginSubmit={handleLogin}
        />
      )}

      {isTeamPickerOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsTeamPickerOpen(false)}>
          <section className="auth-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <h2>CHOISIR UNE EQUIPE</h2>
            <p>Selectionne ton escouade pour la session en cours.</p>
            <div className="team-picker">
              {teams.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setPlayerTeamId(team.id)
                    setIsTeamPickerOpen(false)
                  }}
                >
                  {team.name}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {isProfileOpen && (role === 'joueur' || role === 'inscrit') && (
        <ProfileModal
          pseudo={role === 'joueur' ? 'Agent Nox' : mockAccounts.inscrit.pseudo}
          email={role === 'joueur' ? mockAccounts.joueur.login : login || mockAccounts.inscrit.login}
          statusLabel={role === 'joueur' ? 'Joueur' : 'Inscrit'}
          onClose={() => setIsProfileOpen(false)}
          onChangePassword={() => window.alert('Fonction mock: modification du mot de passe.')}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
