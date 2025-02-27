import type { MetadataRoute } from 'next'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/admin'],
      allow: '/',
    },
    sitemap: `${baseURL}/sitemap.xml`,
  }
}
