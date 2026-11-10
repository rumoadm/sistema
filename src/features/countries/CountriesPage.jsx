import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useMatch, useNavigate, useParams } from 'react-router-dom'
import { useSession } from '../../app/useSession.jsx'
import { Flag } from '../../components/Flag'
import { countries, countryOf, pathOf } from '../../data/countries'
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
      <p className="lane-tag">Explorar países</p>
      <h1>Qual país faz sentido para você?</h1>
      <p className="lead">Conheça os destinos e escolha por onde começar.</p>
      {current && currentPath ? (
        <p className="current-plan">
          Seu plano agora é {current.name}, {currentPath.name.toLowerCase()}.{' '}
          <Link to="/plano">Voltar ao plano</Link>
        </p>
      ) : null}

      <div className="country-pick">
        {countries.map((item) => (
          <article key={item.code} className={current?.code === item.code ? 'country-option on' : 'country-option'}>
            <img
              className="country-cover"
              src={`${import.meta.env.BASE_URL}${item.cover}`}
              alt={item.coverAlt}
            />
            <div className="country-heading">
              <Flag code={item.code} />
              <h2>{item.name}</h2>
            </div>
            <Link className="btn" to={`/paises/${item.code}/sobre`}>
              Ver esse destino
            </Link>
          </article>
        ))}
      </div>
      <p className="pick-note">Você pode explorar antes de decidir.</p>
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
      <CountryTitle country={country} />
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
      <AboutActions />
    </div>
  )
}

function CountryPortrait({ country }) {
  const { portrait } = country
  const [openId, setOpenId] = useState(null)
  const [popupId, setPopupId] = useState(null)
  const [placeId, setPlaceId] = useState(null)
  const places = portrait.sections.find((item) => item.places)?.places || []
  const place = places.find((item) => item.id === placeId) || null
  const popup = portrait.sections.find((item) => item.id === popupId) || null

  return (
    <div className="page countries">
      <figure className="place">
        <img src={`${import.meta.env.BASE_URL}${portrait.image}`} alt={portrait.imageAlt} />
        <div className="place-shade" aria-hidden="true" />
        <div className="place-bar">
          <div className="place-name">
            <Flag code={country.code} />
            <h1>{country.name}</h1>
          </div>
          <Link className="btn" to={`/paises/${country.code}`}>
            Escolher este país
          </Link>
        </div>
      </figure>

      <section className="topic-list" aria-label="Explore a vida no país">
        <h2>Explore a vida no país</h2>
        <div className="district-filter">
          <label className="district-label" htmlFor="filtro-cidade">
            Visualize
          </label>
          <select
            id="filtro-cidade"
            className="district-select"
            value={placeId || ''}
            onChange={(event) => setPlaceId(event.target.value || null)}
          >
            <option value="">País inteiro</option>
            {places.map((item) => (
              <option key={item.id} value={item.id}>
                {item.featured ? `${item.name} — em destaque` : item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="fact-cards">
          {portrait.sections.map((item, index) => {
            const asPopup = index < 4
            return (
              <FactCard
                key={item.id}
                item={item}
                place={place}
                popup={asPopup}
                open={!asPopup && item.id === openId}
                onToggle={
                  hasDetail(item)
                    ? () => {
                        if (asPopup) setPopupId(item.id)
                        else setOpenId(item.id === openId ? null : item.id)
                      }
                    : null
                }
              />
            )
          })}
        </div>
      </section>
      {popup ? (
        <FactDialog key={popup.id} title={popup.title} onClose={() => setPopupId(null)}>
          <FactExtra item={popup} place={place} />
        </FactDialog>
      ) : null}

      <section className="follow">
        <div>
          <p className="lane-tag">Para seguir</p>
          <h2>Seu plano começa pela sua história.</h2>
          <p>Ao escolher {country.name}, o próximo passo olha o que você já tem e o que falta.</p>
        </div>
        <Link className="btn" to={`/paises/${country.code}`}>
          Escolher este país
        </Link>
      </section>
    </div>
  )
}

function FactCard({ item, place, open, onToggle, popup }) {
  const face = cardFace(item, place)
  const quiet = titleOnly(item)
  const summary = (
    <>
      <span className="fact-title">
        <TopicIcon id={item.id} />
        {item.title}
      </span>
      {onToggle ? (
        <span className="chev" aria-hidden="true">
          <svg viewBox="0 0 12 12" width="16" height="16">
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
      {quiet || item.prices ? null : (
        <>
          <strong>{face.value}</strong>
          {face.label ? <span className="fact-label">{face.label}</span> : null}
        </>
      )}
      {onToggle && !open ? <span className="fact-hint">Clique para mais infos</span> : null}
    </>
  )

  return (
    <article className={['fact-card', quiet ? 'quiet' : '', open ? 'on' : ''].filter(Boolean).join(' ')}>
      {onToggle ? (
        <button
          type="button"
          className="fact-toggle"
          aria-expanded={popup ? undefined : open}
          aria-haspopup={popup ? 'dialog' : undefined}
          onClick={onToggle}
        >
          {summary}
        </button>
      ) : (
        <div className="fact-toggle">{summary}</div>
      )}
      {!quiet && item.prices ? <PriceCompare kicker={item.kicker} prices={item.prices} /> : null}
      {open && !popup ? (
        <div className="fact-extra">
          <FactExtra item={item} place={place} />
        </div>
      ) : null}
    </article>
  )
}

function FactDialog({ title, onClose, children }) {
  const ref = useRef(null)
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    dialog.showModal()
    function onCancel(event) {
      event.preventDefault()
      closeRef.current()
    }
    dialog.addEventListener('cancel', onCancel)
    return () => {
      dialog.removeEventListener('cancel', onCancel)
      if (dialog.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      className="fact-dialog"
      ref={ref}
      aria-label={title}
      onClick={(event) => {
        if (event.target === ref.current) closeRef.current()
      }}
    >
      <header>
        <h2>{title}</h2>
        <button type="button" className="fact-close" onClick={() => closeRef.current()} aria-label="Fechar">
          <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
            <path d="M2 2l8 8M10 2 2 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </header>
      <div className="fact-dialog-body">{children}</div>
    </dialog>
  )
}

function FactExtra({ item, place }) {
  if (item.places?.length && place) {
    return (
      <>
        <p className="br-line">
          <Flag code="BR" />
          <strong>{place.value}</strong>
          <span>brasileiros</span>
        </p>
        <p className="detail-share">
          {place.share} Em 2021.
        </p>
        {place.text ? <p>{place.text}</p> : null}
        {place.video ? <VideoCard name={place.name} url={place.video} /> : null}
      </>
    )
  }
  if (item.id === 'clima') return <p>{place?.climate?.text || item.text}</p>
  if (item.prices?.length) return <PriceCompare kicker={item.kicker} prices={item.prices} />
  if (item.bars?.length) return <JobBars kicker={item.kicker} bars={item.bars} note={item.barsNote} />
  if (titleOnly(item)) {
    return (
      <>
        {item.kicker ? <p className="detail-kicker">{item.kicker}</p> : null}
        {item.value ? <strong>{item.value}</strong> : null}
        {item.label ? <span className="fact-label">{item.label}</span> : null}
        {item.text ? <p>{item.text}</p> : null}
      </>
    )
  }
  return (
    <>
      {item.side ? (
        <p className="br-line">
          <Flag code="BR" />
          <strong>{item.side}</strong>
          <span>{item.sideLabel}</span>
        </p>
      ) : null}
      {item.share ? <p className="detail-share">{item.share}</p> : null}
      {item.text ? <p>{item.text}</p> : null}
      {item.places?.some((spot) => spot.video) ? <VideoCarousel places={item.places} /> : null}
    </>
  )
}

function cardFace(item, place) {
  if (item.id === 'clima' && place?.climate) {
    return { value: place.climate.value, label: place.climate.label }
  }
  if (item.places?.length && place) {
    return { value: place.population, label: 'população do distrito' }
  }
  if (item.bars?.length) return { value: item.bars[0].share, label: item.kicker }
  return { value: item.value, label: item.label }
}

function hasDetail(item) {
  return titleOnly(item) || Boolean(item.text || item.bars?.length || item.places?.length || item.side)
}

function titleOnly(item) {
  return item.id === 'casa' || item.id === 'oficio' || item.id === 'compra' || item.id === 'chegada'
}

function CountryTitle({ country }) {
  return (
    <header className="country-title">
      <Flag code={country.code} />
      <h1>{country.name}</h1>
      <Link className="btn" to={`/paises/${country.code}`}>
        Escolher este país
      </Link>
    </header>
  )
}

function PriceCompare({ kicker, prices }) {
  return (
    <div className="price-compare">
      <p className="detail-kicker">{kicker}</p>
      <div className="price-pair">
        {prices.map((item) => (
          <div className="price-side" key={item.code}>
            <Flag code={item.code} />
            <strong>{item.value}</strong>
            {item.note ? (
              <span className="price-note">
                {item.note.split('\n').map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function JobBars({ kicker, bars, note }) {
  return (
    <div className="job-chart">
      {kicker ? <p className="detail-kicker">{kicker}</p> : null}
      <ul className="job-bars">
        {bars.map((bar) => (
          <li key={bar.label}>
            <span className="job-bar-label">
              <span>{bar.label}</span>
              <span>{bar.share}</span>
            </span>
            <span className="job-track">
              <span className="job-fill" style={{ width: `${bar.value}%` }} />
            </span>
          </li>
        ))}
      </ul>
      {note ? <p>{note}</p> : null}
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
  if (id === 'clima') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6" strokeLinecap="round" />
      </svg>
    )
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
  if (id === 'compra') {
    return (
      <svg {...common}>
        <path d="M12 3v16M7 19h10" strokeLinecap="round" />
        <path d="M12 6 7 7.2 5 13a3.2 3.2 0 0 0 6.4 0z" strokeLinejoin="round" />
        <path d="M12 6l5 1.2L19 13a3.2 3.2 0 0 1-6.4 0z" strokeLinejoin="round" />
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

function AboutActions() {
  return (
    <div className="country-actions about-actions">
      <Link className="btn ghost" to="/paises">
        Ver os países
      </Link>
    </div>
  )
}
