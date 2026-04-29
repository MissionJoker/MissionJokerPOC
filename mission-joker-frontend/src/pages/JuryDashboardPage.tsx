import { Link } from 'react-router-dom'
import type { Role } from '../types'

type JuryDashboardPageProps = {
  role: Role
}

export function JuryDashboardPage({ role }: JuryDashboardPageProps) {
  if (role !== 'jury') {
    return (
      <section className="panel">
        <h2>Dashboard Jury</h2>
        <p>Connecte-toi avec le compte jury pour acceder a cette page.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Dashboard Jury</h2>
      <p className="hint">Date du jour : 20 mai 2026</p>
      <article className="info-box">
        <h3>Equipe</h3>
        <p className="team-name">Jury Solo</p>
        <p>Tu es le seul membre de cette equipe de demonstration.</p>
        <p>
          Score actuel: <strong>0 / 1000</strong>
        </p>
      </article>

      <div className="planning-grid">
        <article className="planning-card unlocked">
          <Link to="/jury/parcours/jury" className="planning-link">
            <p className="planning-day">Jour 1</p>
            <p>20 mai 2026</p>
            <p>
              <strong>Parcours Jury</strong>
            </p>
            <span className="status en_cours">Accessible</span>
          </Link>
        </article>
      </div>
    </section>
  )
}
