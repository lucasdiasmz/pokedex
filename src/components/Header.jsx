import '../css/Header.css'

function Header({ page, onChangePage, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <span className="pokeball" aria-hidden="true"></span>
          <h1>Pokédex</h1>
        </div>

        <nav className="header-nav">
          <button
            className={page === 'pokedex' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onChangePage('pokedex')}
          >
            Pokémon
          </button>
          <button
            className={page === 'trainers' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onChangePage('trainers')}
          >
            Treinadores
          </button>
          <button
            className="theme-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
