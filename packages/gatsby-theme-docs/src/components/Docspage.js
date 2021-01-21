/** @jsx jsx */
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './layout';
import { jsx } from 'theme-ui';

const DocsPage = ({ page }) => {
  return (
    <Layout>
      <h1>{page.title}</h1>
      <MDXRenderer>{page.body}</MDXRenderer>
      <p
        sx={{
          borderTop: (theme) => `1px solid ${theme.colors.muted}`,
          color: 'muted',
          fontSize: '14px',
          padding: '0.25em',
        }}
      >
        This page is updated : {page.updated}
      </p>
    </Layout>
  );
};

export default DocsPage;
