import PokemonCard from './PokemonCard.jsx'
import '../css/PokemonList.css'

function PokemonList({ pokemon, favorites, onSelect, onToggleFavorite, onClearFilters }) {
  if (pokemon.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">😵</span>
        <h2>Nenhum Pokémon encontrado</h2>
        <p>Tente outro nome, número ou tipo.</p>
        <button className="action-btn" onClick={onClearFilters}>
          Limpar filtros
        </button>
      </div>
    )
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default PokemonList
