import { Link, useParams } from 'react-router-dom'
import type { Role } from '../types'

type EpreuvePageProps = {
  role: Role
}

type EpreuveState = 'unlocked' | 'completed'

type EpreuveData = {
  title: string
  routeLabel: string
  startTime: string
  endTime: string
  penaltyStart: string
  description: string
  locationLabel: string
  locationUrl: string
  resources: { label: string; url: string; type: string }[]
  state: EpreuveState
  submittedAnswer?: string
}

const EPREUVES: Record<string, EpreuveData> = {
  'trefle:valet': {
    title: 'Epreuve - Valet de Trefle ♣',
    routeLabel: 'Parcours Trefle',
    startTime: '10h00',
    endTime: '12h00',
    penaltyStart: '11h00',
    description:
      "Tu dois identifier le code cache dans une sequence d'indices visuels et textuels. Analyse les ressources, trouve la logique, puis soumets le code final.",
    locationLabel: 'Place de la Rotonde, Aix-en-Provence',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Place+de+la+Rotonde+Aix-en-Provence',
    resources: [
      { type: 'Video indice', label: 'ouvrir YouTube', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { type: 'Document mission', label: 'telecharger le PDF', url: 'https://example.com/brief-valet-trefle.pdf' },
    ],
    state: 'unlocked',
  },
  'coeur:valet': {
    title: 'Epreuve - Valet de Coeur ♥',
    routeLabel: 'Parcours Coeur',
    startTime: '10h00',
    endTime: '12h00',
    penaltyStart: '11h00',
    description:
      "Mission sociale : recuperer 3 temoignages sur un point d'interet du centre-ville puis en deduire le code final.",
    locationLabel: 'Place de la Rotonde, Aix-en-Provence',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Place+de+la+Rotonde+Aix-en-Provence',
    resources: [
      { type: 'Guide terrain', label: 'ouvrir le guide', url: 'https://example.com/guide-coeur-valet.pdf' },
      { type: 'Brief audio', label: 'ecouter le brief', url: 'https://example.com/audio-coeur-valet.mp3' },
    ],
    state: 'completed',
    submittedAnswer: 'COEUR-314',
  },
  'coeur:dame': {
    title: 'Epreuve - Dame de Coeur ♥',
    routeLabel: 'Parcours Coeur',
    startTime: '13h00',
    endTime: '15h00',
    penaltyStart: '14h00',
    description: "Mission d'observation : reconstituer une chronologie a partir d'indices collectes en equipe.",
    locationLabel: 'Place de la Rotonde, Aix-en-Provence',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Place+de+la+Rotonde+Aix-en-Provence',
    resources: [
      { type: 'Feuille de route', label: 'telecharger la feuille', url: 'https://example.com/route-coeur-dame.pdf' },
    ],
    state: 'completed',
    submittedAnswer: 'DAME-728',
  },
  'coeur:roi': {
    title: 'Epreuve - Roi de Coeur ♥',
    routeLabel: 'Parcours Coeur',
    startTime: '16h00',
    endTime: '18h00',
    penaltyStart: '17h00',
    description: "Mission finale : croiser l'ensemble des informations du parcours et soumettre le code maitre.",
    locationLabel: 'Place de la Rotonde, Aix-en-Provence',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Place+de+la+Rotonde+Aix-en-Provence',
    resources: [
      { type: 'Dossier final', label: 'ouvrir le dossier', url: 'https://example.com/dossier-coeur-roi.pdf' },
    ],
    state: 'completed',
    submittedAnswer: 'ROI-999',
  },
}

export function EpreuvePage({ role }: EpreuvePageProps) {
  if (role !== 'joueur') {
    return (
      <section className="panel">
        <h2>Epreuve</h2>
        <p>Connecte-toi avec un compte joueur pour acceder a cette epreuve.</p>
      </section>
    )
  }

  const { parcoursId, epreuveId } = useParams()
  const key = `${parcoursId ?? ''}:${epreuveId ?? ''}`
  const epreuve = EPREUVES[key]

  if (!epreuve) {
    return (
      <section className="panel">
        <h2>Epreuve introuvable</h2>
        <p>Cette epreuve n&apos;est pas encore maquettee dans le prototype.</p>
        <Link to={`/parcours/${parcoursId ?? 'trefle'}`} className="btn btn-secondary">
          Retour au parcours
        </Link>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>{epreuve.title}</h2>
      <p className="hint">
        {epreuve.routeLabel} - Debut epreuve: {epreuve.startTime} - Fin epreuve: {epreuve.endTime} - Debut des penalites:{' '}
        {epreuve.penaltyStart}
      </p>

      <article className="info-box">
        <h3>Description de l&apos;epreuve</h3>
        <p>{epreuve.description}</p>
      </article>

      <article className="resource-box">
        <h3>Ressources</h3>
        <ul className="compact-list">
          {epreuve.resources.map((resource) => (
            <li key={resource.url}>
              {resource.type}:{' '}
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.label}
              </a>
            </li>
          ))}
        </ul>
      </article>

      <article className="resource-box">
        <h3>Localisation de depart</h3>
        <p>{epreuve.locationLabel}</p>
        <a
          href={epreuve.locationUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          Ouvrir la localisation
        </a>
      </article>

      {epreuve.state === 'completed' ? (
        <article className="info-box">
          <h3>Reponse fournie</h3>
          <p className="status termine">Epreuve terminee</p>
          <input value={epreuve.submittedAnswer ?? ''} readOnly />
          <p className="hint">Tu peux consulter l&apos;enonce et les ressources, mais la reponse est deja verrouillee.</p>
        </article>
      ) : (
        <article className="info-box">
          <h3>Soumettre ma reponse</h3>
          <form className="mock-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="answer">Code reponse</label>
            <input id="answer" placeholder="Ex: TREFLE-90210" />
            <button type="button" className="btn btn-primary">
              Envoyer la reponse
            </button>
          </form>
        </article>
      )}

      <div className="cta-row">
        <Link to={`/parcours/${parcoursId ?? 'trefle'}`} className="btn btn-secondary">
          Retour au parcours
        </Link>
      </div>
    </section>
  )
}
