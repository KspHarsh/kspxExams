import { useEffect } from 'react';

const SITE_NAME = 'KSPXEXAMS';
const SITE_URL = 'https://kspxexams05.web.app';
const DEFAULT_DESCRIPTION = 'KSPXEXAMS — Your one-stop destination for latest government job notifications, exam updates, admit cards, results, syllabus, and study resources. Updated daily for 2026.';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`;

/**
 * SEOHead — Dynamic meta tag manager for SEO.
 * 
 * Usage:
 *   <SEOHead 
 *     title="SSC CGL 2026 Recruitment"
 *     description="Check eligibility, important dates, vacancy details..."
 *     path="/exam/ssc-cgl-2026"
 *     type="article"
 *     schema={{
 *       "@context": "https://schema.org",
 *       "@type": "JobPosting",
 *       "title": "SSC CGL 2026",
 *       ...
 *     }}
 *   />
 */
const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  type = 'website',
  image = DEFAULT_IMAGE,
  schema = null,
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Govt Job Notifications, Results & Admit Cards 2026`;
  const canonicalUrl = `${SITE_URL}${path}`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attribute, key, content) => {
      let el = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', description);
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      // Remove noindex if previously set
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_IN');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Structured Data
    const existingScript = document.querySelector('script[data-seo-schema]');
    if (existingScript) existingScript.remove();

    const schemaData = schema || {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': SITE_NAME,
      'url': SITE_URL,
      'description': DEFAULT_DESCRIPTION,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-schema', 'true');
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const schemaScript = document.querySelector('script[data-seo-schema]');
      if (schemaScript) schemaScript.remove();
    };
  }, [fullTitle, description, canonicalUrl, type, image, noindex, schema]);

  return null; // This component only modifies <head>, renders nothing
};

export default SEOHead;
