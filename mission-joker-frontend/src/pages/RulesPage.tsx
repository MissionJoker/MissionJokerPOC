export function RulesPage() {
  return (
    <section className="rules-page">
      <article className="rule-card">
        <h2>L&apos;INTRIGUE</h2>
        <p>
          Agents, la situation est critique. Le Joker a derobe les cartes maitresses de l&apos;organisation et les a
          dispersees a travers la ville. Votre mission est d&apos;infiltrer ses zones, reussir ses epreuves et
          reconstituer l&apos;ensemble avant la fin de la session.
        </p>
      </article>

      <article className="rule-card">
        <h2>LES OBJECTIFS</h2>
        <p>
          Votre escouade doit valider un total de <strong>12 defis</strong>, repartis sur le parcours. Les equipes
          accumulent des points a chaque reussite et montent au classement en temps reel.
        </p>
        <ul>
          <li>4 equipes participent a la session.</li>
          <li>Chaque defi valide debloque une carte.</li>
          <li>Il y a 12 cartes a recuperer (Valet, Dame, Roi).</li>
          <li>Une seule equipe remporte la victoire finale.</li>
        </ul>
      </article>
    </section>
  )
}
