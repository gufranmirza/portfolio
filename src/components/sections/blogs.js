import React, { useRef, useEffect } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const MainContainer = styled.section`
  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledMainContainer = styled.section`
  padding-top: 0px;
  padding-bottom: 0px;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
    color: var(--slate-dark);
  }

  p {
    text-align: left;
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;
  position: relative;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const Bu = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;
const StyledPost = styled.li`
  transition: var(--transition);
  cursor: default;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .post__root {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .post__root {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    background: #02c39a0f;
    box-shadow: none;

    &:hover,
    &:focus {
      box-shadow: none;
    }
  }

  .post__inner {
    padding: 2rem 1.75rem;

    header,
    a {
      width: 100%;
    }
  }

  .post__icon {
    height: 182px;
  }

  .post__title {
    margin: 0 0 10px;
    color: var(--dark-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .post__desc {
    color: var(--slate);
    font-size: 17px;
  }

  .post__date {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
  }

  ul.post__tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const PensievePage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
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
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const d = data.allMarkdownRemark.edges;
  const posts = d.slice(0, 3);

  const revealTitle = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
  }, []);

  return (
    <MainContainer>
      <StyledMainContainer>
        <h2 className="numbered-heading" ref={revealTitle}>
          Blogs
        </h2>

        <p>
          I do write about whatever I am learning and doing, mostly about software development.
          Below are the blogs I have written and I am going to publish more blogs whenever I got
          some time to write
        </p>

        <StyledGrid>
          {posts.length > 0 &&
            posts.map(({ node }, i) => {
              const { frontmatter } = node;
              const { title, description, slug, date, tags, cover } = frontmatter;
              const formattedDate = new Date(date).toLocaleDateString();
              const image = getImage(cover);

              return (
                <StyledPost key={i}>
                  <div className="post__root">
                    <div className="post__icon">
                      <GatsbyImage className="post__icon" image={image} alt={title} />
                    </div>
                    <div className="post__inner">
                      <header>
                        <h5 className="post__title">
                          <Link to={slug}>{title}</Link>
                        </h5>
                        <p className="post__desc">{description}</p>
                      </header>

                      <footer>
                        <br />
                        <span className="post__date">{formattedDate}</span>
                        <ul className="post__tags">
                          {tags.map((tag, i) => (
                            <li key={i}>
                              <Link to={`/blogs/tags/${kebabCase(tag)}/`} className="inline-link">
                                #{tag}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </footer>
                    </div>
                  </div>
                </StyledPost>
              );
            })}
        </StyledGrid>

        <Bu>
          <Link to="/blogs">
            <button className="more-button">Show More</button>
          </Link>
        </Bu>
      </StyledMainContainer>
    </MainContainer>
  );
};

PensievePage.propTypes = {};

export default PensievePage;
