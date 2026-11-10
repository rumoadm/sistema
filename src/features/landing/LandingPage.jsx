import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSessionState } from '../../app/useSession.jsx'
import { Flag } from '../../components/Flag'
import { countries, countryOf } from '../../data/countries'
import { DOC_STATUS } from '../../lib/format'
import { scrollToSection, startPath } from './links'
import { SiteFrame } from './Site'

const sample = (() => {
  const country = countryOf('PT')
  const path = country.paths.find((item) => item.id === 'remoto')
  const done = ['encaixe', 'oficial']
  const tasks = path.tasks.slice(0, 4).map((task) => ({
    ...task,
    state: done.includes(task.id) ? 'done' : task.id === 'passaporte' ? 'next' : 'todo',
  }))
  const documents = [
    { id: 'passaporte', status: 'andamento' },
    { id: 'antecedentes', status: 'pendente' },
    { id: 'renda', status: 'pendente' },
  ].map((item) => ({ ...path.documents.find((document) => document.id === item.id), status: item.status }))
  return {
    country,
    path,
    tasks,
    documents,
    next: tasks.find((task) => task.state === 'next'),
    done: done.length,
    total: path.tasks.length,
  }
})()

const steps = [
  {
    id: 'destino',
    title: 'Conheça o destino',
    text: 'Explore informações sobre a vida no país antes de decidir.',
  },
  {
    id: 'situacao',
    title: 'Conte sobre sua situação',
    text: 'Responda perguntas simples, começando pelo que você já tem.',
  },
  {
    id: 'plano',
    title: 'Acompanhe seu plano',
    text: 'Veja o próximo passo e organize suas tarefas e documentos.',
  },
]

export function LandingPage() {
  const { user } = useSessionState()
  const { hash } = useLocation()
  const start = startPath(user)

  useEffect(() => {
    document.title = 'Rumo · Do sonho ao próximo passo.'
  }, [])

  useEffect(() => {
    if (hash) scrollToSection(hash.slice(1))
  }, [hash])

  return (
    <SiteFrame>
      <div className="lp">
        <section className="lp-hero">
          <div className="lp-hero-copy">
            <p className="lp-tag">Do sonho ao próximo passo.</p>
            <h1>Seu plano para morar fora começa aqui.</h1>
            <p className="lp-lead">
              Conheça o destino, entenda o que falta e organize sua mudança em um plano feito para a sua situação.
            </p>
            <div className="lp-hero-actions">
              <Link className="btn lp-btn" to={start}>
                Começar meu plano
              </Link>
              <Link className="lp-text-link" to="/paises/PT/sobre">
                Explorar Portugal
                <Arrow />
              </Link>
            </div>
          </div>
          <PlanPreview />
        </section>

        <section className="lp-section" id="como-funciona" aria-labelledby="como-funciona-titulo">
          <h2 id="como-funciona-titulo">Como funciona</h2>
          <ol className="lp-steps">
            {steps.map((step, index) => (
              <li key={step.id} className="lp-step">
                <div className="lp-step-top">
                  <span className="lp-step-icon">
                    <StepIcon id={step.id} />
                  </span>
                  <span className="lp-step-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-section" aria-labelledby="encontra-titulo">
          <h2 id="encontra-titulo">O que você encontra no Rumo</h2>
          <div className="lp-pair">
            <article className="lp-block">
              <span className="lp-step-icon">
                <StepIcon id="entender" />
              </span>
              <h3>Para entender</h3>
              <p>Informações sobre o destino, com fontes e datas, para ajudar você a decidir.</p>
            </article>
            <article className="lp-block lp-block-deep">
              <span className="lp-step-icon">
                <StepIcon id="plano" />
              </span>
              <h3>Para seguir</h3>
              <p>Um próximo passo claro, um checklist e uma lista de documentos que acompanham seu plano.</p>
            </article>
          </div>
        </section>

        <section className="lp-section" id="destinos" aria-labelledby="destinos-titulo">
          <h2 id="destinos-titulo">Destinos</h2>
          <div className="lp-dests">
            {countries.map((country) => (
              <DestinationCard key={country.code} country={country} />
            ))}
          </div>
        </section>

        <section className="lp-closing" aria-labelledby="fechamento-titulo">
          <h2 id="fechamento-titulo">Pronto para organizar seu próximo passo?</h2>
          <Link className="btn lp-btn lp-btn-light" to={start}>
            Começar meu plano
          </Link>
          {user ? null : (
            <p>
              <Link to="/entrar">Já tem conta? Entrar</Link>
            </p>
          )}
        </section>
      </div>
    </SiteFrame>
  )
}

function PlanPreview() {
  const { country, path, tasks, documents, next, done, total } = sample

  return (
    <figure className="lp-preview" aria-label={`Exemplo de plano para ${country.name}`}>
      <div className="lp-window">
        <div className="lp-window-top">
          <span className="lp-route">
            <Flag code={country.code} />
            {country.name} · {path.name}
          </span>
          <span className="lp-sample">Exemplo de plano</span>
        </div>

        <div className="lp-progress">
          <span>
            {done} de {total} passos
          </span>
          <div className="lp-bar" aria-hidden="true">
            <i style={{ width: `${Math.round((done / total) * 100)}%` }} />
          </div>
        </div>

        <section className="lp-next">
          <p>Seu próximo passo</p>
          <h3>{next.title}</h3>
          <span>{next.detail}</span>
        </section>

        <div className="lp-cols">
          <section className="lp-mini">
            <h4>Checklist</h4>
            <ul className="lp-tasks">
              {tasks.map((task) => (
                <li key={task.id} className={`lp-task is-${task.state}`}>
                  <span className="lp-tick" aria-hidden="true">
                    {task.state === 'done' ? (
                      <svg viewBox="0 0 12 12" width="10" height="10">
                        <path d="m2.5 6.2 2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                  </span>
                  <span>{task.title}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="lp-mini">
            <h4>Meus documentos</h4>
            <ul className="lp-docs">
              {documents.map((document) => (
                <li key={document.id}>
                  <span>{document.name}</span>
                  <span className={`lp-pill is-${document.status}`}>{DOC_STATUS[document.status]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </figure>
  )
}

function DestinationCard({ country }) {
  const open = country.paths.length > 0
  const paths = country.paths.map((path) => path.name).join(' · ')

  return (
    <article className={open ? 'lp-dest' : 'lp-dest is-soon'}>
      <img src={`${import.meta.env.BASE_URL}${country.cover}`} alt={country.coverAlt} loading="lazy" />
      <div className="lp-dest-shade" aria-hidden="true" />
      <div className="lp-dest-info">
        <div>
          <h3>
            <Flag code={country.code} />
            {country.name}
          </h3>
          {open ? <p>{paths}</p> : null}
        </div>
        {open ? (
          <Link className="lp-dest-link" to={`/paises/${country.code}/sobre`}>
            Conhecer {country.name}
            <Arrow />
          </Link>
        ) : (
          <span className="lp-soon">Em breve</span>
        )}
      </div>
    </article>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepIcon({ id }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    'aria-hidden': true,
  }
  if (id === 'destino') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m14.8 9.2-1.6 4-4 1.6 1.6-4z" strokeLinejoin="round" />
      </svg>
    )
  }
  if (id === 'situacao') {
    return (
      <svg {...common}>
        <path d="M5 5.5h14v9.5H9.5L5 18.5z" strokeLinejoin="round" />
        <path d="M9 9.5h6M9 12h3.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'entender') {
    return (
      <svg {...common}>
        <path d="M4 6.5c2.6-1.2 5.3-1.2 8 0v12c-2.7-1.2-5.4-1.2-8 0zM12 6.5c2.7-1.2 5.4-1.2 8 0v12c-2.6-1.2-5.3-1.2-8 0z" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="4.5" y="4" width="15" height="16.5" rx="3" />
      <path d="m8 9.2 1.4 1.4L12 8M8 14.6l1.4 1.4L12 13.4M14 9.4h2.5M14 14.8h2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
