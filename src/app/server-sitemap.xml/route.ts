import { getServerSideSitemap } from 'next-sitemap';
import { MetadataRoute } from 'next';

export async function GET() {
  const BASE_URL = 'https://www.indiantraveltour.in';

  const fetchTourPackages = async (): Promise<string[]> => {
    try {
      const res = await fetch(`${BASE_URL}/api/getAllPackageNames`);
      if (!res.ok) throw new Error('Failed to fetch tour packages');
      const data = await res.json();
      return data.packageNames || [];
    } catch (error) {
      console.error('Error fetching tour packages:', error);
      return [];
    }
  };

  const tourPackages = await fetchTourPackages();

  const fields = [
    {
      loc: `${BASE_URL}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: `${BASE_URL}/tour`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    ...tourPackages.map((name) => ({
      loc: `${BASE_URL}/tour/${name}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    })),
    {
      loc: `${BASE_URL}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${BASE_URL}/privacy`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.4,
    },
    {
      loc: `${BASE_URL}/terms`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.4,
    },
  ];

  // Fix: Use correct Changefreq type for 'changefreq' property
  // Import Changefreq if not already imported
  // import type { Changefreq } from 'next-sitemap';

  // Map string values to Changefreq enum if necessary
  const fieldsWithTypedChangefreq = fields.map((field) => ({
    ...field,
    changefreq: field.changefreq as 'daily' | 'monthly', // or as Changefreq
  }));

  return getServerSideSitemap(fieldsWithTypedChangefreq);
}
