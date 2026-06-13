import { useEffect, useRef } from 'react'
import GalleryVisual from './GalleryVisual'

export default function GalleryLightbox({ images, activeIndex, onClose, onPrevious, onNext }) {
  const closeButtonRef = useRef(null)
  const item = images[activeIndex]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [onClose, onNext, onPrevious])

  if (!item) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Villa image gallery" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="lightbox-topbar">
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <button ref={closeButtonRef} className="lightbox-close" type="button" onClick={onClose} aria-label="Close gallery"><span /><span /></button>
      </div>
      <button className="lightbox-nav lightbox-previous" type="button" onClick={onPrevious} aria-label="Previous image">←</button>
      <div className="lightbox-stage">
        <GalleryVisual item={item} className="lightbox-image" />
        <div className="lightbox-caption"><span>{item.caption || item.alt || 'Ceylon Horizon'}</span><small>Use arrow keys to explore</small></div>
      </div>
      <button className="lightbox-nav lightbox-next" type="button" onClick={onNext} aria-label="Next image">→</button>
    </div>
  )
}
