import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRouteCatalog } from '../data/routeCatalog'
import type { Role } from '../types'

type AdminCreateSessionPageProps = {
  role: Role
}

export function AdminCreateSessionPage({ role }: AdminCreateSessionPageProps) {
  const routeCatalog = useMemo(() => getRouteCatalog(), [])

  const [sessionName, setSessionName] = useState('Session Juin 2026')
  const [sessionStatus, setSessionStatus] = useState('upcoming')
  const [dates, setDates] = useState(['2026-06-20', '2026-06-21', '2026-06-28', '2026-06-29'])
  const [selectedRoutes, setSelectedRoutes] = useState(() => [
    routeCatalog[0]?.id ?? '',
    routeCatalog[1]?.id ?? routeCatalog[0]?.id ?? '',
    routeCatalog[2]?.id ?? routeCatalog[0]?.id ?? '',
    routeCatalog[3]?.id ?? routeCatalog[0]?.id ?? '',
  ])
  const [showPreview, setShowPreview] = useState(false)

  const selectedRouteObjects = useMemo(
    () =>
      selectedRoutes.map(
        (routeId) => routeCatalog.find((route) => route.id === routeId) ?? routeCatalog[0],
      ),
    [selectedRoutes],
  )

  const teamNames = ['Equipe A', 'Equipe B', 'Equipe C', 'Equipe D']

  const planningByDay = useMemo(
    () =>
      dates.map((date, idx) => ({
        day: idx + 1,
        date,
        assignments: teamNames.map((teamName, teamIdx) => ({
          teamName,
          route: selectedRouteObjects[(teamIdx + idx) % selectedRouteObjects.length],
        })),
      })),
    [dates, selectedRouteObjects, teamNames],
  )

  if (role !== 'admin') {
    return (
      <section className="panel">
        <h2>Creation de session</h2>
        <p>Cette page est reservee au compte administrateur.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Admin - Creation de session</h2>
      <p className="hint">
        Prototype interface POC pour creer une session avec 4 jours et affectation automatique des equipes.
      </p>

      <form className="mock-form admin-form" onSubmit={(event) => event.preventDefault()}>
        <div className="grid-2">
          <div>
            <label htmlFor="session-name">Nom de session</label>
            <input
              id="session-name"
              placeholder="Ex: Session Juin 2026"
              value={sessionName}
              onChange={(event) => setSessionName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="session-status">Statut</label>
            <select
              id="session-status"
              value={sessionStatus}
              onChange={(event) => setSessionStatus(event.target.value)}
            >
              <option value="upcoming">A venir</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminee</option>
            </select>
          </div>
        </div>

        <article className="resource-box">
          <h3>Dates de session (4 jours)</h3>
          <div className="grid-2">
            <div>
              <label htmlFor="day-1-date">Jour 1</label>
              <input
                id="day-1-date"
                type="date"
                value={dates[0]}
                onChange={(event) =>
                  setDates((prev) => [event.target.value, prev[1], prev[2], prev[3]])
                }
              />
            </div>
            <div>
              <label htmlFor="day-2-date">Jour 2</label>
              <input
                id="day-2-date"
                type="date"
                value={dates[1]}
                onChange={(event) =>
                  setDates((prev) => [prev[0], event.target.value, prev[2], prev[3]])
                }
              />
            </div>
            <div>
              <label htmlFor="day-3-date">Jour 3</label>
              <input
                id="day-3-date"
                type="date"
                value={dates[2]}
                onChange={(event) =>
                  setDates((prev) => [prev[0], prev[1], event.target.value, prev[3]])
                }
              />
            </div>
            <div>
              <label htmlFor="day-4-date">Jour 4</label>
              <input
                id="day-4-date"
                type="date"
                value={dates[3]}
                onChange={(event) =>
                  setDates((prev) => [prev[0], prev[1], prev[2], event.target.value])
                }
              />
            </div>
          </div>
        </article>

        <article className="resource-box">
          <h3>Parcours affectes (bibliotheque complete)</h3>
          <p className="hint">Tu peux choisir plusieurs variantes pour un meme type (ex: plusieurs Trefle).</p>
          <p className="hint">
            Les parcours proviennent de la page "Creer un parcours". Ouvre la page et reviens ici pour les voir.
          </p>
          <div className="grid-2">
            <div>
              <label htmlFor="route-1">Parcours 1</label>
              <select
                id="route-1"
                value={selectedRoutes[0]}
                onChange={(event) =>
                  setSelectedRoutes((prev) => [event.target.value, prev[1], prev[2], prev[3]])
                }
              >
                {routeCatalog.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="route-2">Parcours 2</label>
              <select
                id="route-2"
                value={selectedRoutes[1]}
                onChange={(event) =>
                  setSelectedRoutes((prev) => [prev[0], event.target.value, prev[2], prev[3]])
                }
              >
                {routeCatalog.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="route-3">Parcours 3</label>
              <select
                id="route-3"
                value={selectedRoutes[2]}
                onChange={(event) =>
                  setSelectedRoutes((prev) => [prev[0], prev[1], event.target.value, prev[3]])
                }
              >
                {routeCatalog.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="route-4">Parcours 4</label>
              <select
                id="route-4"
                value={selectedRoutes[3]}
                onChange={(event) =>
                  setSelectedRoutes((prev) => [prev[0], prev[1], prev[2], event.target.value])
                }
              >
                {routeCatalog.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="cta-row">
            <Link to="/admin/routes/create" className="btn btn-secondary">
              Creer un parcours
            </Link>
          </div>
        </article>

        <article className="info-box">
          <h3>Preview generation automatique</h3>
          <p>Au clic, le planning auto preparera 4 equipes par defaut :</p>
          <ul className="compact-list">
            <li>Equipe A</li>
            <li>Equipe B</li>
            <li>Equipe C</li>
            <li>Equipe D</li>
          </ul>
          <p className="hint">Le planning final pourra ensuite etre ajuste manuellement.</p>
        </article>

        <div className="cta-row">
          <button type="button" className="btn btn-secondary" onClick={() => setShowPreview(true)}>
            Afficher l&apos;apercu du planning
          </button>
        </div>

        {showPreview && (
          <article className="resource-box">
            <h3>Apercu du planning cree</h3>
            <p className="hint">
              Session: {sessionName || 'Sans nom'} - Statut: {sessionStatus}
            </p>
            <p className="hint">
              Rotation auto: sur 4 jours, chaque equipe passe une fois sur chaque parcours selectionne.
            </p>
            <div className="planning-grid">
              {planningByDay.map((row) => (
                <div className="planning-card" key={`preview-${row.day}`}>
                  <p className="planning-day">Jour {row.day}</p>
                  <p>{row.date || 'Date manquante'}</p>
                  <div className="preview-table">
                    <div className="preview-row preview-head">
                      <span>Equipe</span>
                      <span>Parcours</span>
                      <span>Type</span>
                    </div>
                    {row.assignments.map((assignment) => (
                      <div className="preview-row" key={`${row.day}-${assignment.teamName}`}>
                        <span>{assignment.teamName}</span>
                        <span>{assignment.route.name}</span>
                        <span>{assignment.route.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}

        <div className="cta-row">
          <button type="button" className="btn btn-primary" onClick={() => window.alert('Mock: session creee.')}>
            Creer la session
          </button>
          <Link to="/" className="btn btn-secondary">
            Retour dashboard admin
          </Link>
        </div>
      </form>
    </section>
  )
}
