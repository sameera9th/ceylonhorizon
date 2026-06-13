import { useState } from 'react'

const navItems = ['About', 'Experience', 'Gallery', 'Location', 'Contact']

export default function Header({ primaryCta }) {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="header">
      <a className="wordmark" href="#top" aria-label="Ceylon Horizon home">
        <span className="wordmark-mark">CH</span>
        <span>Ceylon Horizon</span>
      </a>
      <button className="menu-button" type="button" aria-expanded={isOpen} aria-label="Toggle navigation" onClick={() => setIsOpen(!isOpen)}>
        <span /><span />
      </button>
      <nav className={isOpen ? 'nav is-open' : 'nav'} aria-label="Main navigation">
        {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
        <a className="button button-small" href={primaryCta.link} onClick={closeMenu}>{primaryCta.label}</a>
      </nav>
    </header>
  )
}
