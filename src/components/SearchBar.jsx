import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">🔎</span>
      <input
        type="text"
        placeholder="Pesquisar Pokémon por nome ou número..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Pesquisar Pokémon"
      />
      {value !== '' && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Limpar pesquisa">
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
