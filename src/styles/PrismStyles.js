import { css } from 'styled-components';

/**
 * Syntax theme.
 *
 * The handoff puts code on a light panel with dark body text, so the old
 * Ayu-dark palette would have been unreadable. Hues are Google's: blue for
 * functions, purple for keywords, green for strings, red for tags.
 *
 * These read from tokens rather than literals so that code blocks follow the
 * colour theme. Hardcoding them left syntax highlighting on a light panel
 * while everything around it went dark.
 */
const prismColors = {
  bg: `var(--code-panel)`,
  lineHighlight: `var(--code-line-highlight)`,
  blue: `var(--code-blue)`,
  purple: `var(--code-purple)`,
  green: `var(--code-green)`,
  yellow: `var(--code-yellow)`,
  orange: `var(--code-orange)`,
  red: `var(--code-red)`,
  grey: `var(--code-grey)`,
  variable: `var(--code-grey)`,
  comment: `var(--code-comment)`,
};

// https://www.gatsbyjs.org/packages/gatsby-remark-prismjs

const PrismStyles = css`
  /**
  * Add back the container background-color, border-radius, padding, margin
  * and overflow that we removed from <pre>.
  */
  .gatsby-highlight {
    background-color: ${prismColors.bg};
    color: ${prismColors.variable};
    border-radius: var(--radius-chip);
    margin: 2em 0;
    padding: 1.25em;
    overflow: auto;
    position: relative;
    font-family: var(--font-code);
    font-size: var(--fz-md);
  }

  .gatsby-highlight code[class*='language-'],
  .gatsby-highlight pre[class*='language-'] {
    height: auto !important;
    font-size: var(--fz-sm);
    line-height: 1.5;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 2;
    hyphens: none;
  }

  /**
  * Remove the default PrismJS theme background-color, border-radius, margin,
  * padding and overflow.
  * 1. Make the element just wide enough to fit its content.
  * 2. Always fill the visible space in .gatsby-highlight.
  * 3. Adjust the position of the line numbers
  */
  .gatsby-highlight pre[class*='language-'] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
    padding-top: 2em;
  }

  /* File names */
  .gatsby-code-title {
    padding: 1em 1.5em;
    font-family: var(--font-code);
    font-size: var(--fz-xs);
    background-color: ${prismColors.bg};
    color: ${prismColors.grey};
    border-top-left-radius: var(--radius-chip);
    border-top-right-radius: var(--radius-chip);
    border-bottom: 1px solid ${prismColors.lineHighlight};

    & + .gatsby-highlight {
      margin-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  /* Line highlighting */
  .gatsby-highlight-code-line {
    display: block;
    background-color: ${prismColors.lineHighlight};
    border-left: 2px solid var(--blue);
    padding-left: calc(1em + 2px);
    padding-right: 1em;
    margin-right: -1.35em;
    margin-left: -1.35em;
  }

  /* Language badges */
  .gatsby-highlight pre[class*='language-']::before {
    background: var(--neutral-fill);
    color: var(--text-muted);
    font-size: var(--fz-xs);
    font-family: var(--font-code);
    line-height: 1.5;
    letter-spacing: 0.01em;
    border-radius: 0 0 3px 3px;
    position: absolute;
    top: 0;
    left: 1.25rem;
    padding: 0.25rem 0.5rem;
  }
  .gatsby-highlight pre[class='language-javascript']::before {
    content: 'js';
  }
  .gatsby-highlight pre[class='language-js']::before {
    content: 'js';
  }
  .gatsby-highlight pre[class='language-jsx']::before {
    content: 'jsx';
  }
  .gatsby-highlight pre[class='language-graphql']::before {
    content: 'GraphQL';
  }
  .gatsby-highlight pre[class='language-html']::before {
    content: 'html';
  }
  .gatsby-highlight pre[class='language-css']::before {
    content: 'css';
  }
  .gatsby-highlight pre[class='language-mdx']::before {
    content: 'mdx';
  }
  .gatsby-highlight pre[class='language-shell']::before {
    content: 'shell';
  }
  .gatsby-highlight pre[class='language-sh']::before {
    content: 'sh';
  }
  .gatsby-highlight pre[class='language-bash']::before {
    content: 'bash';
  }
  .gatsby-highlight pre[class='language-yaml']::before {
    content: 'yaml';
  }
  .gatsby-highlight pre[class='language-markdown']::before {
    content: 'md';
  }
  .gatsby-highlight pre[class='language-json']::before,
  .gatsby-highlight pre[class='language-json5']::before {
    content: 'json';
  }
  .gatsby-highlight pre[class='language-diff']::before {
    content: 'diff';
  }
  .gatsby-highlight pre[class='language-text']::before {
    content: 'text';
  }
  .gatsby-highlight pre[class='language-flow']::before {
    content: 'flow';
  }

  /* Prism Styles */
  .token {
    display: inline;
  }
  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${prismColors.comment};
  }
  .token.punctuation {
    color: ${prismColors.grey};
  }
  .token.namespace,
  .token.deleted {
    color: ${prismColors.red};
  }
  .token.function-name,
  .token.function,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: ${prismColors.yellow};
  }
  .token.attr-name,
  .token.operator,
  .token.rule {
    color: ${prismColors.orange};
  }
  .token.keyword,
  .token.boolean,
  .token.number,
  .token.property {
    color: ${prismColors.purple};
  }
  .token.tag,
  .token.selector,
  .token.important,
  .token.atrule,
  .token.builtin,
  .token.entity,
  .token.url {
    color: ${prismColors.blue};
  }
  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable,
  .token.inserted {
    color: ${prismColors.green};
  }
  .token.important,
  .token.bold {
    font-weight: 600;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .namespace {
    opacity: 0.7;
  }
`;

export default PrismStyles;
