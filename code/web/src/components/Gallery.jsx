import { useCallback, useState } from 'react'
import GalleryLightbox from './GalleryLightbox'
import GalleryVisual from './GalleryVisual'

export default function Gallery({ content }) {
  const images = Array.isArray(content.galleryImages) ? content.galleryImages : []
  const [activeIndex, setActiveIndex] = useState(null)
  const close = useCallback(() => setActiveIndex(null), [])
  const previous = useCallback(() => setActiveIndex((index) => (index - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActiveIndex((index) => (index + 1) % images.length), [images.length])

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-heading">
        <div><p className="eyebrow light">In and around</p><h2>{content.gallerySectionTitle}</h2></div>
        <div className="gallery-aside"><span>03</span><p>{content.gallerySectionDescription}</p></div>
      </div>
      <div className="gallery-grid">
        {images.map((item, index) => (
          <button className={`gallery-item item-${index + 1}`} type="button" key={`${item.caption || item.alt}-${index}`} onClick={() => setActiveIndex(index)} aria-label={`View image ${index + 1}: ${item.caption || item.alt || 'Ceylon Horizon'}`}>
            <GalleryVisual item={item} />
            <span className="gallery-view">View image <i>↗</i></span>
            <span className="gallery-caption"><small>{String(index + 1).padStart(2, '0')}</small>{item.caption || item.alt}</span>
          </button>
        ))}
      </div>
      {activeIndex !== null && images.length > 0 && <GalleryLightbox images={images} activeIndex={activeIndex % images.length} onClose={close} onPrevious={previous} onNext={next} />}
    </section>
  )
}
