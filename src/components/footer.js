import React from 'react';
import styled from 'styled-components';
import { socialMedia } from '@config';

/**
 * Footer (handoff §Shell): top hairline, copyright left, social text links
 * right. Shares the 1120 container with the rest of the page.
 */
const StyledFooter = styled.footer`
  border-top: 1px solid var(--border-soft);
  margin-top: 40px;
`;

const StyledFooterInner = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 28px var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    padding: 24px var(--gutter-mobile);
  }
`;

const StyledCopy = styled.div`
  font-size: var(--fz-sm);
  color: var(--text-faint);
`;

const StyledLinks = styled.div`
  display: flex;
  gap: 18px;

  a {
    font-size: var(--fz-sm);
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition);

    &:hover,
    &:focus {
      color: var(--blue);
    }
  }
`;

// The handoff footer carries GitHub / Twitter / LinkedIn only.
const FOOTER_SOCIALS = ['GitHub', 'Twitter', 'Linkedin'];
const LABELS = { Linkedin: 'LinkedIn' };

const Footer = () => (
  <StyledFooter>
    <StyledFooterInner>
      <StyledCopy>© {new Date().getFullYear()} Gufran Mirza</StyledCopy>
      <StyledLinks>
        {socialMedia
          .filter(({ name }) => FOOTER_SOCIALS.includes(name))
          .map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer">
              {LABELS[name] || name}
            </a>
          ))}
      </StyledLinks>
    </StyledFooterInner>
  </StyledFooter>
);

export default Footer;
