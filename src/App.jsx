import { useState, useEffect, useMemo } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import Filters from './components/Filters.jsx'
import PokemonList from './components/PokemonList.jsx'
import PokemonDetails from './components/PokemonDetails.jsx'
import TrainerList from './components/TrainerList.jsx'
import { getTotal } from './utils.js'
import './css/App.css'

// Lê um valor salvo no navegador (ou devolve o valor padrão)
function loadSaved(key, defaultValue) {
  const saved = localStorage.getItem(key)
  if (saved === null) {
    return defaultValue
  }
  return JSON.parse(saved)
}

function App() {
  // ----- Estados -----
  const [page, setPage] = useState('pokedex') // 'pokedex' ou 'trainers'
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [sortDesc, setSortDesc] = useState(false)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favorites, setFavorites] = useState(() => loadSaved('pokedex-favorites', []))
  const [theme, setTheme] = useState(() => loadSaved('pokedex-theme', 'dark'))
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  // ----- Efeitos -----
  // Salva os favoritos sempre que mudarem
  useEffect(() => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Aplica o tema no <html> e salva a escolha
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pokedex-theme', JSON.stringify(theme))
  }, [theme])

  // ----- Estados derivados -----
  // Só os tipos que realmente aparecem em algum Pokémon do JSON
  const availableTypes = useMemo(() => {
    return data.types.filter((type) =>
      data.pokemon.some((p) => p.types.some((t) => t.name === type.name))
    )
  }, [])

  // Lista final: pesquisa + filtro de tipo + favoritos + ordenação
  const visiblePokemon = useMemo(() => {
    const term = search.trim().toLowerCase()

    const filtered = data.pokemon.filter((p) => {
      const matchesSearch =
        term === '' ||
        p.name.toLowerCase().includes(term) ||
        String(p.id) === term.replace('#', '').replace(/^0+/, '')

      const matchesType =
        selectedType === 'all' || p.types.some((t) => t.name === selectedType)

      const matchesFavorite = !onlyFavorites || favorites.includes(p.id)

      return matchesSearch && matchesType && matchesFavorite
    })

    const sorted = [...filtered].sort((a, b) => {
      let result
      if (sortBy === 'name') {
        result = a.name.localeCompare(b.name)
      } else if (sortBy === 'id') {
        result = a.id - b.id
      } else if (sortBy === 'total') {
        result = getTotal(a.stats) - getTotal(b.stats)
      } else {
        result = a.stats[sortBy] - b.stats[sortBy]
      }
      return sortDesc ? -result : result
    })

    return sorted
  }, [search, selectedType, sortBy, sortDesc, onlyFavorites, favorites])

  // ----- Eventos -----
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  function pickRandom() {
    const index = Math.floor(Math.random() * data.pokemon.length)
    setSelectedPokemon(data.pokemon[index])
  }

  function clearFilters() {
    setSearch('')
    setSelectedType('all')
    setOnlyFavorites(false)
  }

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app">
      <Header
        page={page}
        onChangePage={setPage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="app-main">
        {page === 'pokedex' && (
          <>
            <section className="toolbar">
              <SearchBar value={search} onChange={setSearch} />
              <Filters
                types={availableTypes}
                selectedType={selectedType}
                onSelectType={setSelectedType}
                sortBy={sortBy}
                onChangeSort={setSortBy}
                sortDesc={sortDesc}
                onToggleSortDirection={() => setSortDesc(!sortDesc)}
                onlyFavorites={onlyFavorites}
                onToggleOnlyFavorites={() => setOnlyFavorites(!onlyFavorites)}
                favoritesCount={favorites.length}
                onRandom={pickRandom}
              />
            </section>

            <p className="result-count">
              {visiblePokemon.length} de {data.pokemon.length} Pokémon
            </p>

            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              onSelect={setSelectedPokemon}
              onToggleFavorite={toggleFavorite}
              onClearFilters={clearFilters}
            />
          </>
        )}

        {page === 'trainers' && (
          <TrainerList
            trainers={data.trainers}
            allPokemon={data.pokemon}
            onSelectPokemon={setSelectedPokemon}
          />
        )}
      </main>

      <footer className="app-footer">
        Atividade 03 · Pokédex com React + Vite · Imagens: PokéAPI
      </footer>

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedPokemon(null)}
          trainers={data.trainers}
        />
      )}
    </div>
  )
}

export default App
