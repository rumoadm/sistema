import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { pathOf, portugal } from '../../data/countries/portugal'
import { useSession } from '../../app/useSession.jsx'
import { greeting } from '../../lib/format'
import { planStats } from '../../lib/session'
import './dashboard.css'

export function DashboardPage() {
  const user = useSession()
  const path = pathOf(user.plan)
  const stats = planStats(user.plan, path)

  useEffect(() => {
    document.title = 'Plano · Rumo'
  }, [])

  return (
    <div className="page dash">
      <p className="eyebrow">Plano geral</p>
      <h1>{greeting(user.name)}.</h1>
      <p className="lead">Sua jornada está ficando mais organizada.</p>

      <section className="stats" aria-label="Resumo do plano">
        <article className="card">
          <p className="eyebrow">Organização</p>
          <p className="percent">
            {stats.progress}
            <span>%</span>
          </p>
          <p className="card-label">do plano organizado</p>
          <div className="bar" aria-hidden="true">
            <i style={{ width: `${stats.progress}%` }} />
          </div>
        </article>

        <article className="card dest">
          <p className="eyebrow">Destino de exemplo</p>
          <p className="codes">
            <b>{portugal.from}</b>
            <span aria-hidden="true">→</span>
            <b>{portugal.code}</b>
          </p>
          <h2>{portugal.name}</h2>
          <p>{path.name}</p>
        </article>

        <article className="card next">
          <p className="eyebrow">Seu próximo passo</p>
          <h2>{stats.next ? stats.next.title : 'Checklist em dia'}</h2>
          <p>{stats.next ? stats.next.detail : 'Os passos deste exemplo estão concluídos.'}</p>
          <Link className="btn" to="/checklist">
            Abrir checklist
          </Link>
        </article>
      </section>

      <section className="milestones" aria-label="Marcos">
        <h2>Marcos</h2>
        <ul>
          <li className="on">
            <b>Primeira rota</b>
            <span>Portugal, trabalho remoto</span>
          </li>
          <li className={stats.documentsReady ? 'on' : ''}>
            <b>Documentos em ordem</b>
            <span>{stats.documentsReady ? 'Lista pronta' : 'Ainda falta papel'}</span>
          </li>
          <li className={stats.tasksReady ? 'on' : ''}>
            <b>Passos do caminho</b>
            <span>{stats.tasksReady ? 'Checklist concluído' : 'Siga o próximo passo'}</span>
          </li>
        </ul>
      </section>

      <p className="notice">
        O Rumo organiza o seu plano. Não promete visto e não substitui um advogado. Portugal aqui é um exemplo
        para validar o fluxo. Confira as regras no{' '}
        <a href={path.official.url} target="_blank" rel="noopener noreferrer">
          {path.official.label}
        </a>
        .
      </p>
    </div>
  )
}
