type WaitlistConnectPromptProps = {
  onClose: () => void
  onOpenLogin: () => void
}

export function WaitlistConnectPrompt({ onClose, onOpenLogin }: WaitlistConnectPromptProps) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="auth-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="close-btn" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <h2>LISTE D&apos;ATTENTE</h2>
        <p>
          Pour rejoindre la liste d&apos;attente, connecte-toi d&apos;abord avec ton compte Mission Joker.
        </p>
        <p>
          L&apos;inscription sur la communaute <strong>Vimtails</strong> utilisera le <strong>meme email</strong> que celui
          de ton compte ici : il est important d&apos;etre identifie avant de continuer.
        </p>
        <p className="hint">Dans ce prototype, la suite Vimtails reste simulee.</p>
        <div className="stack">
          <button
            type="button"
            className="btn btn-primary full"
            onClick={() => {
              onOpenLogin()
              onClose()
            }}
          >
            Se connecter
          </button>
          <button type="button" className="btn btn-secondary full" onClick={onClose}>
            Fermer
          </button>
        </div>
      </section>
    </div>
  )
}
