export default function Location({ content }) {
  const points = Array.isArray(content.locationPoints) ? content.locationPoints : []

  return (
    <section className="location-section" id="location">
      <div className="location-copy">
        <div className="location-heading"><span className="section-index">04</span><div><p className="eyebrow">The island</p><h2>{content.locationTitle}</h2></div></div>
        <p className="location-body">{content.locationBody}</p>
        <ul>{points.map((point, index) => <li key={`${point}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p><i>↗</i></li>)}</ul>
        <div className="travel-note"><span>Good to know</span><p>We share tailored directions and local recommendations before every arrival.</p></div>
      </div>
      <div className="location-map" aria-label="Stylized map placeholder for Ceylon Horizon">
        <div className="map-coordinates">Sri Lanka · 7.8731° N · 80.7718° E</div>
        <div className="map-lines" />
        <div className="map-route route-one" /><div className="map-route route-two" />
        <div className="map-marker"><span>CH</span></div>
        <div className="map-card"><span>Somewhere peaceful</span><p>Exact location shared with confirmed guests</p></div>
      </div>
    </section>
  )
}
