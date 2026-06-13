export const homePageQuery = `{
  "home": *[_type == "homePage"][0]{
    heroTitle, heroTagline, heroDescription,
    "primaryCta": {"label": primaryCtaLabel, "link": primaryCtaLink},
    "secondaryCta": {"label": secondaryCtaLabel, "link": secondaryCtaLink},
    aboutTitle, aboutBody, experienceSectionTitle, experienceSectionDescription,
    experienceCards[]->{icon, title, description},
    gallerySectionTitle, gallerySectionDescription,
    galleryImages[]->{alt, caption, "imageUrl": image.asset->url},
    locationTitle, locationBody, locationPoints, contactTitle, contactBody
  },
  "settings": *[_type == "siteSettings"][0]{
    siteTitle, seoTitle, seoDescription, "ogImageUrl": ogImage.asset->url, whatsappLink,
    emailAddress, "emailLink": "mailto:" + emailAddress,
    phoneNumber, footerDescription
  }
}`
