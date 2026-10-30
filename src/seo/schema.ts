import { SEO_CONFIG } from '../config/seo';

/**
 * Builds the Schema.org JSON-LD Graph for the Arenova parent property.
 * Strictly adheres to Google Search Central documentation and Schema.org standards.
 * Only genuine, verified business details and service catalogs are included.
 */
export function generateSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
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
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
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
      {
        '@type': 'WebPage',
        '@id': `${SEO_CONFIG.siteUrl}/#webpage`,
        url: `${SEO_CONFIG.siteUrl}/`,
        name: SEO_CONFIG.title,
        isPartOf: {
          '@id': `${SEO_CONFIG.siteUrl}/#website`,
        },
        about: {
          '@id': `${SEO_CONFIG.siteUrl}/#organization`,
        },
        description: SEO_CONFIG.description,
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
        provider: {
          '@id': `${SEO_CONFIG.siteUrl}/#organization`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI Automation & Performance Marketing Services',
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
      },
    ],
  };
}

