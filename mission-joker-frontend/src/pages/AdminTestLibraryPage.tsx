import { Link } from 'react-router-dom'
import { getTestCatalog } from '../data/testCatalog'
import type { Role } from '../types'

type AdminTestLibraryPageProps = {
  role: Role
}

export function AdminTestLibraryPage({ role }: AdminTestLibraryPageProps) {
  if (role !== 'admin') {
    return (
      <section className="panel">
        <h2>Bibliotheque des epreuves</h2>
        <p>Cette page est reservee au compte administrateur.</p>
      </section>
    )
  }

  const catalog = getTestCatalog()

  return (
    <section className="panel">
      <h2>Admin - Bibliotheque des epreuves</h2>
      <p className="hint">Epreuves disponibles, classees par couleur et valeur de carte.</p>
      <div className="cta-row">
        <Link to="/admin/tests/create" className="btn btn-primary">
          + Creer une epreuve
        </Link>
        <Link to="/" className="btn btn-secondary">
          Retour dashboard admin
        </Link>
      </div>
      <div className="preview-table">
        <div className="preview-row preview-row-5 preview-head">
          <span>Nom</span>
          <span>Couleur</span>
          <span>Valeur</span>
          <span>Difficulte</span>
          <span>Actions</span>
        </div>
        {catalog.map((test) => (
          <div className="preview-row preview-row-5" key={test.id}>
            <span>{test.name}</span>
            <span>{test.type}</span>
            <span>{test.cardValue}</span>
            <span>{test.difficulty}</span>
            <span className="preview-actions">
              <button
                type="button"
                className="btn btn-secondary btn-inline"
                onClick={() => window.alert(`Mock: consulter la fiche epreuve "${test.name}".`)}
              >
                Consulter
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-inline"
                onClick={() => window.alert(`Mock: modifier l epreuve "${test.name}".`)}
              >
                Modifier
              </button>
            </span>
          </div>
        ))}
      </div>
      <div className="cta-row">
        <Link to="/admin/routes/create" className="btn btn-secondary">
          Creer un parcours
        </Link>
      </div>
    </section>
  )
}
