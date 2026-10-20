import PokemonImage from './PokemonImage'
import '../css/TrainerList.css'

export default function TrainerList({ trainers, pokemon, onSelect }) {
  const byId = Object.fromEntries(pokemon.map((p) => [p.id, p]))

  return (
    <section className="trainers">
      {trainers.map((t) => (
        <article key={t.id} className="trainer">
          <header>
            <h3>🧑‍🚀 {t.name}</h3>
            <span className="badges-count">🏅 {t.badges} insígnia(s)</span>
          </header>

          <div className="team">
            {t.pokemonIds.map((id) => {
              const p = byId[id]
              if (!p) return null
              return (
                <button key={id} className="team-member" onClick={() => onSelect(p)}>
                  <PokemonImage pokemon={p} className="team-img" />
                  <span>{p.name}</span>
                </button>
              )
            })}
          </div>
        </article>
      ))}
    </section>
  )
}
