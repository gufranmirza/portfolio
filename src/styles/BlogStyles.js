import { css } from 'styled-components';

/**
 * Article typography — `.postbody`. Transcribed from handoff v2.
 *
 * Two deliberate departures from the usual: there is NO monospace font (code
 * blocks and inline code are Roboto), and nothing is uppercase. Blockquotes are
 * Poppins 21/400 rather than italic body text.
 *
 * Code blocks are styled against what the remark pipeline emits
 * (.gatsby-code-title + .gatsby-highlight) rather than the prototype's
 * hand-written markup, so the content layer stays untouched.
 */
const BlogStyles = css`
  .postbody {
    font-size: var(--fz-article);
    line-height: 1.75;
    color: var(--text-body);

    > *:first-child {
      margin-top: 0;
    }

    p {
      margin: 0 0 20px;
      color: var(--text-body);
    }

    p.lede {
      font-size: var(--fz-lede);
      line-height: 1.6;
      color: var(--text-primary);
      margin: 0 0 26px;
    }

    h1 {
      font-size: 30px;
      font-weight: 500;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      line-height: 1.15;
      margin: 40px 0 14px;
    }

    h2 {
      font-size: var(--fz-h2);
      font-weight: 500;
      letter-spacing: -0.015em;
      color: var(--text-primary);
      line-height: 1.2;
      margin: 44px 0 16px;
      scroll-margin-top: 110px;
    }

    h3 {
      font-size: 19px;
      font-weight: 500;
      letter-spacing: -0.01em;
      color: var(--text-primary);
      line-height: 1.25;
      margin: 34px 0 12px;
      scroll-margin-top: 110px;
    }

    h4 {
      font-size: 17px;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
      margin: 28px 0 10px;
    }

    h5 {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 22px 0 8px;
    }

    h6 {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: var(--text-muted);
      margin: 22px 0 8px;
    }

    strong,
    b {
      font-weight: 600;
      color: var(--text-primary);
    }

    em,
    i {
      font-style: italic;
    }

    small {
      font-size: 0.85em;
      color: var(--text-faint);
    }

    del {
      color: var(--text-faint);
      text-decoration: line-through;
    }

    mark {
      background: #fdf1c2;
      color: var(--text-primary);
      padding: 0.05em 0.28em;
      border-radius: 3px;
    }

    kbd {
      font-size: 0.82em;
      background: var(--neutral-fill);
      border: 1px solid var(--border-hairline);
      border-bottom-width: 2px;
      border-radius: 5px;
      padding: 0.1em 0.45em;
      color: var(--text-body);
    }

    sup,
    sub {
      font-size: 0.72em;
      line-height: 0;
    }

    a {
      display: inline;
      color: var(--blue-pressed);
      text-decoration: underline;
      text-decoration-color: rgba(26, 115, 232, 0.35);
      text-underline-offset: 2px;
      transition: text-decoration-color var(--transition);

      &:hover {
        color: var(--blue-pressed);
        text-decoration-color: var(--blue);
      }
    }

    a code {
      color: var(--blue-pressed);
    }

    ul,
    ol {
      margin: 0 0 20px;
      padding-left: 24px;
    }

    ul {
      list-style: disc;
    }
    ul ul {
      list-style: circle;
    }
    ol {
      list-style: decimal;
    }
    ol ol {
      list-style: lower-alpha;
    }

    li {
      margin-bottom: 8px;
      padding-left: 4px;
    }

    li::marker {
      color: var(--text-faint);
    }

    ul ul,
    ol ol,
    ul ol,
    ol ul {
      margin: 8px 0 0;
    }

    dl {
      margin: 0 0 20px;
    }
    dt {
      font-weight: 600;
      color: var(--text-primary);
      margin-top: 12px;
    }
    dd {
      margin: 4px 0 0;
      color: var(--text-muted);
    }

    img {
      max-width: 100%;
      border-radius: var(--radius-img);
      box-shadow: inset 0 0 0 1px rgba(60, 64, 67, 0.13);
      margin: 8px 0;
    }

    figure {
      margin: 28px 0;
    }

    figcaption {
      font-size: 12.5px;
      color: var(--text-faint);
      margin-top: 9px;
      text-align: center;
    }

    hr {
      border: 0;
      height: 1px;
      margin: 36px 0;
      background: linear-gradient(
        to right,
        transparent,
        rgba(60, 64, 67, 0.2) 48px,
        rgba(60, 64, 67, 0.2) calc(100% - 48px),
        transparent
      );
    }

    /* Pull quote: Poppins, upright, not italic body text. */
    blockquote {
      margin: 38px 0;
      padding: 2px 0 2px 26px;
      border-left: 3px solid var(--blue);

      p {
        font-family: var(--font-display);
        font-size: var(--fz-blockquote);
        line-height: 1.45;
        font-weight: 400;
        font-style: normal;
        letter-spacing: -0.01em;
        color: var(--text-primary);
        margin: 0;
      }

      cite {
        display: block;
        margin-top: 12px;
        font-size: var(--fz-sm);
        font-style: normal;
        font-weight: 500;
        color: var(--text-muted);

        &::before {
          content: '— ';
        }
      }
    }

    /* The leading blockquote is a standing disclaimer: quiet, Roboto, small. */
    > blockquote:first-child {
      margin: 0 0 28px;
      padding: 14px 18px;
      border-left: 3px solid rgba(60, 64, 67, 0.2);
      border-radius: 8px;
      background: var(--surface-hover);

      p {
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        line-height: 1.5;
        color: var(--text-muted);
        margin: 0;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14.5px;
      margin: 0 0 24px;
      display: block;
      overflow-x: auto;

      caption {
        font-size: 12.5px;
        color: var(--text-faint);
        margin-bottom: 8px;
        text-align: left;
      }
    }

    th {
      text-align: left;
      font-weight: 600;
      color: var(--text-primary);
      padding: 10px 14px;
      border-bottom: 2px solid var(--border-hairline);
    }

    td {
      padding: 10px 14px;
      border-bottom: 1px solid #eceef2;
      color: var(--text-muted);
    }

    tr:hover td {
      background: var(--surface-hover);
    }

    /* ---- code: Roboto on purpose, no monospace in this design ---- */
    .gatsby-code-title {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: var(--neutral-fill);
      border-radius: var(--radius-tile) var(--radius-tile) 0 0;
      box-shadow: inset 0 0 0 1px rgba(60, 64, 67, 0.1);
      border-bottom: 1px solid rgba(60, 64, 67, 0.09);
      font-family: var(--font-code);
      font-size: var(--fz-sm);
      color: var(--text-muted);

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #34a853;
        flex: none;
      }

      + .gatsby-highlight {
        border-radius: 0 0 var(--radius-tile) var(--radius-tile);
        margin-top: 0;
      }
    }

    .gatsby-highlight {
      background: var(--neutral-fill);
      border-radius: var(--radius-tile);
      box-shadow: inset 0 0 0 1px rgba(60, 64, 67, 0.1);
      margin: 0 0 26px;
      overflow: hidden;
    }

    pre,
    .gatsby-highlight pre[class*='language-'] {
      margin: 0;
      padding: 18px 20px;
      font-size: 13px;
      line-height: 1.7;
      color: var(--text-body);
      background: transparent;
      overflow: auto;
      font-family: var(--font-code);

      &::-webkit-scrollbar {
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background: var(--border-hairline);
        border-radius: 4px;
      }
    }

    code:not(pre code) {
      background: var(--neutral-fill);
      color: var(--text-body);
      font-family: var(--font-code);
      font-size: 0.9em;
      padding: 0.15em 0.45em;
      border-radius: 5px;
      white-space: nowrap;
    }

    @media (max-width: 760px) {
      font-size: 16px;

      p.lede {
        font-size: 17px;
      }
      h2 {
        font-size: 22px;
        margin: 32px 0 12px;
      }
      h3 {
        font-size: 18px;
      }
      blockquote p {
        font-size: 17px;
        line-height: 1.42;
      }
      pre,
      .gatsby-highlight pre[class*='language-'] {
        font-size: 12.5px;
      }
    }
  }
`;

export default BlogStyles;
