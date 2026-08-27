/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';

/**
 * Request the web fonts in the document head.
 *
 * These were previously loaded by gatsby-plugin-web-font-loader, which pulls
 * WebFontLoader into the JS bundle and only calls it after hydration. Nothing
 * referenced the fonts until then, so the first paint used system-ui and every
 * piece of text re-rendered in Poppins/Roboto once the bundle had executed and
 * two further network round trips had completed. Poppins and system-ui have
 * quite different metrics, so that swap reflowed the page: the flash on load.
 *
 * Declaring the stylesheet here starts the fetch while the HTML is still being
 * parsed, in parallel with the JS rather than after it, and display=swap keeps
 * text visible throughout.
 */
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="font-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="font-preconnect-static"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="font-css"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap"
    />,
  ]);
};

/**
 * Drop Gatsby's `as="fetch"` preload hints for page-data JSON.
 *
 * Gatsby emits these without a `crossorigin` attribute. The browser's preload
 * cache is keyed partly on CORS mode, so the hint never matches the fetch()
 * the Gatsby runtime issues a moment later. The file is downloaded twice and
 * Chrome logs "preloaded using link preload but not used within a few seconds"
 * once per file.
 *
 * The data still loads normally, this only removes a hint the browser cannot
 * use. Script preloads are left alone, those work.
 */
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  replaceHeadComponents(
    getHeadComponents().filter(
      node =>
        !(
          node.type === 'link' &&
          node.props &&
          node.props.rel === 'preload' &&
          node.props.as === 'fetch'
        ),
    ),
  );
};
