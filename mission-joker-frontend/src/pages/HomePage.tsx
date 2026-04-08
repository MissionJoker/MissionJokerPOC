import { useState } from 'react'
import { Link } from 'react-router-dom'
import jokerHero from '../assets/joker.png'
import { WaitlistConnectPrompt } from '../components/WaitlistConnectPrompt'
import { teams } from '../data/mockData'
import type { Role } from '../types'

type HomePageProps = {
  role: Role
  playerTeamName: string | null
  onOpenLogin: () => void
}

export function HomePage({ role, playerTeamName, onOpenLogin }: HomePageProps) {
  const currentTeam = playerTeamName ?? teams[0].name
  const [waitlistPromptOpen, setWaitlistPromptOpen] = useState(false)

  return (
    <>
      <section className="hero hero-with-joker">
        <div className="hero-visual">
          <img src={jokerHero} alt="Mission Joker" className="hero-joker-img" width={220} height={220} />
        </div>
        <div className="hero-copy">
          <p className="kicker">Recoltez les codes. Debloquez les cartes.</p>
          <h1>4 categories. 12 defis. 4 equipes. Une seule equipe gagnante.</h1>
          {role === 'visiteur' && (
            <div className="cta-row">
              <button type="button" className="btn btn-secondary" onClick={() => setWaitlistPromptOpen(true)}>
                Rejoindre la liste d&apos;attente
              </button>
            </div>
          )}
        </div>
      </section>

      {waitlistPromptOpen && (
        <WaitlistConnectPrompt onClose={() => setWaitlistPromptOpen(false)} onOpenLogin={onOpenLogin} />
      )}

      {role === 'visiteur' && (
        <section className="panel">
          <h2>Acces public</h2>
          <p>Connecte-toi pour acceder au tableau de bord joueur ou admin.</p>
          <p className="hint">Comptes mock disponibles dans la modal de connexion.</p>
        </section>
      )}

      {role === 'inscrit' && (
        <section className="panel">
          <h2>Espace inscrit</h2>
          <p>Tu es inscrit sur la liste d&apos;attente. Le tableau d&apos;equipe et les parcours seront accessibles une fois ton compte promu joueur.</p>
          <p className="hint">Compte mock inscrit : inscrit@mission-joker.org / inscrit123</p>
        </section>
      )}

      {role === 'joueur' && (
        <section className="panel">
          <h2>Espace joueur</h2>
          <p>Bienvenue agent, vous etes dans {currentTeam}.</p>
          <p>Cette page affichera davantage de contenu prochainement.</p>
          <div className="cta-row">
            <Link to="/equipe" className="btn btn-primary">
              Acceder a mon tableau d&apos;equipe
            </Link>
          </div>
        </section>
      )}

      {role === 'admin' && (
        <section className="panel">
          <h2>Back-office admin (simulation front)</h2>
          <div className="grid-3">
            <article className="info-box">
              <h3>Suivi live</h3>
              <p>4 equipes actives</p>
              <p>7 epreuves terminees</p>
              <p>2 anomalies signalees</p>
            </article>
            <article className="info-box">
              <h3>Gestion equipes</h3>
              <ul className="compact-list">
                {teams.map((team) => (
                  <li key={team.id}>
                    {team.name} - {team.score} pts
                  </li>
                ))}
              </ul>
            </article>
            <article className="info-box">
              <h3>Actions rapides</h3>
              <div className="stack">
                <button type="button" className="btn btn-secondary">
                  Creer une session
                </button>
                <button type="button" className="btn btn-secondary">
                  Ajouter une epreuve
                </button>
                <button type="button" className="btn btn-primary">
                  Valider une epreuve manuellement
                </button>
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  )
}
