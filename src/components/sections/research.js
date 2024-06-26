import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
    color: var(--slate-dark);
  }

  p {
    text-align: left;
    width: 100%;
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    position: relative;
    margin-top: 50px;
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);
  margin-bottom: 15px;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background: #02c39a0f;
    transition: var(--transition);
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-top: 15px;

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }

        span {
          font-size: 16px;
          margin-top: 4px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 15px;
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

      .folder {
        color: var(--green);
        display: inline-block;
        padding-right: 10px;
        svg {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  .project-description {
    color: var(--slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    .folder {
      color: var(--green);
      display: inline-block;
      padding-right: 10px;
      svg {
        width: 25px;
        height: 25px;
      }
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;
      color: var(--green);

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/research/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              presentation
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false); // eslint-disable-line
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { github, title, tech, presentation } = frontmatter;

    return (
      <div className="project-inner">
        <header>
          <h3 className="project-title">
            <a href={github} target="_blank" rel="noreferrer">
              <div className="folder">
                <Icon name="Filter" />
              </div>
              {title}
            </a>
          </h3>

          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>#{tech}</li>
              ))}
            </ul>
          )}
        </footer>

        <div className="project-top">
          <div className="project-links">
            {github && (
              <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                <Icon name="GitHub" />
              </a>
            )}
            {presentation && (
              <a
                href={presentation}
                aria-label="Location"
                className="map"
                target="_blank"
                rel="noreferrer">
                <Icon name="Play" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 className="numbered-heading" ref={revealTitle}>
        Research
      </h2>

      <p>
        I am not a full-time researcher :-P. These are some of the topics I have spent a good amount
        of time understanding things in greater detail, possibly looking for some answers
      </p>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      {/* <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button> */}
    </StyledProjectsSection>
  );
};

export default Projects;
