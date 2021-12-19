import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import { Layout, Research } from '@components';

const StyledMainContainer = styled.main`
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
