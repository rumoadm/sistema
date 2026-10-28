export function Mark() {
  return <img className="mark" src="/marca.png" alt="" />
}

export function Logo({ tone = 'dark' }) {
  return (
    <span className={`logo tone-${tone}`}>
      <Mark />
      <span className="word">
        rumo<span className="period">.</span>
      </span>
    </span>
  )
}
