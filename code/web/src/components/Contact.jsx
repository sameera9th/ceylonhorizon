export default function Contact({ content }) {
  return (
    <section className="contact" id="contact">
      <span className="contact-palm palm-left" aria-hidden="true" /><span className="contact-palm palm-right" aria-hidden="true" />
      <div className="contact-inner">
        <p className="eyebrow light">Your stay begins here</p>
        <h2>{content.contactTitle}</h2>
        <p>{content.contactBody}</p>
        <div className="contact-actions">
          <a className="button button-light" href={content.whatsappLink}>Inquire on WhatsApp <span>↗</span></a>
          <a className="button button-outline" href={content.emailLink}>Send an email <span>↗</span></a>
        </div>
        <div className="contact-details">
          <div><small>Email</small><a href={content.emailLink}>{content.emailAddress}</a></div>
          <i />
          <div><small>Telephone</small><span>{content.phoneNumber}</span></div>
          <i />
          <div><small>Arrival</small><span>Location shared privately</span></div>
        </div>
      </div>
    </section>
  )
}
