import { Link } from 'react-router-dom'
import type { Role } from '../types'

type JuryParcoursPageProps = {
  role: Role
}

export function JuryParcoursPage({ role }: JuryParcoursPageProps) {
  if (role !== 'jury') {
    return (
      <section className="panel">
        <h2>Parcours Jury</h2>
        <p>Connecte-toi avec le compte jury pour acceder a ce parcours.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <div className="parcours-hero trefle">
        <p className="parcours-symbol">★</p>
        <h2>Parcours Jury</h2>
        <p>Parcours unique de demonstration : un seul niveau Valet.</p>
      </div>

      <div className="level-grid">
        <article className="level-card unlocked">
          <p className="level-icon">♞</p>
          <h3>Valet</h3>
          <span className="status en_cours">Deverrouille</span>
          <Link to="/jury/parcours/jury/epreuve/valet" className="btn btn-primary full level-link-btn">
            Ouvrir l&apos;epreuve jury
          </Link>
        </article>
      </div>

      <div className="cta-row">
        <Link to="/jury/dashboard" className="btn btn-secondary">
          Retour au dashboard jury
        </Link>
      </div>
    </section>
  )
}
