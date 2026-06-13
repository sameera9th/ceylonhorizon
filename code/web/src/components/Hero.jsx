export default function Hero({ content }) {
  return (
    <section className="hero" id="top">
      <img className="hero-image" src="/images/ceylon-horizon-hero.jpg" alt="Ceylon Horizon tropical villa at golden hour" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow light">Private villa · Sri Lanka</p>
        <h1>{content.heroTitle}</h1>
        <p className="hero-tagline">{content.heroTagline}</p>
        <p className="hero-description">{content.heroDescription}</p>
        <div className="button-row">
          <a className="button button-light" href={content.primaryCta.link}>{content.primaryCta.label}</a>
          <a className="text-link light" href={content.secondaryCta.link}>{content.secondaryCta.label}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <a className="scroll-cue" href="#about"><span>Discover</span><i /></a>
    </section>
  )
}
