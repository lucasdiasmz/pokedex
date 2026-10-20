import { useEffect } from 'react'
import { getTypes, STAT_LABELS, TYPE_COLORS, pad } from '../utils'
import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import '../css/PokemonDetails.css'

export default function PokemonDetails({ pokemon, trainers, onClose }) {
  const types = getTypes(pokemon)
  const color = TYPE_COLORS[types[0]]
  const owners = trainers.filter((t) => t.pokemonIds.includes(pokemon.id))
  const total = Object.values(pokemon.stats).reduce((a, b) => a + b, 0)

  // Fecha o modal com ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ '--c': color }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="modal-head">
          <PokemonImage pokemon={pokemon} className="modal-img" />
          <div>
            <span className="card-id">#{pad(pokemon.id)}</span>
            <h2>{pokemon.name}</h2>
            <div className="badges">
              {types.map((t) => (
                <TypeBadge key={t} name={t} />
              ))}
            </div>
          </div>
        </div>

        <div className="stats">
          {Object.entries(pokemon.stats).map(([k, v]) => (
            <StatBar key={k} label={STAT_LABELS[k]} value={v} color={color} />
          ))}
          <p className="total">
            Total: <b>{total}</b>
          </p>
        </div>

        {owners.length > 0 && (
          <p className="owners">
            🧑‍🚀 Treinadores: <b>{owners.map((o) => o.name).join(', ')}</b>
          </p>
        )}
      </div>
    </div>
  )
}
