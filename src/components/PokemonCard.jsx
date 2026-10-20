import TypeBadge from './TypeBadge.jsx'
import PokemonImage from './PokemonImage.jsx'
import { STATS, formatId, getTypeColor } from '../utils.js'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, isFavorite, onSelect, onToggleFavorite }) {
  const color = getTypeColor(pokemon)

  function handleFavoriteClick(event) {
    // Impede que o clique na estrela também abra os detalhes
    event.stopPropagation()
    onToggleFavorite(pokemon.id)
  }

  return (
    <article
      className="pokemon-card"
      style={{ '--type-color': color }}
      onClick={() => onSelect(pokemon)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSelect(pokemon)
        }
      }}
    >
      <button
        className={isFavorite ? 'fav-btn active' : 'fav-btn'}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div className="card-image-wrap">
        <PokemonImage id={pokemon.id} name={pokemon.name} className="card-image" />
      </div>

      <span className="card-id">{formatId(pokemon.id)}</span>
      <h3 className="card-name">{pokemon.name}</h3>

      <div className="card-types">
        {pokemon.types.length === 0 && <TypeBadge name="Typeless" />}
        {pokemon.types.map((type) => (
          <TypeBadge key={type.id} name={type.name} />
        ))}
      </div>

      <dl className="card-stats">
        {STATS.map((stat) => (
          <div key={stat.key} className="card-stat">
            <dt>{stat.short}</dt>
            <dd>{pokemon.stats[stat.key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export default PokemonCard
