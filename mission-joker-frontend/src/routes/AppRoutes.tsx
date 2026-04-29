import { Route, Routes } from 'react-router-dom'
import { AdminCreateRoutePage } from '../pages/AdminCreateRoutePage'
import { AdminCreateSessionPage } from '../pages/AdminCreateSessionPage'
import { AdminCreateTestPage } from '../pages/AdminCreateTestPage'
import { AdminRouteLibraryPage } from '../pages/AdminRouteLibraryPage'
import { AdminTestLibraryPage } from '../pages/AdminTestLibraryPage'
import { JuryDashboardPage } from '../pages/JuryDashboardPage'
import { JuryEpreuvePage } from '../pages/JuryEpreuvePage'
import { JuryParcoursPage } from '../pages/JuryParcoursPage'
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
      <Route path="/admin/tests/create" element={<AdminCreateTestPage role={role} />} />
      <Route path="/admin/tests/library" element={<AdminTestLibraryPage role={role} />} />
      <Route path="/admin/routes/create" element={<AdminCreateRoutePage role={role} />} />
      <Route path="/admin/routes/library" element={<AdminRouteLibraryPage role={role} />} />
      <Route path="/admin/sessions/create" element={<AdminCreateSessionPage role={role} />} />
      <Route path="/jury/dashboard" element={<JuryDashboardPage role={role} />} />
      <Route path="/jury/parcours/jury" element={<JuryParcoursPage role={role} />} />
      <Route path="/jury/parcours/jury/epreuve/valet" element={<JuryEpreuvePage role={role} />} />
    </Routes>
  )
}
