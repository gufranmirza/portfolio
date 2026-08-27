import { css } from 'styled-components';

/**
 * Design tokens — "Gufran Mirza personal site" handoff.
 *
 * Google Cloud / Material visual language: white surfaces, one blue accent,
 * hairline grey borders, tonal chips, pill buttons. Depth comes from a 1px
 * inset ring, never a drop shadow (the CTA tile is the single exception).
 */
const variables = css`
  :root {
    /* ---- accent ---- */
    --blue: #1a73e8;
    --blue-pressed: #1967d2;
    --blue-tint: #e8f0fe;
    --blue-on-dark: #8ab4f8;

    /* ---- text ---- */
    --text-primary: #202124;
    --text-body: #3c4043;
    --text-muted: #5f6368;
    --text-faint: #80868b;

    /* ---- surfaces ---- */
    --surface: #ffffff;
    --surface-hover: #f8f9fa;
    --neutral-fill: #f1f3f4;
    --media-dark: #12131c;
    --selection-bg: #d2e3fc;

    /* Text that sits on the accent. Light mode puts white on blue; dark mode
       inverts, because the dark accent is a light blue that white would
       disappear into. */
    --on-accent: #ffffff;

    /* ---- chrome ---- */
    --header-bg: rgba(255, 255, 255, 0.82);

    /* ---- borders ---- */
    --border-hairline: #dadce0;
    --border-faint: rgba(60, 64, 67, 0.08);
    --border-faint-2: rgba(60, 64, 67, 0.12);
    --border-rule: rgba(60, 64, 67, 0.18);
    --border-soft: rgba(60, 64, 67, 0.1);
    --quote-rule: rgba(60, 64, 67, 0.2);
    --table-rule: #eceef2;
    --ring: inset 0 0 0 1px rgba(60, 64, 67, 0.08);
    --ring-soft: inset 0 0 0 1px rgba(60, 64, 67, 0.1);
    --ring-table: inset 0 0 0 1px rgba(60, 64, 67, 0.13);
    --ring-strong: inset 0 0 0 1px rgba(60, 64, 67, 0.15);
    --ring-medium: inset 0 0 0 1px rgba(60, 64, 67, 0.16);

    /* ---- misc surfaces ---- */
    --code-bg: rgba(60, 64, 67, 0.09);
    --scrim: rgba(60, 64, 67, 0.15);
    --mark-bg: #fdf1c2;

    /* Rules fade to transparent over the first/last 48px. */
    --faded-rule: linear-gradient(
      to right,
      transparent,
      rgba(60, 64, 67, 0.18) 48px,
      rgba(60, 64, 67, 0.18) calc(100% - 48px),
      transparent
    );

    /* ---- brand ---- */
    --brand-gradient: linear-gradient(135deg, #4285f4, #1a73e8 55%, #34a853);
    --cta-gradient: linear-gradient(120deg, #e8f0fe 0%, #eef4fe 55%, #f3f8f3 100%);

    /* Work-history monogram tiles. */
    --co-panw: #fa582d;
    --co-protectai: #6b4ce6;
    --co-ibm: #0f62fe;
    --co-connectwise: #ec1c24;
    --co-trustcore: #1a73e8;

    /* ---- type (handoff v2) ----
       Two fonts only. Poppins for headings, eyebrows, labels, nav, buttons.
       Roboto for body and article prose. No monospace anywhere, by design:
       code blocks and inline code are Roboto too.
       Weights are restrained: display >=36px = 400, section/card titles = 500,
       body = 400, inline strong = 600. Never 700. */
    --font-display: 'Poppins', 'Google Sans', 'Roboto', system-ui, sans-serif;
    --font-sans: 'Roboto', system-ui, -apple-system, sans-serif;
    --font-code: 'Roboto', system-ui, sans-serif;

    --fz-kicker: 10px;
    --fz-eyebrow: 11px;
    --fz-chip: 11px;
    --fz-count: 10.5px;
    --fz-meta: 11.5px;
    --fz-xs: 12px;
    --fz-sm: 13px;
    --fz-card-desc: 13.5px;
    --fz-base: 15px;
    --fz-work-role: 15.5px;
    --fz-md: 16px;
    --fz-card-title: 16.5px;
    --fz-nav: 14px;
    --fz-talk-title: 17px;
    --fz-article: 17px;
    --fz-hero-intro: 17px;
    --fz-lede: 18px;
    --fz-blockquote: 17px;
    --fz-h2: 22px;
    --fz-cta-h2: 26px;
    --fz-featured: 27px;
    --fz-h1-article: 36px;
    --fz-h1-section: 38px;
    --fz-h1-list: 40px;
    --fz-h1-home: 46px;
    --fz-h1-mobile: 30px;

    /* ---- layout ---- */
    --container: 1120px;
    --gutter: 40px;
    --gutter-mobile: 20px;
    --article-measure: 760px;
    --toc-width: 210px;

    /* ---- radii ---- */
    --radius-chip: 6px;
    --radius-thumb: 8px;
    --radius-tile: 10px;
    --radius-img: 12px;
    --radius-card: 14px;
    --radius-media: 16px;
    --radius-panel: 28px;
    --radius-pill: 9999px;

    /* ---- motion ---- */
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition-slow: 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);

    --header-height: 57px;
    --breakpoint: 760px;
  }

  /* Dark theme.
   *
   * The light palette is Google Material, so these are its documented dark
   * counterparts rather than invented values: #202124 surfaces, #e8eaed text,
   * and #8ab4f8 as the accent, which the palette already carried as
   * --blue-on-dark.
   *
   * Only colour tokens are redefined. Type, layout, radii and motion are
   * theme-independent and stay in :root. The --co-* company colours are brand
   * marks and deliberately do not change.
   */
  [data-theme='dark'] {
    --blue: #8ab4f8;
    --blue-pressed: #aecbfa;
    --blue-tint: #1e2a3a;

    /* The dark accent is a light blue, so text on it must be dark to stay
       legible. This is why --on-accent exists rather than a literal #fff. */
    --on-accent: #202124;

    --text-primary: #e8eaed;
    --text-body: #dadce0;
    --text-muted: #9aa0a6;
    --text-faint: #80868b;

    --surface: #202124;
    --surface-hover: #292a2d;
    --neutral-fill: #303134;
    --media-dark: #0f1014;
    --selection-bg: #3c4043;

    --header-bg: rgba(32, 33, 36, 0.82);

    --border-hairline: #3c4043;
    --border-faint: rgba(232, 234, 237, 0.1);
    --border-faint-2: rgba(232, 234, 237, 0.14);
    --border-rule: rgba(232, 234, 237, 0.22);
    --border-soft: rgba(232, 234, 237, 0.12);
    --quote-rule: rgba(232, 234, 237, 0.24);
    --table-rule: #3c4043;
    --ring: inset 0 0 0 1px rgba(232, 234, 237, 0.1);
    --ring-soft: inset 0 0 0 1px rgba(232, 234, 237, 0.12);
    --ring-table: inset 0 0 0 1px rgba(232, 234, 237, 0.15);
    --ring-strong: inset 0 0 0 1px rgba(232, 234, 237, 0.18);
    --ring-medium: inset 0 0 0 1px rgba(232, 234, 237, 0.2);

    --code-bg: rgba(232, 234, 237, 0.08);
    --scrim: rgba(0, 0, 0, 0.45);
    --mark-bg: #4a3d14;

    --faded-rule: linear-gradient(
      to right,
      transparent,
      rgba(232, 234, 237, 0.22) 48px,
      rgba(232, 234, 237, 0.22) calc(100% - 48px),
      transparent
    );

    --cta-gradient: linear-gradient(120deg, #1e2a3a 0%, #202b3d 55%, #1d2a24 100%);
  }
`;

export default variables;
