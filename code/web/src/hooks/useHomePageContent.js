import { useEffect, useState } from 'react'
import { fallbackContent } from '../content/fallbackContent'
import { homePageQuery } from '../lib/queries'
import { isSanityConfigured, sanityClient } from '../lib/sanity'

function withDefinedValues(source = {}) {
  return Object.fromEntries(Object.entries(source).filter(([, value]) => value != null))
}

function mergeCmsContent(home, settings) {
  const cmsContent = withDefinedValues({ ...home, ...settings })
  return {
    ...fallbackContent,
    ...cmsContent,
    primaryCta: { ...fallbackContent.primaryCta, ...withDefinedValues(home.primaryCta) },
    secondaryCta: { ...fallbackContent.secondaryCta, ...withDefinedValues(home.secondaryCta) },
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

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') fetchContent()
    }

    fetchContent()
    const refreshTimer = window.setInterval(fetchContent, 5000)
    window.addEventListener('focus', fetchContent)
    document.addEventListener('visibilitychange', refreshWhenVisible)

    return () => {
      isCurrent = false
      window.clearInterval(refreshTimer)
      window.removeEventListener('focus', fetchContent)
      document.removeEventListener('visibilitychange', refreshWhenVisible)
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
