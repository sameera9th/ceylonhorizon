const details = ['Private villa', 'Sri Lankan hospitality', 'Slow living', 'Made for rest']

export default function About({ content }) {
  const paragraphs = Array.isArray(content.aboutBody) ? content.aboutBody : []

  return (
    <section className="about-story" id="about">
      <div className="about-story-inner">
        <div className="about-visual" aria-hidden="true">
          <img src="/images/ceylon-horizon-hero.jpg" alt="" />
          <div className="about-visual-card">
            <span>Ayubowan</span>
            <small>May you live long</small>
          </div>
          <span className="about-visual-number">01</span>
        </div>

        <div className="about-narrative">
          <p className="eyebrow">The villa</p>
          <h2>{content.aboutTitle}</h2>
          <div className="editorial-rule"><span /></div>
          <div className="about-copy">
            {paragraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)}
          </div>
          <div className="about-details" aria-label="Villa qualities">
            {details.map((detail, index) => (
              <div key={detail}><span>{String(index + 1).padStart(2, '0')}</span><p>{detail}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
