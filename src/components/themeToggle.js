import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';

/**
 * Colour theme toggle.
 *
 * Both icons are always rendered and CSS picks which one shows, keyed off the
 * data-theme attribute on <html>. That keeps the markup identical on the
 * server and the client, so there is no hydration mismatch and no moment where
 * the wrong icon is visible: the correct one is chosen by the same stylesheet
 * that paints the rest of the page.
 *
 * The icon shows the theme you would switch *to*, which is the more common
 * convention: a moon while the site is light, a sun while it is dark.
 *
 * The attribute itself is set before first paint by the inline script in
 * gatsby-ssr, so this component never has to correct the initial appearance.
 */
const StyledToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex: none;
  padding: 0;

  /* The 18px glyph sits in a 34px hit target, so the button carries ~8px of
     its own padding either side. Against StyledNav's 26px gap that reads as a
     34px gap after "Talks" while the links sit 26px apart. Pulling the padding
     back off the left edge lines the glyph up on the same rhythm as the text,
     without shrinking the target. */
  margin-left: -8px;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--transition), color var(--transition);

  &:hover,
  &:focus-visible {
    background: var(--surface-hover);
    color: var(--blue);
  }

  /* Light theme shows the moon, dark shows the sun. */
  .icon-sun {
    display: none;
  }

  html[data-theme='dark'] & {
    .icon-moon {
      display: none;
    }
    .icon-sun {
      display: block;
    }
  }
`;

const applyTheme = next => {
  if (next === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  // A private-mode or blocked localStorage must not break the toggle itself.
  try {
    window.localStorage.setItem('theme', next);
  } catch (e) {
    /* preference simply will not persist */
  }
};

const ThemeToggle = () => {
  const handleClick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  };

  return (
    <StyledToggle type="button" onClick={handleClick} aria-label="Toggle colour theme">
      <Moon className="icon-moon" size={18} strokeWidth={1.8} aria-hidden="true" />
      <Sun className="icon-sun" size={18} strokeWidth={1.8} aria-hidden="true" />
    </StyledToggle>
  );
};

export default ThemeToggle;
