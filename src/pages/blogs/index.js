import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { topicFor, TOPIC_FILTERS, formatDate, formatDateShort } from '@utils';
import { socialMedia } from '@config';

/** The `>_` prompt mark, as used in the header and every CTA panel. */
const PromptGlyph = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <polyline
      points="7,7 13,12 7,17"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="14.5"
      y1="17"
      x2="18.5"
      y2="17"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Blogs listing (handoff §2) — magazine layout.
 *
 * Topic chips filter the pool; the pool's first post becomes the dark featured
 * hero, the next two the medium tiles, the remainder a two-column card grid.
 */
const StyledSection = styled.section`
  padding: 52px 0 72px;

  @media (max-width: 760px) {
    padding: 36px 0 48px;
  }
`;

const StyledMasthead = styled.div`
  margin-bottom: 36px;

  h1 {
    margin: 0 0 14px;
    max-width: 720px;
    font-size: var(--fz-h1-section);
    line-height: 1.07;
    font-weight: 400;
    letter-spacing: -0.025em;

    @media (max-width: 760px) {
      font-size: var(--fz-h1-mobile);
      line-height: 1.12;
      max-width: none;
      letter-spacing: -0.02em;
    }
  }

  .intro {
    margin: 0;
    max-width: 600px;
    font-size: var(--fz-card-title);
    line-height: 1.6;
    color: var(--text-muted);
  }

  .identity {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 26px;
  }

  .who {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }

    .name {
      font-family: var(--font-display);
      font-size: 14.5px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .role {
      font-size: 12.5px;
      color: var(--text-muted);
    }
  }

  .divider {
    width: 1px;
    height: 32px;
    background: var(--scrim);
  }

  .socials {
    display: flex;
    gap: 16px;

    a {
      font-size: var(--fz-sm);
      color: var(--text-muted);
      text-decoration: none;
      transition: color var(--transition);

      &:hover {
        color: var(--blue);
      }
    }
  }
`;

const StyledFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;

  button {
    cursor: pointer;
    font-size: 12.5px;
    padding: 6px 14px;
    border: 0;
    outline: 0;
    border-radius: var(--radius-chip);
    font-family: var(--font-sans);
    transition: filter var(--transition);

    &:hover {
      filter: brightness(0.96);
    }
  }
`;

const StyledMag = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StyledHero = styled(Link)`
  position: relative;
  border-radius: var(--radius-media);
  overflow: hidden;
  min-height: 360px;
  background: var(--media-dark);
  display: block;
  color: #ffffff;
  text-decoration: none;
  transition: filter var(--transition);

  &:hover {
    filter: brightness(1.05);
    color: #ffffff;
  }

  .media,
  .media img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.82;
  }

  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(18, 19, 28, 0.96) 6%,
      rgba(18, 19, 28, 0.42) 52%,
      transparent
    );
  }

  .body {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 34px;
  }

  .kick {
    font-size: var(--fz-count);
    letter-spacing: 0.01em;
    color: var(--blue-on-dark);
    margin-bottom: 12px;
  }

  h2 {
    margin: 0 0 12px;
    font-size: var(--fz-featured);
    line-height: 1.14;
    font-weight: 500;
    letter-spacing: -0.015em;
    max-width: 500px;
    color: #ffffff;
  }

  p {
    margin: 0 0 14px;
    font-size: 14px;
    line-height: 1.55;
    color: #e8e9f4;
    max-width: 480px;
  }

  .date {
    font-size: var(--fz-eyebrow);
    color: #c7cad9;
  }
`;

const StyledMediums = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledMedium = styled(Link)`
  flex: 1;
  background: var(--surface);
  border-radius: var(--radius-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--ring);
  text-decoration: none;
  transition: background var(--transition);

  &:hover {
    background: var(--surface-hover);
  }

  .cover {
    height: 118px;
    background: var(--neutral-fill);
    position: relative;
    overflow: hidden;

    img,
    .gatsby-image-wrapper {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .meta {
    padding: 16px 20px;
  }

  h3 {
    margin: 0;
    font-size: var(--fz-md);
    line-height: 1.28;
    font-weight: 500;
    color: var(--text-primary);
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled(Link)`
  display: flex;
  gap: 18px;
  background: var(--surface);
  border-radius: var(--radius-card);
  padding: 20px;
  box-shadow: var(--ring);
  text-decoration: none;
  transition: background var(--transition);

  &:hover {
    background: var(--surface-hover);
  }

  .thumbwrap {
    width: 72px;
    height: 72px;
    flex: none;
    border-radius: var(--radius-thumb);
    overflow: hidden;
    background: var(--neutral-fill);
    box-shadow: var(--ring-strong);
  }

  .thumbwrap img,
  .thumbwrap .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  h3 {
    margin: 0 0 7px;
    font-size: var(--fz-md);
    line-height: 1.28;
    font-weight: 500;
    color: var(--text-primary);
  }

  .excerpt {
    margin: 0 0 12px;
    font-size: var(--fz-sm);
    line-height: 1.5;
    color: var(--text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .foot {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    margin-top: auto;
  }

  .when {
    font-size: var(--fz-kicker);
    color: var(--text-faint);
    margin-left: auto;
  }
`;

const StyledCta = styled.div`
  margin-top: 60px;
  border-radius: var(--radius-panel);
  background: var(--cta-gradient);
  padding: 52px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    padding: 28px 22px;
    gap: 20px;

    /* v2: the gradient tile is dropped and both pills sit on one row */
    > div:first-child {
      max-width: none;
    }
    > div:last-child,
    .glyph {
      display: none;
    }
    .pills,
    > div:first-child > div:last-child {
      flex-wrap: nowrap;
      gap: 10px;
    }
    .pill {
      padding: 10px 16px;
      font-size: var(--fz-sm);
    }
  }

  h2 {
    margin: 0 0 10px;
    font-size: var(--fz-cta-h2);
    line-height: 1.2;
    font-weight: 400;
    color: var(--text-primary);

    @media (max-width: 760px) {
      font-size: 23px;
    }
  }

  p {
    margin: 0 0 24px;
    font-size: var(--fz-base);
    line-height: 1.6;
    color: var(--text-muted);
  }

  .pills {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .pills .pill {
    padding: 11px 22px;
  }

  .glyph {
    width: 150px;
    height: 150px;
    flex: none;
    border-radius: 38px;
    background: var(--brand-gradient);
    box-shadow: 0 14px 34px rgba(26, 115, 232, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/**
 * One query feeds three very different boxes, so each caller passes the size it
 * actually renders at. Without that the browser assumes the full 1400px and
 * either over-fetches or, worse, picks a candidate too small and blurs.
 */
const Cover = ({ node, alt, sizes }) => {
  const image = getImage(node.frontmatter.cover?.childImageSharp);
  return image ? <GatsbyImage image={image} alt={alt || ''} sizes={sizes} /> : <span />;
};

Cover.propTypes = { node: PropTypes.object, alt: PropTypes.string, sizes: PropTypes.string };

const BlogsPage = ({ data, location }) => {
  const [topic, setTopic] = useState('All');

  const all = (data.allMarkdownRemark.edges || []).map(({ node }) => ({
    ...node,
    topic: topicFor(node.frontmatter),
  }));

  const pool = topic === 'All' ? all : all.filter(p => p.topic === topic);
  const hero = pool[0];
  const mediums = pool.slice(1, 3);
  const rest = pool.slice(3);

  return (
    <Layout
      location={location}
      seo={{
        title: 'Writing',
        description:
          'Notes from the low levels of the stack: confidential computing, hardware roots of trust, attestation, and the occasional Go deep-dive.',
      }}>
      <StyledSection>
        <StyledMasthead>
          <div className="eyebrow" style={{ marginBottom: '14px' }}>
            Writing
          </div>
          <h1>
            Notes from the <span style={{ color: 'var(--blue)' }}>low levels</span> of the stack
          </h1>
          <p className="intro">
            Confidential computing, hardware roots of trust, attestation, and the occasional Go
            deep-dive. {all.length} posts and counting.
          </p>

          <div className="identity">
            <div className="who">
              <img src="/me.jpg" alt="Gufran Mirza" className="thumb" />
              <div>
                <div className="name">Gufran Mirza</div>
                <div className="role">Systems &amp; security engineer</div>
              </div>
            </div>
            <div className="divider" />
            <div className="socials">
              {socialMedia
                .filter(({ name }) => ['GitHub', 'Twitter', 'Linkedin'].includes(name))
                .map(({ name, url }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                    {name === 'Linkedin' ? 'LinkedIn' : name}
                  </a>
                ))}
            </div>
          </div>
        </StyledMasthead>

        <StyledFilters>
          {TOPIC_FILTERS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`tag ${t === topic ? 'tag-accent' : 'tag-neutral'}`}>
              {t}
            </button>
          ))}
        </StyledFilters>

        {hero && (
          <StyledMag>
            <StyledHero to={hero.frontmatter.slug}>
              <div className="media">
                <Cover node={hero} sizes="(max-width: 760px) 100vw, 656px" />
              </div>
              <div className="scrim" />
              <div className="body">
                <div className="kick">Latest · {hero.topic}</div>
                <h2>{hero.frontmatter.title}</h2>
                <p>{hero.frontmatter.description}</p>
                <div className="date">{formatDate(hero.frontmatter.date)}</div>
              </div>
            </StyledHero>

            <StyledMediums>
              {mediums.map(post => (
                <StyledMedium key={post.frontmatter.slug} to={post.frontmatter.slug}>
                  <div className="cover">
                    <Cover node={post} sizes="(max-width: 760px) 100vw, 432px" />
                  </div>
                  <div className="meta">
                    <div className="kicker" style={{ marginBottom: '7px' }}>
                      {post.topic}
                    </div>
                    <h3>{post.frontmatter.title}</h3>
                  </div>
                </StyledMedium>
              ))}
            </StyledMediums>
          </StyledMag>
        )}

        {rest.length > 0 && (
          <StyledGrid>
            {rest.map(post => (
              <StyledCard key={post.frontmatter.slug} to={post.frontmatter.slug}>
                <div className="thumbwrap">
                  <Cover node={post} sizes="72px" />
                </div>
                <div className="content">
                  <div className="kicker" style={{ marginBottom: '7px' }}>
                    {post.topic}
                  </div>
                  <h3>{post.frontmatter.title}</h3>
                  <p className="excerpt">{post.frontmatter.description}</p>
                  <div className="foot">
                    {(post.frontmatter.tags || []).slice(0, 3).map(tag => (
                      <span key={tag} className="tag tag-neutral">
                        {tag}
                      </span>
                    ))}
                    <span className="when">{formatDateShort(post.frontmatter.date)}</span>
                  </div>
                </div>
              </StyledCard>
            ))}
          </StyledGrid>
        )}

        <StyledCta>
          <div style={{ maxWidth: '470px' }}>
            <h2>New posts, now and then.</h2>
            <p>
              No newsletter, no spam — just deep dives on systems and security when I finish one.
              Follow along wherever you already are.
            </p>
            <div className="pills">
              <a
                className="pill pill-primary"
                href="https://github.com/gufranmirza"
                target="_blank"
                rel="noopener noreferrer">
                Follow on GitHub
              </a>
              <a className="pill pill-secondary" href="mailto:gufranmirza1@gmail.com">
                Get in touch
              </a>
            </div>
          </div>
          <div className="glyph">
            <PromptGlyph />
          </div>
        </StyledCta>
      </StyledSection>
    </Layout>
  );
};

BlogsPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogsPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
            cover {
              childImageSharp {
                gatsbyImageData(width: 1400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
  }
`;
