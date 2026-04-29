import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Role } from '../types'

type JuryEpreuvePageProps = {
  role: Role
}

export function JuryEpreuvePage({ role }: JuryEpreuvePageProps) {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isSolved, setIsSolved] = useState(false)

  if (role !== 'jury') {
    return (
      <section className="panel">
        <h2>Epreuve Jury</h2>
        <p>Connecte-toi avec le compte jury pour acceder a cette epreuve.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Epreuve Jury - Valet</h2>
      <p className="hint">Page prete pour integrer le contenu final et la reponse attendue.</p>

      <article className="info-box">
        <h3>Description de l&apos;epreuve</h3>
        <p>Contenu a venir (brief jury).</p>
      </article>

      <article className="resource-box">
        <h3>Ressources</h3>
        <ul className="compact-list">
          <li>Lien 1 (a definir)</li>
          <li>Lien 2 (a definir)</li>
        </ul>
      </article>

      {!isSolved ? (
        <article className="info-box">
          <h3>Soumettre ma reponse</h3>
          <form
            className="mock-form"
            onSubmit={(event) => {
              event.preventDefault()
              const normalizedAnswer = answer.trim().toLowerCase()
              if (normalizedAnswer === 'cyanure') {
                setError('')
                setIsSolved(true)
                setIsSuccessOpen(true)
                return
              }
              setError('Mauvaise reponse, retentez.')
            }}
          >
            <label htmlFor="jury-answer">Reponse jury</label>
            <input
              id="jury-answer"
              placeholder="Saisir votre reponse"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Envoyer la reponse
            </button>
          </form>
        </article>
      ) : (
        <article className="info-box">
          <h3>Epreuve reussie ✅</h3>
          <p>Reponse validee : <strong>CYANURE</strong></p>
          <p className="hint">Tu peux relancer la demonstration avec le bouton reset.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setIsSolved(false)
              setAnswer('')
              setError('')
              setIsSuccessOpen(false)
            }}
          >
            Reset l&apos;epreuve
          </button>
        </article>
      )}

      <div className="cta-row">
        <Link to="/jury/parcours/jury" className="btn btn-secondary">
          Retour au parcours jury
        </Link>
      </div>

      {isSuccessOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsSuccessOpen(false)}>
          <section className="auth-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-btn" onClick={() => setIsSuccessOpen(false)} aria-label="Fermer">
              ×
            </button>
            <h2>Bravo !</h2>
            <p>Vous avez reussi, vous avez gagne un canele !</p>
            <button type="button" className="btn btn-primary full" onClick={() => setIsSuccessOpen(false)}>
              Fermer
            </button>
          </section>
        </div>
      )}
    </section>
  )
}
