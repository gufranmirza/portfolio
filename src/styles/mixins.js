import { css } from 'styled-components';

const button = css`
  color: var(--blue);
  background-color: transparent;
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-pill);
  font-size: var(--fz-sm);
  font-family: var(--font-display);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--surface-hover);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:active,
    &:focus {
      color: var(--blue);
      outline: 0;
    }
  `,

  /**
   * The handoff underlines links for real (alpha underline that goes solid on
   * hover). The old mixin faked it with a `display:block` ::after, which turned
   * every inline link into a line-breaking box inside body copy.
   */
  inlineLink: css`
    display: inline;
    color: var(--blue-pressed);
    text-decoration: underline;
    text-decoration-color: rgba(26, 115, 232, 0.35);
    text-underline-offset: 2px;
    transition: text-decoration-color var(--transition);

    &:hover,
    &:focus,
    &:active {
      color: var(--blue-pressed);
      outline: 0;
      text-decoration-color: var(--blue);
    }
  `,

  button,

  smallButton: css`
    color: var(--blue);
    background-color: transparent;
    border: 1px solid var(--blue);
    border-radius: var(--radius-chip);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-code);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--surface-hover);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--blue);
    background-color: transparent;
    border: 1px solid var(--blue);
    border-radius: var(--radius-chip);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-code);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--surface-hover);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--border-faint);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px var(--border-faint);
    }
  `,

  fancyList: css`
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
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
