import TypeBadge from './TypeBadge.jsx'
import { STATS } from '../utils.js'
import '../css/Filters.css'

function Filters({
  types,
  selectedType,
  onSelectType,
  sortBy,
  onChangeSort,
  sortDesc,
  onToggleSortDirection,
  onlyFavorites,
  onToggleOnlyFavorites,
  favoritesCount,
  onRandom,
}) {
  return (
    <div className="filters">
      <div className="type-filters" role="group" aria-label="Filtrar por tipo">
        <button
          className={selectedType === 'all' ? 'type-chip all active' : 'type-chip all'}
          onClick={() => onSelectType('all')}
        >
          Todos
        </button>
        {types.map((type) => (
          <button
            key={type.id}
            className={selectedType === type.name ? 'type-chip active' : 'type-chip'}
            onClick={() => onSelectType(type.name)}
          >
            <TypeBadge name={type.name} />
          </button>
        ))}
      </div>

      <div className="filter-actions">
        <label className="sort">
          Ordenar por
          <select value={sortBy} onChange={(event) => onChangeSort(event.target.value)}>
            <option value="id">Número</option>
            <option value="name">Nome</option>
            {STATS.map((stat) => (
              <option key={stat.key} value={stat.key}>
                {stat.label}
              </option>
            ))}
            <option value="total">Total</option>
          </select>
        </label>

        <button
          className="action-btn"
          onClick={onToggleSortDirection}
          title={sortDesc ? 'Decrescente' : 'Crescente'}
        >
          {sortDesc ? '↓ Decrescente' : '↑ Crescente'}
        </button>

        <button
          className={onlyFavorites ? 'action-btn active' : 'action-btn'}
          onClick={onToggleOnlyFavorites}
        >
          {onlyFavorites ? '★' : '☆'} Favoritos ({favoritesCount})
        </button>

        <button className="action-btn random" onClick={onRandom}>
          🎲 Aleatório
        </button>
      </div>
    </div>
  )
}

export default Filters
