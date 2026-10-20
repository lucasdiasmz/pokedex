import { useState } from 'react'
import { spriteUrl, pad } from '../utils'

// Imagem da PokéAPI (sprites). Se falhar (offline), mostra o número como fallback.
export default function PokemonImage({ pokemon, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={`img-fallback ${className}`}>#{pad(pokemon.id)}</div>
  }

  return (
    <img
      className={className}
      src={spriteUrl(pokemon.id)}
      alt={pokemon.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
