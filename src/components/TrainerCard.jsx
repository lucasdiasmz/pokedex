import PokemonImage from './PokemonImage.jsx'
import { formatId, getTypeColor } from '../utils.js'

function TrainerCard({ trainer, allPokemon, onSelectPokemon }) {
  // Converte a lista de IDs em objetos de Pokémon (pode ter repetidos, ex.: Koga)
  const team = trainer.pokemonIds
    .map((id) => allPokemon.find((p) => p.id === id))
    .filter((p) => p !== undefined)

  const initials = trainer.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)

  return (
    <article className="trainer-card">
      <div className="trainer-header">
        <div className="trainer-avatar">{initials}</div>
        <div>
          <h3 className="trainer-name">{trainer.name}</h3>
          <p className="trainer-badges">
            🏅 {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
          </p>
        </div>
      </div>

      <ul className="trainer-team">
        {team.map((p, index) => (
          // index na key porque o mesmo Pokémon pode aparecer mais de uma vez
          <li key={p.id + '-' + index}>
            <button
              className="team-member"
              style={{ '--type-color': getTypeColor(p) }}
              onClick={() => onSelectPokemon(p)}
              title={p.name}
            >
              <PokemonImage id={p.id} name={p.name} className="team-image" />
              <span className="team-name">{p.name}</span>
              <span className="team-id">{formatId(p.id)}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default TrainerCard
