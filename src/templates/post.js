import React, { useEffect, useRef, useState } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { topicFor, formatDate } from '@utils';

/**
 * Reading page (handoff §3).
 *
 * Fixed 3px progress bar, a 210px sticky table of contents beside a 760px
 * measure, then a three-up "Keep reading" grid. The TOC is built from the
 * post's h2 headings; ids are stamped onto the rendered nodes after mount so
 * the content pipeline stays untouched.
 */
const StyledProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(60, 64, 67, 0.09);
  z-index: 30;

  span {
    display: block;
    width: 0;
    height: 100%;
    background: var(--blue);
    transition: width 0.05s linear;
  }
`;

const StyledRead = styled.div`
  display: grid;
  grid-template-columns: var(--toc-width) 1fr;
  gap: 0;
  padding-top: 8px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;

    aside {
      display: none;
    }
  }
`;

const StyledAside = styled.aside`
  padding: 56px 24px 44px 0;

  .sticky {
    position: sticky;
    top: 96px;
  }

  .all-posts {
    font-size: var(--fz-xs);
    color: var(--text-muted);
    display: inline-block;
    margin-bottom: 26px;
    text-decoration: none;
    transition: color var(--transition);

    &:hover {
      color: var(--blue-pressed);
    }
  }

  .toc-label {
    font-family: var(--font-display);
    font-size: var(--fz-kicker);
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--text-faint);
    margin-bottom: 16px;
  }

  .toc {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .toc a {
    font-size: 12.5px;
    line-height: 1.35;
    padding-left: 12px;
    border-left: 2px solid rgba(60, 64, 67, 0.18);
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition), border-color var(--transition);

    &:hover {
      color: var(--blue-pressed);
    }

    &.active {
      color: var(--blue-pressed);
      border-left-color: var(--blue);
    }
  }
`;

const StyledArticle = styled.article`
  padding: 52px 0 60px;

  @media (max-width: 760px) {
    padding: 24px 0 44px;
  }
  max-width: var(--article-measure);
  justify-self: start;
  min-width: 0;

  .topic {
    font-family: var(--font-display);
    font-size: var(--fz-eyebrow);
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--blue);
    margin-bottom: 16px;
  }

  h1 {
    margin: 0 0 20px;
    font-size: var(--fz-h1-article);
    line-height: 1.1;
    font-weight: 400;
    letter-spacing: -0.025em;

    @media (max-width: 760px) {
      font-size: var(--fz-h1-mobile);
      line-height: 1.12;
      letter-spacing: -0.02em;
    }
  }

  .byline {
    display: flex;
    align-items: center;
    gap: 13px;
    margin-bottom: 18px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    .name {
      font-size: 13.5px;
      color: var(--text-primary);
    }

    .meta {
      font-size: var(--fz-eyebrow);
      color: var(--text-faint);
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 30px;
  }

  .rule {
    margin-bottom: 34px;
  }
`;

const StyledRelated = styled.div`
  margin-top: 56px;
  padding-top: 36px;
  border-top: 1px solid rgba(60, 64, 67, 0.12);

  .label {
    font-family: var(--font-display);
    font-size: var(--fz-eyebrow);
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--text-faint);
    margin-bottom: 18px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;

    @media (max-width: 760px) {
      grid-template-columns: 1fr;
    }
  }

  a {
    display: flex;
    gap: 13px;
    padding: 14px;
    background: var(--surface);
    border-radius: var(--radius-tile);
    box-shadow: var(--ring);
    text-decoration: none;
    transition: background var(--transition);

    &:hover {
      background: var(--surface-hover);
    }
  }

  .cover {
    width: 52px;
    height: 52px;
    flex: none;
    border-radius: var(--radius-thumb);
    object-fit: cover;
    box-shadow: var(--ring-strong);
    background: var(--neutral-fill);
  }

  h4 {
    margin: 0;
    font-size: var(--fz-card-desc);
    line-height: 1.3;
    font-weight: 500;
    color: var(--text-primary);
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html, timeToRead, headings } = data.markdownRemark;
  const { title, description, date, tags, cover, slug } = frontmatter;
  const topic = topicFor({ slug, tags });

  const bodyRef = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);

  const toc = (headings || []).map((h, i) => ({ id: `sec-${i}`, label: h.value }));

  const related = (data.related?.nodes || []).filter(n => n.frontmatter.slug !== slug).slice(0, 3);

  // Stamp ids on the rendered h2s so the TOC can target them without
  // touching the markdown pipeline.
  useEffect(() => {
    if (!bodyRef.current) {
      return;
    }
    bodyRef.current.querySelectorAll('h2').forEach((el, i) => {
      el.id = `sec-${i}`;
      el.setAttribute('data-sec', '');
    });
  }, [html]);

  useEffect(() => {
    let frame = null;
    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = null;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;
        const fraction = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        if (barRef.current) {
          barRef.current.style.width = `${fraction * 100}%`;
        }
        const secs = bodyRef.current ? [...bodyRef.current.querySelectorAll('[data-sec]')] : [];
        let idx = 0;
        secs.forEach((s, i) => {
          if (s.getBoundingClientRect().top < 130) {
            idx = i;
          }
        });
        setActive(idx);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  // Handoff is explicit: offset scroll by -110px, do not use scrollIntoView.
  const jumpTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top - 110,
      behavior: 'smooth',
    });
  };

  return (
    <Layout location={location} seo={false}>
      <Helmet>
        <title>{title} </title>
        <meta name="description" content={description} />
        {cover && <meta name="twitter:card" content={cover.publicURL} />}
        {cover && <meta name="twitter:image" content={cover.publicURL} />}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content="@_imGufran" />
        <meta name="twitter:site" content="@_imGufran" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="gufranmirza.com" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        {cover && <meta property="og:image" content={cover.publicURL} />}
      </Helmet>

      <StyledProgress>
        <span ref={barRef} />
      </StyledProgress>

      <StyledRead>
        <StyledAside>
          <div className="sticky">
            <Link className="all-posts" to="/blogs">
              ← All posts
            </Link>
            {toc.length > 0 && (
              <>
                <div className="toc-label">On this page</div>
                <div className="toc">
                  {toc.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={i === active ? 'active' : ''}
                      onClick={e => jumpTo(e, item.id)}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </StyledAside>

        <StyledArticle>
          <div className="topic">{topic}</div>
          <h1>{title}</h1>

          <div className="byline">
            <img src="/me.jpg" alt="" className="thumb" />
            <span className="name">Gufran Mirza</span>
            <span className="meta">
              {formatDate(date)} · {timeToRead} min read
            </span>
          </div>

          {tags && tags.length > 0 && (
            <div className="tags">
              {tags.map(tag => (
                <span key={tag} className="tag tag-neutral">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="fade-b rule" />

          <div className="postbody" ref={bodyRef} dangerouslySetInnerHTML={{ __html: html }} />

          {related.length > 0 && (
            <StyledRelated>
              <div className="label">Keep reading</div>
              <div className="grid">
                {related.map(node => (
                  <Link key={node.frontmatter.slug} to={node.frontmatter.slug}>
                    <img
                      className="cover"
                      src={node.frontmatter.cover?.publicURL || ''}
                      alt=""
                      loading="lazy"
                    />
                    <div style={{ minWidth: 0 }}>
                      <div className="kicker" style={{ marginBottom: '5px' }}>
                        {topicFor(node.frontmatter)}
                      </div>
                      <h4>{node.frontmatter.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </StyledRelated>
          )}
        </StyledArticle>
      </StyledRead>
    </Layout>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default PostTemplate;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      timeToRead
      headings(depth: h2) {
        value
      }
      frontmatter {
        title
        description
        date
        slug
        tags
        cover {
          publicURL
        }
      }
    }
    related: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts//" }
        frontmatter: { draft: { ne: true }, slug: { ne: $path } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        frontmatter {
          title
          slug
          tags
          cover {
            publicURL
          }
        }
      }
    }
  }
`;
