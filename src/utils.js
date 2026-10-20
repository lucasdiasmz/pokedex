// Cores associadas a cada tipo de Pokémon
export const TYPE_COLORS = {
  Typeless: '#9e9e9e',
  Normal: '#a8a77a',
  Fire: '#ee8130',
  Water: '#6390f0',
  Grass: '#7ac74c',
  Electric: '#f7d02c',
  Ice: '#96d9d6',
  Fighting: '#c22e28',
  Poison: '#a33ea1',
  Ground: '#e2bf65',
  Flying: '#a98ff3',
  Psychic: '#f95587',
  Bug: '#a6b91a',
  Rock: '#b6a136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6f35fc',
  Steel: '#b7b7ce',
}

// Nome dos tipos em português (o filtro continua usando o nome original do JSON)
export const TYPE_LABELS = {
  Typeless: 'Sem tipo',
  Normal: 'Normal',
  Fire: 'Fogo',
  Water: 'Água',
  Grass: 'Planta',
  Electric: 'Elétrico',
  Ice: 'Gelo',
  Fighting: 'Lutador',
  Poison: 'Veneno',
  Ground: 'Terra',
  Flying: 'Voador',
  Psychic: 'Psíquico',
  Bug: 'Inseto',
  Rock: 'Pedra',
  Ghost: 'Fantasma',
  Dark: 'Sombrio',
  Dragon: 'Dragão',
  Steel: 'Aço',
}

// Atributos na ordem em que aparecem na tela
export const STATS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATQ' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Especial', short: 'ATQ.E' },
  { key: 'specialDefense', label: 'Defesa Especial', short: 'DEF.E' },
  { key: 'speed', label: 'Velocidade', short: 'VEL' },
]

// Maior valor de atributo nos dados (Chansey tem 250 de HP); usado nas barras
export const MAX_STAT = 255

export function formatId(id) {
  return '#' + String(id).padStart(3, '0')
}

export function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function getTotal(stats) {
  return (
    stats.hp +
    stats.attack +
    stats.defense +
    stats.specialAttack +
    stats.specialDefense +
    stats.speed
  )
}

export function getTypeColor(pokemon) {
  if (pokemon.types.length === 0) {
    return TYPE_COLORS.Typeless
  }
  return TYPE_COLORS[pokemon.types[0].name] || TYPE_COLORS.Typeless
}
