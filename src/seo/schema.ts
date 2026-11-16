import type { CanonicalRouteKey } from '../config/seo';
import { ROUTE_SEO, SEO_CONFIG } from '../config/seo';

/**
 * Builds the Schema.org JSON-LD Graph for the Arenova parent property.
 * Strictly outputs trailing-slash canonical URLs with rich entity relationships.
 */
export function generateSchemaGraph(routeKey: CanonicalRouteKey = '/') {
  const route = ROUTE_SEO[routeKey];

  const organizationNode = {
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
    hasPart: [
      { '@type': 'SoftwareApplication', name: 'Menzy', url: 'https://menzy.arenova.in/' },
      { '@type': 'SoftwareApplication', name: 'Arenova Frontdesk', url: 'https://frontdesk.arenova.in/' },
    ],
    currenciesAccepted: 'USD, INR',
    paymentAccepted: 'Stripe, Credit Card, Wire Transfer, ACH, UPI, Net Banking',
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SEO_CONFIG.contactEmail,
      availableLanguage: ['English'],
    },
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    url: `${SEO_CONFIG.siteUrl}/`,
    name: SEO_CONFIG.brandName,
    description: SEO_CONFIG.description,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    },
    inLanguage: 'en-US',
  };

  const webPageNode = {
    '@type': 'WebPage',
    '@id': `${route.canonicalUrl}#webpage`,
    url: route.canonicalUrl,
    name: route.title,
    isPartOf: { '@id': `${SEO_CONFIG.siteUrl}/#website` },
    about: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
    description: route.description,
    inLanguage: 'en-US',
  };

  // Build Breadcrumbs dynamically based on URL segments
  const breadcrumbItems: { '@type': string; position: number; name: string; item?: string }[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SEO_CONFIG.siteUrl}/`,
    },
  ];

  if (routeKey.startsWith('/services/')) {
    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SEO_CONFIG.siteUrl}/#services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: route.title.split('|')[0].trim(),
        item: route.canonicalUrl,
      }
    );
  } else if (routeKey.startsWith('/industries/')) {
    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Industries',
        item: `${SEO_CONFIG.siteUrl}/#use-cases`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: route.title.split('|')[0].trim(),
        item: route.canonicalUrl,
      }
    );
  } else if (routeKey.startsWith('/blog/')) {
    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SEO_CONFIG.siteUrl}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: route.title.split('|')[0].trim(),
        item: route.canonicalUrl,
      }
    );
  } else if (routeKey === '/blog') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: route.canonicalUrl,
    });
  } else if (routeKey.startsWith('/tools/')) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Tools & Calculators',
      item: route.canonicalUrl,
    });
  } else if (routeKey !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: route.title.split('|')[0].trim(),
      item: route.canonicalUrl,
    });
  }

  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': `${route.canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  const graphNodes: Record<string, unknown>[] = [
    organizationNode,
    websiteNode,
    webPageNode,
    breadcrumbNode,
  ];

  // If service route, attach rich Service Schema
  if (routeKey.startsWith('/services/')) {
    graphNodes.push({
      '@type': 'Service',
      '@id': `${route.canonicalUrl}#service`,
      name: route.title.split('|')[0].trim(),
      description: route.description,
      provider: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
      serviceType: 'AI Automation & Software Development',
      areaServed: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'],
      currenciesAccepted: 'USD, INR',
      termsOfService: `${SEO_CONFIG.siteUrl}/pricing/`,
    });
  }

  // If blog article, attach rich Article Schema
  if (route.ogType === 'article') {
    graphNodes.push({
      '@type': 'TechArticle',
      '@id': `${route.canonicalUrl}#article`,
      headline: route.title.split('|')[0].trim(),
      description: route.description,
      author: {
        '@type': 'Person',
        name: 'Avi',
        jobTitle: 'Founder & Systems Architect',
        worksFor: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
      },
      publisher: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
      datePublished: '2026-03-01T00:00:00+05:30',
      dateModified: '2026-11-16T00:00:00+05:30',
      mainEntityOfPage: route.canonicalUrl,
      image: `${SEO_CONFIG.siteUrl}/metadata.png`,
      inLanguage: 'en-US',
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };
}
