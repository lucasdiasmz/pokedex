import { useState } from 'react'
import { formatId, getImageUrl } from '../utils.js'

// Mostra a imagem da PokéAPI; se não carregar, mostra o número no lugar
function PokemonImage({ id, name, className }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={className + ' image-fallback'}>{formatId(id)}</div>
  }

  return (
    <img
      className={className}
      src={getImageUrl(id)}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default PokemonImage
