/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.indiantraveltour.in',
    generateRobotsTxt: true,
    changefreq: 'daily', // Travel sites get updated often
    priority: 0.8,
    sitemapSize: 5000,
    autoLastmod: true,
    exclude: ['/server-sitemap.xml'], // Dynamic handled separately
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/', // Let Google crawl everything
        },
      ],
      additionalSitemaps: [
        'https://www.indiantraveltour.in/server-sitemap.xml', // API-driven tours sitemap
      ],
    },
  };
  