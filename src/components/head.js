import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

/**
 * The single place page metadata is built.
 *
 * Posts used to bypass this and hand-roll their own Helmet block, which is how
 * they ended up with an image path in twitter:card (where a card *type*
 * belongs, so the card failed outright), a protocol-less og:url pointing at the
 * site root rather than the post, relative image URLs, and og:type=website.
 * Everything now goes through here so those cannot drift apart again.
 *
 * `image` is taken as a site-relative path and made absolute, since og:image
 * and twitter:image are both required to be absolute.
 */
const Head = ({ title, description, image, type, article }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    // trailingSlash is 'never', so pathname carries no trailing slash to strip.
    url: `${siteUrl}${pathname}`,
  };

  // The social title should read as the page, not as the bare site name, so it
  // gets the same "Page | Site" shape the document title has.
  const socialTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;

  const author = {
    '@type': 'Person',
    name: defaultTitle,
    url: siteUrl,
  };

  let schema;
  if (type === 'article') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: { '@type': 'WebPage', '@id': seo.url },
      headline: seo.title,
      description: seo.description,
      image: seo.image,
      url: seo.url,
      author,
      publisher: author,
      ...(article && article.datePublished ? { datePublished: article.datePublished } : {}),
      ...(article && article.dateModified ? { dateModified: article.dateModified } : {}),
      ...(article && article.keywords && article.keywords.length
        ? { keywords: article.keywords.join(', ') }
        : {}),
    };
  } else if (pathname === '/') {
    // The home page is the author's own page, so Person is the honest type,
    // with WebSite alongside it to describe the site itself.
    schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: defaultTitle,
          url: siteUrl,
          image: seo.image,
          description: seo.description,
          jobTitle: 'Software Engineer',
        },
        {
          '@type': 'WebSite',
          name: defaultTitle,
          url: siteUrl,
          description: defaultDescription,
          author,
        },
      ],
    };
  } else {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: seo.url,
      isPartOf: { '@type': 'WebSite', name: defaultTitle, url: siteUrl },
    };
  }

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />

      <link rel="canonical" href={seo.url} />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultTitle} />

      {type === 'article' && article && article.datePublished && (
        <meta property="article:published_time" content={article.datePublished} />
      )}
      {type === 'article' && <meta property="article:author" content={siteUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  article: PropTypes.shape({
    datePublished: PropTypes.string,
    dateModified: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
  }),
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
  type: 'website',
  article: null,
};

export default Head;
