import type { AuthMode } from '../types'

type AuthModalProps = {
  authMode: AuthMode
  login: string
  password: string
  authError: string
  onClose: () => void
  onSetAuthMode: (mode: AuthMode) => void
  onLoginChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onLoginSubmit: () => void
}

export function AuthModal({
  authMode,
  login,
  password,
  authError,
  onClose,
  onSetAuthMode,
  onLoginChange,
  onPasswordChange,
  onLoginSubmit,
}: AuthModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="auth-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="close-btn" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        {authMode === 'login' ? (
          <>
            <h2>CONNEXION</h2>
            <p>Identifiez-vous pour acceder au QG.</p>
            <form className="mock-form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="login">Nom d&apos;agent (Pseudo) ou Email</label>
              <input
                id="login"
                placeholder="Ex: Agent 007 ou email@test.com"
                value={login}
                onChange={(event) => onLoginChange(event.target.value)}
              />
              <label htmlFor="auth-password">Mot de passe</label>
              <input
                id="auth-password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
              />
              {authError && <p className="error">{authError}</p>}
              <button type="button" className="btn btn-primary full" onClick={onLoginSubmit}>
                SE CONNECTER
              </button>
            </form>
            <p className="switch-line">
              Pas encore de compte ?{' '}
              <button type="button" className="link-btn" onClick={() => onSetAuthMode('signup')}>
                Creer un compte
              </button>
            </p>
            <p className="hint">
              Joueur: joueur@mission-joker.org / joueur123 - Inscrit: inscrit@mission-joker.org / inscrit123 - Admin:
              admin@mission-joker.org / admin123
            </p>
          </>
        ) : (
          <>
            <h2>REJOINDRE L&apos;ESCOUADE</h2>
            <p>Creez votre profil d&apos;agent.</p>
            <form className="mock-form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="signup-name">Nom d&apos;agent (Pseudo)</label>
              <input id="signup-name" placeholder="Votre nom de code" />
              <label htmlFor="signup-email">Email</label>
              <input id="signup-email" placeholder="votre@email.com" />
              <label htmlFor="signup-age">Age</label>
              <input id="signup-age" type="number" min={10} max={99} placeholder="Ex: 24" />
              <label htmlFor="signup-password">Mot de passe</label>
              <input id="signup-password" type="password" placeholder="********" />
              <button type="button" className="btn btn-primary full">
                CREER MON COMPTE
              </button>
            </form>
            <p className="switch-line">
              Deja un compte ?{' '}
              <button type="button" className="link-btn" onClick={() => onSetAuthMode('login')}>
                Se connecter
              </button>
            </p>
          </>
        )}
      </section>
    </div>
  )
}
