type ProfileModalProps = {
  pseudo: string
  email: string
  statusLabel: string
  onClose: () => void
  onChangePassword: () => void
  onLogout: () => void
}

export function ProfileModal({
  pseudo,
  email,
  statusLabel,
  onClose,
  onChangePassword,
  onLogout,
}: ProfileModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="auth-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="close-btn" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <h2>MON PROFIL</h2>
        <div className="profile-list">
          <p>
            <strong>Statut:</strong> {statusLabel}
          </p>
          <p>
            <strong>Pseudo:</strong> {pseudo}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
        <div className="stack">
          <button type="button" className="btn btn-secondary" onClick={onChangePassword}>
            Modifier mon mot de passe
          </button>
          <button type="button" className="btn btn-primary" onClick={onLogout}>
            Deconnexion
          </button>
        </div>
      </section>
    </div>
  )
}
