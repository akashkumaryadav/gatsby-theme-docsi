import React from 'react';
import { graphql } from 'gatsby';
import DocsPage from '../components/Docspage';

export const query = graphql`
  query($pageID: String!) {
    docsPage(id: { eq: $pageID }) {
      id
      title
      body
      updated(fromNow: true)
    }
  }
`;

const DocsPageTempelate = ({ data }) => <DocsPage page={data.docsPage} />;

export default DocsPageTempelate;
