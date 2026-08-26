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

    /* ---- borders ---- */
    --border-hairline: #dadce0;
    --border-faint: rgba(60, 64, 67, 0.08);
    --border-faint-2: rgba(60, 64, 67, 0.12);
    --border-rule: rgba(60, 64, 67, 0.18);
    --ring: inset 0 0 0 1px rgba(60, 64, 67, 0.08);
    --ring-strong: inset 0 0 0 1px rgba(60, 64, 67, 0.15);

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
    --co-ibm: #0f62fe;
    --co-connectwise: #ec1c24;
    --co-index: #12a594;
    --co-tsystems: #1a73e8;

    /* ---- type ---- */
    --font-display: 'Poppins', 'Google Sans', 'Roboto', system-ui, sans-serif;
    --font-sans: 'Roboto', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, monospace;

    --fz-eyebrow: 11px;
    --fz-kicker: 10px;
    --fz-meta: 10.5px;
    --fz-xs: 12px;
    --fz-sm: 13px;
    --fz-base: 15px;
    --fz-md: 16px;
    --fz-lg: 16.5px;
    --fz-intro: 18px;
    --fz-lede: 19px;
    --fz-article: 17px;
    --fz-h2: 24px;
    --fz-h2-lg: 28px;
    --fz-h1-section: 40px;
    --fz-h1-list: 44px;
    --fz-h1-home: 52px;

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

    /* ------------------------------------------------------------------
       LEGACY TOKENS — the old dark navy theme.
       Kept only so un-migrated components keep rendering during the
       redesign. Delete this block once every component uses the tokens
       above, then grep for "--navy|--green|--slate|--fz-" to confirm.
       ------------------------------------------------------------------ */
    --navy: #0a192f;
    --light-navy: #112240;
    --lightest-navy: #233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #687387;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --white-clean: #fff;
    --green: #02c39a;
    --green-tint: rgba(100, 255, 218, 0.1);
    --pink: #f57dff;
    --blue-legacy: #57cbff;

    --fz-xxs: 13px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;
    --tab-height: 42px;
    --tab-width: 120px;
    --hamburger-width: 30px;
  }
`;

export default variables;
