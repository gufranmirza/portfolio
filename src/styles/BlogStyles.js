import { css } from 'styled-components';

/**
 * Blog / long-form post styles.
 *
 * Everything that styles rendered markdown lives here rather than inside the
 * post template, so there is one place to change how a post looks. Imported by
 * GlobalStyle, the same way TransitionStyles and PrismStyles are.
 *
 * The markup is `<div class="post-body">` + dangerouslySetInnerHTML, so all of
 * this is scoped to that class.
 */
const BlogStyles = css`
  .post-body {
    margin-bottom: 100px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 2em 0 1em;
      color: var(--dark-slate);
    }

    p {
      margin: 1em 0;
      line-height: 1.5;
      color: var(--dark-slate);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    code {
      background-color: var(--lightest-navy);
      color: var(--lightest-slate);
      border-radius: var(--border-radius);
      font-size: var(--fz-sm);
      padding: 0.2em 0.4em;
    }

    pre code {
      background-color: transparent;
      padding: 0;
    }

    ul li {
      margin-bottom: 5px;
    }

    /* ---------------------------------------------------------------
       Pull quotes.
       A 1px rule reads as an accident next to 20px italic text, so the
       accent is 3px and the quote gets real vertical breathing room.
       --------------------------------------------------------------- */
    blockquote {
      margin: 2.5rem 0;
      padding: 0.25rem 0 0.25rem 1.5rem;
      border-left: 3px solid var(--green);

      p {
        font-size: var(--fz-xl);
        font-style: italic;
        line-height: 1.7;
        color: var(--dark-slate);

        &:first-child {
          margin-top: 0;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }

      /* Emphasis inside a quote has to break out of the italic to register. */
      strong {
        font-style: normal;
        font-weight: 600;
      }

      code {
        font-style: normal;
      }

      ul,
      ol {
        font-style: italic;
        color: var(--dark-slate);
      }

      /* Attribution: a trailing "— Source" line, if a quote ever carries one. */
      cite {
        display: block;
        margin-top: 0.75rem;
        font-size: var(--fz-sm);
        font-style: normal;
        color: var(--slate);
      }
    }

    /* ---------------------------------------------------------------
       Disclaimer.
       The leading blockquote in a post is boilerplate, not an argument,
       so it is deliberately quiet: small, upright, no green accent.
       --------------------------------------------------------------- */
    > blockquote:first-child {
      margin: 0 0 2.5rem;
      padding: 0.85rem 1.15rem;
      border-left: 3px solid rgba(73, 86, 112, 0.25);
      border-radius: var(--border-radius);
      background-color: rgba(73, 86, 112, 0.05);

      p {
        margin: 0;
        font-size: var(--fz-sm);
        font-style: normal;
        line-height: 1.5;
        color: var(--slate);
      }
    }

    @media (max-width: 480px) {
      blockquote {
        margin: 2rem 0;
        padding: 0.25rem 0 0.25rem 1.15rem;

        p {
          font-size: var(--fz-lg);
          line-height: 1.6;
        }
      }
    }
  }
`;

export default BlogStyles;
