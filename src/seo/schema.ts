import { ROUTE_SEO, SEO_CONFIG } from '../config/seo';

/**
 * Builds the Schema.org JSON-LD Graph for the Arenova parent property.
 * All URLs resolve directly with 200 OK (trailing-slash canonicals).
 */
export function generateSchemaGraph(routeKey: '/' | '/pricing' | '/about' = '/') {
  const route = ROUTE_SEO[routeKey];

  const baseNodes: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      name: SEO_CONFIG.brandName,
      legalName: SEO_CONFIG.companyName,
      url: `${SEO_CONFIG.siteUrl}/`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SEO_CONFIG.siteUrl}/#logo`,
        url: `${SEO_CONFIG.siteUrl}/arenova.png`,
        contentUrl: `${SEO_CONFIG.siteUrl}/arenova.png`,
        width: '512',
        height: '512',
        caption: 'ARENOVA Logo',
      },
      image: `${SEO_CONFIG.siteUrl}/metadata.png`,
      slogan: SEO_CONFIG.slogan,
      description: SEO_CONFIG.description,
      knowsAbout: SEO_CONFIG.keywords,
      sameAs: ['https://frontdesk.arenova.in'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: SEO_CONFIG.contactEmail,
        availableLanguage: ['English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.siteUrl}/#website`,
      url: `${SEO_CONFIG.siteUrl}/`,
      name: SEO_CONFIG.brandName,
      description: SEO_CONFIG.description,
      publisher: {
        '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      },
      inLanguage: 'en-US',
    },
  ];

  if (routeKey === '/') {
    baseNodes.push(
      {
        '@type': 'WebPage',
        '@id': `${SEO_CONFIG.siteUrl}/#webpage`,
        url: route.canonicalUrl,
        name: route.title,
        isPartOf: { '@id': `${SEO_CONFIG.siteUrl}/#website` },
        about: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
        description: route.description,
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SEO_CONFIG.siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_CONFIG.siteUrl}/`,
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SEO_CONFIG.siteUrl}/#service`,
        name: SEO_CONFIG.companyName,
        image: `${SEO_CONFIG.siteUrl}/metadata.png`,
        url: `${SEO_CONFIG.siteUrl}/`,
        provider: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
        priceRange: '$$$',
        currenciesAccepted: 'USD',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Enterprise AI Automation & Outreach Services',
          itemListElement: SEO_CONFIG.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
              url: service.url,
            },
          })),
        },
      }
    );
  } else if (routeKey === '/pricing') {
    baseNodes.push(
      {
        '@type': 'WebPage',
        '@id': `${route.canonicalUrl}#webpage`,
        url: route.canonicalUrl,
        name: route.title,
        isPartOf: { '@id': `${SEO_CONFIG.siteUrl}/#website` },
        about: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
        description: route.description,
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${route.canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_CONFIG.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Pricing', item: route.canonicalUrl },
        ],
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${route.canonicalUrl}#catalog`,
        name: 'ARENOVA AI Automation Pricing Tiers',
        url: route.canonicalUrl,
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Sales & Outreach Engine',
            price: '999',
            priceCurrency: 'USD',
            url: route.canonicalUrl,
          },
          {
            '@type': 'Offer',
            name: 'Business & Operations Automation',
            price: '1999',
            priceCurrency: 'USD',
            url: route.canonicalUrl,
          },
          {
            '@type': 'Offer',
            name: 'Autonomous Enterprise',
            price: '3499',
            priceCurrency: 'USD',
            url: route.canonicalUrl,
          },
          {
            '@type': 'Offer',
            name: '24/7 Autonomous AI Frontdesk Add-on',
            price: '490',
            priceCurrency: 'USD',
            url: route.canonicalUrl,
          },
        ],
      }
    );
  } else {
    baseNodes.push(
      {
        '@type': 'AboutPage',
        '@id': `${route.canonicalUrl}#webpage`,
        url: route.canonicalUrl,
        name: route.title,
        isPartOf: { '@id': `${SEO_CONFIG.siteUrl}/#website` },
        about: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
        description: route.description,
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${route.canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_CONFIG.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: route.canonicalUrl },
        ],
      }
    );
  }

  return {
    '@context': 'https://schema.org',
    '@graph': baseNodes,
  };
}
