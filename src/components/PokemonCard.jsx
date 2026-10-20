import { getTypes, STAT_LABELS, TYPE_COLORS, pad } from '../utils'
import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import '../css/PokemonCard.css'

export default function PokemonCard({ pokemon, isFav, onToggleFav, onSelect }) {
  const types = getTypes(pokemon)

  return (
    <article
      className="card"
      style={{ '--c': TYPE_COLORS[types[0]] }}
      onClick={() => onSelect(pokemon)}
    >
      <button
        className={`fav ${isFav ? 'on' : ''}`}
        title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
        onClick={(e) => {
          e.stopPropagation()
          onToggleFav(pokemon.id)
        }}
      >
        {isFav ? '★' : '☆'}
      </button>

      <span className="card-id">#{pad(pokemon.id)}</span>
      <PokemonImage pokemon={pokemon} className="card-img" />
      <h3>{pokemon.name}</h3>

      <div className="badges">
        {types.map((t) => (
          <TypeBadge key={t} name={t} />
        ))}
      </div>

      <ul className="mini-stats">
        {Object.entries(pokemon.stats).map(([k, v]) => (
          <li key={k}>
            <span>{STAT_LABELS[k]}</span>
            <b>{v}</b>
          </li>
        ))}
      </ul>
    </article>
  )
}
