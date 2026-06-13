const symbols = [
  <path d="M5 14c4-8 10-8 14 0M7 17h10M12 4v3" />,
  <path d="M7 5v7a5 5 0 0 0 10 0V5M5 19h14M9 8h6" />,
  <path d="M4 15c3-1 4-5 5-9 4 2 6 6 6 11M15 9c3 1 5 4 5 8M7 19h12" />,
  <path d="M4 18v-6h16v6M7 12V8h10v4M6 18v2M18 18v2" />,
  <path d="M5 6h14v10H5zM9 20h6M12 16v4" />,
  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />,
]

function ExperienceIcon({ index }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{symbols[index % symbols.length]}</svg>
}

export default function Experience({ content }) {
  const cards = Array.isArray(content.experienceCards) ? content.experienceCards : []

  return (
    <section className="experience-section" id="experience">
      <div className="section-intro experience-intro">
        <div><p className="eyebrow">The experience</p><h2>{content.experienceSectionTitle}</h2></div>
        <div className="intro-aside"><span>02</span><p>{content.experienceSectionDescription}</p></div>
      </div>
      <div className="experience-grid">
        {cards.map((card, index) => (
          <article className={`experience-card experience-tone-${(index % 3) + 1}`} key={`${card.title}-${index}`}>
            <div className="experience-card-top">
              <span className="card-number">{card.icon || String(index + 1).padStart(2, '0')}</span>
              <span className="experience-icon"><ExperienceIcon index={index} /></span>
            </div>
            <div className="experience-card-copy"><h3>{card.title}</h3><p>{card.description}</p></div>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  )
}
