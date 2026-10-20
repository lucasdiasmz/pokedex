import { MAX_STAT } from '../utils.js'
import '../css/StatBar.css'

function StatBar({ label, value, color }) {
  const percent = Math.round((value / MAX_STAT) * 100)

  return (
    <div className="stat-bar">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{ width: percent + '%', backgroundColor: color }}
        ></div>
      </div>
    </div>
  )
}

export default StatBar
