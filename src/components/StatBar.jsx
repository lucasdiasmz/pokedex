const MAX_STAT = 255

export default function StatBar({ label, value, color }) {
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{ width: `${(value / MAX_STAT) * 100}%`, background: color }}
        />
      </div>
    </div>
  )
}
