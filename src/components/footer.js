import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia, navLinks } from '@config';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'gatsby';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  color: var(--slate);
  font-family: var(--font-mono);

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 3px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px 5px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 1px;
          color: var(--green);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledSocialLinks>
      <ul>
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <a href={url} aria-label={name}>
                <Icon name={name} />
              </a>
            </li>
          ))}
      </ul>
    </StyledSocialLinks>

    <StyledLinks>
      <ol>
        <TransitionGroup component={null}>
          {navLinks &&
            navLinks.map(({ url, name }, i) => (
              <CSSTransition key={i}>
                <li key={i}>
                  <Link to={url}>{name}</Link>
                </li>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ol>
    </StyledLinks>
  </StyledFooter>
);

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
