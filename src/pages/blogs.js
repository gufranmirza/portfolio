import React, { useRef, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const MainContainer = styled.main`
  counter-reset: section;
`;

const StyledMainContainer = styled.section`
  padding-top: 140px;

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
  }

  .post__inner {
    padding: 2rem 1.75rem;

    header,
    a {
      width: 100%;
    }
  }

  .post__icon {
    ${({ theme }) => theme.mixins.flexBetween};
    color: var(--green);
    margin-bottom: 30px;
    margin-left: -5px;

    svg {
      width: 40px;
      height: 40px;
    }
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

const PensievePage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Pensieve" />
      <MainContainer className="fillHeight">
        <StyledMainContainer>
          <h2 className="numbered-heading" ref={revealTitle}>
            Open Source Software
          </h2>

          <p>
            Below are the list of the projects that I have built, and open sourced. Most of these
            projects are Starter Kits & POCs that i built internally for experimentation and later
            open sourced it
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
                      <div>
                        <GatsbyImage image={image} alt={title} className="img" />
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
                                <Link
                                  to={`/pensieve/tags/${kebabCase(tag)}/`}
                                  className="inline-link">
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
        </StyledMainContainer>
      </MainContainer>
    </Layout>
  );
};

PensievePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default PensievePage;

export const pageQuery = graphql`
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
`;
