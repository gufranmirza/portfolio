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
    --fz-blockquote: 21px;
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
`;

export default variables;
