export type Role = 'visiteur' | 'inscrit' | 'joueur' | 'jury' | 'admin'
export type AuthMode = 'login' | 'signup'

export type Team = {
  id: number
  name: string
  score: number
  members: string[]
}

export type Challenge = {
  id: number
  title: string
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  status: 'verrouille' | 'en_cours' | 'termine'
  points: number
}
