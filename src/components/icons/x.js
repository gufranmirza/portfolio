import React from 'react';

/**
 * X (formerly Twitter). The design reference uses the current mark, and the
 * bird in `twitter.js` is kept only for anywhere still referencing it.
 *
 * A solid glyph rather than a stroked one, so it carries `fill` and is exempt
 * from the `.feather` sizing rule.
 */
const IconX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="currentColor"
    stroke="none">
    <title>X</title>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default IconX;
