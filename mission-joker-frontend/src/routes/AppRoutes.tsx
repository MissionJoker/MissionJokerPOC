import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { EpreuvePage } from '../pages/EpreuvePage'
import { ParcoursPage } from '../pages/ParcoursPage'
import { RulesPage } from '../pages/RulesPage'
import { TeamDashboardPage } from '../pages/TeamDashboardPage'
import type { Role } from '../types'

type AppRoutesProps = {
  role: Role
  playerTeamName: string | null
  onOpenLogin: () => void
}

export function AppRoutes({ role, playerTeamName, onOpenLogin }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<HomePage role={role} playerTeamName={playerTeamName} onOpenLogin={onOpenLogin} />} />
      <Route path="/regles" element={<RulesPage />} />
      <Route path="/equipe" element={<TeamDashboardPage role={role} playerTeamName={playerTeamName} />} />
      <Route path="/parcours/:parcoursId" element={<ParcoursPage role={role} />} />
      <Route path="/parcours/:parcoursId/epreuve/:epreuveId" element={<EpreuvePage role={role} />} />
    </Routes>
  )
}
