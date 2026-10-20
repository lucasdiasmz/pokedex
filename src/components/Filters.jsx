import { TYPE_COLORS } from '../utils'
import '../css/Filters.css'

const SORTS = [
  ['id', 'ID'],
  ['name', 'Nome'],
  ['hp', 'HP'],
  ['attack', 'Ataque'],
  ['defense', 'Defesa'],
  ['specialAttack', 'Atq. Esp.'],
  ['specialDefense', 'Def. Esp.'],
  ['speed', 'Velocidade'],
]

export default function Filters({
  types,
  selectedType,
  onType,
  sortBy,
  onSort,
  onlyFavs,
  onToggleFavs,
}) {
  return (
    <div className="filters">
      <div className="type-filter">
        <button
          className={`chip ${selectedType === 'all' ? 'active' : ''}`}
          onClick={() => onType('all')}
        >
          Todos
        </button>
        {types.map((t) => (
          <button
            key={t}
            className={`chip ${selectedType === t ? 'active' : ''}`}
            style={{ '--c': TYPE_COLORS[t] }}
            onClick={() => onType(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="filter-row">
        <label>
          Ordenar por{' '}
          <select value={sortBy} onChange={(e) => onSort(e.target.value)}>
            {SORTS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <button
          className={`chip ${onlyFavs ? 'active' : ''}`}
          onClick={onToggleFavs}
        >
          ★ Só favoritos
        </button>
      </div>
    </div>
  )
}
