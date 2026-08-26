/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

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
