import { useEffect } from 'react'
import { countryOf, pathOf } from '../../data/countries'
import { useSession } from '../../app/useSession.jsx'
import { reviewedOn } from '../../lib/format'
import { planStats, toggleTask } from '../../lib/session'
import './plan.css'
import '../countries/countries.css'

export function ChecklistPage() {
  const user = useSession()
  const country = countryOf(user.plan.countryCode)
  const path = pathOf(user.plan)
  const stats = planStats(user.plan, path)
  const openTasks = stats.tasks.filter((task) => task.lane !== 'seguir')
  const nextTasks = stats.tasks.filter((task) => task.lane === 'seguir')

  useEffect(() => {
    document.title = 'Checklist · Rumo'
  }, [])

  return (
    <div className="page plan">
      <p className="eyebrow">
        {path.name} · {country.from} → {country.code}
      </p>
      <h1>Checklist</h1>
      <p className="lead">{path.summary}</p>
      <p className="aside">{path.notThis}</p>

      <TaskLane
        title="Para entender"
        hint="Isto mostra como o caminho funciona. O passaporte é o primeiro papel."
        tasks={openTasks}
        start={1}
      />
      <TaskLane
        title="Para seguir"
        hint="O restante do caminho. A lista oficial manda no que enviar."
        tasks={nextTasks}
        start={openTasks.length + 1}
      />

      <p className="callout">{path.lawyer}</p>
      <p className="notice">
        Confira a lista atual no{' '}
        <a href={path.official.url} target="_blank" rel="noopener noreferrer">
          {path.official.label}
        </a>
        {path.official.reviewed ? `, fonte conferida em ${reviewedOn(path.official.reviewed)}` : ''}. O Rumo não
        promete visto.
      </p>
    </div>
  )
}

function TaskLane({ title, hint, tasks, start }) {
  if (!tasks.length) return null
  return (
    <section className="lane">
      <h2>{title}</h2>
      <p className="aside">{hint}</p>
      <ol className="steps">
        {tasks.map((task, index) => (
          <li key={task.id}>
            <button
              type="button"
              className={task.done ? 'step done' : 'step'}
              aria-pressed={task.done}
              onClick={() => toggleTask(task.id)}
            >
              <span className="box" aria-hidden="true">
                {task.done ? '✓' : start + index}
              </span>
              <span>
                <strong>{task.title}</strong>
                <small>{task.detail}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
