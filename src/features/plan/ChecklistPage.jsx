import { useEffect } from 'react'
import { pathOf } from '../../data/countries/portugal'
import { useSession } from '../../app/useSession.jsx'
import { planStats, toggleTask } from '../../lib/session'
import './plan.css'

export function ChecklistPage() {
  const user = useSession()
  const path = pathOf(user.plan)
  const stats = planStats(user.plan, path)

  useEffect(() => {
    document.title = 'Checklist · Rumo'
  }, [])

  return (
    <div className="page plan">
      <p className="eyebrow">
        {path.name} · BR → PT
      </p>
      <h1>Checklist</h1>
      <p className="lead">{path.summary}</p>
      <p className="aside">{path.notThis}</p>

      <ol className="steps">
        {stats.tasks.map((task, index) => (
          <li key={task.id}>
            <button
              type="button"
              className={task.done ? 'step done' : 'step'}
              aria-pressed={task.done}
              onClick={() => toggleTask(task.id)}
            >
              <span className="box" aria-hidden="true">
                {task.done ? '✓' : index + 1}
              </span>
              <span>
                <strong>{task.title}</strong>
                <small>{task.detail}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <p className="callout">{path.lawyer}</p>
      <p className="notice">
        Confira a lista atual no{' '}
        <a href={path.official.url} target="_blank" rel="noopener noreferrer">
          {path.official.label}
        </a>
        . O Rumo não promete visto.
      </p>
    </div>
  )
}
