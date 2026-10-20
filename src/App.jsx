import { useState, useEffect, useMemo } from 'react'
import data from './data/pokedex-data.json'
import { getTypes } from './utils'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import './css/App.css'

const ALL_TYPES = data.types.map((t) => t.name)

// Lê um valor do localStorage com fallback
const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [view, setView] = useState('pokedex') // 'pokedex' | 'trainers'
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [onlyFavs, setOnlyFavs] = useState(false)
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(() => load('favs', []))
  const [dark, setDark] = useState(() => load('dark', true))

  // Persistência (useEffect)
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(dark))
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const toggleFav = (id) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  // Estado derivado: lista filtrada + ordenada
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return data.pokemon
      .filter((p) => !q || p.name.toLowerCase().includes(q) || String(p.id).includes(q))
      .filter((p) => type === 'all' || getTypes(p).includes(type))
      .filter((p) => !onlyFavs || favorites.includes(p.id))
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'id') return a.id - b.id
        return b.stats[sortBy] - a.stats[sortBy] // atributos: maior primeiro
      })
  }, [search, type, sortBy, onlyFavs, favorites])

  const randomPokemon = () =>
    setSelected(data.pokemon[Math.floor(Math.random() * data.pokemon.length)])

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span className="ball" /> Pokédex
        </h1>
        <nav>
          <button
            className={view === 'pokedex' ? 'active' : ''}
            onClick={() => setView('pokedex')}
          >
            Pokémon
          </button>
          <button
            className={view === 'trainers' ? 'active' : ''}
            onClick={() => setView('trainers')}
          >
            Treinadores
          </button>
          <button onClick={randomPokemon}>🎲 Aleatório</button>
          <button onClick={() => setDark(!dark)} title="Alternar tema">
            {dark ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      <main>
        {view === 'pokedex' ? (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <Filters
              types={ALL_TYPES}
              selectedType={type}
              onType={setType}
              sortBy={sortBy}
              onSort={setSortBy}
              onlyFavs={onlyFavs}
              onToggleFavs={() => setOnlyFavs(!onlyFavs)}
            />
            <p className="count">{visible.length} Pokémon</p>
            <PokemonList
              pokemon={visible}
              favorites={favorites}
              onToggleFav={toggleFav}
              onSelect={setSelected}
            />
          </>
        ) : (
          <TrainerList
            trainers={data.trainers}
            pokemon={data.pokemon}
            onSelect={setSelected}
          />
        )}
      </main>

      {selected && (
        <PokemonDetails
          pokemon={selected}
          trainers={data.trainers}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
