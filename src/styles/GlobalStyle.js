import { createGlobalStyle } from 'styled-components';
import Fonts from './Fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';
import BlogStyles from './BlogStyles';

const GlobalStyle = createGlobalStyle`
  ${Fonts};

  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;

    /* The scrollbar below is a classic one and occupies 12px of layout width,
       so a page tall enough to scroll is 12px narrower than one that is not.
       Every centred container then sits 6px off from where it did on the
       previous page, which reads as the whole page twitching sideways on each
       client-side navigation. Reserving the gutter on all pages keeps the
       content box one fixed width whether or not the page scrolls. */
    scrollbar-gutter: stable;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background: var(--selection-bg);
    color: var(--text-primary);
  }

  /* Scrollbar Styles */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--blue);
  }
  body::-webkit-scrollbar {
    width: 12px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--blue);
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: var(--font-sans);
    background: var(--surface);
    color: var(--text-primary);
    font-size: var(--fz-base);
    line-height: 1.55;

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  section {
    margin: 0;
    padding: 0;
    max-width: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-family: var(--font-display);
    font-weight: 500;
    letter-spacing: -0.005em;
    color: var(--text-primary);
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-h1-section));
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '▹';
      margin-right: 10px;
      color: var(--blue);
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--border-hairline);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  /* Development-only affordance flagging images that are missing alt text.
     Deliberately does not match alt="", which is the correct markup for a
     decorative image: gatsby-plugin-image emits alt="" on both its placeholder
     and its main <img>, so matching it left every cover permanently blurred. */
  ${process.env.NODE_ENV === 'development' ? 'img:not([alt]) { filter: blur(5px); }' : ''}

  svg {
    vertical-align: middle;
  }

  /* The legacy Feather icon set carries no width/height and is sized by its
     container. Scoped here so it cannot override Lucide or inline SVGs, which
     set their own fill and dimensions. */
  svg.feather {
    width: 100%;
    height: 100%;
    fill: none;
  }


  /* :focus-visible, not :focus. :focus matches on mouse clicks too, so a bare
     :focus rule draws a ring around everything you click. :focus-visible is
     the browser's own judgement of when a ring is useful, which is keyboard
     and similar input but not pointer clicks. */
  :focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: var(--blue-pressed);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--neutral-fill);
      color: var(--surface);
      font-size: var(--fz-sm);
      border-radius: var(--radius-chip);
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-card-title);
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--blue);
        }
      }
    }
  }

  hr {
    background-color: var(--border-hairline);
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family: var(--font-code);
    font-size: var(--fz-md);
  }

  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:focus,
    &:active {
      background-color: var(--blue);
      color: var(--surface);
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
    }
  }

  #logo {
    color: var(--blue);
  }

  .overline {
    color: var(--blue);
    font-family: var(--font-code);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--blue);
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-family: var(--font-code);
    font-weight: 400;
    line-height: 1.5;
    @media (max-width: 1080px) {
      font-size: var(--fz-sm);
    }
    @media (max-width: 768px) {
      font-size: var(--fz-xs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: var(--blue);

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-code);
      font-size: var(--fz-sm);
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: 0.01em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${TransitionStyles};

  ${PrismStyles};

  /* ---------------------------------------------------------------
     Shared primitives (handoff)
     --------------------------------------------------------------- */
  .container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 var(--gutter);

    @media (max-width: 760px) {
      padding: 0 var(--gutter-mobile);
    }
  }

  /* Rule that fades out over its first and last 48px. */
  .fade-b {
    height: 1px;
    background: var(--faded-rule);
  }

  .thumb {
    border-radius: var(--radius-thumb);
    object-fit: cover;
    box-shadow: var(--ring-strong);
  }

  /* v2: natural case, .01em tracking. Uppercase was removed from the design. */
  .eyebrow {
    font-family: var(--font-display);
    font-size: var(--fz-eyebrow);
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--blue);
  }

  .kicker {
    font-family: var(--font-display);
    font-size: var(--fz-kicker);
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--text-muted);
  }

  .tag {
    display: inline-block;
    white-space: nowrap;
    border: 0;
    outline: 0;
    border-radius: var(--radius-chip);
    font-size: var(--fz-chip);
    padding: 3px 10px;
    transition: filter var(--transition);

    &.tag-accent {
      background: var(--blue-tint);
      color: var(--blue-pressed);
    }
    &.tag-neutral {
      background: var(--neutral-fill);
      color: var(--text-body);
    }
  }

  /* Depth is a hairline ring plus a hover fill. Never a drop shadow. */
  .card {
    background: var(--surface);
    border-radius: var(--radius-card);
    box-shadow: var(--ring);
    transition: background var(--transition);

    &:hover {
      background: var(--surface-hover);
    }
  }

  .pill {
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius-pill);
    padding: 12px 24px;
    font-family: var(--font-display);
    font-size: var(--fz-nav);
    font-weight: 400;
    white-space: nowrap;
    transition: background var(--transition), color var(--transition);

    &.pill-primary {
      background: var(--blue);
      color: var(--on-accent);
      /* Matches pill-secondary's hairline. The pills are auto-sized
         inline-flex, so box-sizing does not absorb a border here: giving one
         variant a border and not the other made the secondary 2px larger in
         both axes and sat its label 1px further from the edge, and the flex
         row then stretched the primary to match, so the two ended up with
         visibly different padding. */
      border: 1px solid transparent;
      &:hover {
        background: var(--blue-pressed);
        color: var(--on-accent);
      }
    }
    &.pill-secondary {
      background: var(--surface);
      color: var(--blue);
      border: 1px solid var(--border-hairline);
      &:hover {
        background: var(--surface-hover);
      }
    }
  }

  ${BlogStyles};
`;

export default GlobalStyle;
