import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getTestCatalog, saveTestCatalog } from '../data/testCatalog'
import type { Role } from '../types'

type AdminCreateTestPageProps = {
  role: Role
}

export function AdminCreateTestPage({ role }: AdminCreateTestPageProps) {
  const [stepCount, setStepCount] = useState(2)
  const [testName, setTestName] = useState('')
  const [testType, setTestType] = useState<'Trefle' | 'Coeur' | 'Pique' | 'Carreau'>('Trefle')
  const [testCardValue, setTestCardValue] = useState<'Valet' | 'Dame' | 'Roi'>('Valet')
  const [testDifficulty, setTestDifficulty] = useState<'Facile' | 'Moyen' | 'Difficile'>('Moyen')
  const [message, setMessage] = useState('')

  if (role !== 'admin') {
    return (
      <section className="panel">
        <h2>Creation d&apos;epreuve</h2>
        <p>Cette page est reservee au compte administrateur.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Admin - Creation d&apos;epreuve</h2>
      <p className="hint">Prototype interface POC (sans backend) pour la bibliotheque des epreuves.</p>

      <form
        className="mock-form admin-form"
        onSubmit={(event) => {
          event.preventDefault()
          if (!testName.trim()) {
            setMessage('Merci de renseigner le nom de l epreuve.')
            return
          }
          const catalog = getTestCatalog()
          const item = {
            id: `test-${testType.toLowerCase()}-${testCardValue.toLowerCase()}-${Date.now()}`,
            name: testName.trim(),
            type: testType,
            cardValue: testCardValue,
            difficulty: testDifficulty,
          }
          saveTestCatalog([...catalog, item])
          setMessage(`Epreuve "${item.name}" ajoutee a la bibliotheque.`)
          setTestName('')
        }}
      >
        <div className="grid-2">
          <div>
            <label htmlFor="test-name">Nom de l&apos;epreuve</label>
            <input
              id="test-name"
              placeholder="Ex: Enigme des miroirs"
              value={testName}
              onChange={(event) => setTestName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="test-type">Type</label>
            <select
              id="test-type"
              value={testType}
              onChange={(event) => setTestType(event.target.value as 'Trefle' | 'Coeur' | 'Pique' | 'Carreau')}
            >
              <option value="Coeur">Coeur</option>
              <option value="Pique">Pique</option>
              <option value="Trefle">Trefle</option>
              <option value="Carreau">Carreau</option>
            </select>
          </div>
        </div>

        <div className="grid-3">
          <div>
            <label htmlFor="test-card-value">Valeur de carte</label>
            <select
              id="test-card-value"
              value={testCardValue}
              onChange={(event) => setTestCardValue(event.target.value as 'Valet' | 'Dame' | 'Roi')}
            >
              <option value="Valet">Valet</option>
              <option value="Dame">Dame</option>
              <option value="Roi">Roi</option>
            </select>
          </div>
          <div>
            <label htmlFor="test-difficulty">Difficulte</label>
            <select
              id="test-difficulty"
              value={testDifficulty}
              onChange={(event) =>
                setTestDifficulty(event.target.value as 'Facile' | 'Moyen' | 'Difficile')
              }
            >
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>
          <div>
            <label htmlFor="test-points">Points max</label>
            <input id="test-points" type="number" defaultValue={200} />
          </div>
        </div>

        <div className="grid-3">
          <div>
            <label htmlFor="test-start-time">Heure de debut</label>
            <input id="test-start-time" type="time" defaultValue="10:00" />
          </div>
          <div>
            <label htmlFor="test-penalty-time">Debut penalite</label>
            <input id="test-penalty-time" type="time" defaultValue="11:00" />
          </div>
          <div>
            <label htmlFor="test-end-time">Heure de fin</label>
            <input id="test-end-time" type="time" defaultValue="12:00" />
          </div>
        </div>

        <div>
          <label htmlFor="test-description">Description admin</label>
          <textarea
            id="test-description"
            rows={4}
            placeholder="Description de l'enigme, objectifs, contraintes terrain..."
          />
        </div>

        <article className="resource-box">
          <h3>Ressources de l&apos;epreuve</h3>
          <div className="grid-2">
            <div>
              <label htmlFor="test-doc-label-1">Libelle doc 1</label>
              <input id="test-doc-label-1" placeholder="Brief principal" />
            </div>
            <div>
              <label htmlFor="test-doc-url-1">URL doc 1</label>
              <input id="test-doc-url-1" placeholder="https://..." />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <label htmlFor="test-doc-label-2">Libelle doc 2</label>
              <input id="test-doc-label-2" placeholder="Indice supplementaire" />
            </div>
            <div>
              <label htmlFor="test-doc-url-2">URL doc 2</label>
              <input id="test-doc-url-2" placeholder="https://..." />
            </div>
          </div>
        </article>

        <article className="resource-box">
          <h3>Etapes (steps)</h3>
          {Array.from({ length: stepCount }).map((_, idx) => {
            const stepNumber = idx + 1
            return (
              <div className="grid-2" key={`step-${stepNumber}`}>
                <div>
                  <label htmlFor={`step-${stepNumber}`}>Etape {stepNumber} - description</label>
                  <input id={`step-${stepNumber}`} placeholder="Ex: Trouver le code cache" />
                </div>
                <div>
                  <label htmlFor={`solution-${stepNumber}`}>Etape {stepNumber} - code de la reponse attendue</label>
                  <input id={`solution-${stepNumber}`} placeholder="Ex: TREFLE-90210" />
                </div>
              </div>
            )
          })}
          <div className="cta-row">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStepCount((prev) => prev + 1)}
            >
              Ajouter une etape
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStepCount((prev) => Math.max(1, prev - 1))}
            >
              Supprimer une etape
            </button>
          </div>
        </article>

        {message && <p className="hint">{message}</p>}

        <div className="cta-row">
          <button type="submit" className="btn btn-primary">
            Creer l&apos;epreuve
          </button>
          <Link to="/admin/tests/library" className="btn btn-secondary">
            Voir bibliotheque d&apos;epreuves
          </Link>
          <Link to="/" className="btn btn-secondary">
            Retour dashboard admin
          </Link>
        </div>
      </form>
    </section>
  )
}
