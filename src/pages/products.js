import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { Layout, Featured } from '@components';

const StyledMainContainer = styled.div`
  padding: 52px 0 72px;

  @media (max-width: 760px) {
    padding: 36px 0 48px;
  }

  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Helmet title="Products" />
      <Featured />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
