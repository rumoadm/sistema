import { useEffect } from 'react'
import { countryOf, pathOf } from '../../data/countries'
import { useSession } from '../../app/useSession.jsx'
import { DOC_STATUS } from '../../lib/format'
import { cycleDocument, planStats } from '../../lib/session'
import './plan.css'
import '../countries/countries.css'

export function DocumentsPage() {
  const user = useSession()
  const country = countryOf(user.plan.countryCode)
  const path = pathOf(user.plan)
  const stats = planStats(user.plan, path)
  const openDocs = stats.documents.filter((document) => document.lane !== 'seguir')
  const nextDocs = stats.documents.filter((document) => document.lane === 'seguir')

  useEffect(() => {
    document.title = 'Documentos · Rumo'
  }, [])

  return (
    <div className="page plan">
      <p className="eyebrow">
        Papelada · {country.from} → {country.code}
      </p>
      <h1>Documentos</h1>
      <p className="lead">Toque no status para avançar: pendente, em andamento ou pronto.</p>

      <DocLane title="Para entender" documents={openDocs} />
      <DocLane title="Para seguir" documents={nextDocs} />

      <p className="notice">
        A lista muda conforme o caminho e a fonte oficial. Veja o{' '}
        <a href={path.official.url} target="_blank" rel="noopener noreferrer">
          {path.official.label}
        </a>
        .
      </p>
    </div>
  )
}

function DocLane({ title, documents }) {
  if (!documents.length) return null
  return (
    <section className="lane">
      <h2>{title}</h2>
      <ul className="docs">
        {documents.map((document) => (
          <li key={document.id} className="doc">
            <div>
              <strong>{document.name}</strong>
              <small>{document.note}</small>
            </div>
            <button
              type="button"
              className={`status status-${document.status}`}
              onClick={() => cycleDocument(document.id)}
              aria-label={`${document.name}: ${DOC_STATUS[document.status]}. Toque para mudar.`}
            >
              {DOC_STATUS[document.status]}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
