import type { Challenge, Team } from '../types'

export const teams: Team[] = [
  { id: 1, name: 'Escouade A', score: 780, members: ['Agent Nox (vous)', 'Iris', 'Kane', 'Luna', 'Marek', 'Selim'] },
  { id: 2, name: 'Escouade B', score: 620, members: ['Lena', 'Milo', 'Raf', 'Aria', 'Theo', 'Yuri'] },
  { id: 3, name: 'Escouade C', score: 540, members: ['Sia', 'Noe', 'Yann', 'Mina', 'Ezra', 'Lio'] },
  { id: 4, name: 'Escouade D', score: 470, members: ['Zoe', 'Eli', 'Jade', 'Soren', 'Aya', 'Nils'] },
]

export const mockChallenges: Challenge[] = [
  { id: 1, title: 'Epreuve 01 - Code d acces', difficulty: 'Moyen', status: 'termine', points: 200 },
  { id: 2, title: 'Epreuve 02 - Fragment de carte', difficulty: 'Facile', status: 'en_cours', points: 150 },
  { id: 3, title: 'Epreuve 03 - Validation terrain', difficulty: 'Difficile', status: 'verrouille', points: 300 },
]

export const mockAccounts = {
  joueur: { login: 'joueur@mission-joker.org', password: 'joueur123', role: 'joueur' as const },
  inscrit: {
    login: 'inscrit@mission-joker.org',
    password: 'inscrit123',
    role: 'inscrit' as const,
    pseudo: 'Agent Liste',
  },
  admin: { login: 'admin@mission-joker.org', password: 'admin123', role: 'admin' as const },
}
