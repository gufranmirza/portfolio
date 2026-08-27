import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { navLinks } from '@config';

/**
 * Sticky header (handoff §Shell).
 *
 * Translucent white with a 12px backdrop blur and a bottom hairline. The bar
 * spans the viewport, its contents share the 1120 container. Left: the blue
 * `>_` prompt glyph, links home. Right: the section links.
 */
const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(60, 64, 67, 0.1);
`;

const StyledNav = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 26px;
  padding: 16px var(--gutter);

  @media (max-width: 760px) {
    padding: 14px var(--gutter-mobile);
    gap: 12px;
  }
`;

const StyledLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-right: auto;
  text-decoration: none;
  transition: opacity var(--transition);

  &:hover {
    opacity: 0.65;
  }
`;

const StyledNavLink = styled(Link)`
  font-family: var(--font-display);
  font-size: var(--fz-nav);
  font-weight: 400;
  letter-spacing: -0.005em;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition);

  &:hover,
  &:focus {
    color: var(--blue);
  }

  &[aria-current='page'] {
    color: var(--blue);
  }

  @media (max-width: 760px) {
    font-size: var(--fz-sm);
    font-weight: 500;
  }
`;

const PromptGlyph = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <polyline
      points="7,7 13,12 7,17"
      stroke="#1a73e8"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="14.5"
      y1="17"
      x2="18.5"
      y2="17"
      stroke="#1a73e8"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const Nav = () => (
  <StyledHeader>
    <StyledNav>
      <StyledLogo to="/" aria-label="Home">
        <PromptGlyph />
      </StyledLogo>

      {navLinks.map(({ url, name }) => (
        <StyledNavLink key={url} to={url} partiallyActive={url !== '/'}>
          {name}
        </StyledNavLink>
      ))}
    </StyledNav>
  </StyledHeader>
);

export default Nav;
