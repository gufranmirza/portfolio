import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mic } from 'lucide-react';
import { Layout } from '@components';

/**
 * Talks (handoff §5). Grouped by year in an 80px | 1fr grid.
 *
 * The design shows a type chip (Conference / Guest lecture / Meetup / Tech
 * talk) that the frontmatter does not carry, so it is derived from the venue
 * name rather than added to the content layer.
 */
const talkType = venue => {
  const v = String(venue || '');
  if (/meetup/i.test(v)) {
    return 'Meetup';
  }
  if (/conf|summit|kubecon/i.test(v)) {
    return 'Conference';
  }
  if (/university|college|institute|school|\bGMU\b|-CEC/i.test(v)) {
    return 'Guest lecture';
  }
  return 'Tech talk';
};

const StyledSection = styled.section`
  padding: 52px 0 72px;

  @media (max-width: 760px) {
    padding: 36px 0 48px;
  }

  .masthead {
    max-width: 640px;
    margin-bottom: 20px;
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

const StyledYear = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 28px;
  padding: 32px 0;
  border-top: 1px solid rgba(60, 64, 67, 0.12);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 24px 0;
  }

  .year {
    font-family: var(--font-display);
    font-size: var(--fz-md);
    font-weight: 500;
    color: var(--text-primary);
    padding-top: 2px;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const StyledTalk = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  transition: background var(--transition);

  &:hover {
    background: var(--surface-hover);
  }

  .tile {
    flex: none;
    width: 40px;
    height: 40px;
    margin-top: 2px;
    border-radius: var(--radius-tile);
    background: var(--blue-tint);
    color: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .body {
    flex: 1;
    min-width: 0;
  }

  h2 {
    margin: 0 0 8px;
    font-size: var(--fz-talk-title);
    line-height: 1.28;
    font-weight: 500;
    color: var(--text-primary);

    a {
      color: var(--text-primary);
      text-decoration: none;

      &:hover {
        color: var(--blue-pressed);
      }
    }
  }

  /* type chip and venue share a row beneath the title */
  .subrow {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 10px;
  }

  .subrow .tag {
    font-size: var(--fz-chip);
    padding: 3px 11px;
    letter-spacing: 0.01em;
  }

  .venue {
    font-size: var(--fz-card-desc);
    color: var(--text-muted);
  }

  .desc {
    margin: 0 0 12px;
    font-size: var(--fz-nav);
    line-height: 1.55;
    color: var(--text-muted);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 13px;
  }

  .links {
    display: flex;
    gap: 20px;

    a {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: var(--fz-card-desc);
      font-weight: 500;
      text-decoration: none;
      white-space: nowrap;
    }

    .slides {
      color: var(--blue);

      &:hover {
        color: var(--blue-pressed);
      }
    }

    /* the secondary link is grey, not blue */
    .event {
      color: var(--text-muted);

      &:hover {
        color: var(--blue);
      }
    }
  }
`;

const StyledCta = styled.div`
  margin-top: 52px;
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

const TalksPage = ({ data, location }) => {
  const talks = (data.talks.edges || []).map(({ node }) => node);

  const years = [];
  talks.forEach(node => {
    const year = String(node.frontmatter.date).slice(0, 4);
    const bucket = years.find(y => y.year === year);
    if (bucket) {
      bucket.items.push(node);
    } else {
      years.push({ year, items: [node] });
    }
  });

  return (
    <Layout location={location}>
      <StyledSection>
        <div className="masthead">
          <div className="eyebrow" style={{ marginBottom: '12px' }}>
            Speaking
          </div>
          <h1>Talks &amp; guest lectures</h1>
          <p className="intro">
            Conference sessions, university guest lectures, and meetup talks — mostly on Go, service
            meshes, and systems security.
          </p>
        </div>

        {years.map(({ year, items }) => (
          <StyledYear key={year}>
            <div className="year">{year}</div>
            <div className="items">
              {items.map(node => {
                const {
                  title,
                  github,
                  presentation,
                  location: eventUrl,
                  locationName,
                  tech,
                } = node.frontmatter;
                return (
                  <StyledTalk key={title}>
                    <span className="tile">
                      <Mic size={20} strokeWidth={1.8} />
                    </span>
                    <div className="body">
                      <h2>
                        {github ? (
                          <a href={github} target="_blank" rel="noopener noreferrer">
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                      </h2>
                      <div className="subrow">
                        <span className="tag tag-accent">{talkType(locationName)}</span>
                        <span className="venue">{locationName}</span>
                      </div>
                      <p className="desc">{node.excerpt}</p>
                      {tech && tech.length > 0 && (
                        <div className="chips">
                          {tech.map(t => (
                            <span key={t} className="tag tag-neutral">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="links">
                        {presentation && (
                          <a
                            className="slides"
                            href={presentation}
                            target="_blank"
                            rel="noopener noreferrer">
                            Slides ↗
                          </a>
                        )}
                        {eventUrl && (
                          <a
                            className="event"
                            href={eventUrl}
                            target="_blank"
                            rel="noopener noreferrer">
                            Event ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </StyledTalk>
                );
              })}
            </div>
          </StyledYear>
        ))}

        <StyledCta>
          <div style={{ maxWidth: '490px' }}>
            <h2>Speaking at your event?</h2>
            <p>
              I talk about confidential computing, Go internals, and cloud-native security —
              conferences, meetups, or a guest lecture. Slides for every talk are on GitHub.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a className="pill pill-primary" href="mailto:gufranmirza1@gmail.com">
                Get in touch
              </a>
              <a
                className="pill pill-secondary"
                href="https://github.com/gufranmirza/talks"
                target="_blank"
                rel="noopener noreferrer">
                Slides on GitHub
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

TalksPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default TalksPage;

export const pageQuery = graphql`
  {
    talks: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/talks//" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          frontmatter {
            date
            title
            github
            presentation
            location
            locationName
            tech
          }
        }
      }
    }
  }
`;
