import { Link, useParams } from 'react-router-dom'
import type { Role } from '../types'

type ParcoursPageProps = {
  role: Role
}

const parcoursMeta: Record<string, { title: string; icon: string; colorClass: string }> = {
  coeur: { title: 'Parcours Coeur', icon: '♥', colorClass: 'coeur' },
  trefle: { title: 'Parcours Trefle', icon: '♣', colorClass: 'trefle' },
  piques: { title: 'Parcours Piques', icon: '♠', colorClass: 'piques' },
  carreau: { title: 'Parcours Carreau', icon: '♦', colorClass: 'carreau' },
}

type LevelState = 'completed' | 'unlocked' | 'locked'

type CardLevel = {
  key: 'valet' | 'dame' | 'roi'
  label: string
  icon: string
  state: LevelState
  unlockInfo?: string
}

const levelsByParcours: Record<string, CardLevel[]> = {
  coeur: [
    { key: 'valet', label: 'Valet', icon: '♞', state: 'completed' },
    { key: 'dame', label: 'Dame', icon: '👑', state: 'completed' },
    { key: 'roi', label: 'Roi', icon: '🤴', state: 'completed' },
  ],
  trefle: [
    { key: 'valet', label: 'Valet', icon: '♞', state: 'unlocked', unlockInfo: 'Disponible depuis 09h00' },
    { key: 'dame', label: 'Dame', icon: '👑', state: 'locked', unlockInfo: 'Se debloque a 11h00' },
    { key: 'roi', label: 'Roi', icon: '🤴', state: 'locked', unlockInfo: 'Se debloque a 14h00' },
  ],
  piques: [
    { key: 'valet', label: 'Valet', icon: '♞', state: 'locked', unlockInfo: 'Parcours non demarre' },
    { key: 'dame', label: 'Dame', icon: '👑', state: 'locked', unlockInfo: 'Parcours non demarre' },
    { key: 'roi', label: 'Roi', icon: '🤴', state: 'locked', unlockInfo: 'Parcours non demarre' },
  ],
  carreau: [
    { key: 'valet', label: 'Valet', icon: '♞', state: 'locked', unlockInfo: 'Parcours non demarre' },
    { key: 'dame', label: 'Dame', icon: '👑', state: 'locked', unlockInfo: 'Parcours non demarre' },
    { key: 'roi', label: 'Roi', icon: '🤴', state: 'locked', unlockInfo: 'Parcours non demarre' },
  ],
}

export function ParcoursPage({ role }: ParcoursPageProps) {
  if (role !== 'joueur') {
    return (
      <section className="panel">
        <h2>Parcours</h2>
        <p>Connecte-toi avec un compte joueur pour acceder a un parcours.</p>
      </section>
    )
  }

  const { parcoursId } = useParams()
  const current = parcoursId ? parcoursMeta[parcoursId] : undefined
  const cardLevels = parcoursId ? levelsByParcours[parcoursId] : undefined

  if (!current || !cardLevels) {
    return (
      <section className="panel">
        <h2>Parcours introuvable</h2>
        <p>Le parcours demande n&apos;existe pas dans ce prototype.</p>
        <Link to="/equipe" className="btn btn-secondary">
          Retour au tableau d&apos;equipe
        </Link>
      </section>
    )
  }

  return (
    <section className="panel">
      <div className={`parcours-hero ${current.colorClass}`}>
        <p className="parcours-symbol">{current.icon}</p>
        <h2>{current.title}</h2>
        <p>3 niveaux a franchir : Valet, Dame et Roi.</p>
      </div>

      <div className="level-grid">
        {cardLevels.map((level) => (
          <article key={level.key} className={`level-card ${level.state}`}>
            <p className="level-icon">{level.icon}</p>
            <h3>{level.label}</h3>
            {level.state === 'unlocked' ? (
              <>
                <span className="status en_cours">Deverrouille</span>
                <Link
                  to={`/parcours/${parcoursId}/epreuve/${level.key}`}
                  className="btn btn-primary full level-link-btn"
                >
                  Commencer l&apos;epreuve
                </Link>
              </>
            ) : level.state === 'completed' ? (
              <>
                <span className="status termine">Termine ✅</span>
                <Link
                  to={`/parcours/${parcoursId}/epreuve/${level.key}`}
                  className="btn btn-secondary full level-link-btn"
                >
                  Revoir l&apos;epreuve
                </Link>
              </>
            ) : (
              <p className="lock-line">
                <span className="lock-icon" title={level.unlockInfo}>
                  🔒
                </span>
                <span className="hint">{level.unlockInfo}</span>
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="cta-row">
        <Link to="/equipe" className="btn btn-secondary">
          Retour au tableau d&apos;equipe
        </Link>
      </div>
    </section>
  )
}
