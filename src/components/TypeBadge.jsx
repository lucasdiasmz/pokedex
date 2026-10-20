import { TYPE_COLORS } from '../utils'

export default function TypeBadge({ name }) {
  return (
    <span className="type-badge" style={{ background: TYPE_COLORS[name] }}>
      {name}
    </span>
  )
}
