import { useEffect, useState } from 'react'
import { fallbackContent } from '../content/fallbackContent'
import { homePageQuery } from '../lib/queries'
import { isSanityConfigured, sanityClient } from '../lib/sanity'

function withDefinedValues(source = {}) {
  return Object.fromEntries(Object.entries(source).filter(([, value]) => value != null))
}

function mergeCmsContent(home, settings) {
  const cmsContent = withDefinedValues({ ...home, ...settings })
  const cmsGalleryImages = Array.isArray(home.galleryImages)
    ? home.galleryImages.filter((item) => item?.imageUrl)
    : []
  const localImageUrls = new Set(fallbackContent.galleryImages.map((item) => item.imageUrl))

  return {
    ...fallbackContent,
    ...cmsContent,
    primaryCta: { ...fallbackContent.primaryCta, ...withDefinedValues(home.primaryCta) },
    secondaryCta: { ...fallbackContent.secondaryCta, ...withDefinedValues(home.secondaryCta) },
    galleryImages: [
      ...fallbackContent.galleryImages,
      ...cmsGalleryImages.filter((item) => !localImageUrls.has(item.imageUrl)),
    ],
  }
}

function updateMeta(selector, value) {
  if (value) document.querySelector(selector)?.setAttribute('content', value)
}

export function useHomePageContent() {
  const [state, setState] = useState({ content: fallbackContent, isLoading: isSanityConfigured, isUsingFallback: !isSanityConfigured })

  useEffect(() => {
    if (!sanityClient) return
    let isCurrent = true

    const fetchContent = async () => {
      try {
        const { home, settings } = await sanityClient.fetch(homePageQuery)
        if (!isCurrent) return
        if (!home) {
          setState({ content: fallbackContent, isLoading: false, isUsingFallback: true })
          return
        }
        setState({ content: mergeCmsContent(home, settings), isLoading: false, isUsingFallback: false })
      } catch {
        if (isCurrent) {
          setState((current) => ({ ...current, isLoading: false }))
        }
      }
    }

    fetchContent()

    return () => {
      isCurrent = false
    }
  }, [])

  useEffect(() => {
    document.title = state.content.seoTitle
    updateMeta('meta[name="description"]', state.content.seoDescription)
    updateMeta('meta[property="og:title"]', state.content.seoTitle)
    updateMeta('meta[property="og:description"]', state.content.seoDescription)
    updateMeta('meta[property="og:image"]', state.content.ogImageUrl)
    updateMeta('meta[name="twitter:title"]', state.content.seoTitle)
    updateMeta('meta[name="twitter:description"]', state.content.seoDescription)
    updateMeta('meta[name="twitter:image"]', state.content.ogImageUrl)
  }, [state.content])

  return state
}
