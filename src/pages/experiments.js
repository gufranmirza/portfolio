import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { Play } from 'lucide-react';

/**
 * Experiments (handoff §4).
 *
 * Three-up cards. The 168px cover carries a centred play badge because every
 * one of these links to a video demo.
 */
const StyledSection = styled.section`
  padding: 52px 0 72px;

  @media (max-width: 760px) {
    padding: 36px 0 48px;
  }

  .masthead {
    max-width: 640px;
    margin-bottom: 34px;
  }

  h1 {
    margin: 0 0 12px;
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
    font-size: var(--fz-md);
    line-height: 1.6;
    color: var(--text-muted);
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.article`
  background: var(--surface);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--ring);
  display: flex;
  flex-direction: column;
  transition: background var(--transition);

  &:hover {
    background: var(--surface-hover);
  }

  .cover {
    height: 168px;
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

  .badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: rgba(15, 17, 27, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    z-index: 1;
  }

  .meta {
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  h2 {
    margin: 0 0 10px;
    font-size: var(--fz-md);
    line-height: 1.28;
    font-weight: 500;
    color: var(--text-primary);
  }

  .desc {
    margin: 0 0 16px;
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--text-muted);
    flex: 1;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }

  .watch {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fz-sm);
    font-weight: 500;
    color: var(--blue);
    text-decoration: none;

    &:hover {
      color: var(--blue-pressed);
    }
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

  .pill {
    padding: 11px 22px;
  }

  .glyph {
    width: 150px;
    height: 150px;
    flex: none;
    border-radius: 38px;
    background: var(--brand-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/**
 * Card copy comes from the markdown body, which opens with a "💡 — " flourish
 * and would otherwise truncate mid-word. Strip the decoration and cut back to
 * the last complete sentence. The content itself is left alone.
 */
const cleanExcerpt = text => {
  const stripped = String(text || '')
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .trim();
  const cut = stripped.slice(0, 190);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  return end > 60 ? cut.slice(0, end + 1) : `${cut.replace(/\s+\S*$/, '')}…`;
};

const PlayBadge = () => (
  <span className="badge" aria-hidden="true">
    <Play size={20} fill="currentColor" strokeWidth={0} />
  </span>
);

const ExperimentsPage = ({ data, location }) => {
  const items = (data.experiments.edges || []).map(({ node }) => node);

  return (
    <Layout location={location}>
      <StyledSection>
        <div className="masthead">
          <div className="eyebrow" style={{ marginBottom: '12px' }}>
            Experiments
          </div>
          <h1>Proofs of concept &amp; things I&apos;ve hacked on</h1>
          <p className="intro">
            Hardware and systems side-projects — portable operating systems, cloud desktops, and
            compute sticks. Most of them have a short video demo.
          </p>
        </div>

        <StyledGrid>
          {items.map(node => {
            const { title, cover, external, cta, tech } = node.frontmatter;
            const image = getImage(cover?.childImageSharp);
            const href = cta || external;
            return (
              <StyledCard key={title}>
                <div className="cover">
                  {image ? (
                    <GatsbyImage image={image} alt="" sizes="(max-width: 760px) 100vw, 362px" />
                  ) : (
                    <span />
                  )}
                  <PlayBadge />
                </div>
                <div className="meta">
                  <div className="kicker" style={{ marginBottom: '8px' }}>
                    Proof of concept
                  </div>
                  <h2>{title}</h2>
                  <p className="desc">{cleanExcerpt(node.excerpt)}</p>
                  {tech && tech.length > 0 && (
                    <div className="chips">
                      {tech.map(t => (
                        <span key={t} className="tag tag-neutral">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {href && (
                    <a className="watch" href={href} target="_blank" rel="noopener noreferrer">
                      Watch demo ↗
                    </a>
                  )}
                </div>
              </StyledCard>
            );
          })}
        </StyledGrid>

        <StyledCta>
          <div style={{ maxWidth: '470px' }}>
            <h2>Most of this lives on GitHub.</h2>
            <p>
              The experiments, the talks, and the half-finished ideas are all out in the open. Come
              poke around.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
          </div>
        </StyledCta>
      </StyledSection>
    </Layout>
  );
};

ExperimentsPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default ExperimentsPage;

export const pageQuery = graphql`
  {
    experiments: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/experiments//" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 260)
          frontmatter {
            title
            external
            cta
            github
            tech
            cover {
              childImageSharp {
                gatsbyImageData(width: 1000, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
  }
`;
