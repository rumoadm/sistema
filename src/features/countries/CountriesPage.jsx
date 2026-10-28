import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useMatch, useNavigate, useParams } from 'react-router-dom'
import { useSession } from '../../app/useSession.jsx'
import { Flag } from '../../components/Flag'
import { countries, countryOf, pathOf } from '../../data/countries'
import { reviewedOn } from '../../lib/format'
import { choosePath } from '../../lib/session'
import './countries.css'

export function CountriesPage() {
  const user = useSession()
  const { code } = useParams()
  const about = useMatch('/paises/:code/sobre')
  const country = code ? countryOf(code) : null

  useEffect(() => {
    document.title = country ? `${country.name} · Rumo` : 'Destino · Rumo'
  }, [country])

  if (code && !country) return <Navigate to="/paises" replace />
  if (country && about) return <CountryAbout country={country} />
  if (country) return <PathChoice user={user} country={country} />

  const current = user.plan ? countryOf(user.plan.countryCode) : null
  const currentPath = user.plan ? pathOf(user.plan) : null

  return (
    <div className="page countries">
      <h1>Para qual desses países você gostaria de se mudar?</h1>
      {current && currentPath ? (
        <p className="current-plan">
          Seu plano agora é {current.name}, {currentPath.name.toLowerCase()}.{' '}
          <Link to="/plano">Voltar ao plano</Link>
        </p>
      ) : null}

      <div className="country-pick">
        {countries.map((item) => (
          <article key={item.code} className={current?.code === item.code ? 'country-option on' : 'country-option'}>
            <Flag code={item.code} />
            <h2>{item.name}</h2>
            <div className="country-actions">
              <Link className="btn ghost" to={`/paises/${item.code}/sobre`}>
                Entender mais sobre o país
              </Link>
              <Link className="btn" to={`/paises/${item.code}`}>
                Escolher este
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function PathChoice({ user, country }) {
  const navigate = useNavigate()
  const [pending, setPending] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const currentCountry = user.plan ? countryOf(user.plan.countryCode) : null
  const currentPath = user.plan ? pathOf(user.plan) : null

  if (!country.paths.length) {
    return (
      <div className="page countries">
        <span className="flag-hero">
          <Flag code={country.code} />
        </span>
        <h1>{country.name}</h1>
        <p className="lead">Os caminhos deste país ainda não estão abertos.</p>
        <p>
          <Link to="/paises">Ver os países</Link>
        </p>
      </div>
    )
  }

  async function start(path) {
    setBusy(true)
    setError('')
    const result = await choosePath(country.code, path.id)
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/plano')
  }

  function ask(path) {
    const same = user.plan?.countryCode === country.code && user.plan?.pathId === path.id
    if (same) {
      navigate('/plano')
      return
    }
    if (user.plan) {
      setPending({
        path,
        from:
          currentCountry && currentPath
            ? `${currentCountry.name}, ${currentPath.name.toLowerCase()}`
            : '',
      })
      setError('')
      return
    }
    start(path)
  }

  return (
    <div className="page countries">
      <AboutSwitch code={country.code} current="escolher" />
      <p className="eyebrow">
        {country.from} → {country.code}
      </p>
      <h1>{country.name}</h1>
      <p className="lead">
        Qual caminho combina com a sua vida? Trabalho remoto e estudo não pedem a mesma papelada.
      </p>
      <p>
        <Link to="/paises">Ver os países</Link>
      </p>

      <div className="path-grid">
        {country.paths.map((path) => {
          const active = user.plan?.countryCode === country.code && user.plan?.pathId === path.id
          return (
            <article key={path.id} className={active ? 'path-card on' : 'path-card'}>
              <p className="eyebrow">{active ? 'Plano atual' : 'Caminho'}</p>
              <h2>{path.name}</h2>
              <p>{path.summary}</p>
              <p className="aside">{path.notThis}</p>
              <p className="country-start">Você vê primeiro como o caminho funciona e confere o passaporte.</p>
              <button type="button" className="btn" disabled={busy} onClick={() => ask(path)}>
                {active ? 'Continuar neste plano' : 'Abrir este plano'}
              </button>
            </article>
          )
        })}
      </div>

      {pending ? (
        <section className="replace" aria-label="Trocar o plano">
          <h2>Trocar o caminho apaga o progresso</h2>
          <p>
            O plano de {pending.from} volta para o zero. O checklist e os documentos zeram. O novo começa em{' '}
            {country.name}, {pending.path.name.toLowerCase()}.
          </p>
          <div className="replace-actions">
            <button type="button" className="btn" disabled={busy} onClick={() => start(pending.path)}>
              {busy ? 'Salvando…' : 'Trocar e começar'}
            </button>
            <button type="button" className="btn ghost" disabled={busy} onClick={() => setPending(null)}>
              Manter o plano atual
            </button>
          </div>
        </section>
      ) : null}

      {error ? <p className="form-error">{error}</p> : null}

      <p className="notice">O Rumo organiza o plano. Não promete visto e não substitui um advogado.</p>
    </div>
  )
}

function CountryAbout({ country }) {
  if (country.portrait) return <CountryPortrait country={country} />

  return (
    <div className="page countries">
      <span className="flag-hero">
        <Flag code={country.code} />
      </span>
      <h1>{country.name}</h1>
      <p className="lead">{country.about}</p>
      {country.paths.length ? (
        <div className="path-grid">
          {country.paths.map((path) => (
            <article key={path.id} className="path-card">
              <p className="eyebrow">Caminho</p>
              <h2>{path.name}</h2>
              <p>{path.summary}</p>
              <p className="aside">{path.notThis}</p>
            </article>
          ))}
        </div>
      ) : null}
      <AboutActions code={country.code} />
    </div>
  )
}

function CountryPortrait({ country }) {
  const { portrait } = country
  const [openId, setOpenId] = useState(portrait.sections[0].id)
  const [placeId, setPlaceId] = useState(null)

  return (
    <div className="page countries">
      <AboutSwitch code={country.code} current="sobre" />
      <figure className="place">
        <img src={`${import.meta.env.BASE_URL}${portrait.image}`} alt={portrait.imageAlt} />
        <figcaption>
          Lisboa, vista do Castelo de São Jorge.{' '}
          <a href={portrait.creditUrl} target="_blank" rel="noopener noreferrer">
            {portrait.credit}
          </a>
        </figcaption>
      </figure>
      <p className="lane-tag">Para entender</p>
      <h1>{portrait.title}</h1>
      <p className="lead">{portrait.lead}</p>

      <section className="topic-list" aria-label="Explore a vida no país">
        <h2>Explore a vida no país</h2>
        {portrait.sections.map((item) => {
          const open = item.id === openId
          return (
            <div key={item.id} className={open ? 'topic-block on' : 'topic-block'}>
              <button
                type="button"
                className={open ? 'topic on' : 'topic'}
                aria-expanded={open}
                aria-controls={`tema-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <TopicIcon id={item.id} />
                <span>{item.title}</span>
                <span className="chev" aria-hidden="true" />
              </button>
              {open ? (
                <article className="portrait-detail" id={`tema-${item.id}`}>
                  {item.places?.length ? (
                    <PlaceFilter
                      places={item.places}
                      placeId={placeId}
                      onPick={setPlaceId}
                      source={item.sources.find((source) => source.label === 'GEE, 2021')}
                      reviewed={portrait.reviewed}
                    />
                  ) : null}
                  {placeId && item.places?.length ? null : (
                    <>
                      <p className="detail-kicker">{item.kicker}</p>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                      {item.share ? <p className="detail-share">{item.share}</p> : null}
                      <p>{item.text}</p>
                      {item.sources.length ? (
                        <p className="detail-source">
                          Fonte, conferida em {reviewedOn(portrait.reviewed)}:{' '}
                          {item.sources.map((source, index) => (
                            <span key={source.url}>
                              {index ? ' · ' : null}
                              <a href={source.url} target="_blank" rel="noopener noreferrer">
                                {source.label}
                              </a>
                            </span>
                          ))}
                        </p>
                      ) : (
                        <p className="detail-source">Conferido em {reviewedOn(portrait.reviewed)}.</p>
                      )}
                      {item.places?.some((place) => place.video) ? (
                        <VideoCarousel places={item.places} />
                      ) : null}
                    </>
                  )}
                </article>
              ) : null}
            </div>
          )
        })}
      </section>

      <section className="follow">
        <div>
          <p className="lane-tag">Para seguir</p>
          <h2>Seu plano começa pela sua história.</h2>
          <p>Ao escolher {country.name}, o próximo passo olha o que você já tem e o que falta.</p>
        </div>
        <Link className="btn" to={`/paises/${country.code}`}>
          Escolher este
        </Link>
      </section>
    </div>
  )
}

function PlaceFilter({ places, placeId, onPick, source, reviewed }) {
  const place = places.find((item) => item.id === placeId)

  return (
    <div className="district-filter">
      <label className="district-label" htmlFor="filtro-cidade">
        Filtre por cidade
      </label>
      <select
        id="filtro-cidade"
        className="district-select"
        value={placeId || ''}
        onChange={(event) => onPick(event.target.value || null)}
      >
        <option value="">Escolha uma cidade</option>
        {places.map((item) => (
          <option key={item.id} value={item.id}>
            {item.featured ? `${item.name} — em destaque` : item.name}
          </option>
        ))}
      </select>
      {place ? (
        <div className="district-card">
          <strong>{place.value}</strong>
          <span className="district-count">residentes brasileiros no distrito, em 2021</span>
          <p>{place.share}</p>
          {place.text ? <p>{place.text}</p> : null}
          {place.video ? <VideoCard name={place.name} url={place.video} /> : null}
          {source ? (
            <p className="detail-source">
              Fonte, conferida em {reviewedOn(reviewed)}:{' '}
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function VideoCarousel({ places }) {
  const scroller = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const videos = places.filter((place) => place.video)

  function readEdge() {
    const el = scroller.current
    if (!el) return
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    })
  }

  useEffect(() => {
    readEdge()
  }, [])

  function move(direction) {
    const el = scroller.current
    if (!el) return
    const card = el.querySelector('.district-video')
    const width = card?.getBoundingClientRect().width || 260
    el.scrollBy({ left: direction * (width + 12), behavior: 'smooth' })
  }

  return (
    <div className="video-carousel">
      <div className="video-carousel-head">
        <p className="video-kicker">As cidades</p>
        <div className="video-nav">
          <button type="button" aria-label="Vídeo anterior" onClick={() => move(-1)} disabled={edge.start}>
            <span className="video-arrow back" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Próximo vídeo" onClick={() => move(1)} disabled={edge.end}>
            <span className="video-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="video-track" ref={scroller} onScroll={readEdge}>
        {videos.map((place) => (
          <VideoCard key={place.id} name={place.name} url={place.video} />
        ))}
      </div>
    </div>
  )
}

function VideoCard({ name, url }) {
  const id = url.match(/[?&]v=([^&]+)/)?.[1]

  if (!id) return null

  return (
    <a className="district-video" href={url} target="_blank" rel="noopener noreferrer">
      <span className="district-thumb">
        <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" />
        <span className="play" aria-hidden="true" />
      </span>
      <span>Ver {name} no YouTube</span>
    </a>
  )
}

function AboutSwitch({ code, current }) {
  return (
    <nav className="about-switch" aria-label="Neste país">
      <Link to={`/paises/${code}/sobre`} aria-current={current === 'sobre' ? 'page' : undefined}>
        Entender mais sobre o país
      </Link>
      <Link to={`/paises/${code}`} aria-current={current === 'escolher' ? 'page' : undefined}>
        Escolher este
      </Link>
    </nav>
  )
}

function TopicIcon({ id }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    'aria-hidden': true,
  }
  if (id === 'casa') {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20H4z" strokeLinejoin="round" />
      </svg>
    )
  }
  if (id === 'renda') {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M8 7V5h8v2M12 11v4" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'idioma') {
    return (
      <svg {...common}>
        <path d="M5 6h14v9H8l-3 3V6z" strokeLinejoin="round" />
        <path d="M8 10h8M8 13h5" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'oficio') {
    return (
      <svg {...common}>
        <path d="M6 5h12v14H6z" />
        <path d="M9 9h6M9 13h6" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'chegada') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16" cy="10" r="2.2" />
      <path d="M4 19c.6-2.6 2.6-4 5-4s4.4 1.4 5 4M14 15.2c.6-1.2 1.8-2 3.2-2 1.6 0 2.8.8 3.4 2.2" strokeLinecap="round" />
    </svg>
  )
}

function AboutActions({ code }) {
  return (
    <div className="country-actions about-actions">
      <Link className="btn" to={`/paises/${code}`}>
        Escolher este
      </Link>
      <Link className="btn ghost" to="/paises">
        Ver os países
      </Link>
    </div>
  )
}
