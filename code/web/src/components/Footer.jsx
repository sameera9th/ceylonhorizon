export default function Footer({ content }) {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a className="footer-monogram" href="#top" aria-label="Back to top"><span>CH</span></a>
        <div><a className="footer-name" href="#top">Ceylon Horizon</a><p>{content.footerDescription}</p></div>
      </div>
      <div className="footer-links"><p>Explore</p><a href="#about">Our story <span>↗</span></a><a href="#experience">Experience <span>↗</span></a><a href="#gallery">Gallery <span>↗</span></a><a href="#location">Location <span>↗</span></a></div>
      <div className="footer-links"><p>Say hello</p><a href={content.whatsappLink}>WhatsApp <span>↗</span></a><a href={content.emailLink}>Email <span>↗</span></a></div>
      <div className="footer-bottom"><span>© {year} Ceylon Horizon</span><span className="footer-ornament">Sri Lanka</span><span>Made with care in Sri Lanka</span></div>
    </footer>
  )
}
