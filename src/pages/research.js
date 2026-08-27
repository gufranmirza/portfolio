import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import { Layout, Research } from '@components';

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
      <Helmet title="Research" />
      <Research />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
