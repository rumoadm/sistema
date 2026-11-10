const flags = {
  US: FlagUS,
  PT: FlagPT,
  IT: FlagIT,
  PY: FlagPY,
  BR: FlagBR,
}

export function Flag({ code }) {
  const Draw = flags[code]
  if (!Draw) return null
  return (
    <span className="flag">
      <Draw />
    </span>
  )
}

function FlagBR() {
  return (
    <svg viewBox="0 0 140 98" role="img" aria-label="Bandeira do Brasil">
      <rect width="140" height="98" fill="#009C3B" />
      <polygon points="70,8 132,49 70,90 8,49" fill="#FFDF00" />
      <circle cx="70" cy="49" r="20" fill="#002776" />
      <path d="M52 56c12-14 26-14 36 0" fill="none" stroke="#fff" strokeWidth="3.5" />
    </svg>
  )
}

function FlagUS() {
  const stripes = Array.from({ length: 13 }, (_, index) => (
    <rect key={index} y={index * (100 / 13)} width="190" height={100 / 13 + 0.4} fill={index % 2 ? '#fff' : '#B22234'} />
  ))
  const stars = []
  for (let row = 0; row < 6; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      stars.push(<circle key={`${row}-${col}`} cx={8 + col * 14} cy={5.2 + row * 8} r="1.5" fill="#fff" />)
    }
  }
  return (
    <svg viewBox="0 0 190 100" role="img" aria-label="Bandeira dos Estados Unidos">
      {stripes}
      <rect width="76" height={(100 / 13) * 7} fill="#3C3B6E" />
      {stars}
    </svg>
  )
}

function FlagPT() {
  return (
    <svg viewBox="0 0 150 100" role="img" aria-label="Bandeira de Portugal">
      <rect width="60" height="100" fill="#046A38" />
      <rect x="60" width="90" height="100" fill="#DA020E" />
      <circle cx="60" cy="50" r="18" fill="#FFD100" />
      <circle cx="60" cy="50" r="13" fill="#fff" />
      <circle cx="60" cy="50" r="8" fill="#DA020E" />
    </svg>
  )
}

function FlagIT() {
  return (
    <svg viewBox="0 0 150 100" role="img" aria-label="Bandeira da Itália">
      <rect width="50" height="100" fill="#009246" />
      <rect x="50" width="50" height="100" fill="#fff" />
      <rect x="100" width="50" height="100" fill="#CE2B37" />
    </svg>
  )
}

function FlagPY() {
  return (
    <svg viewBox="0 0 150 100" role="img" aria-label="Bandeira do Paraguai">
      <rect width="150" height="33.4" fill="#D52B1E" />
      <rect y="33.3" width="150" height="33.4" fill="#fff" />
      <rect y="66.6" width="150" height="33.4" fill="#0038A8" />
      <circle cx="75" cy="50" r="9" fill="#FFD100" />
      <circle cx="75" cy="50" r="5" fill="#0038A8" />
    </svg>
  )
}
