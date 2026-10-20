import { useEffect } from 'react'
import TypeBadge from './TypeBadge.jsx'
import StatBar from './StatBar.jsx'
import PokemonImage from './PokemonImage.jsx'
import { STATS, formatId, getTotal, getTypeColor } from '../utils.js'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, isFavorite, onToggleFavorite, onClose, trainers }) {
  const color = getTypeColor(pokemon)
  const total = getTotal(pokemon.stats)

  // Treinadores que possuem este Pokémon
  const owners = trainers.filter((t) => t.pokemonIds.includes(pokemon.id))

  // Fecha o modal com a tecla ESC e trava a rolagem da página por trás
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ '--type-color': color }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={'Detalhes de ' + pokemon.name}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="modal-hero">
          <PokemonImage id={pokemon.id} name={pokemon.name} className="modal-image" />
        </div>

        <div className="modal-body">
          <span className="modal-id">{formatId(pokemon.id)}</span>
          <h2 className="modal-name">{pokemon.name}</h2>

          <div className="modal-types">
            {pokemon.types.length === 0 && <TypeBadge name="Typeless" />}
            {pokemon.types.map((type) => (
              <TypeBadge key={type.id} name={type.name} />
            ))}
          </div>

          <h3 className="modal-section-title">Atributos</h3>
          <div className="modal-stats">
            {STATS.map((stat) => (
              <StatBar
                key={stat.key}
                label={stat.label}
                value={pokemon.stats[stat.key]}
                color={color}
              />
            ))}
          </div>
          <p className="modal-total">
            Total: <strong>{total}</strong>
          </p>

          {owners.length > 0 && (
            <>
              <h3 className="modal-section-title">Treinadores</h3>
              <p className="modal-owners">{owners.map((t) => t.name).join(', ')}</p>
            </>
          )}

          <button
            className={isFavorite ? 'action-btn active modal-fav' : 'action-btn modal-fav'}
            onClick={() => onToggleFavorite(pokemon.id)}
          >
            {isFavorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
