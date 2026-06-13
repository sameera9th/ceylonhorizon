export default function GalleryVisual({ item, className = '' }) {
  if (item?.imageUrl) {
    return <img className={className} src={item.imageUrl} alt={item.alt || item.caption || 'Ceylon Horizon gallery'} />
  }

  return (
    <div className={`visual-placeholder ${item?.tone ? `visual-${item.tone}` : ''} ${className}`} role="img" aria-label={item?.alt || item?.caption || 'Ceylon Horizon atmosphere'}>
      <span className="visual-sun" />
      <span className="leaf leaf-one" />
      <span className="leaf leaf-two" />
      <span className="visual-line" />
    </div>
  )
}
