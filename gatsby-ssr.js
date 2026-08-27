/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';

/**
 * Preload the two font files needed for the first screen.
 *
 * The faces themselves are declared in src/styles/Fonts and ship inside the
 * server-rendered <style>, so the browser learns about them without a request.
 * It will not fetch a font, though, until it finds text that needs one, which
 * is after layout. Preloading the two the first screen actually uses starts
 * those bytes during HTML parsing instead.
 *
 * Only latin is preloaded, and only Poppins 500 and Roboto: 500 is by far the
 * most used weight, and Roboto is variable so one file covers the body text at
 * every weight. The remaining faces load on demand.
 */
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="font-poppins-500"
      rel="preload"
      as="font"
      type="font/woff2"
      href="/fonts/poppins-500-latin.woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="font-roboto"
      rel="preload"
      as="font"
      type="font/woff2"
      href="/fonts/roboto-variable-latin.woff2"
      crossOrigin="anonymous"
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
