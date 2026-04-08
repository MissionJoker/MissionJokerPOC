import { Link } from 'react-router-dom'
import { teams } from '../data/mockData'
import type { Role } from '../types'

type TeamDashboardPageProps = {
  role: Role
  playerTeamName: string | null
}

type PlanningItem = {
  day: number
  dateLabel: string
  route: string
  parcoursId: string
  state: 'completed' | 'unlocked' | 'locked'
  unlockAt?: string
}

const planning: PlanningItem[] = [
  { day: 1, dateLabel: '20 juin 2026', route: 'Parcours Coeur', parcoursId: 'coeur', state: 'completed' },
  { day: 2, dateLabel: '21 juin 2026', route: 'Parcours Trefle', parcoursId: 'trefle', state: 'unlocked' },
  { day: 3, dateLabel: '28 juin 2026', route: 'Parcours Piques', parcoursId: 'piques', state: 'locked', unlockAt: '28 juin 2026 a 09h00' },
  { day: 4, dateLabel: '29 juin 2026', route: 'Parcours Carreau', parcoursId: 'carreau', state: 'locked', unlockAt: '29 juin 2026 a 09h00' },
]

export function TeamDashboardPage({ role, playerTeamName }: TeamDashboardPageProps) {
  if (role !== 'joueur') {
    return (
      <section className="panel">
        <h2>Tableau d&apos;equipe</h2>
        <p>Connecte-toi avec un compte joueur pour acceder a cette page.</p>
      </section>
    )
  }

  const currentTeam = playerTeamName ?? teams[0].name
  const currentTeamMembers = teams.find((team) => team.name === currentTeam)?.members ?? []

  return (
    <section className="panel">
      <h2>Tableau d&apos;equipe</h2>
      <p className="hint">Info session: nous sommes le 21 juin 10h00.</p>
      <div>
        <article className="info-box">
          <h3>Mon equipe</h3>
          <p className="team-name">{currentTeam}</p>
          <p>
            Score actuel: <strong>780 / 4000</strong>
          </p>
          <p>Chaque parcours peut rapporter jusqu&apos;a 1000 points.</p>
          <p className="member-title">Membres ({currentTeamMembers.length})</p>
          <ul className="compact-list">
            {currentTeamMembers.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </article>
      </div>
      <div className="planning-grid">
        {planning.map((item) => (
          <article key={item.day} className={`planning-card ${item.state}`}>
            {(item.state === 'completed' || item.state === 'unlocked') ? (
              <Link to={`/parcours/${item.parcoursId}`} className="planning-link">
                <p className="planning-day">Jour {item.day}</p>
                <p>{item.dateLabel}</p>
                <p>
                  <strong>{item.route}</strong>
                </p>
                {item.state === 'completed' && <span className="status termine">Deverrouille (realise)</span>}
                {item.state === 'unlocked' && <span className="status en_cours">Deverrouille (accessible)</span>}
              </Link>
            ) : (
              <>
                <p className="planning-day">Jour {item.day}</p>
                <p>{item.dateLabel}</p>
                <p>
                  <strong>{item.route}</strong>
                </p>
                <p className="lock-line">
                  <span className="lock-icon" title={`Disponible le ${item.unlockAt}`}>
                    🔒
                  </span>
                  <span className="hint">Disponible le {item.unlockAt}</span>
                </p>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
