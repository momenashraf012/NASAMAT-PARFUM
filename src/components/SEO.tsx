import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SEO({
  title = 'نَسَمَات - عطور عربية فاخرة',
  description = 'نَسَمَات: عطور عربية فاخرة أصيلة من قلب العطر العربي الكلاسيكي. العود، المسك، الورد، والعنبر في تركيبات حصرية.',
  image = '/assets/bottle-shot.png',
  url = 'https://nasamat.luxury',
}: SEOProps) {
  useEffect(() => {
    // Meta tags
    document.title = title

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: 'عطور، عطور عربية، عود، مسك، ورد، عنبر، فخامة، عطور فاخرة' },
      { name: 'theme-color', content: '#B68A35' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ar_SA' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { httpEquiv: 'X-UA-Compatible', content: 'ie=edge' },
    ]

    metaTags.forEach((tag) => {
      let element = document.querySelector(`meta[${tag.property ? 'property' : tag.httpEquiv ? 'http-equiv' : 'name'}="${tag.property || tag.httpEquiv || tag.name}"]`)

      if (!element) {
        element = document.createElement('meta')
        Object.entries(tag).forEach(([key, value]) => {
          if (key !== 'content') {
            element?.setAttribute(key, value as string)
          }
        })
        if (tag.content) {
          element?.setAttribute('content', tag.content)
        }
        document.head.appendChild(element)
      } else {
        if (tag.content) {
          element.setAttribute('content', tag.content)
        }
      }
    })

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // Alternate links for language/region
    const alternates = [
      { hreflang: 'ar-SA', href: url },
      { hreflang: 'x-default', href: url },
    ]

    alternates.forEach(({ hreflang, href }) => {
      let alt = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
      if (!alt) {
        alt = document.createElement('link')
        alt.setAttribute('rel', 'alternate')
        alt.setAttribute('hreflang', hreflang)
        document.head.appendChild(alt)
      }
      alt.setAttribute('href', href)
    })
  }, [title, description, image, url])

  return null
}

// JSON-LD Structured Data Component
export function StructuredData() {
  useEffect(() => {
    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'نَسَمَات',
      alternateName: 'Nasamat',
      description: 'عطور عربية فاخرة أصيلة',
      url: 'https://nasamat.luxury',
      logo: 'https://nasamat.luxury/assets/logo.png',
      sameAs: [
        'https://instagram.com/nasamat',
        'https://twitter.com/nasamat',
        'https://facebook.com/nasamat',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        areaServed: 'SA',
        availableLanguage: 'ar',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SA',
      },
    }

    // Add Organization schema
    let organizationScript = document.querySelector('script[type="application/ld+json"][data-schema="organization"]') as HTMLScriptElement
    if (!organizationScript) {
      organizationScript = document.createElement('script')
      organizationScript.type = 'application/ld+json'
      organizationScript.setAttribute('data-schema', 'organization')
      document.head.appendChild(organizationScript)
    }
    organizationScript.textContent = JSON.stringify(organizationData)

    // Product Schema
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'مجموعة عطور نَسَمَات',
      description: 'مجموعة عطور عربية فاخرة من نَسَمَات',
      url: 'https://nasamat.luxury/#collection',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'Product',
            name: 'عود رويال',
            description: 'عطر الأيقونة في مجموعة نَسَمَات',
            image: 'https://nasamat.luxury/assets/bottle-shot.png',
            brand: { '@type': 'Brand', name: 'نَسَمَات' },
            offers: {
              '@type': 'Offer',
              price: '1250',
              priceCurrency: 'EGP',
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      },
    }

    let productScript = document.querySelector('script[type="application/ld+json"][data-schema="product"]') as HTMLScriptElement
    if (!productScript) {
      productScript = document.createElement('script')
      productScript.type = 'application/ld+json'
      productScript.setAttribute('data-schema', 'product')
      document.head.appendChild(productScript)
    }
    productScript.textContent = JSON.stringify(productSchema)
  }, [])

  return null
}
