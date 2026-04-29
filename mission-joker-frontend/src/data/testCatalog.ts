export type CardType = 'Trefle' | 'Coeur' | 'Pique' | 'Carreau'
export type CardValue = 'Valet' | 'Dame' | 'Roi'

export type TestCatalogItem = {
  id: string
  name: string
  type: CardType
  cardValue: CardValue
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
}

const STORAGE_KEY = 'mission-joker-test-catalog'

export const defaultTestCatalog: TestCatalogItem[] = [
  { id: 'test-club-jack-1', name: 'Valet Trefle - Balise Nord', type: 'Trefle', cardValue: 'Valet', difficulty: 'Moyen' },
  { id: 'test-club-queen-1', name: 'Dame Trefle - Trajet cache', type: 'Trefle', cardValue: 'Dame', difficulty: 'Moyen' },
  { id: 'test-club-king-1', name: 'Roi Trefle - Coordonnees perdues', type: 'Trefle', cardValue: 'Roi', difficulty: 'Difficile' },
  { id: 'test-heart-jack-1', name: 'Valet Coeur - Interview flash', type: 'Coeur', cardValue: 'Valet', difficulty: 'Facile' },
  { id: 'test-heart-queen-1', name: 'Dame Coeur - Enquete locale', type: 'Coeur', cardValue: 'Dame', difficulty: 'Moyen' },
  { id: 'test-heart-king-1', name: 'Roi Coeur - Dossier final', type: 'Coeur', cardValue: 'Roi', difficulty: 'Difficile' },
  { id: 'test-spade-jack-1', name: 'Valet Pique - Sprint urbain', type: 'Pique', cardValue: 'Valet', difficulty: 'Facile' },
  { id: 'test-spade-queen-1', name: 'Dame Pique - Parcours force', type: 'Pique', cardValue: 'Dame', difficulty: 'Moyen' },
  { id: 'test-spade-king-1', name: 'Roi Pique - Zone rouge', type: 'Pique', cardValue: 'Roi', difficulty: 'Difficile' },
  { id: 'test-diamond-jack-1', name: 'Valet Carreau - Code miroir', type: 'Carreau', cardValue: 'Valet', difficulty: 'Facile' },
  { id: 'test-diamond-queen-1', name: 'Dame Carreau - Suite logique', type: 'Carreau', cardValue: 'Dame', difficulty: 'Moyen' },
  { id: 'test-diamond-king-1', name: 'Roi Carreau - Cryptogramme', type: 'Carreau', cardValue: 'Roi', difficulty: 'Difficile' },
]

export function getTestCatalog(): TestCatalogItem[] {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) return defaultTestCatalog

  try {
    const parsed = JSON.parse(stored) as TestCatalogItem[]
    return parsed.length > 0 ? parsed : defaultTestCatalog
  } catch {
    return defaultTestCatalog
  }
}

export function saveTestCatalog(catalog: TestCatalogItem[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog))
}
