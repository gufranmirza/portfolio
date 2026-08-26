import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1000px;
`;
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
  h1 {
    color: var(--dark-slate);
  }
`;
// Post body styling lives in src/styles/BlogStyles.js (.post-body)

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, description, date, tags, cover } = frontmatter;

  return (
    <Layout location={location} seo={false}>
      <Helmet>
        <title>{title} </title>
        <meta name="description" content={description} />

        {/* // Twitter SEO */}
        {cover && <meta name="twitter:card" content={cover.publicURL} />}
        {cover && <meta name="twitter:image" content={cover.publicURL} />}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content="@_imGufran" />
        <meta name="twitter:site" content="@_imGufran" />
        <meta name="twitter:description" content={description} />

        {/* OG SEO tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="gufranmirza.com" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        {cover && <meta property="og:image" content={cover.publicURL} />}
      </Helmet>

      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/blogs">All blogs</Link>
        </span>

        <StyledPostHeader>
          <h1 className="medium-heading">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&nbsp;&mdash;&nbsp;</span>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, i) => (
                <Link key={i} to={`/blogs/tags/${kebabCase(tag)}/`} className="tag">
                  #{tag}
                </Link>
              ))}
          </p>
        </StyledPostHeader>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
        cover {
          publicURL
        }
      }
    }
  }
`;
