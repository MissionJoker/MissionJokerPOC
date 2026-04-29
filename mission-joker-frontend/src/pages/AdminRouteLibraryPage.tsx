import { Link } from 'react-router-dom'
import { getRouteCatalog } from '../data/routeCatalog'
import type { Role } from '../types'

type AdminRouteLibraryPageProps = {
  role: Role
}

export function AdminRouteLibraryPage({ role }: AdminRouteLibraryPageProps) {
  if (role !== 'admin') {
    return (
      <section className="panel">
        <h2>Bibliotheque des parcours</h2>
        <p>Cette page est reservee au compte administrateur.</p>
      </section>
    )
  }

  const catalog = getRouteCatalog()

  return (
    <section className="panel">
      <h2>Admin - Bibliotheque des parcours</h2>
      <p className="hint">Chaque parcours contient 3 epreuves de meme couleur : Valet, Dame et Roi.</p>
      <div className="cta-row">
        <Link to="/admin/routes/create" className="btn btn-primary">
          + Creer un parcours
        </Link>
        <Link to="/" className="btn btn-secondary">
          Retour dashboard admin
        </Link>
      </div>
      <div className="preview-table">
        <div className="preview-row preview-row-6 preview-head">
          <span>Parcours</span>
          <span>Couleur</span>
          <span>Valet</span>
          <span>Dame</span>
          <span>Roi</span>
          <span>Actions</span>
        </div>
        {catalog.map((route) => (
          <div className="preview-row preview-row-6" key={route.id}>
            <span>{route.name}</span>
            <span>{route.type}</span>
            <span>{route.tests.valet}</span>
            <span>{route.tests.dame}</span>
            <span>{route.tests.roi}</span>
            <span className="preview-actions">
              <button
                type="button"
                className="btn btn-secondary btn-inline"
                onClick={() => window.alert(`Mock: consulter la fiche parcours "${route.name}".`)}
              >
                Consulter
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-inline"
                onClick={() => window.alert(`Mock: modifier le parcours "${route.name}".`)}
              >
                Modifier
              </button>
            </span>
          </div>
        ))}
      </div>
      <div className="cta-row">
        <Link to="/admin/tests/library" className="btn btn-secondary">
          Voir bibliotheque epreuves
        </Link>
        <Link to="/admin/sessions/create" className="btn btn-secondary">
          Creer une session
        </Link>
      </div>
    </section>
  )
}
