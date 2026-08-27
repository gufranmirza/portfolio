import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { topicFor, formatDateShort } from '@utils';
import { socialMedia } from '@config';
import { FlaskConical, Mic } from 'lucide-react';
import { Icon } from '@components/icons';

/** Work-history monogram tiles carry the company's brand colour (handoff §Color). */
const COMPANY_COLOR = {
  'Palo Alto Networks': 'var(--co-panw)',
  'Protect AI': 'var(--co-protectai)',
  'TrustCore Systems': 'var(--co-trustcore)',
  IBM: 'var(--co-ibm)',
  ConnectWise: 'var(--co-connectwise)',
};

/* Auto-initials read badly for these ("IBM Software Lab" -> IS), so the
   monogram is explicit; anything new falls back to first-letters. */
const MONOGRAM = {
  'Palo Alto Networks': 'PA',
  'Protect AI': 'P',
  'TrustCore Systems': 'TC',
  IBM: 'IBM',
  ConnectWise: 'CW',
};

const monogramFor = name =>
  MONOGRAM[name] ||
  name
    .replace(/[^A-Za-z ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

const StyledHero = styled.section`
  padding: 72px 0 44px;

  @media (max-width: 760px) {
    padding: 44px 0 30px;
  }

  .row {
    display: flex;
    gap: 48px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 760px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 28px;
    }
  }

  .col {
    max-width: 600px;
  }

  h1 {
    margin: 0 0 18px;
    font-size: var(--fz-h1-home);
    line-height: 1.05;
    font-weight: 400;
    letter-spacing: -0.03em;

    @media (max-width: 760px) {
      font-size: var(--fz-h1-mobile);
      line-height: 1.12;
      max-width: none;
      letter-spacing: -0.02em;
    }
  }

  .intro {
    margin: 0 0 28px;
    max-width: 520px;
    font-size: var(--fz-hero-intro);
    line-height: 1.6;
    color: var(--text-muted);
  }

  .pills {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .socials {
    display: flex;
    gap: 18px;
    margin-top: 26px;

    a {
      color: var(--text-muted);
      transition: color var(--transition);
      display: inline-flex;

      &:hover {
        color: var(--blue);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

/* Photo sits over an offset block of 45deg hairline stripes. No drop shadow. */
const StyledPhoto = styled.div`
  position: relative;
  flex: none;
  width: 300px;
  height: 344px;
  margin: 0 14px 14px 0;

  /* v2: the photo centres under the stacked hero rather than scaling down */
  @media (max-width: 760px) {
    align-self: center;
    margin: 0 0 14px 0;
  }

  .strips {
    position: absolute;
    right: -14px;
    bottom: -14px;
    width: 300px;
    height: 344px;
    border-radius: var(--radius-panel);
    background: repeating-linear-gradient(
      45deg,
      rgba(26, 115, 232, 0.45) 0 2px,
      transparent 2px 11px
    );
  }

  .frame {
    position: relative;
    width: 300px;
    height: 344px;
    border-radius: var(--radius-panel);
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(60, 64, 67, 0.16);
    background: var(--neutral-fill);

    img,
    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const StyledSection = styled.section`
  padding: 60px 0 8px;

  @media (max-width: 760px) {
    padding: 40px 0 6px;
  }

  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 22px;
  }

  h2 {
    margin: 0;
    font-size: var(--fz-h2);
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--text-primary);

    @media (max-width: 760px) {
      font-size: 21px;
    }
  }

  /* Explore and Where I've worked carry a bare heading, not a header row. */
  h2.solo {
    margin: 0 0 20px;
  }

  .more {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: var(--fz-sm);
    font-weight: 500;
    color: var(--blue);
    text-decoration: none;

    &:hover {
      color: var(--blue-pressed);
    }
  }
`;

const StyledG3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPostCard = styled(Link)`
  background: var(--surface);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--ring);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: background var(--transition);

  &:hover {
    background: var(--surface-hover);
  }

  .cover {
    height: 150px;
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
    padding: 20px 20px 18px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  h3 {
    margin: 0 0 9px;
    font-size: var(--fz-card-title);
    line-height: 1.3;
    font-weight: 500;
    color: var(--text-primary);
  }

  .excerpt {
    margin: 0 0 16px;
    font-size: var(--fz-sm);
    line-height: 1.55;
    color: var(--text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .when {
    margin-top: auto;
    font-size: var(--fz-count);
    color: var(--text-faint);
  }
`;

const StyledG2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StyledExplore = styled(Link)`
  background: var(--surface);
  border-radius: var(--radius-card);
  padding: 26px;
  box-shadow: var(--ring);
  text-decoration: none;
  display: block;
  transition: background var(--transition);

  &:hover {
    background: var(--surface-hover);
  }

  .cardhead {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 18px;
  }

  .tile {
    width: 56px;
    height: 56px;
    flex: none;
    border-radius: var(--radius-card);
    background: var(--blue-tint);
    color: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Title, copy and link share one column beside the tile, so the copy sits
     directly under the title rather than below the whole 56px tile box. */
  .cardbody {
    flex: 1;
    min-width: 0;
    padding-top: 2px;
  }

  .titlerow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 7px;
  }

  /* count chip is a pill here, not the 6px-radius body chip */
  .titlerow .tag {
    border-radius: var(--radius-pill);
    padding: 2px 9px;
    font-size: var(--fz-meta);
    font-weight: 500;
  }

  h3 {
    margin: 0;
    font-size: var(--fz-lede);
    font-weight: 500;
    color: var(--text-primary);
  }

  p {
    margin: 0 0 12px;
    font-size: 13.5px;
    line-height: 1.55;
    color: var(--text-muted);
  }

  .go {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--blue);
  }
`;

const StyledJobs = styled.div`
  display: flex;
  flex-direction: column;

  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 12px;
    margin: 0 -12px;
    border-radius: var(--radius-tile);
    border-top: 1px solid rgba(60, 64, 67, 0.1);
    text-decoration: none;
    transition: background var(--transition);

    &:first-child {
      border-top: 0;
    }

    &:hover {
      background: var(--surface-hover);
    }
  }

  .mark {
    width: 40px;
    height: 40px;
    flex: none;
    border-radius: var(--radius-tile);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .body {
    flex: 1;
    min-width: 0;
  }

  .line1 {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
  }

  .role {
    font-size: 15.5px;
    color: var(--text-primary);

    strong {
      font-weight: 500;
    }

    .co {
      color: var(--text-muted);
    }
  }

  .range {
    font-size: 11.5px;
    color: var(--text-faint);
    white-space: nowrap;
  }

  .line2 {
    display: block;
    margin: 5px 0 0;
    font-size: var(--fz-sm);
    line-height: 1.5;
    color: var(--text-muted);

    .place {
      color: var(--text-muted);
      font-weight: 400;
    }
  }
`;

const StyledCta = styled.div`
  margin: 64px 0 8px;
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

  /* CTA pills are a touch tighter than the hero pair. */
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

/* Social marks come from the codebase's own Feather-derived set: Lucide 1.x
   dropped brand icons, and the handoff says to use the codebase's icon set. */
const SOCIAL_ICONS = ['GitHub', 'Twitter', 'Linkedin'];

const IndexPage = ({ data, location }) => {
  const posts = (data.posts.edges || []).map(({ node }) => node);
  const jobs = (data.jobs.edges || []).map(({ node }) => node);
  const expCount = data.experiments.totalCount;
  const talkCount = data.talks.totalCount;
  const me = getImage(data.me?.childImageSharp);

  return (
    <Layout location={location}>
      <StyledHero>
        <div className="row">
          <div className="col">
            <div className="eyebrow" style={{ marginBottom: '16px' }}>
              Gufran Mirza
            </div>
            <h1>
              I build and break <span style={{ color: 'var(--blue)' }}>systems</span>.
            </h1>
            <p className="intro">
              Systems &amp; security engineer working on confidential computing, hardware roots of
              trust, and the low levels of the stack. I write about what I learn along the way.
            </p>
            <div className="pills">
              <Link className="pill pill-primary" to="/blogs">
                Read the blog
              </Link>
              <a className="pill pill-secondary" href="mailto:gufranmirza1@gmail.com">
                Get in touch
              </a>
            </div>
            <div className="socials">
              {socialMedia
                .filter(({ name }) => SOCIAL_ICONS.includes(name))
                .map(({ name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name === 'Linkedin' ? 'LinkedIn' : name}>
                    <Icon name={name} />
                  </a>
                ))}
            </div>
          </div>

          <StyledPhoto>
            <div className="strips" />
            <div className="frame">
              {me ? <GatsbyImage image={me} alt="Gufran Mirza" /> : <span />}
            </div>
          </StyledPhoto>
        </div>
      </StyledHero>

      <StyledSection>
        <div className="head">
          <h2>Latest writing</h2>
          <Link className="more" to="/blogs">
            All posts →
          </Link>
        </div>
        <StyledG3>
          {posts.map(node => {
            const image = getImage(node.frontmatter.cover?.childImageSharp);
            return (
              <StyledPostCard key={node.frontmatter.slug} to={node.frontmatter.slug}>
                <div className="cover">
                  {image ? (
                    <GatsbyImage image={image} alt="" sizes="(max-width: 760px) 100vw, 362px" />
                  ) : (
                    <span />
                  )}
                </div>
                <div className="meta">
                  <div className="kicker" style={{ marginBottom: '8px' }}>
                    {topicFor(node.frontmatter)}
                  </div>
                  <h3>{node.frontmatter.title}</h3>
                  <p className="excerpt">{node.frontmatter.description}</p>
                  <div className="when">
                    {formatDateShort(node.frontmatter.date)} · {node.timeToRead} min read
                  </div>
                </div>
              </StyledPostCard>
            );
          })}
        </StyledG3>
      </StyledSection>

      <StyledSection>
        <h2 className="solo">Explore</h2>
        <StyledG2>
          <StyledExplore to="/experiments">
            <div className="cardhead">
              <div className="tile">
                <FlaskConical size={26} strokeWidth={1.8} />
              </div>
              <div className="cardbody">
                <div className="titlerow">
                  <h3>Experiments</h3>
                  <span className="tag tag-accent">{expCount}</span>
                </div>
                <p>
                  Proofs of concept and things I&apos;ve hacked on — portable operating systems,
                  cloud desktops, and compute sticks.
                </p>
                <span className="go">View projects →</span>
              </div>
            </div>
          </StyledExplore>

          <StyledExplore to="/talks">
            <div className="cardhead">
              <div className="tile">
                <Mic size={26} strokeWidth={1.8} />
              </div>
              <div className="cardbody">
                <div className="titlerow">
                  <h3>Talks</h3>
                  <span className="tag tag-accent">{talkCount}</span>
                </div>
                <p>
                  Conference sessions, guest lectures, and meetup talks on Go, service meshes, and
                  systems security.
                </p>
                <span className="go">View talks →</span>
              </div>
            </div>
          </StyledExplore>
        </StyledG2>
      </StyledSection>

      <StyledSection>
        <h2 className="solo">Where I&apos;ve worked</h2>
        <StyledJobs>
          {jobs.map(node => {
            const { title, company, location: place, range, url } = node.frontmatter;
            return (
              <a
                className="row"
                key={company + range}
                href={url}
                target="_blank"
                rel="noopener noreferrer">
                <span
                  className="mark"
                  style={{ background: COMPANY_COLOR[company] || 'var(--text-muted)' }}>
                  {monogramFor(company)}
                </span>
                <span className="body">
                  <span className="line1">
                    <span className="role">
                      <strong>{title}</strong> <span className="co">· {company}</span>
                    </span>
                    <span className="range">{range}</span>
                  </span>
                  <span className="line2">
                    <span className="place">{place}</span>
                    {node.excerpt ? ` · ${node.excerpt}` : ''}
                  </span>
                </span>
              </a>
            );
          })}
        </StyledJobs>
      </StyledSection>

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
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts//" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            description
            slug
            date
            tags
            cover {
              childImageSharp {
                gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/jobs//" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 220)
          frontmatter {
            title
            company
            location
            range
            url
          }
        }
      }
    }
    experiments: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/experiments//" } }
    ) {
      totalCount
    }
    talks: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/talks//" } }) {
      totalCount
    }
    me: file(relativePath: { eq: "me.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 600, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`;
