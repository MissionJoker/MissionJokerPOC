import { NavLink } from 'react-router-dom'
import jokerLogo from '../assets/joker.png'
import type { Role } from '../types'

type HeaderProps = {
  role: Role
  onOpenLogin: () => void
  onOpenProfile: () => void
  onLogout: () => void
}

export function Header({ role, onOpenLogin, onOpenProfile, onLogout }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="logo">
        <img src={jokerLogo} alt="" className="logo-mark" width={40} height={40} />
        <span className="logo-text">
          MISSION <span className="logo-accent">JOKER</span>
        </span>
      </div>
      <nav className="topnav">
        <NavLink to="/" end className="nav-link">
          Accueil
        </NavLink>
        <NavLink to="/regles" className="nav-link">
          Regles du jeu
        </NavLink>
        {role === 'joueur' && (
          <NavLink to="/equipe" className="nav-link">
            Mon equipe
          </NavLink>
        )}
        {role === 'jury' && (
          <NavLink to="/jury/dashboard" className="nav-link">
            Dashboard jury
          </NavLink>
        )}
        {role === 'visiteur' ? (
          <button type="button" className="btn-nav-login" onClick={onOpenLogin}>
            Connexion
          </button>
        ) : role === 'joueur' || role === 'inscrit' || role === 'jury' ? (
          <button type="button" onClick={onOpenProfile}>
            Profil
          </button>
        ) : (
          <button type="button" onClick={onLogout}>
            Deconnexion
          </button>
        )}
      </nav>
    </header>
  )
}
