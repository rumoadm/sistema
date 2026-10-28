import { useEffect } from 'react'
import { pathOf } from '../../data/countries/portugal'
import { useSession } from '../../app/useSession.jsx'
import { DOC_STATUS } from '../../lib/format'
import { cycleDocument, planStats } from '../../lib/session'
import './plan.css'

export function DocumentsPage() {
  const user = useSession()
  const path = pathOf(user.plan)
  const stats = planStats(user.plan, path)

  useEffect(() => {
    document.title = 'Documentos · Rumo'
  }, [])

  return (
    <div className="page plan">
      <p className="eyebrow">Papelada · BR → PT</p>
      <h1>Documentos</h1>
      <p className="lead">Toque no status para avançar: pendente, em andamento ou pronto.</p>

      <ul className="docs">
        {stats.documents.map((document) => (
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
