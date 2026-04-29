import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRouteCatalog, saveRouteCatalog } from '../data/routeCatalog'
import { getTestCatalog } from '../data/testCatalog'
import type { Role } from '../types'

type AdminCreateRoutePageProps = {
  role: Role
}

export function AdminCreateRoutePage({ role }: AdminCreateRoutePageProps) {
  const testCatalog = getTestCatalog()
  const [routeName, setRouteName] = useState('')
  const [routeType, setRouteType] = useState<'Trefle' | 'Coeur' | 'Pique' | 'Carreau'>('Trefle')
  const [valetTest, setValetTest] = useState(() => {
    const defaultItem = testCatalog.find((test) => test.type === 'Trefle' && test.cardValue === 'Valet')
    return defaultItem?.name ?? ''
  })
  const [dameTest, setDameTest] = useState(() => {
    const defaultItem = testCatalog.find((test) => test.type === 'Trefle' && test.cardValue === 'Dame')
    return defaultItem?.name ?? ''
  })
  const [roiTest, setRoiTest] = useState(() => {
    const defaultItem = testCatalog.find((test) => test.type === 'Trefle' && test.cardValue === 'Roi')
    return defaultItem?.name ?? ''
  })
  const [message, setMessage] = useState('')

  const testsForType = (cardValue: 'Valet' | 'Dame' | 'Roi') =>
    testCatalog.filter((test) => test.type === routeType && test.cardValue === cardValue)

  if (role !== 'admin') {
    return (
      <section className="panel">
        <h2>Creation de parcours</h2>
        <p>Cette page est reservee au compte administrateur.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Admin - Creation de parcours</h2>
      <p className="hint">
        Un parcours est compose de 3 epreuves de meme couleur : Valet, Dame et Roi.
      </p>

      <form
        className="mock-form admin-form"
        onSubmit={(event) => {
          event.preventDefault()

          if (!routeName.trim() || !valetTest.trim() || !dameTest.trim() || !roiTest.trim()) {
            setMessage('Merci de renseigner le nom et les 3 epreuves (Valet, Dame, Roi).')
            return
          }

          const currentCatalog = getRouteCatalog()
          const newItem = {
            id: `${routeType.toLowerCase()}-${Date.now()}`,
            type: routeType,
            name: routeName.trim(),
            tests: {
              valet: valetTest.trim(),
              dame: dameTest.trim(),
              roi: roiTest.trim(),
            },
          }
          saveRouteCatalog([...currentCatalog, newItem])
          setMessage(`Parcours "${newItem.name}" ajoute au catalogue.`)
          setRouteName('')
          setValetTest('')
          setDameTest('')
          setRoiTest('')
        }}
      >
        <div className="grid-2">
          <div>
            <label htmlFor="route-name">Nom du parcours</label>
            <input
              id="route-name"
              placeholder="Ex: Trefle - Orientation urbaine"
              value={routeName}
              onChange={(event) => setRouteName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="route-type">Couleur du parcours</label>
            <select
              id="route-type"
              value={routeType}
              onChange={(event) => {
                const newType = event.target.value as 'Trefle' | 'Coeur' | 'Pique' | 'Carreau'
                setRouteType(newType)
                const nextValet =
                  testCatalog.find((test) => test.type === newType && test.cardValue === 'Valet')?.name ?? ''
                const nextDame =
                  testCatalog.find((test) => test.type === newType && test.cardValue === 'Dame')?.name ?? ''
                const nextRoi =
                  testCatalog.find((test) => test.type === newType && test.cardValue === 'Roi')?.name ?? ''
                setValetTest(nextValet)
                setDameTest(nextDame)
                setRoiTest(nextRoi)
              }}
            >
              <option value="Trefle">Trefle</option>
              <option value="Coeur">Coeur</option>
              <option value="Pique">Pique</option>
              <option value="Carreau">Carreau</option>
            </select>
          </div>
        </div>

        <article className="resource-box">
          <h3>Epreuves du parcours</h3>
          <p className="hint">
            Selection depuis la bibliotheque d&apos;epreuves existante ({routeType} / Valet-Dame-Roi).
          </p>
          <div className="grid-3">
            <div>
              <label htmlFor="route-valet-test">Valet - epreuve</label>
              <select
                id="route-valet-test"
                value={valetTest}
                onChange={(event) => setValetTest(event.target.value)}
              >
                <option value="">Choisir un Valet {routeType}</option>
                {testsForType('Valet').map((test) => (
                  <option key={test.id} value={test.name}>
                    {test.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="route-dame-test">Dame - epreuve</label>
              <select
                id="route-dame-test"
                value={dameTest}
                onChange={(event) => setDameTest(event.target.value)}
              >
                <option value="">Choisir une Dame {routeType}</option>
                {testsForType('Dame').map((test) => (
                  <option key={test.id} value={test.name}>
                    {test.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="route-roi-test">Roi - epreuve</label>
              <select
                id="route-roi-test"
                value={roiTest}
                onChange={(event) => setRoiTest(event.target.value)}
              >
                <option value="">Choisir un Roi {routeType}</option>
                {testsForType('Roi').map((test) => (
                  <option key={test.id} value={test.name}>
                    {test.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="cta-row">
            <Link to="/admin/tests/library" className="btn btn-secondary">
              Voir bibliotheque d&apos;epreuves
            </Link>
          </div>
        </article>

        {message && <p className="hint">{message}</p>}

        <div className="cta-row">
          <button type="submit" className="btn btn-primary">
            Creer le parcours
          </button>
          <Link to="/admin/sessions/create" className="btn btn-secondary">
            Aller a creation de session
          </Link>
          <Link to="/admin/routes/library" className="btn btn-secondary">
            Voir bibliotheque de parcours
          </Link>
          <Link to="/" className="btn btn-secondary">
            Retour dashboard admin
          </Link>
        </div>
      </form>
    </section>
  )
}
