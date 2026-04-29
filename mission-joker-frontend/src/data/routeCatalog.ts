export type RouteCatalogItem = {
  id: string
  type: 'Trefle' | 'Coeur' | 'Pique' | 'Carreau'
  name: string
  tests: {
    valet: string
    dame: string
    roi: string
  }
}

const STORAGE_KEY = 'mission-joker-route-catalog'

const LEGACY_TEST_NAME_MAP: Record<string, string> = {
  'Valet Trefle A': 'Valet Trefle - Balise Nord',
  'Dame Trefle A': 'Dame Trefle - Trajet cache',
  'Roi Trefle A': 'Roi Trefle - Coordonnees perdues',
  'Valet Coeur A': 'Valet Coeur - Interview flash',
  'Dame Coeur A': 'Dame Coeur - Enquete locale',
  'Roi Coeur A': 'Roi Coeur - Dossier final',
  'Valet Pique A': 'Valet Pique - Sprint urbain',
  'Dame Pique A': 'Dame Pique - Parcours force',
  'Roi Pique A': 'Roi Pique - Zone rouge',
  'Valet Carreau A': 'Valet Carreau - Code miroir',
  'Dame Carreau A': 'Dame Carreau - Suite logique',
  'Roi Carreau A': 'Roi Carreau - Cryptogramme',
}

function normalizeLegacyRouteCatalog(catalog: RouteCatalogItem[]): RouteCatalogItem[] {
  return catalog.map((route) => ({
    ...route,
    tests: {
      valet: LEGACY_TEST_NAME_MAP[route.tests.valet] ?? route.tests.valet,
      dame: LEGACY_TEST_NAME_MAP[route.tests.dame] ?? route.tests.dame,
      roi: LEGACY_TEST_NAME_MAP[route.tests.roi] ?? route.tests.roi,
    },
  }))
}

export const defaultRouteCatalog: RouteCatalogItem[] = [
  {
    id: 'club-1',
    type: 'Trefle',
    name: 'Trefle - Trajet des messagers',
    tests: {
      valet: 'Valet Trefle - Balise Nord',
      dame: 'Dame Trefle - Trajet cache',
      roi: 'Roi Trefle - Coordonnees perdues',
    },
  },
  {
    id: 'heart-1',
    type: 'Coeur',
    name: 'Coeur - Enquete publique',
    tests: {
      valet: 'Valet Coeur - Interview flash',
      dame: 'Dame Coeur - Enquete locale',
      roi: 'Roi Coeur - Dossier final',
    },
  },
  {
    id: 'spade-1',
    type: 'Pique',
    name: 'Pique - Sprint tactique',
    tests: {
      valet: 'Valet Pique - Sprint urbain',
      dame: 'Dame Pique - Parcours force',
      roi: 'Roi Pique - Zone rouge',
    },
  },
  {
    id: 'diamond-1',
    type: 'Carreau',
    name: 'Carreau - Code miroir',
    tests: {
      valet: 'Valet Carreau - Code miroir',
      dame: 'Dame Carreau - Suite logique',
      roi: 'Roi Carreau - Cryptogramme',
    },
  },
]

export function getRouteCatalog(): RouteCatalogItem[] {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) return normalizeLegacyRouteCatalog(defaultRouteCatalog)

  try {
    const parsed = JSON.parse(stored) as RouteCatalogItem[]
    return parsed.length > 0
      ? normalizeLegacyRouteCatalog(parsed)
      : normalizeLegacyRouteCatalog(defaultRouteCatalog)
  } catch {
    return normalizeLegacyRouteCatalog(defaultRouteCatalog)
  }
}

export function saveRouteCatalog(catalog: RouteCatalogItem[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog))
}
