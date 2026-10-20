import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

export default function PokemonList({ pokemon, favorites, onToggleFav, onSelect }) {
  if (pokemon.length === 0) {
    return (
      <div className="empty">
        <p>😕 Nenhum Pokémon encontrado.</p>
        <small>Tente outro nome, ID ou tipo.</small>
      </div>
    )
  }

  return (
    <section className="grid">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFav={favorites.includes(p.id)}
          onToggleFav={onToggleFav}
          onSelect={onSelect}
        />
      ))}
    </section>
  )
}
